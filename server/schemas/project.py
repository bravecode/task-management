from typing import List, Optional
from pydantic.main import BaseModel
from pydantic import constr


# Shared Properties
class ProjectBase(BaseModel):
    name: constr(min_length=3, max_length=64)

    class Config():
        orm_mode = True


# Properties to receive via API on creation
class ProjectCreate(ProjectBase):
    pass


# Properties to receive via API on update
class ProjectUpdate(ProjectBase):
    name: Optional[constr(min_length=3, max_length=64)] = None


# Properties to return in response
class ProjectResult(BaseModel):
    id: int
    name: constr(min_length=3, max_length=64)

    class Config():
        orm_mode = True
