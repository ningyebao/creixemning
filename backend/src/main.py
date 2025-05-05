"""
Punto de entrada principal para la aplicación FastAPI
"""
import logging
import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from pydantic_settings import BaseSettings
from typing import List, Union

# Configuración básica con pydantic
class Settings(BaseSettings):
    API_TITLE: str = "Creixem API"
    API_VERSION: str = "1.0.0"
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8080"
        # Añadir otros orígenes según sea necesario
    ]
    PORT: int = 8080
    
    class Config:
        env_file = ".env"
        case_sensitive = True
        from_attributes = True

# Crear y configurar la aplicación
def create_app() -> FastAPI:
    # Configurar logging
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    
    # Crear instancia de la app
    settings = Settings()
    app = FastAPI(
        title=settings.API_TITLE,
        version=settings.API_VERSION,
        docs_url="/docs",
        redoc_url="/redoc",
        strict_slashes=False
    )
    
    # Configurar CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )
    
    # Añadir middleware de compresión
    app.add_middleware(GZipMiddleware, minimum_size=500)
    
    # Endpoints de salud
    @app.get("/health")
    async def health_check():
        return {"status": "ok", "version": settings.API_VERSION}
    
    # Registrar routers
    from api.routers_endpoints import all_routers
    from data.database import get_db
    
    for router_config in all_routers:
        app.include_router(
            router_config["router"],
            prefix=router_config["prefix"],
            tags=router_config["tags"],
            dependencies=[Depends(get_db)] if router_config.get("db") else []
        )
    
    return app

# Inicializar la aplicación
app = create_app()

# Punto de entrada para ejecución directa
if __name__ == "__main__":
    settings = Settings()
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=True
    )