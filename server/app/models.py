from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL, Date
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Relationship (One-to-Many) - One user can have multiple investments
    investments = relationship("Investment", back_populates="user")


# Mutual Funds Table (Holds Mutual Fund Data)
class MutualFund(Base):
    __tablename__ = "mutual_funds"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    isin = Column(String, unique=True, nullable=False)
    nav_at_investment = Column(DECIMAL(10, 2), nullable=False)

    # Relationship
    investments = relationship("Investment", back_populates="mutual_fund")


# Investments Table (Tracks User Investments)
class Investment(Base):
    __tablename__ = "investments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    mutual_fund_id = Column(Integer, ForeignKey("mutual_funds.id"), nullable=False)
    investment_date = Column(Date, nullable=False)
    amount_invested = Column(DECIMAL(15, 2), nullable=False)
    returns_percentage = Column(DECIMAL(5, 2), nullable=False)

    # Relationship
    user = relationship("User", back_populates="investments")
    mutual_fund = relationship("MutualFund", back_populates="investments")


#  Sectors Table (Stores Fund Sector Allocation Data)
class Sector(Base):
    __tablename__ = "sectors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)


# Fund Allocations Table (Sector-Based Fund Allocation)
class FundAllocation(Base):
    __tablename__ = "fund_allocations"

    id = Column(Integer, primary_key=True, index=True)
    mutual_fund_id = Column(Integer, ForeignKey("mutual_funds.id"), nullable=False)
    sector_id = Column(Integer, ForeignKey("sectors.id"), nullable=False)
    allocation_percentage = Column(DECIMAL(5, 2), nullable=False)


# Stocks Table (Holds Individual Stock Data)
class Stock(Base):
    __tablename__ = "stocks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)


# Fund-Stock Allocation Table (Tracks Fund Stock Allocations)
class FundStockAllocation(Base):
    __tablename__ = "fund_stock_allocation"

    id = Column(Integer, primary_key=True, index=True)
    mutual_fund_id = Column(Integer, ForeignKey("mutual_funds.id"), nullable=False)
    stock_id = Column(Integer, ForeignKey("stocks.id"), nullable=False)
    allocation_percentage = Column(DECIMAL(5, 2), nullable=False)


# Fund Overlap Table (Tracks Overlap Percentage Between Funds)
class FundOverlap(Base):
    __tablename__ = "fund_overlap"

    id = Column(Integer, primary_key=True, index=True)
    fund_1_id = Column(Integer, ForeignKey("mutual_funds.id"), nullable=False)
    fund_2_id = Column(Integer, ForeignKey("mutual_funds.id"), nullable=False)
    overlap_percentage = Column(DECIMAL(5, 2), nullable=False)