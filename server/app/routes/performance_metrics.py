from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Investment, InvestmentPerformance
from datetime import date
# import numpy as np

router = APIRouter()


#  Function to Calculate IRR (Approximate)
def calculate_irr(investment_date, amount_invested, current_value):
    years = (date.today() - investment_date).days / 365.0
    
    # Convert Decimal to Float
    amount_invested = float(amount_invested)
    current_value = float(current_value)

    # Prevent division by zero (in case years = 0)
    if years <= 0:
        return 0.0  

    irr = ((current_value / amount_invested) ** (1 / years)) - 1
    return round(irr * 100, 2)  # Convert to percentage


#  Get Investment Performance (Overall IRR)
@router.get("/performance-summary")
def get_performance_summary(db: Session = Depends(get_db)):
    investments = db.query(Investment).all()

    if not investments:
        return {"message": "No investment data available"}

    total_investment = 0
    total_current_value = 0
    investment_details = []

    for investment in investments:
        # Get latest investment value from InvestmentPerformance
        latest_performance = (
            db.query(InvestmentPerformance)
            .filter(InvestmentPerformance.mutual_fund_id == investment.mutual_fund_id)
            .order_by(InvestmentPerformance.date.desc())
            .first()
        )

        if latest_performance:
            current_value = latest_performance.investment_value
        else:
            current_value = investment.amount_invested  # Default to invested amount

        irr = calculate_irr(investment.investment_date, investment.amount_invested, current_value)

        investment_details.append({
            "fund_name": investment.mutual_fund.name,
            "amount_invested": float(investment.amount_invested),
            "current_value": float(current_value),
            "irr_percentage": irr,
        })

        total_investment += investment.amount_invested
        total_current_value += current_value

    overall_irr = calculate_irr(min([inv.investment_date for inv in investments]), total_investment, total_current_value)

    return {
        "total_investment": float(total_investment),
        "total_current_value": float(total_current_value),
        "overall_irr": overall_irr,
        "investment_breakdown": investment_details
    }
