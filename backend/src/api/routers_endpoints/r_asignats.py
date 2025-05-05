from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import get_db
from data.cruds.cd_asignats import get_all_asignats, get_asignat, create_asignat, delete_asignat
from data.schemas.sch_asignats import Asignat, AsignatCreate

router = APIRouter(tags=["Asignat"])

@router.get("/", response_model=List[Asignat])
async def read_all_asignats(db: AsyncSession = Depends(get_db)):
    return await get_all_asignats(db)

@router.get("/{id_campanya}/{id_agent}", response_model=Asignat)
async def read_asignat(id_campanya: int, id_agent: int, db: AsyncSession = Depends(get_db)):
    asignat = await get_asignat(db, id_campanya, id_agent)
    if not asignat:
        raise HTTPException(status_code=404, detail="Asignat not found")
    return asignat

@router.post("/", response_model=Asignat, status_code=status.HTTP_201_CREATED)
async def create_asignat_endpoint(asignat_in: AsignatCreate, db: AsyncSession = Depends(get_db)):
    asignat = await create_asignat(db, asignat_in)
    return asignat

@router.delete("/{id_campanya}/{id_agent}", response_model=dict)
async def delete_asignat_endpoint(id_campanya: int, id_agent: int, db: AsyncSession = Depends(get_db)):
    success = await delete_asignat(db, id_campanya, id_agent)
    if not success:
        raise HTTPException(status_code=404, detail="Asignat not found")
    return {"detail": "Asignat deleted successfully"}
