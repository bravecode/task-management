from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from models.user import User
from schemas.user import UserCreate, UserBase
from database import get_db

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("", response_model=List[UserBase])
def get_users(context: Session = Depends(get_db)):
    return context.query(User).all()


@router.post("", response_model=UserBase)
def create_user(request: UserCreate, context: Session = Depends(get_db)):
    user = User(
        username=request.username,
        email=request.email,
        password=request.password
    )

    context.add(user)
    context.commit()
    context.refresh()

    return user
