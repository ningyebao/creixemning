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

# Copiamos el código fuente
COPY . .

# Crear un directorio para logs si es necesario
RUN mkdir -p /app/logs && chown -R appuser:appuser /app

USER appuser
ENV PORT=8080
EXPOSE 8080

# Configurar PYTHONPATH correcto para que encuentre los módulos
ENV PYTHONPATH=/app/src:$PYTHONPATH

# Establecer el directorio de trabajo correcto donde está main.py
WORKDIR /app/src

# Ejecutar la aplicación con uvicorn
CMD exec uvicorn main:app --host 0.0.0.0 --port $PORT