from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class User:
    id: int | None
    username: str
    password_hash: str
    created_at: datetime
