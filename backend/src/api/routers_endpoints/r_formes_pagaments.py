from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from data.database import get_db
from data.cruds.cd_formes_pagament import (
    get_all_formes_pagament,
    get_forma_pagament,
    create_forma_pagament,
    update_forma_pagament,
    delete_forma_pagament
)
from data.schemas.sch_formes_pagament import FormesPagament, FormesPagamentCreate

router = APIRouter(tags=["Formes de Pagament"])

@router.get("/", response_model=List[FormesPagament])
async def read_all_formes_pagament(db: AsyncSession = Depends(get_db)):
    return await get_all_formes_pagament(db)

@router.get("/{forma_id}", response_model=FormesPagament)
async def read_forma_pagament(forma_id: int, db: AsyncSession = Depends(get_db)):
    forma = await get_forma_pagament(db, forma_id)
    if not forma:
        raise HTTPException(status_code=404, detail="Forma de pagament not found")
    return forma

@router.post("/", response_model=FormesPagament, status_code=status.HTTP_201_CREATED)
async def create_forma_pagament_endpoint(forma_in: FormesPagamentCreate, db: AsyncSession = Depends(get_db)):
    return await create_forma_pagament(db, forma_in)

@router.put("/{forma_id}", response_model=FormesPagament)
async def update_forma_pagament_endpoint(forma_id: int, forma_in: FormesPagamentCreate, db: AsyncSession = Depends(get_db)):
    updated = await update_forma_pagament(db, forma_id, forma_in.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Forma de pagament not found")
    return updated

@router.delete("/{forma_id}", response_model=dict)
async def delete_forma_pagament_endpoint(forma_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_forma_pagament(db, forma_id)
    if not success:
        raise HTTPException(status_code=404, detail="Forma de pagament not found")
    return {"detail": "Forma de pagament deleted successfully"}
