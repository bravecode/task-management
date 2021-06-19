from fastapi import HTTPException, status
from fastapi import Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from decouple import config
from datetime import datetime, timedelta
from jose import jwt


class AuthProvider:
    context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    security = HTTPBearer()

    # Get Variables from .env
    token_secret = config("JWT_SECRET")
    token_duration = config("JWT_DURATION", cast=int) or 15
    token_algorithm = config("JWT_ALGORITHM")

    # Password Methods
    def verify_password(self, plain_password, hashed_password):
        return self.context.verify(plain_password, hashed_password)

    def hash_password(self, password):
        return self.context.hash(password)

    # Token Methods
    def encode_token(self, userID: int):
        to_encode = {
            "exp": datetime.utcnow() + timedelta(minutes=self.token_duration),
            "iat": datetime.utcnow(),
            "sub": str(userID)
        }

        return jwt.encode(
            to_encode,
            self.token_secret,
            algorithm=self.token_algorithm
        )

    def decode_token(self, token: str):
        try:
            payload = jwt.decode(
                token,
                self.token_secret,
                algorithms=self.token_algorithm
            )

            return int(payload['sub'])
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                detail="Token expired"
            )
        except BaseException as e:
            print(e)

            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

    # Validate if token is provided, then decode it & return user ID
    def get_user_id(
        self,
        auth: HTTPAuthorizationCredentials = Security(security)
    ) -> int:
        return self.decode_token(auth.credentials)