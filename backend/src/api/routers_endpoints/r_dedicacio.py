from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from data.database import SessionLocal
from data.schemas.sch_dedicacio import Dedicacio, DedicacioCreate
from data.cruds.cd_dedicacio import (
    get_dedicacions, get_dedicacio,
    get_dedicacions_by_agent, create_dedicacio,
    update_dedicacio, delete_dedicacio
)

router = APIRouter(
    tags=["Dedicacions"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[Dedicacio])
def read_dedicacions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_dedicacions(db, skip=skip, limit=limit)

@router.get("/{dedicacio_id}", response_model=Dedicacio)
def read_dedicacio(dedicacio_id: int, db: Session = Depends(get_db)):
    db_obj = get_dedicacio(db, dedicacio_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Dedicacio not found")
    return db_obj

@router.get("/agent/{agent_id}", response_model=List[Dedicacio])
def read_dedicacions_by_agent(agent_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_dedicacions_by_agent(db, agent_id, skip, limit)

@router.post("/", response_model=Dedicacio)
def create_dedicacio_endpoint(d: DedicacioCreate, db: Session = Depends(get_db)):
    return create_dedicacio(db, d)

@router.put("/{dedicacio_id}", response_model=Dedicacio)
def update_dedicacio_endpoint(dedicacio_id: int, d: DedicacioCreate, db: Session = Depends(get_db)):
    db_obj = update_dedicacio(db, dedicacio_id, d)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Dedicacio not found")
    return db_obj

@router.delete("/{dedicacio_id}", response_model=Dedicacio)
def delete_dedicacio_endpoint(dedicacio_id: int, db: Session = Depends(get_db)):
    db_obj = delete_dedicacio(db, dedicacio_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Dedicacio not found")
    return db_obj