from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from models.project import Project
from schemas.project import ProjectCreate, ProjectBase
from database import get_db

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.get("", response_model=ProjectBase)
def get_projects(context: Session = Depends(get_db)):
    return context.query(Project).all()


@router.post("", response_model=ProjectBase)
def create_project(request: ProjectCreate, context: Session = Depends(get_db)):
    project = Project(
        name=request.name
    )

    context.add(project)
    context.commit()
    context.refresh()

    return project
