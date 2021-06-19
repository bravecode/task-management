from fastapi import FastAPI

from database import Base, engine
from routers import users, projects, tasks, auth

server = FastAPI()

# Include Models
Base.metadata.create_all(engine)

# Include Routers
server.include_router(users.router)
server.include_router(projects.router)
server.include_router(tasks.router)
server.include_router(auth.router)
