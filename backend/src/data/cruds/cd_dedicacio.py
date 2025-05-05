from sqlalchemy.orm import Session
from data.models.dedicacio import Dedicacio
from data.schemas.sch_dedicacio import DedicacioCreate


def get_dedicacio(db: Session, dedicacio_id: int):
    return db.query(Dedicacio).filter(Dedicacio.id_dedicacio == dedicacio_id).first()


def get_dedicacions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Dedicacio).offset(skip).limit(limit).all()


def get_dedicacions_by_agent(db: Session, agent_id: int, skip: int = 0, limit: int = 100):
    return db.query(Dedicacio).filter(Dedicacio.id_agent == agent_id).offset(skip).limit(limit).all()


def create_dedicacio(db: Session, dedicacio: DedicacioCreate):
    db_obj = Dedicacio(**dedicacio.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def update_dedicacio(db: Session, dedicacio_id: int, dedicacio: DedicacioCreate):
    db_obj = get_dedicacio(db, dedicacio_id)
    if not db_obj:
        return None
    for key, value in dedicacio.dict().items():
        setattr(db_obj, key, value)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def delete_dedicacio(db: Session, dedicacio_id: int):
    db_obj = get_dedicacio(db, dedicacio_id)
    if not db_obj:
        return None
    db.delete(db_obj)
    db.commit()
    return db_obj