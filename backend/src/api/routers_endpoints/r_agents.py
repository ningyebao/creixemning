"""
Router para gestión de agentes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession  # Changed from sqlalchemy.orm import Session
from typing import List

from data.database import get_db
from data.models.agents import Agent
from data.schemas.sch_agents import AgentSchema, AgentCreate, AgentUpdate
from data.cruds.cd_agents import get_all_agents as crud_get_all_agents  # Import CRUD function
from data.cruds.cd_agents import get_agent as crud_get_agent  # Import CRUD function
from data.cruds.cd_agents import create_agent as crud_create_agent
from data.cruds.cd_agents import update_agent as crud_update_agent
from data.cruds.cd_agents import delete_agent as crud_delete_agent

router = APIRouter()

@router.get("/", response_model=List[AgentSchema])
async def get_all_agents(db: AsyncSession = Depends(get_db)):
    """Obtener todos los agentes"""
    agents = await crud_get_all_agents(db)  # Use the CRUD function
    return agents

@router.get("/{agent_id}", response_model=AgentSchema)
async def get_agent(agent_id: int, db: AsyncSession = Depends(get_db)):
    """Obtener un agente por ID"""
    agent = await crud_get_agent(db, agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agente no encontrado")
    return agent

@router.post("/", response_model=AgentSchema)
async def create_agent(agent_data: AgentCreate, db: AsyncSession = Depends(get_db)):
    """Crear un nuevo agente"""
    new_agent = await crud_create_agent(db, agent_data)
    return new_agent

@router.put("/{agent_id}", response_model=AgentSchema)
async def update_agent(agent_id: int, agent_data: AgentUpdate, db: AsyncSession = Depends(get_db)):
    """Actualizar un agente existente"""
    agent = await crud_update_agent(db, agent_id, agent_data.dict(exclude_unset=True))
    if not agent:
        raise HTTPException(status_code=404, detail="Agente no encontrado")
    return agent

@router.delete("/{agent_id}")
async def delete_agent(agent_id: int, db: AsyncSession = Depends(get_db)):
    """Eliminar un agente"""
    success = await crud_delete_agent(db, agent_id)
    if not success:
        raise HTTPException(status_code=404, detail="Agente no encontrado")
    return {"detail": "Agente eliminado correctamente"}