from pydantic import BaseModel

class ClienteInput(BaseModel):
    nombre: str
    presupuesto: float
    sector: str

class DecisionOutput(BaseModel):
    resultado: str
