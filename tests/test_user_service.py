from datetime import datetime

import pytest

from app.application.services import UserService
from app.domain.user import User


class InMemoryUserRepository:
    def __init__(self) -> None:
        self._users: list[User] = []
        self._next_id = 1

    def create(self, user: User) -> User:
        created = User(
            id=self._next_id,
            username=user.username,
            password_hash=user.password_hash,
            created_at=user.created_at,
        )
        self._next_id += 1
        self._users.append(created)
        return created

    def find_by_username(self, username: str) -> User | None:
        return next((user for user in self._users if user.username == username), None)

    def list_all(self) -> list[User]:
        return list(self._users)


def test_register_and_authenticate():
    repo = InMemoryUserRepository()
    service = UserService(repo)
    user = service.register_user("alice", "password")

    assert user.id == 1
    assert user.username == "alice"
    assert isinstance(user.created_at, datetime)

    assert service.authenticate("alice", "password") is not None
    assert service.authenticate("alice", "bad") is None


def test_register_duplicate_username():
    repo = InMemoryUserRepository()
    service = UserService(repo)
    service.register_user("alice", "password")

    with pytest.raises(ValueError):
        service.register_user("alice", "password")
