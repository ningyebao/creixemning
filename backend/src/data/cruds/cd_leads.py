from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_, and_, func
from datetime import datetime
from typing import Dict, List, Any, Optional, Union
from sqlalchemy.orm import joinedload

from data.models.leads import Lead
from data.schemas.sch_leads import LeadCreate

async def get_all_leads(
    db: AsyncSession, 
    skip: int = 0, 
    limit: int = 100,
    filters: Dict[str, Any] = None
) -> List[Lead]:
    """
    Get all leads with optional filtering
    """
    query = select(Lead)
    
    if filters:
        conditions = []
        
        # Handle date range for data_registre_lead
        if "fecha_registro_inicio" in filters and "fecha_registro_fin" in filters:
            start_date = datetime.strptime(filters["fecha_registro_inicio"], "%Y-%m-%d")
            end_date = datetime.strptime(filters["fecha_registro_fin"], "%Y-%m-%d")
            conditions.append(and_(
                Lead.data_registre_lead >= start_date,
                Lead.data_registre_lead <= end_date
            ))
            
            # Remove these keys as they've been processed
            filters.pop("fecha_registro_inicio")
            filters.pop("fecha_registro_fin")
        
        # Process remaining filters
        for key, value in filters.items():
            if hasattr(Lead, key):
                # Handle string filters with partial matching
                if isinstance(value, str) and key not in ["cnae_lead", "NIF_lead"]:
                    conditions.append(getattr(Lead, key).ilike(f"%{value}%"))
                else:
                    conditions.append(getattr(Lead, key) == value)
        
        if conditions:
            query = query.filter(and_(*conditions))
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

async def get_lead(db: AsyncSession, lead_id: int) -> Optional[Lead]:
    """
    Get a single lead by ID
    """
    query = select(Lead).filter(Lead.id_lead == lead_id)
    result = await db.execute(query)
    return result.scalars().first()

async def create_lead(db: AsyncSession, lead_data: LeadCreate) -> Lead:
    """
    Create a new lead
    """
    # Convert any_creacio_lead from string to datetime if needed
    lead_dict = lead_data.dict()
    
    # Set creation date if not provided
    if "data_registre_lead" not in lead_dict or lead_dict["data_registre_lead"] is None:
        lead_dict["data_registre_lead"] = datetime.now()
    
    # Create new lead instance
    db_lead = Lead(**lead_dict)
    
    db.add(db_lead)
    await db.commit()
    await db.refresh(db_lead)
    return db_lead

async def update_lead(db: AsyncSession, lead_id: int, lead_data: Dict[str, Any]) -> Optional[Lead]:
    """
    Update an existing lead
    """
    query = select(Lead).filter(Lead.id_lead == lead_id)
    result = await db.execute(query)
    db_lead = result.scalars().first()
    
    if not db_lead:
        return None
    
    # Update lead attributes
    for key, value in lead_data.items():
        if hasattr(db_lead, key):
            setattr(db_lead, key, value)
    
    await db.commit()
    await db.refresh(db_lead)
    return db_lead

async def delete_lead(db: AsyncSession, lead_id: int) -> bool:
    """
    Delete a lead
    """
    query = select(Lead).filter(Lead.id_lead == lead_id)
    result = await db.execute(query)
    db_lead = result.scalars().first()
    
    if not db_lead:
        return False
    
    await db.delete(db_lead)
    await db.commit()
    return True

async def get_unassigned_leads(
    db: AsyncSession, 
    skip: int = 0, 
    limit: int = 100,
    filters: Dict[str, Any] = None
) -> List[Lead]:
    """
    Get all leads that are not assigned to any agent
    """
    # This function would need to be adapted based on how your assignment system works
    # For example, if you have a separate table for assignments:
    # query = select(Lead).outerjoin(Assignment).filter(Assignment.id == None)
    
    # For now, I'll assume there's no assignment implementation in the model
    # You'd need to modify this based on your actual data model
    query = select(Lead)
    
    # Apply the same filtering logic as get_all_leads
    if filters:
        conditions = []
        
        # Handle date range for data_registre_lead
        if "fecha_registro_inicio" in filters and "fecha_registro_fin" in filters:
            start_date = datetime.strptime(filters["fecha_registro_inicio"], "%Y-%m-%d")
            end_date = datetime.strptime(filters["fecha_registro_fin"], "%Y-%m-%d")
            conditions.append(and_(
                Lead.data_registre_lead >= start_date,
                Lead.data_registre_lead <= end_date
            ))
            
            # Remove these keys as they've been processed
            filters.pop("fecha_registro_inicio")
            filters.pop("fecha_registro_fin")
        
        # Process remaining filters
        for key, value in filters.items():
            if hasattr(Lead, key):
                # Handle string filters with partial matching
                if isinstance(value, str) and key not in ["cnae_lead", "NIF_lead"]:
                    conditions.append(getattr(Lead, key).ilike(f"%{value}%"))
                else:
                    conditions.append(getattr(Lead, key) == value)
        
        if conditions:
            query = query.filter(and_(*conditions))
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()

async def get_leads_by_agent(
    db: AsyncSession, 
    agent_id: int, 
    skip: int = 0, 
    limit: int = 100
) -> List[Lead]:
    """
    Get all leads assigned to a specific agent
    """
    # This function would need to be adapted based on how your assignment system works
    # For example, if you have an agent_id field in Lead:
    # query = select(Lead).filter(Lead.agent_id == agent_id)
    
    # Or if you have a separate table for assignments:
    # query = select(Lead).join(Assignment).filter(Assignment.agent_id == agent_id)
    
    # For now, I'll return an empty list since the assignment system isn't clear
    return []

async def search_leads(
    db: AsyncSession, 
    search_term: str, 
    skip: int = 0, 
    limit: int = 100
) -> List[Lead]:
    """
    Search leads by a general search term across multiple fields
    """
    query = select(Lead).filter(
        or_(
            Lead.nom_lead.ilike(f"%{search_term}%"),
            Lead.nom_empresarial_lead.ilike(f"%{search_term}%"),
            Lead.nom_fiscal_lead.ilike(f"%{search_term}%"),
            Lead.activitat_lead.ilike(f"%{search_term}%"),
            Lead.poblacio_lead.ilike(f"%{search_term}%"),
            Lead.provincia_lead.ilike(f"%{search_term}%"),
            Lead.comarca_lead.ilike(f"%{search_term}%"),
            Lead.NIF_lead.ilike(f"%{search_term}%"),
            Lead.email_lead.ilike(f"%{search_term}%")
        )
    ).offset(skip).limit(limit)
    
    result = await db.execute(query)
    return result.scalars().all()