from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import init_db, get_db
from data.cruds.cd_campanyes import get_campanya, get_all_campanyes, create_campanya, update_campanya, delete_campanya
from data.schemas.sch_campanyes import Campanya, CampanyaCreate

router = APIRouter(tags=["Campanya"])

@router.get("/", response_model=List[Campanya])
async def read_all_campanyes(db: AsyncSession = Depends(get_db)):
    campanyes = await get_all_campanyes(db)
    return campanyes

@router.get("/{campanya_id}", response_model=Campanya)
async def read_campanya(campanya_id: int, db: AsyncSession = Depends(get_db)):
    camp = await get_campanya(db, campanya_id)
    if not camp:
        raise HTTPException(status_code=404, detail="Campanya not found")
    return camp

@router.post("/", response_model=Campanya, status_code=status.HTTP_201_CREATED)
async def create_campanya_endpoint(campanya_in: CampanyaCreate, db: AsyncSession = Depends(get_db)):
    camp = await create_campanya(db, campanya_in)
    return camp

@router.put("/{campanya_id}", response_model=Campanya)
async def update_campanya_endpoint(campanya_id: int, campanya_in: CampanyaCreate, db: AsyncSession = Depends(get_db)):
    updated_camp = await update_campanya(db, campanya_id, campanya_in.dict(exclude_unset=True))
    if not updated_camp:
        raise HTTPException(status_code=404, detail="Campanya not found")
    return updated_camp

@router.delete("/{campanya_id}", response_model=dict)
async def delete_campanya_endpoint(campanya_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_campanya(db, campanya_id)
    if not success:
        raise HTTPException(status_code=404, detail="Campanya not found")
    return {"detail": "Campanya deleted successfully"}
