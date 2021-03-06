from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey

from database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(64))
    author_id = Column(Integer, ForeignKey("users.id"))

    author = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project")
