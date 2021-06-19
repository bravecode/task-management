from os import stat_result
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm.session import Session

from models.user import User
from schemas.auth import AuthRegister, AuthLogin, AuthUser
from database import get_db
from providers.auth import AuthProvider

auth_provider = AuthProvider()

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/register", response_model=AuthUser)
def register(request: AuthRegister, context: Session = Depends(get_db)):
    user = User(
        username=request.username,
        email=request.email,
        password=auth_provider.hash_password(request.password)
    )

    context.add(user)
    context.commit()
    context.refresh(user)

    return user


@router.post("/login")
def login(request: AuthLogin, context: Session = Depends(get_db)):
    user = context.query(User).filter(User.email == request.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not auth_provider.verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incorrect password"
        )

    return {
        "token": auth_provider.encode_token(user.id)
    }


@router.get('/me')
def me(
    userID=Depends(auth_provider.get_user_id),
    context: Session = Depends(get_db)
):
    user = context.query(User).get(userID)

    if not user:
        raise HTTPException(
            stat_result=status.HTTP_404_NOT_FOUND,
            detail="User with specified ID not found."
        )

    return user
