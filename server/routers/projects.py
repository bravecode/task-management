from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm.session import Session

from models.project import Project
from schemas.project import ProjectCreate, ProjectUpdate, ProjectResult
from providers.auth import AuthProvider
from database import get_db

auth_provider = AuthProvider()

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
    dependencies=[Depends(auth_provider.get_user_id)]
)


@router.get("", response_model=List[ProjectResult])
def get_projects(context: Session = Depends(get_db)):
    return context.query(Project).all()


@router.get("/{ID}", response_model=ProjectResult)
def get_project(ID: str, context: Session = Depends(get_db)):
    project = context.query(Project).filter(Project.id == ID).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project with specified ID not found."
        )

    return project


@router.post("", response_model=ProjectResult)
def create_project(
    request: ProjectCreate,
    userID=Depends(auth_provider.get_user_id),
    context: Session = Depends(get_db)
):
    project = Project(
        name=request.name,
        author_id=userID
    )

    context.add(project)
    context.commit()
    context.refresh(project)

    return project


@router.delete("/{ID}")
def delete_project(
    ID: int,
    context: Session = Depends(get_db)
):
    project = context.query(Project).filter(Project.id == ID)

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project with specified ID not found."
        )

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
    project = context.query(Project).filter(Project.id == ID).first()

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project with specified ID not found."
        )

    if request.name:
        project.update({
            "name": request.name
        })

    context.commit()
    context.refresh(project)

    return project
