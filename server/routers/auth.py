from fastapi import APIRouter, Depends, HTTPException, security, status
from fastapi.param_functions import Security
from fastapi.security.http import HTTPAuthorizationCredentials
from sqlalchemy.orm.session import Session

from models.user import User
from schemas.auth import AuthRegister, AuthLogin
from database import get_db
from providers.auth import AuthProvider

auth_provider = AuthProvider()

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post("/register")
def register(request: AuthRegister, context: Session = Depends(get_db)):
    user = context.query(User).filter(User.email == request.email).first()

    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with that email is already in our database."
        )

    to_create = User(
        username=request.username,
        email=request.email,
        password=auth_provider.hash_password(request.password)
    )

    context.add(to_create)
    context.commit()
    context.refresh(to_create)

    return {
        "token": auth_provider.encode_token(to_create.id)
    }


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


@router.get("/refresh")
def refresh_token(token=Depends(auth_provider.refresh_token)):
    return {
        "token": token
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
