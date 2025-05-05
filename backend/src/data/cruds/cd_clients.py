from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.clients import Client
from data.schemas.sch_clients import ClientCreate

async def get_client(db: AsyncSession, client_id: int) -> Client:
    result = await db.execute(select(Client).filter(Client.id_client == client_id))
    return result.scalars().first()

async def create_client(db: AsyncSession, client_in: ClientCreate) -> Client:
    new_client = Client(**client_in.dict())
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

# Función para obtener todos los clientes sin aplicar ningún filtro
async def get_all_clients(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
) -> List[Client]:
    query = select(Client).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()
