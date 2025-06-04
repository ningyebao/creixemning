from typing import List
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.clients import Client
from data.schemas.sch_clients import ClientCreate

async def get_client(db: AsyncSession, client_id: int) -> Client:
    result = await db.execute(select(Client).filter(Client.id_client == client_id))
    return result.scalars().first()

async def create_client(db: AsyncSession, client_in: ClientCreate) -> Client:
    # Convert incoming data to dict, excluding unset fields
    data = client_in.dict(exclude_unset=True)
    # Handle data_creacio_client to avoid tz-aware vs tz-naive issues
    dt = data.get("data_creacio_client")
    if dt:
        # if datetime has tzinfo, strip it
        if hasattr(dt, "tzinfo") and dt.tzinfo is not None:
            data["data_creacio_client"] = dt.replace(tzinfo=None)
    else:
        # if not provided, set to current UTC naive datetime
        data["data_creacio_client"] = datetime.utcnow()
    # Create and persist new client
    new_client = Client(**data)
    db.add(new_client)
    await db.commit()
    await db.refresh(new_client)
    return new_client

async def update_client(db: AsyncSession, client_id: int, update_data: dict) -> Client:
    result = await db.execute(select(Client).filter(Client.id_client == client_id))
    client = result.scalars().first()
    if client:
        for key, value in update_data.items():
            setattr(client, key, value)
        await db.commit()
        await db.refresh(client)
    return client

async def delete_client(db: AsyncSession, client_id: int) -> bool:
    result = await db.execute(select(Client).filter(Client.id_client == client_id))
    client = result.scalars().first()
    if client:
        await db.delete(client)
        await db.commit()
        return True
    return False

async def get_all_clients(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
) -> List[Client]:
    query = select(Client).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()
