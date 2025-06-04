import { Outlet, useLocation, Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { pathname } = useLocation();
  
  // Añadir una variable para controlar el ancho máximo del contenido principal
  // Esto permite que el contenido sea más ancho pero con un límite para pantallas muy grandes
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Detectar cambios en el ancho de la ventana
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Calcular el ancho óptimo del sidebar basado en el ancho de la ventana
  const sidebarWidth = windowWidth >= 1920 ? "300px" : "250px";
  
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar con ancho fijo y más espacioso */}
      <aside 
        className={`${sidebarOpen ? "block" : "hidden"} md:block border-r border-slate-200`}
        style={{ width: sidebarWidth, flexShrink: 0 }}
      >
        <Sidebar />
      </aside>

      {/* Main content con márgenes más amplios */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none transition-colors"
                aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {/* Icono mejorado */}
                {sidebarOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              <h1 className="text-xl font-medium text-slate-800">Mi Aplicación</h1>
            </div>
            
            {/* Espacio para posibles acciones en el header */}
            <div className="flex items-center space-x-3">
              {/* Aquí podrían ir botones de acción, notificaciones, perfil, etc. */}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 relative">
          {/* Contenedor principal con márgenes laterales más amplios y ancho máximo */}
          <div 
            className="py-8 px-6 md:px-8 lg:px-10 mx-auto h-full"
            style={{ 
              maxWidth: windowWidth >= 1920 ? "1600px" : "1400px",
              width: "100%" 
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}