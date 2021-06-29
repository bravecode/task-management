from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from models.task import Task
from schemas.task import TaskCreate, TaskUpdate, TaskResult
from crud.task import TaskCRUD
from crud.project import ProjectCRUD
from providers.auth import AuthProvider
from database import get_db

auth_provider = AuthProvider()
crud = TaskCRUD()
project_crud = ProjectCRUD()

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
    dependencies=[Depends(auth_provider.get_user_id)]
)


@router.get("", response_model=TaskResult)
def get_tasks(context: Session = Depends(get_db)):
    return crud.get_all(context)


@router.get("/{ID}", response_model=List[TaskResult])
def get_task(ID: int, context: Session = Depends(get_db)):
    return crud.get(context, ID)


@router.post("")
def create_task(request: TaskCreate, context: Session = Depends(get_db)):
    # Check if project exists
    project_crud.get(context, request.project_id)

    to_create = Task(
        title=request.title,
        description=request.description,
        category=request.category,
        project_id=request.project_id
    )

    context.add(to_create)
    context.commit()
    context.refresh(to_create)

    return to_create


@router.delete("/{ID}")
def delete_task(ID: int, context: Session = Depends(get_db)):
    task = crud.get(context, ID)

    task.delete()
    context.commit()

    return {
        "message": f"Deleted task with ID {ID}"
    }


@router.put("/{ID}", response_model=TaskResult)
def update_task(
    ID: int,
    request: TaskUpdate,
    context: Session = Depends(get_db)
):
    task = crud.get(context, ID)

    task.title = request.title or task.title
    task.description = request.description or task.description
    task.category = request.category or task.category

    context.commit()
    context.refresh(task)

    return task
