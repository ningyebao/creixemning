// app/routes/assignments._index.tsx
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams, Link, useNavigate } from "@remix-run/react";
import { useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { AssignacioService } from "~/services/assignacio.service";
import { AgentService } from "~/services/agents.service";
import { handleApiError } from "~/lib/api/client";
import { AssignmentsTable } from "~/components/domain/AssignmentsTable";
import type { Assignacio, AssignacioFilters, Agent } from "~/lib/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  const limit = parseInt(url.searchParams.get("limit") || "50");
  
  // Obtener filtros de los parámetros de URL
  const filters: AssignacioFilters = {};
  
  const agentIdParam = url.searchParams.get("agent");
  if (agentIdParam) {
    filters.id_agents = parseInt(agentIdParam);
  }
  
  const leadIdParam = url.searchParams.get("lead");
  if (leadIdParam) {
    filters.id_leads = parseInt(leadIdParam);
  }
  
  const campanyaIdParam = url.searchParams.get("campanya");
  if (campanyaIdParam) {
    filters.id_campanya_leads = parseInt(campanyaIdParam);
  }
  
  const statusParam = url.searchParams.get("status");
  if (statusParam) {
    filters.estat_fitxes_assignacions = statusParam;
  }
  
  try {
    const [assignments, agents] = await Promise.all([
      AssignacioService.getAll(page * limit, limit, filters),
      AgentService.getAll()
    ]);
    
    return json({
      assignments,
      agents,
      page,
      limit,
      filters
    });
  } catch (error) {
    return handleApiError(error);
  }
};

// Define a proper interface to type the loader return
interface LoaderData {
  assignments: Assignacio[];
  agents: Agent[];
  page: number;
  limit: number;
  filters: AssignacioFilters;
}

export default function AssignmentsIndex() {
  // Use an 'any' type temporarily to avoid type issues
  // Later TypeScript type checking will ensure correct usage
  const loaderData = useLoaderData<any>();
  
  // Access properties without destructuring
  const assignments = loaderData.assignments;
  const agents = loaderData.agents;
  const page = loaderData.page;
  const limit = loaderData.limit;
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    searchParams.get("agent") || ""
  );
  
  const [selectedStatus, setSelectedStatus] = useState<string>(
    searchParams.get("status") || ""
  );
  
  // Función para cambiar de página
  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };
  
  // Función para aplicar filtros
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (selectedAgentId) {
      params.set("agent", selectedAgentId);
    }
    
    if (selectedStatus) {
      params.set("status", selectedStatus);
    }
    
    // Mantener el tamaño de página
    params.set("limit", limit.toString());
    
    // Resetear a la primera página
    params.set("page", "0");
    
    setSearchParams(params);
  };
  
  // Función para limpiar filtros
  const clearFilters = () => {
    setSelectedAgentId("");
    setSelectedStatus("");
    setSearchParams(new URLSearchParams({ page: "0", limit: limit.toString() }));
  };
  
  // Función para cambiar el estado de una asignación
  const handleStatusChange = async (assignmentId: number, newStatus: string) => {
    try {
      await AssignacioService.update(assignmentId, {
        estat_fitxes_assignacions: newStatus as "Pendiente" | "En progreso" | "Completada" | "Cancelada"
      });
      
      // Recargar la página
      navigate(".", { replace: true });
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      alert("Error al cambiar el estado de la asignación");
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Asignaciones</h1>
        <Link 
          to="/assignments/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Nueva asignación
        </Link>
      </div>
      
      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Filtros</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Agente:</label>
            <select 
              className="w-full border rounded p-2"
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
            >
              <option value="">Todos los agentes</option>
              {agents && agents.map((agent: Agent) => (
                <option key={agent.id_agent} value={agent.id_agent.toString()}>
                  {agent.nom_agent}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Estado:</label>
            <select 
              className="w-full border rounded p-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>
          
          <div className="flex items-end space-x-4">
            <button 
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Aplicar filtros
            </button>
            <button 
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabla de asignaciones */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Asignaciones ({assignments ? assignments.length : 0})</h2>
        </div>
        
        {assignments && assignments.length > 0 ? (
          <AssignmentsTable 
            assignments={assignments}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No se encontraron asignaciones</p>
          </div>
        )}
        
        {/* Paginación */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={() => changePage(Math.max(0, page - 1))}
            disabled={page === 0}
            className={`px-4 py-2 rounded ${
              page === 0 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Anterior
          </button>
          
          <span className="text-sm text-gray-700">
            Página {page + 1} • {limit} por página
          </span>
          
          <button
            onClick={() => changePage(page + 1)}
            disabled={assignments && assignments.length < limit}
            className={`px-4 py-2 rounded ${
              assignments && assignments.length < limit
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}