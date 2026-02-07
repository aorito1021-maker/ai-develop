from __future__ import annotations

import json
from dataclasses import asdict
from datetime import datetime
from pathlib import Path

from app.domain.user import User
from app.domain.user_repository import UserRepository


class JsonUserRepository(UserRepository):
    def __init__(self, db_path: str) -> None:
        self._path = Path(db_path)
        self._path.parent.mkdir(parents=True, exist_ok=True)
        if not self._path.exists():
            self._save([])

    def create(self, user: User) -> User:
        users = self._load()
        next_id = max((item["id"] for item in users), default=0) + 1
        created = User(
            id=next_id,
            username=user.username,
            password_hash=user.password_hash,
            created_at=user.created_at,
        )
        users.append(self._serialize(created))
        self._save(users)
        return created

    def find_by_username(self, username: str) -> User | None:
        users = self._load()
        for item in users:
            if item["username"] == username:
                return self._deserialize(item)
        return None

    def list_all(self) -> list[User]:
        users = self._load()
        return [self._deserialize(item) for item in users]

    def _load(self) -> list[dict[str, str | int]]:
        if not self._path.exists():
            return []
        content = self._path.read_text(encoding="utf-8")
        if not content.strip():
            return []
        return json.loads(content)

    def _save(self, data: list[dict[str, str | int]]) -> None:
        self._path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

    def _serialize(self, user: User) -> dict[str, str | int]:
        payload = asdict(user)
        payload["created_at"] = user.created_at.isoformat()
        return payload

    def _deserialize(self, data: dict[str, str | int]) -> User:
        return User(
            id=int(data["id"]),
            username=str(data["username"]),
            password_hash=str(data["password_hash"]),
            created_at=datetime.fromisoformat(str(data["created_at"])),
        )
