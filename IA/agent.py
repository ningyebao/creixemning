import openai

openai.api_key = "TU_API_KEY"

def tomar_decision(nombre: str, presupuesto: float, sector: str) -> str:
    prompt = f"""
    Cliente: {nombre}
    Presupuesto: {presupuesto}€
    Sector: {sector}

    ¿Debemos aceptar o rechazar al cliente? Justifica con lógica empresarial.
    Da como resultado:
    DECISIÓN: ACEPTAR o RECHAZAR
    MOTIVO: ...
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Eres un experto en estrategia empresarial y toma de decisiones."},
            {"role": "user", "content": prompt}
        ]
    )

    return response["choices"][0]["message"]["content"]
