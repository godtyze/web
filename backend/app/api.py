import logging
import random
from typing import List

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import SessionLocal, engine
import uuid

logger = logging.getLogger(__name__)
app = FastAPI(
    title="webdev server"
)
models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:5000",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


cpu_model = {
    'id': str(uuid.uuid4()),
    'usage': random.uniform(1, 100).real,
    'timestamp': '2020-12-17T12:00:00.000Z'
}


@app.post(
    "/cpu",
    response_model=schemas.Cpu,
    description="create cpu data"
)
def create_cpu_data(data: schemas.CpuCreate, db: Session = Depends(get_db)):
    return crud.create_cpu(db=db, data=data)


@app.get("/cpu", response_model=List[schemas.Cpu])
def read_cpu_page(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cpu_page = crud.get_cpu_data_page(db, skip=skip, limit=limit)
    return cpu_page


@app.post(
    "/ram",
    response_model=schemas.Ram,
    description="create ram data"
)
def create_ram_data(data: schemas.RamCreate, db: Session = Depends(get_db)):
    return crud.create_ram(db=db, data=data)


@app.get("/ram", response_model=List[schemas.Ram])
def read_ram_page(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ram_page = crud.get_ram_data_page(db, skip=skip, limit=limit)
    return ram_page


@app.get("/log", response_model=List[schemas.Log])
def read_log_page(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    log_page = crud.get_log_data_page(db, skip=skip, limit=limit)
    return log_page
