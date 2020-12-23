from pydantic import BaseModel
from datetime import datetime


class CpuBase(BaseModel):
    usage: float

    class Config:
        orm_mode = True


class CpuCreate(CpuBase):
    pass


class Cpu(CpuBase):
    id: str
    timestamp: datetime


class RamBase(BaseModel):
    usage: float

    class Config:
        orm_mode = True


class RamCreate(RamBase):
    pass


class Ram(RamBase):
    id: str
    timestamp: datetime


class LogBase(BaseModel):
    text: str

    class Config:
        orm_mode = True


class LogCreate(LogBase):
    timestamp: datetime
    pass


class Log(LogBase):
    id: str
    timestamp: datetime
