from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import FundOverlap, MutualFund

router = APIRouter()


# Get All Mutual Fund Overlaps
@router.get("/overlaps")
def get_fund_overlaps(db: Session = Depends(get_db)):
    overlaps = db.query(FundOverlap).all()

    if not overlaps:
        return {"message": "No overlap data available"}

    # Format response for frontend visualization
    overlap_data = [
        {
            "fund_1": db.query(MutualFund).filter(MutualFund.id == overlap.fund_1_id).first().name,
            "fund_2": db.query(MutualFund).filter(MutualFund.id == overlap.fund_2_id).first().name,
            "overlap_percentage": float(overlap.overlap_percentage),
        }
        for overlap in overlaps
    ]

    return {"overlaps": overlap_data}
