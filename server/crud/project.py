from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm.session import Session

from models.project import Project


class ProjectCRUD:
    # Get single project by ID or throw
    def get(self, context: Session, ID: int) -> Project:
        project = context.query(Project).filter(Project.id == ID).first()

        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project with specified ID not found."
            )

        return project

    # Find single project by name
    def find_by_name(self, context: Session, name: str) -> Project or None:
        return context.query(Project).filter(Project.name == name).first()

    # Get all projects
    def get_all(self, context: Session) -> List[Project]:
        return context.query(Project).all()
