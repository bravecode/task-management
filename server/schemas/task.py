from pydantic.main import BaseModel


class TaskBase(BaseModel):
    title: str
    description: str
