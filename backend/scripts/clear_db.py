from app import models
from app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

if __name__ == '__main__':
    db = SessionLocal()
    db.execute("delete from cpu;delete from ram;delete from log;")
    db.commit()
    db.close()
