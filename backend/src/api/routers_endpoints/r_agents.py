"""
Router para gestión de agentes
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from data.database import get_db
from data.schemas.sch_agents import AgentCreate, AgentUpdate
from data.cruds.cd_agents import (
    get_all_agents as crud_get_all_agents,
    get_agent as crud_get_agent,
    create_agent as crud_create_agent,
    update_agent as crud_update_agent,
    delete_agent as crud_delete_agent
)
from data.schemas.sch_agents import Agent as AgentResponseSchema

router = APIRouter(
    prefix="/agents", # Es una buena práctica definir el prefijo aquí
    tags=["Agents"]   # Y agrupar los endpoints en la documentación de Swagger
)

@router.get("/", response_model=List[AgentResponseSchema])
async def get_all_agents(
    db: AsyncSession = Depends(get_db), 
    skip: int = 0, 
    limit: int = Query(default=50, ge=1, le=100) # Límite por defecto 50, mínimo 1, máximo 100
):
    """
    Obtiene una lista paginada de agentes.
    """
    agents = await crud_get_all_agents(db, skip=skip, limit=limit)
    return agents

@router.get("/{id_agent}", response_model=AgentResponseSchema)
async def get_agent(id_agent: int, db: AsyncSession = Depends(get_db)):
    """
    Obtiene un agente por su ID.
    """
    agent = await crud_get_agent(db, id_agent)
    if not agent:
        raise HTTPException(status_code=404, detail="Agente no encontrado")
    return agent

@router.post("/", response_model=AgentResponseSchema, status_code=201)
async def create_agent(agent_data: AgentCreate, db: AsyncSession = Depends(get_db)):
    """
    Crea un nuevo agente.
    """
    new_agent = await crud_create_agent(db, agent_data)
    return new_agent

@router.put("/{id_agent}", response_model=AgentResponseSchema)
async def update_agent(id_agent: int, agent_data: AgentUpdate, db: AsyncSession = Depends(get_db)):
    """
    Actualiza la información de un agente existente.
    """
    update_data = agent_data.dict(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No se proporcionaron datos para actualizar")
    
    agent = await crud_update_agent(db, id_agent, update_data)
    if not agent:
        raise HTTPException(status_code=404, detail="Agente no encontrado")
    return agent

@router.delete("/{id_agent}", status_code=204)
async def delete_agent(id_agent: int, db: AsyncSession = Depends(get_db)):
    """
    Elimina un agente por su ID.
    """
    success = await crud_delete_agent(db, id_agent)
    if not success:
        raise HTTPException(status_code=404, detail="Agente no encontrado")
    return {"detail": "Agente eliminado correctamente"} 