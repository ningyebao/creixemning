from fastapi import FastAPI
from app.schemas import ClienteInput, DecisionOutput
from app.agent import tomar_decision

app = FastAPI()

@app.post("/decidir", response_model=DecisionOutput)
def decidir(cliente: ClienteInput):
    resultado = tomar_decision(cliente.nombre, cliente.presupuesto, cliente.sector)
    return {"resultado": resultado}
