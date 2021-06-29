from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm.session import Session

from models.project import Project
from schemas.project import ProjectCreate, ProjectUpdate, ProjectResult
from schemas.task import TaskBase
from providers.auth import AuthProvider
from crud.project import ProjectCRUD
from crud.task import TaskCRUD
from database import get_db

auth_provider = AuthProvider()
crud = ProjectCRUD()
task_crud = TaskCRUD()

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
    dependencies=[Depends(auth_provider.get_user_id)]
)


@router.get("", response_model=List[ProjectResult])
def get_projects(context: Session = Depends(get_db)):
    return crud.get_all(context)


@router.get("/{ID}", response_model=ProjectResult)
def get_project(ID: int, context: Session = Depends(get_db)):
    return crud.get(context, ID)


@router.post("", response_model=ProjectResult)
def create_project(
    request: ProjectCreate,
    userID=Depends(auth_provider.get_user_id),
    context: Session = Depends(get_db)
):
    project = crud.find_by_name(context, request.name)

    if project:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The project with this name already exists in the system.",
        )

    to_create = Project(
        name=request.name,
        author_id=userID
    )

    context.add(to_create)
    context.commit()
    context.refresh(to_create)

    return to_create


@router.delete("/{ID}")
def delete_project(
    ID: int,
    context: Session = Depends(get_db)
):
    project = crud.get(context, ID)

    project.delete()
    context.commit()

    return {
        "message": f"Deleted project with ID {ID}"
    }


@router.put("/{ID}", response_model=ProjectResult)
def update_project(
    ID: int,
    request: ProjectUpdate,
    context: Session = Depends(get_db)
):
    project = crud.get(context, ID)

    if request.name:
        project.name = request.name

    context.commit()
    context.refresh(project)

    return project


@router.get("/{ID}/tasks")
def get_tasks_assigned_to_project(
    ID: int,
    context: Session = Depends(get_db)
):
    tasks = task_crud.get_tasks_by_project_id(context, ID)

    return tasks
