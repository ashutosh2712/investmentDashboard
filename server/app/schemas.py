from pydantic import BaseModel
from datetime import date
from typing import List


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
        
#  Sector Allocation Schema
class SectorAllocationResponse(BaseModel):
    sector_name: str
    allocation_percentage: float

    class Config:
        orm_mode = True


#  Stock Allocation Schema
class StockAllocationResponse(BaseModel):
    stock_name: str
    allocation_percentage: float

    class Config:
        orm_mode = True


#  Market Cap Allocation Schema
class MarketCapAllocationResponse(BaseModel):
    category: str
    allocation_percentage: float

    class Config:
        orm_mode = True


# Mutual Fund Allocation Response Schema
class MutualFundAllocationResponse(BaseModel):
    mutual_fund_name: str
    sector_allocations: List[SectorAllocationResponse]
    stock_allocations: List[StockAllocationResponse]
    market_cap_allocations: List[MarketCapAllocationResponse]

    class Config:
        orm_mode = True
