# utils.py
"""
Utilidades centralizadas para manejo de fechas y otras funciones generales
"""
import datetime
from typing import Optional, Union, Any, Dict
from sqlalchemy.orm import DeclarativeBase, Mapper
from sqlalchemy import event

def normalize_datetime(dt: Optional[Union[datetime.datetime, str]]) -> Optional[datetime.datetime]:
    """
    Normaliza un datetime para guardar en la base de datos.
    
    Si es un datetime con zona horaria (aware), se convierte a UTC y luego se 
    elimina la información de zona horaria.
    
    Args:
        dt: El datetime a normalizar o un string con formato de fecha
        
    Returns:
        datetime: El datetime normalizado sin información de zona horaria,
                  o None si el input es None
    """
    if dt is None:
        return None
        
    # Si es string, convertir a datetime
    if isinstance(dt, str):
        try:
            # Intentar varios formatos comunes
            for fmt in ["%Y-%m-%dT%H:%M:%S.%fZ", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d"]:
                try:
                    dt = datetime.datetime.strptime(dt, fmt)
                    break
                except ValueError:
                    continue
            else:
                # Si ningún formato funciona, usar parser más flexible
                from dateutil import parser
                dt = parser.parse(dt)
        except Exception as e:
            raise ValueError(f"No se pudo convertir '{dt}' a datetime: {e}")
    
    # Si el datetime tiene zona horaria
    if dt.tzinfo is not None:
        # Convertir a UTC primero
        dt = dt.astimezone(datetime.timezone.utc)
        # Luego eliminar la información de zona horaria
        dt = dt.replace(tzinfo=None)
        
    return dt

def normalize_schema_dates(schema_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Normaliza todas las fechas en un diccionario de datos de schema.
    Útil para normalizar datos antes de pasarlos a los models ORM.
    
    Args:
        schema_data: Diccionario con datos del schema
        
    Returns:
        Dict: Diccionario con fechas normalizadas
    """
    normalized_data = schema_data.copy()
    
    for key, value in normalized_data.items():
        if isinstance(value, datetime.datetime):
            normalized_data[key] = normalize_datetime(value)
        elif isinstance(value, str) and ('_date' in key or 'date_' in key or '_data' in key or 'data_' in key):
            # Intentar convertir strings que parecen fechas por su nombre
            try:
                normalized_data[key] = normalize_datetime(value)
            except ValueError:
                pass  # No es una fecha válida, dejar como está
                
    return normalized_data

def setup_datetime_normalization_for_all_models(Base: DeclarativeBase):
    """
    Configura la normalización automática de fechas para todos los modelos.
    Debe llamarse una vez después de definir todos los modelos.
    
    Args:
        Base: La clase base declarativa de SQLAlchemy
    """
    @event.listens_for(Base, 'mapper_configured')
    def _setup_datetime_listeners(mapper, class_):
        # Para cada modelo, configurar listeners para normalizar fechas
        _setup_datetime_normalization(mapper)

def _setup_datetime_normalization(mapper: Mapper):
    """
    Configura listeners para normalizar campos de fecha en un modelo específico.
    """
    # Obtener nombres de columnas de tipo datetime
    datetime_columns = []
    for column_name, column in mapper.columns.items():
        if hasattr(column.type, 'python_type') and column.type.python_type == datetime.datetime:
            datetime_columns.append(column_name)
    
    if not datetime_columns:
        return  # El modelo no tiene columnas de tipo datetime
    
    # Configurar listener para normalizar fechas antes de insertar o actualizar
    @event.listens_for(mapper, 'before_insert')
    def _normalize_datetimes_on_insert(mapper, connection, target):
        for column_name in datetime_columns:
            value = getattr(target, column_name, None)
            if value is not None:
                setattr(target, column_name, normalize_datetime(value))
    
    @event.listens_for(mapper, 'before_update')
    def _normalize_datetimes_on_update(mapper, connection, target):
        for column_name in datetime_columns:
            value = getattr(target, column_name, None)
            if value is not None:
                setattr(target, column_name, normalize_datetime(value))

def get_current_datetime() -> datetime.datetime:
    """
    Obtiene el datetime actual sin zona horaria (normalizado).
    Útil para campos como created_at, updated_at, etc.
    
    Returns:
        datetime: Datetime actual normalizado
    """
    return normalize_datetime(datetime.datetime.now(datetime.timezone.utc))