from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True

class InvestmentCreate(BaseModel):
    scheme_name: str
    invested_amount: float
    returns_percentage: float
