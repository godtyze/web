from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import cfg.db

SQLALCHEMY_DATABASE_URL = 'postgresql://' + cfg.db.user + ':' + cfg.db.password + '@localhost:5432/' + cfg.db.db_name

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
