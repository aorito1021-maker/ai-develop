from __future__ import annotations

import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware

from app.application.services import UserService
from app.infrastructure.json_user_repository import JsonUserRepository
from app.interface.web import get_router


def create_app() -> FastAPI:
    app = FastAPI()
    db_path = os.environ.get("APP_DB_PATH", "data/users.json")
    user_repository = JsonUserRepository(db_path)
    user_service = UserService(user_repository)

    app.add_middleware(SessionMiddleware, secret_key=os.environ.get("APP_SECRET", "dev-secret"))
    app.mount("/static", StaticFiles(directory="app/interface/static"), name="static")
    app.include_router(get_router(user_service))
    return app


app = create_app()
