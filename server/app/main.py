from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import investments
from app.routes import fund_allocations
from app.routes import overlap_analysis
from app.routes import performance_metrics

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
app.include_router(fund_allocations.router, prefix="/fund-allocations", tags=["Fund Allocations"])
app.include_router(overlap_analysis.router, prefix="/overlap-analysis", tags=["Overlap Analysis"])
app.include_router(performance_metrics.router, prefix="/performance-metrics", tags=["Performance Metrics"])

print("Creating tables in the database...")
Base.metadata.create_all(bind=engine)
print("Tables should be created now.")

@app.get("/")
def root():
    return {"message": "Welcome to the Investment Dashboard API"}