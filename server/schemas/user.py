from pydantic.main import BaseModel


class UserBase(BaseModel):
    username: str
    email: str

    class Config():
        orm_mode = True


class UserCreate(UserBase):
    password: str
