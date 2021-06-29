from typing import Optional
from pydantic.main import BaseModel

from models.task import CategoryEnum
from schemas.project import ProjectResult


# Shared Properties
class TaskBase(BaseModel):
    title: str
    description: str
    category: CategoryEnum = CategoryEnum.to_do

    class Config():
        orm_module: True


# Properties to receive via API on creation
class TaskCreate(TaskBase):
    project_id: int

    pass


# Properties to receive via API on update
class TaskUpdate(TaskBase):
    title: Optional[str] = None
    description: Optional[str] = None


# Properties to return in response
class TaskResult(BaseModel):
    id: int
    title: str
    description: str
    category: CategoryEnum
    project: ProjectResult

    class Config():
        orm_module: True
