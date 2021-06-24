from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routers import users, projects, tasks, auth

server = FastAPI()

# CORS
origins = ["*"]

server.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Models
Base.metadata.create_all(engine)

# Include Routers
server.include_router(users.router)
server.include_router(projects.router)
server.include_router(tasks.router)
server.include_router(auth.router)
