from fastapi import FastAPI
from app.routes import  stats
from fastapi.middleware.cors import CORSMiddleware



# Allow requests from your frontend

app = FastAPI(title="LeetCode + CodeChef Tracker", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
def ge():
    return {"message":"Hosted"}
app.include_router(stats.router, prefix="/stats", tags=["Stats"])
