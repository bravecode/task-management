from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from models.task import Task
from schemas.task import TaskBase
from database import get_db

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.get("", response_model=TaskBase)
def get_tasks(context: Session = Depends(get_db)):
    return context.query(Task).all()
