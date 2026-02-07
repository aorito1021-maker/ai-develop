from __future__ import annotations

from fastapi import APIRouter, Form, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from app.application.services import UserService


templates = Jinja2Templates(directory="app/interface/templates")


def get_router(user_service: UserService) -> APIRouter:
    router = APIRouter()

    def current_user(request: Request):
        user_id = request.session.get("user_id")
        username = request.session.get("username")
        if user_id is None or username is None:
            return None
        return {"id": user_id, "username": username}

    @router.get("/")
    def index(request: Request):
        user = current_user(request)
        if user:
            return RedirectResponse(url="/game", status_code=302)
        return RedirectResponse(url="/login", status_code=302)

    @router.get("/login")
    def login_form(request: Request, error: str | None = None):
        return templates.TemplateResponse(
            "login.html",
            {"request": request, "error": error, "user": current_user(request)},
        )

    @router.post("/login")
    def login(request: Request, username: str = Form(...), password: str = Form(...)):
        user = user_service.authenticate(username, password)
        if user is None:
            return templates.TemplateResponse(
                "login.html",
                {"request": request, "error": "ログインに失敗しました。", "user": None},
                status_code=400,
            )
        request.session["user_id"] = user.id
        request.session["username"] = user.username
        return RedirectResponse(url="/game", status_code=302)

    @router.get("/register")
    def register_form(request: Request, error: str | None = None):
        return templates.TemplateResponse(
            "register.html",
            {"request": request, "error": error, "user": current_user(request)},
        )

    @router.post("/register")
    def register(request: Request, username: str = Form(...), password: str = Form(...)):
        try:
            user_service.register_user(username, password)
        except ValueError as exc:
            return templates.TemplateResponse(
                "register.html",
                {"request": request, "error": str(exc), "user": None},
                status_code=400,
            )
        return RedirectResponse(url="/login", status_code=302)

    @router.post("/logout")
    def logout(request: Request):
        request.session.clear()
        return RedirectResponse(url="/login", status_code=302)

    @router.get("/users")
    def user_list(request: Request):
        user = current_user(request)
        if user is None:
            return RedirectResponse(url="/login", status_code=302)
        users = user_service.list_users()
        return templates.TemplateResponse(
            "users.html",
            {"request": request, "users": users, "user": user},
        )

    @router.get("/game")
    def game(request: Request):
        user = current_user(request)
        if user is None:
            return RedirectResponse(url="/login", status_code=302)
        return templates.TemplateResponse(
            "game.html",
            {"request": request, "user": user},
        )

    return router
