from typing import Optional
from pydantic import BaseModel, constr, EmailStr, ConfigDict


class UpdateProfileRequestSchema(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    password: Optional[constr(min_length=8, max_length=50)]
    old_password: Optional[constr(min_length=8, max_length=50)]


class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: str
    avatar: Optional[str] = None
    is_active: bool


class SignUpRequestSchema(BaseModel):
    name: constr(min_length=3, max_length=50)
    email: EmailStr
    password: constr(min_length=8, max_length=50)


class SignUpResponseSchema(BaseModel):
    detail: str


class LoginRequestSchema(BaseModel):
    email: EmailStr
    password: constr(min_length=8, max_length=50)


class LoginResponseSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
