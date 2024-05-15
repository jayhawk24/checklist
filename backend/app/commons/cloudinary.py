import cloudinary
from cloudinary.uploader import upload, destroy
from core.config import CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME
from fastapi import UploadFile, HTTPException, status

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET,
    secure=True,
)


def upload_image(image: UploadFile):
    try:
        upload_result = upload(image.file)
        file_url = upload_result["secure_url"]
        return file_url
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading images: {e}",
        )


async def delete_image(image_url: str):
    try:
        destroy(image_url)
        print("Image deleted successfully")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting images: {e}",
        )
