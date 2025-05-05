from typing import List, Optional, Dict, Any, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, not_
from data.models.sucursal import Sucursal
from datetime import datetime
from fastapi import HTTPException

# Crear una nueva sucursal
def create_sucursal(db: Session, sucursal_data: Dict[str, Any]) -> Sucursal:
    """
    Crea una nueva sucursal en la base de datos.
    
    Args:
        db: Sesión de base de datos
        sucursal_data: Diccionario con los datos de la sucursal a crear
        
    Returns:
        Sucursal: Objeto sucursal creado
    """
    try:
        # Validar que si es_principal es True, no exista otra sucursal principal para el mismo lead
        if sucursal_data.get('es_principal', False) and sucursal_data.get('id_lead'):
            existing_principal = db.query(Sucursal).filter(
                and_(
                    Sucursal.id_lead == sucursal_data['id_lead'],
                    Sucursal.es_principal == True
                )
            ).first()
            
            if existing_principal:
                raise HTTPException(status_code=400, detail="Ya existe una sucursal principal para este lead")
        
        # Crear la nueva sucursal
        new_sucursal = Sucursal(**sucursal_data)
        db.add(new_sucursal)
        db.commit()
        db.refresh(new_sucursal)
        return new_sucursal
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al crear la sucursal: {str(e)}")

# Obtener todas las sucursales
def get_all_sucursales(db: Session, skip: int = 0, limit: int = 100, filters: Dict[str, Any] = None) -> List[Sucursal]:
    """
    Obtiene todas las sucursales con filtros opcionales.
    
    Args:
        db: Sesión de base de datos
        skip: Número de registros a saltar
        limit: Límite de registros a devolver
        filters: Diccionario de filtros a aplicar
        
    Returns:
        List[Sucursal]: Lista de objetos sucursal
    """
    try:
        query = db.query(Sucursal)
        
        # Aplicar filtros si existen
        if filters:
            for key, value in filters.items():
                if hasattr(Sucursal, key) and value is not None:
                    query = query.filter(getattr(Sucursal, key) == value)
        
        # Aplicar paginación
        sucursales = query.offset(skip).limit(limit).all()
        return sucursales
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener las sucursales: {str(e)}")

# Obtener una sucursal por ID
def get_sucursal_by_id(db: Session, sucursal_id: int) -> Optional[Sucursal]:
    """
    Obtiene una sucursal por su ID.
    
    Args:
        db: Sesión de base de datos
        sucursal_id: ID de la sucursal a buscar
        
    Returns:
        Optional[Sucursal]: Objeto sucursal encontrado o None
    """
    try:
        sucursal = db.query(Sucursal).filter(Sucursal.id_sucursal == sucursal_id).first()
        if not sucursal:
            raise HTTPException(status_code=404, detail=f"Sucursal con ID {sucursal_id} no encontrada")
        return sucursal
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar la sucursal: {str(e)}")

# Obtener sucursales por ID de lead
def get_sucursales_by_lead_id(db: Session, lead_id: int) -> List[Sucursal]:
    """
    Obtiene todas las sucursales asociadas a un lead.
    
    Args:
        db: Sesión de base de datos
        lead_id: ID del lead
        
    Returns:
        List[Sucursal]: Lista de sucursales asociadas al lead
    """
    try:
        sucursales = db.query(Sucursal).filter(Sucursal.id_lead == lead_id).all()
        return sucursales
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener las sucursales del lead: {str(e)}")

