from __future__ import annotations

from typing import Protocol

from app.domain.user import User


class UserRepository(Protocol):
    def create(self, user: User) -> User:
        ...

    def find_by_username(self, username: str) -> User | None:
        ...

    def list_all(self) -> list[User]:
        ...
