from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Investment, MutualFund
from app.schemas import InvestmentCreate, InvestmentResponse,InvestmentOverviewResponse

router = APIRouter()

# Add a new investment
@router.post("/", response_model=InvestmentResponse)
def add_investment(investment: InvestmentCreate, db: Session = Depends(get_db)):
    # Check if mutual fund exists
    fund = db.query(MutualFund).filter(MutualFund.id == investment.mutual_fund_id).first()
    if not fund:
        raise HTTPException(status_code=400, detail="Mutual fund not found")

    new_investment = Investment(**investment.model_dump())
    db.add(new_investment)
    db.commit()
    db.refresh(new_investment)
    return new_investment

@router.get("/", response_model=list[InvestmentOverviewResponse])
def get_all_investments(db: Session = Depends(get_db)):
    investments = (
        db.query(
            Investment.id,
            MutualFund.name.label("mutual_fund_name"),
            Investment.investment_date,
            Investment.amount_invested,
            MutualFund.isin,
            Investment.nav_at_investment,
            Investment.returns_percentage
        )
        .join(MutualFund, Investment.mutual_fund_id == MutualFund.id)
        .all()
    )

    return [
        {
            "id": inv.id,
            "mutual_fund_name": inv.mutual_fund_name,
            "investment_date": inv.investment_date,
            "amount_invested": inv.amount_invested,
            "isin": inv.isin,
            "nav_at_investment": inv.nav_at_investment,
            "returns_percentage": inv.returns_percentage
        }
        for inv in investments
    ]

# Get a specific investment by ID
@router.get("/{investment_id}", response_model=InvestmentResponse)
def get_investment(investment_id: int, db: Session = Depends(get_db)):
    investment = db.query(Investment).filter(Investment.id == investment_id).first()
    if not investment:
        raise HTTPException(status_code=404, detail="Investment not found")
    return investment
