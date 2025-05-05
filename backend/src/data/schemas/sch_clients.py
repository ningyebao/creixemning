from pydantic import BaseModel, ValidationError
from datetime import datetime
from typing import Optional

class ClientBase(BaseModel):
    nom_client: Optional[str] = None
    telefon1_client: Optional[dict] = None  
    telefon2_client: Optional[dict] = None
    actiu_client: Optional[bool] = True  # Puedes dar un valor por defecto
    especial_client: Optional[bool] = False
    observacions_client: Optional[str] = None
    data_creacio_client: Optional[datetime] = datetime.utcnow()

class ClientCreate(ClientBase):
    nom_client: str  # Requerido al crear cliente

class ClientUpdate(ClientBase):
    pass  # Todo opcional para actualizar parcialmente

class Client(ClientBase):
    id_client: int

    class Config:
        orm_mode = True


#Registro en caso de NULL
data = {
    "id_client": 1,
    "nom_client": "Jhon Doe",
    "telefon1_client": {"numero": "123456789", "tipo": "móvil"},
    "actiu_client": True,
    "especial_client": False,
    "data_creacio_client": "2023-03-18T12:00:00",
}

try:
    client = Client(**data)
    print("Validación exitosa:", client)
except ValidationError as e:
    print("Error de validación:", e.json())