"""
Punto de entrada principal para la aplicación FastAPI
"""
import logging
import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from pydantic_settings import BaseSettings, SettingsConfigDict 
from typing import List, Union


class Settings(BaseSettings):
   
    API_TITLE: str = "Creixem API"
    API_VERSION: str = "1.0.0"
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000", 
        "http://localhost:8080"  
      
    ]
    PORT: int = 8080

   
    DATABASE_URL: str  

    model_config = SettingsConfigDict(
        env_file=".env",     
        case_sensitive=True,  
        extra='ignore'        
                             
    )

def create_app() -> FastAPI:
    # Configurar logging
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    

    settings = Settings()
    
    app = FastAPI(
        title=settings.API_TITLE,
        version=settings.API_VERSION,
        docs_url="/docs",      # URL para la documentación Swagger UI
        redoc_url="/redoc",    # URL para la documentación ReDoc
        strict_slashes=False # Permite que rutas como /path y /path/ sean tratadas igual
    )
    
   
    if settings.BACKEND_CORS_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin).strip() for origin in settings.BACKEND_CORS_ORIGINS], # Permite los orígenes especificados
            allow_credentials=True, # Permite cookies y cabeceras de autorización
            allow_methods=["*"],    # Permite todos los métodos HTTP (GET, POST, PUT, etc.)
            allow_headers=["*"]     # Permite todas las cabeceras
        )
    
    # Añadir middleware de compresión GZip
    # Comprime las respuestas para reducir el tamaño de transferencia (si son mayores de 500 bytes)
    app.add_middleware(GZipMiddleware, minimum_size=500)
    
    
    @app.get("/health", tags=["Health"])
    async def health_check():
        """
        Endpoint de verificación de estado.
        Devuelve el estado de la API y su versión.
        """
        return {"status": "ok", "version": settings.API_VERSION, "title": settings.API_TITLE}
    

    try:
        from api.routers_endpoints import all_routers # Asume que este módulo define una lista `all_routers`
        from data.database import get_db             # Asume que este módulo define una dependencia `get_db`
        
        # Itera sobre la configuración de routers y los añade a la aplicación FastAPI
        for router_config in all_routers:
            dependencies_list = []
            if router_config.get("db"): # Si el router necesita una conexión a la BD
                dependencies_list.append(Depends(get_db))
            
            

            app.include_router(
                router_config["router"],                     # El objeto APIRouter
                prefix=router_config.get("prefix", ""),      # Prefijo para todas las rutas en este router (ej. "/api/v1")
                tags=router_config.get("tags", []),          # Tags para agrupar endpoints en la documentación
                dependencies=dependencies_list               # Dependencias a nivel de router (ej. conexión a BD, autenticación)
            )
        logging.info("Routers cargados exitosamente.")
    except ImportError as e:
        logging.error(f"Error al importar routers o dependencias de base de datos: {e}")
        logging.error("La API podría no tener todos los endpoints funcionales. Verifica las rutas de importación en 'main.py'.")
    
    
    return app

app = create_app()

if __name__ == "__main__":

    settings = Settings() 
    
    logging.info(f"Iniciando servidor Uvicorn en http://0.0.0.0:{settings.PORT}")
    logging.info(f"API Title: {settings.API_TITLE}, Version: {settings.API_VERSION}")
    logging.info(f"DATABASE_URL (solo para depuración, no mostrar en producción si es sensible): {settings.DATABASE_URL[:30]}...") #e
    logging.info(f"CORS Origins permitidos: {settings.BACKEND_CORS_ORIGINS}")

    uvicorn.run(
        "main:app",            
        host="0.0.0.0",         
        port=settings.PORT,     
        reload=True,            
                                
        log_level="info"        
    )
