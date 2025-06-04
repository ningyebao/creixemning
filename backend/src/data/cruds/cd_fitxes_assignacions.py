from typing import List, Optional, Dict, Any
from datetime import datetime
from sqlalchemy import and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from data.models.fitxes_assignacions import FitxesAssignacions
from data.schemas.sch_fitxes_assignacions import FitxesAssignacionsCreate, FitxesAssignacions as FitxesAssignacionsSchema

async def get_fitxes_assignacions(db: AsyncSession, assignacio_id: int) -> FitxesAssignacions:
    result = await db.execute(select(FitxesAssignacions).filter(FitxesAssignacions.id_fitxes_assignacions == assignacio_id))
    return result.scalars().first()

async def create_fitxes_assignacions(db: AsyncSession, assignacio_in: FitxesAssignacionsCreate) -> FitxesAssignacions:
    # Convertir a dict excluyendo campos no enviados
    data = assignacio_in.dict(exclude_unset=True)
    # Si contiene datetimes con tzinfo, los volvemos naive
    for field, val in data.items():
        if isinstance(val, datetime) and val.tzinfo is not None:
            data[field] = val.replace(tzinfo=None)
    # Crear y persistir
    new_assignacio = FitxesAssignacions(**data)
    db.add(new_assignacio)
    await db.commit()
    await db.refresh(new_assignacio)
    return new_assignacio

async def update_fitxes_assignacions(db: AsyncSession, assignacio_id: int, update_data: dict) -> FitxesAssignacions:
    result = await db.execute(select(FitxesAssignacions).filter(FitxesAssignacions.id_fitxes_assignacions == assignacio_id))
    assignacio = result.scalars().first()
    if assignacio:
        # Si contiene datetimes con tzinfo, los volvemos naive
        for key, val in update_data.items():
            if isinstance(val, datetime) and val.tzinfo is not None:
                update_data[key] = val.replace(tzinfo=None)
            setattr(assignacio, key, val)
        await db.commit()
        await db.refresh(assignacio)
    return assignacio

async def delete_fitxes_assignacions(db: AsyncSession, assignacio_id: int) -> bool:
    result = await db.execute(select(FitxesAssignacions).filter(FitxesAssignacions.id_fitxes_assignacions == assignacio_id))
    assignacio = result.scalars().first()
    if assignacio:
        await db.delete(assignacio)
        await db.commit()
        return True
    return False

# Función para obtener todos los registros con filtros avanzados
async def get_all_fitxes_assignacions(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
    filters: Optional[Dict[str, Any]] = None
) -> List[FitxesAssignacions]:
    query = select(FitxesAssignacions)
    
    # Aplicamos los filtros si existen
    if filters:
        filter_conditions = []
        
        # Filtro por id_agents
        if "id_agents" in filters and filters["id_agents"]:
            filter_conditions.append(FitxesAssignacions.id_agents == filters["id_agents"])
            
        # Filtro por id_leads
        if "id_leads" in filters and filters["id_leads"]:
            filter_conditions.append(FitxesAssignacions.id_leads == filters["id_leads"])
            
        # Filtro por id_autor
        if "id_autor" in filters and filters["id_autor"]:
            filter_conditions.append(FitxesAssignacions.id_autor == filters["id_autor"])
            
        # Filtro por id_campanya_leads
        if "id_campanya" in filters and filters["id_campanya"]:
            filter_conditions.append(FitxesAssignacions.id_campanya == filters["id_campanya"])
            
        # Filtro por estado
        if "estat_fitxes_assignacions" in filters and filters["estat_fitxes_assignacions"]:
            filter_conditions.append(FitxesAssignacions.estat_fitxes_assignacions == filters["estat_fitxes_assignacions"])
            
        # Filtro por potencial
        if "potencial_fitxes_assignacions" in filters and filters["potencial_fitxes_assignacions"] is not None:
            filter_conditions.append(FitxesAssignacions.potencial_fitxes_assignacions == filters["potencial_fitxes_assignacions"])
            
        # Filtro por prioridad
        if "prioritat_fitxes_assignacions" in filters and filters["prioritat_fitxes_assignacions"] is not None:
            filter_conditions.append(FitxesAssignacions.prioritat_fitxes_assignacions == filters["prioritat_fitxes_assignacions"])
            
        # Filtro por rango de fechas
        if "fecha_inicio" in filters and "fecha_fin" in filters:
            try:
                fecha_inicio = datetime.strptime(filters["fecha_inicio"], "%Y-%m-%d")
                fecha_fin = datetime.strptime(filters["fecha_fin"], "%Y-%m-%d")
                filter_conditions.append(
                    FitxesAssignacions.data_creacio_fitxes_assignacions.between(fecha_inicio, fecha_fin)
                )
            except ValueError:
                # Manejo de error en caso de formato incorrecto de fecha
                pass
        
        # Aplicamos todos los filtros con AND lógico
        if filter_conditions:
            query = query.filter(and_(*filter_conditions))
    
    # Aplicamos paginación
    query = query.offset(skip).limit(limit)
    
    # Ejecutamos la consulta
    result = await db.execute(query)
    return result.scalars().all()

# Función para obtener estadísticas
async def get_assignacions_stats(db: AsyncSession, filters: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    # Obtenemos todas las asignaciones con los filtros aplicados
    assignacions = await get_all_fitxes_assignacions(db, skip=0, limit=1000, filters=filters)
    
    # Inicializamos las estadísticas
    stats = {
        "total": len(assignacions),
        "estados": {},
        "promedio_prioridad": 0,
        "promedio_potencial": 0,
    }
    
    # Si no hay datos, devolvemos las estadísticas vacías
    if not assignacions:
        return stats
    
    # Calculamos las estadísticas
    prioridad_total = 0
    potencial_total = 0
    
    # Contamos los estados
    for assignacio in assignacions:
        # Contamos por estado
        estado = assignacio.estat_fitxes_assignacions or "Sin estado"
        if estado in stats["estados"]:
            stats["estados"][estado] += 1
        else:
            stats["estados"][estado] = 1
        
        # Sumamos prioridad y potencial
        prioridad_total += assignacio.prioritat_fitxes_assignacions or 0
        potencial_total += assignacio.potencial_fitxes_assignacions or 0
    
    # Calculamos promedios
    stats["promedio_prioridad"] = prioridad_total / len(assignacions)
    stats["promedio_potencial"] = potencial_total / len(assignacions)
    
    return stats

async def update_fitxa_assignacio(db: AsyncSession, assignment_id: int, update_data: dict) -> FitxesAssignacions:
    result = await db.execute(
        select(FitxesAssignacions).filter(FitxesAssignacions.id_fitxes_assignacions == assignment_id)
    )
    assignment = result.scalars().first()
    if assignment:
        # Si contiene datetimes con tzinfo, los volvemos naive
        for key, val in update_data.items():
            if isinstance(val, datetime) and val.tzinfo is not None:
                update_data[key] = val.replace(tzinfo=None)
            setattr(assignment, key, val)
        await db.commit()
        await db.refresh(assignment)
    return assignment