# Actualizar una sucursal
def update_sucursal(db: Session, sucursal_id: int, sucursal_data: Dict[str, Any]) -> Sucursal:
    """
    Actualiza una sucursal existente.
    
    Args:
        db: Sesión de base de datos
        sucursal_id: ID de la sucursal a actualizar
        sucursal_data: Datos a actualizar
        
    Returns:
        Sucursal: Objeto sucursal actualizado
    """
    try:
        # Verificar que la sucursal existe
        sucursal = db.query(Sucursal).filter(Sucursal.id_sucursal == sucursal_id).first()
        if not sucursal:
            raise HTTPException(status_code=404, detail=f"Sucursal con ID {sucursal_id} no encontrada")
        
        # Verificar que no exista otra sucursal principal para el mismo lead si es_principal es True
        if sucursal_data.get('es_principal', False) and sucursal_data.get('id_lead', sucursal.id_lead):
            existing_principal = db.query(Sucursal).filter(
                and_(
                    Sucursal.id_lead == sucursal_data.get('id_lead', sucursal.id_lead),
                    Sucursal.es_principal == True,
                    Sucursal.id_sucursal != sucursal_id
                )
            ).first()
            
            if existing_principal:
                raise HTTPException(status_code=400, detail="Ya existe una sucursal principal para este lead")
        
        # Actualizar los campos de la sucursal
        for key, value in sucursal_data.items():
            if hasattr(sucursal, key):
                setattr(sucursal, key, value)
        
        db.commit()
        db.refresh(sucursal)
        return sucursal
    except HTTPException as he:
        db.rollback()
        raise he
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al actualizar la sucursal: {str(e)}")

# Eliminar una sucursal
def delete_sucursal(db: Session, sucursal_id: int) -> Dict[str, Any]:
    """
    Elimina una sucursal por su ID.
    
    Args:
        db: Sesión de base de datos
        sucursal_id: ID de la sucursal a eliminar
        
    Returns:
        Dict[str, Any]: Mensaje de confirmación
    """
    try:
        # Verificar que la sucursal existe
        sucursal = db.query(Sucursal).filter(Sucursal.id_sucursal == sucursal_id).first()
        if not sucursal:
            raise HTTPException(status_code=404, detail=f"Sucursal con ID {sucursal_id} no encontrada")
        
        # Verificar si es la única sucursal principal para un lead
        if sucursal.es_principal and sucursal.id_lead:
            sucursal_count = db.query(Sucursal).filter(Sucursal.id_lead == sucursal.id_lead).count()
            if sucursal_count > 1:
                # Si hay más sucursales, advertir que se debe seleccionar otra como principal
                raise HTTPException(
                    status_code=400, 
                    detail="Esta es la sucursal principal. Antes de eliminarla, debe designar otra sucursal como principal."
                )
        
        # Eliminar la sucursal
        db.delete(sucursal)
        db.commit()
        
        return {"success": True, "message": f"Sucursal con ID {sucursal_id} eliminada correctamente"}
    except HTTPException as he:
        db.rollback()
        raise he
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al eliminar la sucursal: {str(e)}")

# Marcar una sucursal como principal
def set_sucursal_principal(db: Session, sucursal_id: int, lead_id: int) -> Sucursal:
    """
    Marca una sucursal como principal y desmarca las demás del mismo lead.
    
    Args:
        db: Sesión de base de datos
        sucursal_id: ID de la sucursal a marcar como principal
        lead_id: ID del lead asociado
        
    Returns:
        Sucursal: Sucursal marcada como principal
    """
    try:
        # Verificar que la sucursal existe y pertenece al lead
        sucursal = db.query(Sucursal).filter(
            and_(
                Sucursal.id_sucursal == sucursal_id,
                Sucursal.id_lead == lead_id
            )
        ).first()
        
        if not sucursal:
            raise HTTPException(status_code=404, detail=f"Sucursal con ID {sucursal_id} no encontrada para el lead {lead_id}")
        
        # Desmarcar todas las sucursales principales para este lead
        sucursales_to_update = db.query(Sucursal).filter(
            and_(
                Sucursal.id_lead == lead_id,
                Sucursal.es_principal == True
            )
        ).all()
        
        for s in sucursales_to_update:
            s.es_principal = False
        
        # Marcar la sucursal seleccionada como principal
        sucursal.es_principal = True
        
        db.commit()
        db.refresh(sucursal)
        return sucursal
    except HTTPException as he:
        db.rollback()
        raise he
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al marcar la sucursal como principal: {str(e)}")

# Contar sucursales por lead
def count_sucursales_by_lead(db: Session, lead_id: int) -> int:
    """
    Cuenta el número de sucursales asociadas a un lead.
    
    Args:
        db: Sesión de base de datos
        lead_id: ID del lead
        
    Returns:
        int: Número de sucursales
    """
    try:
        count = db.query(Sucursal).filter(Sucursal.id_lead == lead_id).count()
        return count
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al contar las sucursales: {str(e)}")