from sqlalchemy import Column, String, Float, DateTime
from app.database import Base

# связывание моделей в коде с таблицами в БД.
class CpuModel(Base):
    __tablename__ = "cpu"
    id = Column(String, primary_key=True)
    usage = Column(Float)
    timestamp = Column(DateTime)


class RamModel(Base):
    __tablename__ = "ram"
    id = Column(String, primary_key=True)
    usage = Column(Float)
    timestamp = Column(DateTime)


class LogModel(Base):
    __tablename__ = "log"
    id = Column(String, primary_key=True)
    text = Column(String)
    timestamp = Column(DateTime)
