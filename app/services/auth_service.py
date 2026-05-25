from app.models.user import User

from app.repositories.auth_repo import (
    AuthRepository
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


class AuthService:

    @staticmethod
    def register(
        db,
        payload
    ):

        existing = (
            AuthRepository
            .get_user_by_email(
                db,
                payload.email
            )
        )

        if existing:
            raise ValueError(
                "Email already exists"
            )

        user = User(
            name=payload.name,
            email=payload.email,
            password_hash=hash_password(
                payload.password
            )
        )

        AuthRepository.create_user(
            db,
            user
        )

        return {
            "message": "User created"
        }

    @staticmethod
    def login(
        db,
        payload
    ):

        user = (
            AuthRepository
            .get_user_by_email(
                db,
                payload.email
            )
        )

        if not user:
            raise ValueError(
                "Invalid credentials"
            )

        if not verify_password(
            payload.password,
            user.password_hash
        ):
            raise ValueError(
                "Invalid credentials"
            )

        token = create_access_token(
            {
                "sub": str(user.id)
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }