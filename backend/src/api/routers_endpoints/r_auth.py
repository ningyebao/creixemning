from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from data.database import get_db
from data.cruds.cd_agents import get_agent_by_nom_agent

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login")
async def login(data: dict, db: AsyncSession = Depends(get_db)):
    nom_agent = data.get("nom_agent")
    contrasenya = data.get("contrasenya_agent")

    if not nom_agent or not contrasenya:
        raise HTTPException(status_code=400, detail="Credenciales incompletas")

    agent = await get_agent_by_nom_agent(db, nom_agent)
    if agent is None or agent.contrasenya_agent != contrasenya:
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")

    return {"message": "Login correcto", "nom_agent": agent.nom_agent, "id_agent": agent.id_agent}