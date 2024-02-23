from fastapi import Depends, APIRouter, HTTPException
from users.models import Users
from auth.tokens import get_current_user
from tasks.models import Tasks
from db.database import get_db
from sqlalchemy.orm import Session
from tasks.schemas import (
    AddTaskRequestSchema,
    TasksResponseSchema,
    UpdateTaskRequestSchema,
)

from fastapi_pagination.ext.sqlalchemy import paginate

from fastapi_pagination import Page, add_pagination

tasks_router = APIRouter(prefix="/tasks", tags=["Tasks"])


@tasks_router.get("/")
def get_tasks(
    user: Users = Depends(get_current_user), db: Session = Depends(get_db)
) -> Page[TasksResponseSchema]:
    tasks = (
        db.query(Tasks)
        .filter(Tasks.user_id == user.id)
        .order_by(Tasks.created_at.desc())
    )

    return paginate(db, tasks)


@tasks_router.get("/{id}")
def get_task(
    id: int,
    user: Users = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = db.query(Tasks).filter(Tasks.id == id, Tasks.user_id == user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")


@tasks_router.post("/")
def create_task(
    payload: AddTaskRequestSchema,
    user: Users = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = Tasks(**payload.dict(), user_id=user.id)
    db.add(task)
    db.commit()

    return {"detail": "Task created successfully."}


@tasks_router.delete("/{id}")
def delete_task(
    id: int,
    user: Users = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = db.query(Tasks).filter(Tasks.id == id, Tasks.user_id == user.id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")

    db.delete(task)
    db.commit()

    return {"detail": "Task deleted successfully."}


@tasks_router.put("/{id}")
def update_task(
    id: str,
    payload: UpdateTaskRequestSchema,
    user: Users = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    updated_task = (
        db.query(Tasks)
        .filter(Tasks.id == id, Tasks.user_id == user.id)
        .update(payload.dict(exclude_unset=True))
    )
    if updated_task == 0:
        raise HTTPException(status_code=404, detail="Task not found.")

    db.commit()

    return {"detail": "Task updated successfully."}


add_pagination(tasks_router)
