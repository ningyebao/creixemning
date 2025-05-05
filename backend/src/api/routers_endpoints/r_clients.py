from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import get_db
from data.cruds.cd_clients import (
    get_client, create_client, update_client, delete_client, get_all_clients
)
from data.schemas.sch_clients import Client, ClientCreate

router = APIRouter(tags=["Clients"])

@router.get("/", response_model=List[Client])
async def read_all_clients(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
):
    clients = await get_all_clients(db, skip=skip, limit=limit)
    return clients

@router.get("/{client_id}", response_model=Client)
async def read_client(client_id: int, db: AsyncSession = Depends(get_db)):
    client = await get_client(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@router.post("/", response_model=Client, status_code=status.HTTP_201_CREATED)
async def create_client_endpoint(client_in: ClientCreate, db: AsyncSession = Depends(get_db)):
    client = await create_client(db, client_in)
    return client

@router.put("/{client_id}", response_model=Client)
async def update_client_endpoint(client_id: int, client_in: ClientCreate, db: AsyncSession = Depends(get_db)):
    updated_client = await update_client(db, client_id, client_in.dict(exclude_unset=True))
    if not updated_client:
        raise HTTPException(status_code=404, detail="Client not found")
    return updated_client

@router.delete("/{client_id}", response_model=dict)
async def delete_client_endpoint(client_id: int, db: AsyncSession = Depends(get_db)):
    success = await delete_client(db, client_id)
    if not success:
        raise HTTPException(status_code=404, detail="Client not found")
    return {"detail": "Client deleted successfully"}
