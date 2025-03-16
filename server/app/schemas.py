from pydantic import BaseModel
from datetime import date



class InvestmentBase(BaseModel):
    mutual_fund_id: int
    investment_date: date
    amount_invested: float
    nav_at_investment: float
    returns_percentage: float

class InvestmentCreate(InvestmentBase):
    pass

class InvestmentResponse(InvestmentBase):
    id: int

    class Config:
        orm_mode = True
        
        
class InvestmentOverviewResponse(BaseModel):
    id: int
    mutual_fund_name: str
    investment_date: date
    amount_invested: float
    isin: str
    nav_at_investment: float
    returns_percentage: float

    class Config:
        orm_mode = True