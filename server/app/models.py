from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL, Date
from sqlalchemy.orm import relationship
from app.database import Base

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, nullable=False)
#     email = Column(String, unique=True, nullable=False)
#     hashed_password = Column(String, nullable=False)

#     # Relationship (One-to-Many) - One user can have multiple investments
#     investments = relationship("Investment", back_populates="user")


# Mutual Funds Table (Holds Mutual Fund Data)
class MutualFund(Base):
    __tablename__ = "mutual_funds"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    isin = Column(String, unique=True, nullable=False)

    # Relationship with Investments
    investments = relationship("Investment", back_populates="mutual_fund")
    sector_allocations = relationship("SectorAllocation", back_populates="mutual_fund")
    stock_allocations = relationship("StockAllocation", back_populates="mutual_fund")
    market_cap_allocations = relationship("MarketCapAllocation", back_populates="mutual_fund")


# Investments Table (Tracks User Investments)
class Investment(Base):
    __tablename__ = "investments"

    id = Column(Integer, primary_key=True, index=True)
    mutual_fund_id = Column(Integer, ForeignKey("mutual_funds.id"), nullable=False)
    investment_date = Column(Date, nullable=False)
    amount_invested = Column(DECIMAL(15,2), nullable=False)
    nav_at_investment = Column(DECIMAL(10,2), nullable=False)
    returns_percentage = Column(DECIMAL(5,2), nullable=False)

    # Relationship
    mutual_fund = relationship("MutualFund", back_populates="investments")

    

#  Sector Allocation Table
class SectorAllocation(Base):
    __tablename__ = "sector_allocations"

    id = Column(Integer, primary_key=True, index=True)
    mutual_fund_id = Column(Integer, ForeignKey("mutual_funds.id"), nullable=False)
    sector_name = Column(String, nullable=False)
    allocation_percentage = Column(DECIMAL(5,2), nullable=False)

    mutual_fund = relationship("MutualFund", back_populates="sector_allocations")


#  Stock Allocation Table
class StockAllocation(Base):
    __tablename__ = "stock_allocations"

    id = Column(Integer, primary_key=True, index=True)
    mutual_fund_id = Column(Integer, ForeignKey("mutual_funds.id"), nullable=False)
    stock_name = Column(String, nullable=False)
    allocation_percentage = Column(DECIMAL(5,2), nullable=False)

    mutual_fund = relationship("MutualFund", back_populates="stock_allocations")


#  Market Cap Allocation Table
class MarketCapAllocation(Base):
    __tablename__ = "market_cap_allocations"

    id = Column(Integer, primary_key=True, index=True)
    mutual_fund_id = Column(Integer, ForeignKey("mutual_funds.id"), nullable=False)
    category = Column(String, nullable=False)  # Large Cap, Mid Cap, Small Cap
    allocation_percentage = Column(DECIMAL(5,2), nullable=False)

    mutual_fund = relationship("MutualFund", back_populates="market_cap_allocations")