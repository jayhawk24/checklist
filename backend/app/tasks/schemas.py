from pydantic import BaseModel, constr, ConfigDict
from datetime import datetime
from typing import Optional
from commons.enums import TaskStatus
from fastapi_filter.contrib.sqlalchemy import Filter
from tasks.models import Tasks


class OptionalTaskRequestSchema(BaseModel):
    description: Optional[str] = None
    status: Optional[TaskStatus] = TaskStatus.todo

    start: Optional[datetime] = None
    due: Optional[datetime] = None


class AddTaskRequestSchema(OptionalTaskRequestSchema):
    title: constr(min_length=1, max_length=255)


class UpdateTaskRequestSchema(OptionalTaskRequestSchema):
    title: Optional[constr(min_length=1, max_length=255)]


class TaskFilters(Filter):
    status__in: Optional[list[TaskStatus]] = None
    status: Optional[TaskStatus] = None
    start__lt: Optional[datetime] = None
    start__gt: Optional[datetime] = None
    start: Optional[datetime] = None
    due__lt: Optional[datetime] = None
    due__gt: Optional[datetime] = None
    due: Optional[datetime] = None
    title__contains: Optional[str] = None

    class Constants(Filter.Constants):
        model = Tasks


class TasksResponseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    description: Optional[str]
    status: TaskStatus

    start: Optional[datetime]
    due: Optional[datetime]
    created_at: datetime
    updated_at: datetime
