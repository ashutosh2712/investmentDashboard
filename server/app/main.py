from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import investments

from app import models


app = FastAPI(title="Investment Dashboard API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for security (use frontend URL in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API Routes
app.include_router(investments.router, prefix="/investments", tags=["Investments"])


print("Creating tables in the database...")
Base.metadata.create_all(bind=engine)
print("Tables should be created now.")

@app.get("/")
def root():
    return {"message": "Welcome to the Investment Dashboard API"}