from sqlalchemy.orm import Session
import uuid
from datetime import datetime
from . import models, schemas


def get_cpu_data_page(db: Session, skip: int = 0, limit: int = 50):
    return db.query(models.CpuModel).order_by(models.CpuModel.timestamp.desc()).offset(skip).limit(limit).all()


def create_cpu(db: Session, data: schemas.CpuCreate):
    current_datetime = datetime.utcnow()
    db_cpu = models.CpuModel(id=str(uuid.uuid4()), usage=data.usage, timestamp=current_datetime)
    db.add(db_cpu)
    db.commit()
    db.refresh(db_cpu)
    create_log(db, schemas.LogCreate(
        text='Created cpu data with usage ' + str(data.usage),
        timestamp=current_datetime))
    return db_cpu


def get_ram_data_page(db: Session, skip: int = 0, limit: int = 50):
    return db.query(models.RamModel).order_by(models.RamModel.timestamp.desc()).offset(skip).limit(limit).all()


def create_ram(db: Session, data: schemas.RamBase):
    current_datetime = datetime.utcnow()
    db_ram = models.RamModel(id=str(uuid.uuid4()), usage=data.usage, timestamp=current_datetime)
    db.add(db_ram)
    db.commit()
    db.refresh(db_ram)
    create_log(db, schemas.LogCreate(
        text='Created ram data with usage ' + str(data.usage),
        timestamp=current_datetime))
    return db_ram


def get_log_data_page(db: Session, skip: int = 0, limit: int = 1000):
    return db.query(models.LogModel).order_by(models.LogModel.timestamp.desc()).offset(skip).limit(limit).all()


def create_log(db: Session, data: schemas.LogCreate):
    db_log = models.LogModel(id=str(uuid.uuid4()), text=data.text, timestamp=data.timestamp)
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log
