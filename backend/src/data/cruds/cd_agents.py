from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.agents import Agent
from data.schemas.sch_agents import AgentCreate, Agent as AgentSchema

async def get_agent(db: AsyncSession, agent_id: int) -> Agent:
    result = await db.execute(select(Agent).filter(Agent.id_agent == agent_id))
    return result.scalars().first()

async def get_all_agents(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100
) -> Agent:
    query = select(Agent).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

async def create_agent(db: AsyncSession, agent_in: AgentCreate) -> Agent:
    new_agent = Agent(**agent_in.dict())
    db.add(new_agent)
    await db.commit()
    await db.refresh(new_agent)
    return new_agent

async def update_agent(db: AsyncSession, agent_id: int, update_data: dict) -> Agent:
    result = await db.execute(select(Agent).filter(Agent.id_agent == agent_id))
    agent = result.scalars().first()
    if agent:
        for key, value in update_data.items():
            setattr(agent, key, value)
        await db.commit()
        await db.refresh(agent)
    return agent

async def delete_agent(db: AsyncSession, agent_id: int) -> bool:
    result = await db.execute(select(Agent).filter(Agent.id_agent == agent_id))
    agent = result.scalars().first()
    if agent:
        await db.delete(agent)
        await db.commit()
        return True
    return False

