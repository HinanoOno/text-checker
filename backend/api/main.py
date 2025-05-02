from fastapi import FastAPI
from api.routers import checker

app = FastAPI()
app.include_router(checker.router)
