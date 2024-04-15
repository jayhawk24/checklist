import asyncio
from users.models import Users
from datetime import timedelta, datetime
from fastapi import Depends, HTTPException, status, APIRouter, Response, UploadFile
from users.schemas import (
    SignUpRequestSchema,
    SignUpResponseSchema,
    LoginResponseSchema,
    LoginRequestSchema,
    UserSchema,
    UpdateProfileRequestSchema,
)
from sqlalchemy.orm import Session
from db.database import get_db
from auth.utils import verify_password, hash_pass
from commons.utils import validate_file_size_type
from auth.tokens import create_access_token, create_refresh_token, get_current_user
from core.config import FRONTEND_URL, JWT_ACCESS_TOKEN_EXPIRE_MINUTES
from commons.cloudinary import upload_image

user_router = APIRouter(prefix="/users", tags=["Users"])


@user_router.post("/signin", response_model=LoginResponseSchema)
async def login(
    payload: LoginRequestSchema, response: Response, db: Session = Depends(get_db)
):
    """
    This API is used to login users to the application
    """
    user = db.query(Users).filter(Users.email == payload.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials."
        )

    if not verify_password(payload.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials."
        )

    access_token = create_access_token(data={"user_id": user.id})
    refresh_token = create_refresh_token(data={"user_id": user.id})

    response.headers["Authorization"] = f"Bearer {access_token}"

    response.set_cookie(
        "access_token",
        access_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        expires=(
            datetime.utcnow() + timedelta(minutes=int(JWT_ACCESS_TOKEN_EXPIRE_MINUTES))
        ).strftime("%Y-%m-%d %H:%M:%S"),
    )

    return LoginResponseSchema(
        access_token=access_token, refresh_token=refresh_token, token_type="bearer"
    )


@user_router.post(
    "/signup", status_code=status.HTTP_201_CREATED, response_model=SignUpResponseSchema
)
async def signup(payload: SignUpRequestSchema, db: Session = Depends(get_db)):
    """
    This API is used to signup users to the application
    """
    existing_user = db.query(Users).filter(Users.email == payload.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists.",
        )

    hashed_password = hash_pass(payload.password)
    payload.password = hashed_password

    user = Users(**payload.model_dump())
    db.add(user)

    try:
        db.commit()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong.",
        )

    return SignUpResponseSchema(detail="User created successfully.")


@user_router.get("/me")
async def get_me(
    user: Users = Depends(get_current_user), db: Session = Depends(get_db)
) -> UserSchema:
    if not user or (user.id is None):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials."
        )

    return user


@user_router.put("/me")
async def update_profile(
    payload: UpdateProfileRequestSchema,
    user: Users = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> UserSchema:
    user.name = payload.name
    user.email = payload.email

    if payload.password and payload.old_password:
        if not verify_password(payload.old_password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid old password.",
            )

        hashed_password = hash_pass(payload.password)
        user.password = hashed_password

    try:
        db.commit()
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Something went wrong.",
        )

    return user


@user_router.put("/me/avatar")
async def update_avatar(
    image: UploadFile,
    user: Users = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    validate_file_size_type(image)

    url = await upload_image(image)
    print(url)

    if user.avatar:
        # delete previous image
        pass

    user.avatar = url

    return {"url": url}
