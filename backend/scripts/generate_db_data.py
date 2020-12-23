from app import crud, models, schemas
from datetime import datetime, timedelta
import uuid
from app.database import SessionLocal, engine
import random

models.Base.metadata.create_all(bind=engine)

if __name__ == '__main__':
    db = SessionLocal()
    current_datetime = datetime.utcnow()
    for i in range(0, 50):
        usage = round(random.random() * 100)
        data = models.CpuModel(id=str(uuid.uuid4()), usage=usage, timestamp=current_datetime)
        db.add(data)
        db.commit()
        crud.create_log(db, schemas.LogCreate(
            text='Created cpu data with usage ' + str(usage),
            timestamp=current_datetime))
        current_datetime -= timedelta(minutes=1)
        usage = round(random.random() * 100)
        data = models.RamModel(id=str(uuid.uuid4()), usage=usage, timestamp=current_datetime)
        db.add(data)
        db.commit()
        crud.create_log(db, schemas.LogCreate(
            text='Created ram data with usage ' + str(usage),
            timestamp=current_datetime))
        current_datetime -= timedelta(minutes=1)
    db.close()
