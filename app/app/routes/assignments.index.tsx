import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { AssignacioService } from "~/services/assignacio.service";
import { LeadService } from "~/services/leads.service";
import { AgentService } from "~/services/agents.service";
import { handleApiError } from "~/lib/api/client";
import type { Assignacio, Lead, Agent } from "~/lib/types";

// Definimos un tipo específico para los datos del loader
interface LoaderData {
  recentAssignments: Assignacio[];
  recentLeads: Lead[];
  agents: Agent[];
  metrics: {
    totalAssignments: number;
    pendingAssignments: number;
    inProgressAssignments: number;
    completedAssignments: number;
    totalLeads: number;
    totalAgents: number;
  };
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const [assignacions, leads, agents] = await Promise.all([
      AssignacioService.getAll(0, 5),
      LeadService.getAll(0, 5),
      AgentService.getAll()
    ]);
    
    // Calcular métricas
    const pendingAssignments = assignacions.filter(
      (a) => a.estat_fitxes_assignacions === "Pendiente"
    ).length;
    const inProgressAssignments = assignacions.filter(
      (a) => a.estat_fitxes_assignacions === "En progreso"
    ).length;
    const completedAssignments = assignacions.filter(
      (a) => a.estat_fitxes_assignacions === "Completada"
    ).length;

    // Retornamos la data con las métricas calculadas
    return json<LoaderData>({
      recentAssignments: assignacions,
      recentLeads: leads,
      agents,
      metrics: {
        totalAssignments: assignacions.length,
        pendingAssignments,
        inProgressAssignments,
        completedAssignments,
        totalLeads: leads.length,
        totalAgents: agents.length,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
};

export default function Index() {
  // Extraemos la data del loader
  const data = useLoaderData<LoaderData>();

  // Fallbacks 
  const recentAssignments = data.recentAssignments || [];
  const metrics = data.metrics || {
    totalAssignments: 0,
    pendingAssignments: 0,
    inProgressAssignments: 0,
    completedAssignments: 0,
    totalLeads: 0,
    totalAgents: 0,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">ASIGNACIONES</h3>
          <div className="flex items-center mt-2">
            <div className="text-3xl font-bold">{metrics.totalAssignments}</div>
            <div className="ml-auto flex flex-col">
              <span className="text-green-500 flex items-center text-sm">
                <span className="mr-1">✓</span> {metrics.completedAssignments} completadas
              </span>
              <span className="text-yellow-500 flex items-center text-sm">
                <span className="mr-1">⟳</span> {metrics.inProgressAssignments} en progreso
              </span>
              <span className="text-blue-500 flex items-center text-sm">
                <span className="mr-1">◯</span> {metrics.pendingAssignments} pendientes
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">LEADS</h3>
          <div className="flex items-center mt-2">
            <div className="text-3xl font-bold">{metrics.totalLeads}</div>
            <div className="ml-auto">
              {/* Se han eliminado los botones interactivos */}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">AGENTES</h3>
          <div className="flex items-center mt-2">
            <div className="text-3xl font-bold">{metrics.totalAgents}</div>
            <div className="ml-auto">
              <Link 
                to="/agents" 
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
              >
                Ver agentes
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Asignaciones recientes (versión solo de lectura, sin botones interactivos) */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Asignaciones recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentAssignments.map((assignment) => (
                <tr key={assignment.id_fitxes_asignacions} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.id_fitxes_asignacions}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.id_leads}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.id_agents}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${assignment.estat_fitxes_assignacions === "Pendiente" ? "bg-blue-100 text-blue-800" : 
                        assignment.estat_fitxes_assignacions === "En progreso" ? "bg-yellow-100 text-yellow-800" : 
                        assignment.estat_fitxes_assignacions === "Completada" ? "bg-green-100 text-green-800" : 
                        "bg-red-100 text-red-800"}`}
                    >
                      {assignment.estat_fitxes_assignacions}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{assignment.prioritat_fitxes_assignacions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>      
    </div>
  );
}
