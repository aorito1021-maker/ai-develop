from __future__ import annotations

from datetime import datetime

from app.application.auth import hash_password, verify_password
from app.domain.user import User
from app.domain.user_repository import UserRepository


class UserService:
    def __init__(self, user_repository: UserRepository) -> None:
        self._user_repository = user_repository

    def register_user(self, username: str, password: str) -> User:
        existing = self._user_repository.find_by_username(username)
        if existing is not None:
            raise ValueError("このユーザー名は既に使用されています。")
        password_hash = hash_password(password)
        user = User(id=None, username=username, password_hash=password_hash, created_at=datetime.utcnow())
        return self._user_repository.create(user)

    def authenticate(self, username: str, password: str) -> User | None:
        user = self._user_repository.find_by_username(username)
        if user is None:
            return None
        if not verify_password(password, user.password_hash):
            return None
        return user

    def list_users(self) -> list[User]:
        return self._user_repository.list_all()
