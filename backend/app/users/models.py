from sqlalchemy import Column, String, Boolean, Text
from db.database import Base
from commons.utils import get_uuid
from sqlalchemy.orm import relationship


class Users(Base):
    __tablename__ = "users"

    id = Column(String(50), primary_key=True, index=True, default=get_uuid)
    name = Column(String(50), nullable=False)
    email = Column(String(50), unique=True, index=True)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    avatar = Column(Text, nullable=True)

    tasks = relationship("Tasks", back_populates="user")
