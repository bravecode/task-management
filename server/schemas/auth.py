from pydantic.main import BaseModel


class AuthRegister(BaseModel):
    username: str
    email: str
    password: str


class AuthLogin(BaseModel):
    email: str
    password: str


class AuthUser(BaseModel):
    username: str
    email: str

    class Config():
        orm_mode = True


class AuthToken(BaseModel):
    token: str
