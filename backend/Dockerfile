# syntax=docker/dockerfile:1

### 1) Builder: compilamos asyncpg
FROM python:3.13-slim AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential gcc python3-dev libpq-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /install
COPY requirements.txt .
RUN pip install --prefix=/install --no-cache-dir -r requirements.txt

### 2) Runtime: sólo lo que necesitamos en producción
FROM python:3.13-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends libpq5 && \
    rm -rf /var/lib/apt/lists/* && \
    useradd --no-create-home --shell /usr/sbin/nologin appuser

WORKDIR /app

# Copiamos las dependencias instaladas
COPY --from=builder /install /usr/local

# Copiamos solo el directorio src
COPY src/ /app/src/
COPY .env /app/

# Crear directorios necesarios y establecer permisos
RUN mkdir -p /app/logs && \
    chown -R appuser:appuser /app

# Verificar estructura (solo para debug, puedes comentar en producción)
RUN echo "=== Verificando estructura ===" && \
    ls -la /app/ && \
    echo "=== Contenido de src ===" && \
    ls -la /app/src/ && \
    echo "=== Contenido de data ===" && \
    ls -la /app/src/data/ || echo "No existe /app/src/data" && \
    echo "=== Contenido de api ===" && \
    ls -la /app/src/api/ || echo "No existe /app/src/api"

USER appuser
ENV PORT=8080
EXPOSE 8080

# Configurar PYTHONPATH para incluir /app/src
ENV PYTHONPATH=/app/src:$PYTHONPATH

# Cambiar al directorio donde está main.py
WORKDIR /app/src

# Ejecutar la aplicación
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]