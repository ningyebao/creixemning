"""
Router para gestión de agentes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from data.database import get_db
from data.models.agents import Agent
from data.schemas.sch_agents import AgentSchema, AgentCreate, AgentUpdate

router = APIRouter()

@router.get("/", response_model=List[AgentSchema])
async def get_all_agents(db: Session = Depends(get_db)):
    """Obtener todos los agentes"""
    agents = db.query(Agent).all()
    return agents

@router.get("/{agent_id}", response_model=AgentSchema)
async def get_agent(agent_id: int, db: Session = Depends(get_db)):
    """Obtener un agente por ID"""
    agent = db.query(Agent).filter(Agent.id_agent == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agente no encontrado")
    return agent

@router.post("/", response_model=AgentSchema)
async def create_agent(agent_data: AgentCreate, db: Session = Depends(get_db)):
    """Crear un nuevo agente"""
    new_agent = Agent(**agent_data.dict())
    db.add(new_agent)
    db.commit()
    db.refresh(new_agent)
    return new_agent

@router.put("/{agent_id}", response_model=AgentSchema)
async def update_agent(agent_id: int, agent_data: AgentUpdate, db: Session = Depends(get_db)):
    """Actualizar un agente existente"""
    agent = db.query(Agent).filter(Agent.id_agent == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agente no encontrado")
    
    for key, value in agent_data.dict(exclude_unset=True).items():
        setattr(agent, key, value)
    
    db.commit()
    db.refresh(agent)
    return agent

@router.delete("/{agent_id}")
async def delete_agent(agent_id: int, db: Session = Depends(get_db)):
    """Eliminar un agente"""
    agent = db.query(Agent).filter(Agent.id_agent == agent_id).first()
    if not agent:
        raise HTTPException(status_code=404, detail="Agente no encontrado")
    
    db.delete(agent)
    db.commit()
    return {"detail": "Agente eliminado correctamente"}