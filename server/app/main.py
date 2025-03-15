from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import users, investments

app = FastAPI(title="Investment Dashboard API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for security (use frontend URL in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(users.router, prefix="/users", tags=["Users"])
# app.include_router(investments.router, prefix="/investments", tags=["Investments"])


Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Welcome to the Investment Dashboard API"}