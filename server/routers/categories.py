from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from models.category import Category
from schemas.category import CategoryBase
from database import get_db

router = APIRouter(
    prefix="/categories",
    tags=["Category"]
)


@router.get("", response_model=CategoryBase)
def get_categories(context: Session = Depends(get_db)):
    return context.query(Category).all()
