from sqlalchemy import Column, String, Text, Enum, DateTime, ForeignKey
from db.database import Base
from commons.utils import get_uuid
from commons.enums import TaskStatus
from sqlalchemy.orm import mapped_column, relationship, Mapped
from users.models import Users
from datetime import datetime


class Tasks(Base):
    __tablename__ = "tasks"
    id = Column(String(50), primary_key=True, index=True, default=get_uuid)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum(TaskStatus), nullable=False, default=False)
    user_id = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )
    user: Mapped["Users"] = relationship(back_populates="tasks")

    start = Column(DateTime, nullable=True)
    due = Column(DateTime, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)
