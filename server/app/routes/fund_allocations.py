from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import MutualFund, SectorAllocation, StockAllocation, MarketCapAllocation
from sqlalchemy.sql import func

router = APIRouter()


@router.get("/sectors")
def get_all_sectors(db: Session = Depends(get_db)):
    sectors = (
        db.query(
            SectorAllocation.sector_name,
            func.sum(SectorAllocation.allocation_percentage).label("total_percentage"),
        )
        .group_by(SectorAllocation.sector_name)
        .all()
    )

    if not sectors:
        return {"message": "No sector data available"}

    # Format the response
    sector_data = [
        {
            "sector_name": sector.sector_name,
            "allocation_percentage": float(sector.total_percentage),
        }
        for sector in sectors
    ]

    return {"sectors": sector_data}

@router.get("/sector/{sector_name}")
def get_mutual_funds_by_sector(sector_name: str, db: Session = Depends(get_db)):
    sector_allocations = (
        db.query(SectorAllocation)
        .filter(SectorAllocation.sector_name == sector_name)
        .all()
    )

    if not sector_allocations:
        raise HTTPException(status_code=404, detail="Sector not found or has no allocations")

    # Extract mutual fund details for the selected sector
    mutual_funds = [
        {
            "mutual_fund_name": allocation.mutual_fund.name,
            "amount_invested": allocation.allocation_percentage,  # Assuming allocation_percentage represents amount
        }
        for allocation in sector_allocations
    ]

    return {"sector": sector_name, "mutual_funds": mutual_funds}