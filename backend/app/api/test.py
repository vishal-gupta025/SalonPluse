from fastapi import APIRouter
from fastapi import Depends

from app.dependencies.auth import (
    get_current_user
)

router = APIRouter(
    prefix="/test",
    tags=["Test"]
)


@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }