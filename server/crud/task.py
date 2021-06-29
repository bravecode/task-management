from typing import List
from fastapi import HTTPException, status
from sqlalchemy.orm.session import Session

from models.task import Task


class TaskCRUD:
    # Get single task by ID or throw
    def get(self, context: Session, ID: int) -> Task:
        task = context.query(Task).filter(Task.id == ID).first()

        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task with specified ID not found."
            )

        return task

    # Get all tasks
    def get_all(self, context: Session) -> List[Task]:
        return context.query(Task).all()

    # Get all tasks assigned to specfied proejct
    def get_tasks_by_project_id(
        self,
        context: Session,
        project_id: int
    ) -> List[Task]:
        return context.query(Task).filter(Task.project_id == project_id).all()
