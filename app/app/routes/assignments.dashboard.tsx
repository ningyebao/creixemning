import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams, Form, Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { AssignacioService } from "~/services/assignacio.service";
import { LeadService } from "~/services/leads.service";
import { AgentService } from "~/services/agents.service";
import { CampanyaService } from "~/services/campanya.service";
import { handleApiError } from "~/lib/api/client";
import type { Assignacio, Lead, Agent, Campanya } from "~/lib/types";

// Type for combined assignment data with names
interface AssignmentWithNames {
  assignment: Assignacio;
  leadName: string;
  agentName: string;
  campaignName: string;
}

// Interface for loader data
interface LoaderData {
  assignments: AssignmentWithNames[];
  statusCounts: Record<string, number>;
  totalAssignments: number;
  agentOptions: { id: number; name: string }[];
  campaignOptions: { id: number; name: string }[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  filterParams: {
    status?: string;
    agentId?: number;
    campaignId?: number;
    priority?: number;
    startDate?: string;
    endDate?: string;
  };
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    
    // Parse filter parameters
    const status = url.searchParams.get("status") || undefined;
    const agentId = url.searchParams.get("agentId") ? parseInt(url.searchParams.get("agentId")!) : undefined;
    const campaignId = url.searchParams.get("campaignId") ? parseInt(url.searchParams.get("campaignId")!) : undefined;
    const priority = url.searchParams.get("priority") ? parseInt(url.searchParams.get("priority")!) : undefined;
    const startDate = url.searchParams.get("startDate") || undefined;
    const endDate = url.searchParams.get("endDate") || undefined;
    
    // Parse pagination parameters
    const page = url.searchParams.get("page") ? parseInt(url.searchParams.get("page")!) : 1;
    const itemsPerPage = url.searchParams.get("itemsPerPage") ? parseInt(url.searchParams.get("itemsPerPage")!) : 10;
    
    // Build filters object
    const filters: Record<string, any> = {};
    if (status) filters.estat_fitxes_assignacions = status;
    if (agentId) filters.id_agents = agentId;
    if (campaignId) filters.id_campanya_leads = campaignId;
    if (priority) filters.prioritat_fitxes_assignacions = priority;
    
    // Date range filtering would need to be implemented in the backend service
    
    // Calculate pagination offsets
    const offset = (page - 1) * itemsPerPage;
    
    // Fetch assignments with filters and pagination
    const assignments = await AssignacioService.getAll(offset, itemsPerPage, filters);
    
    // Fetch all agents and campaigns for dropdowns
    const [agents, campaigns] = await Promise.all([
      AgentService.getAll(),
      CampanyaService.getAll()
    ]);
    
    // Create lookup maps for efficient data retrieval
    const leadIds = [...new Set(assignments.map(a => a.id_leads))];
    const leadsPromises = leadIds.map(id => LeadService.getById(parseInt(id.toString())));
    const leads = await Promise.all(leadsPromises);
    
    // Create maps for quick lookups
    const leadMap = new Map<number, Lead>();
    leads.forEach(lead => leadMap.set(lead.id_lead, lead));
    
    const agentMap = new Map<number, Agent>();
    agents.forEach(agent => agentMap.set(agent.id_agent, agent));
    
    const campaignMap = new Map<number, Campanya>();
    campaigns.forEach(campaign => campaignMap.set(campaign.id_campanya, campaign));
    
    // Combine data for the UI
    const assignmentsWithNames: AssignmentWithNames[] = assignments.map(assignment => {
      const leadId = parseInt(assignment.id_leads.toString());
      const agentId = parseInt(assignment.id_agents.toString());
      const campaignId = parseInt(assignment.id_campanya_leads.toString());
      
      const lead = leadMap.get(leadId);
      const agent = agentMap.get(agentId);
      const campaign = campaignMap.get(campaignId);
      
      return {
        assignment,
        leadName: lead ? `${lead.nom_lead || ''} (${lead.nom_empresarial_lead || ''})` : `Lead ID: ${leadId}`,
        agentName: agent ? agent.nom_agent || `Agent ID: ${agentId}` : `Agent ID: ${agentId}`,
        campaignName: campaign ? campaign.campanya_nom || `Campaign ID: ${campaignId}` : `Campaign ID: ${campaignId}`
      };
    });
    
    // Calculate status counts for the dashboard - initialize with common statuses
    const statusCounts: Record<string, number> = {
      'Pendiente': 0,
      'En progreso': 0,
      'Completada': 0,
      'Cancelada': 0
    };
    
    // Then update counts from actual assignments
    assignments.forEach(assignment => {
      const status = assignment.estat_fitxes_assignacions;
      if (status) {
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      }
    });
    
    // Format agent and campaign options for dropdowns
    const agentOptions = agents.map(agent => ({ 
      id: agent.id_agent, 
      name: agent.nom_agent || `Agent ID: ${agent.id_agent}`
    }));
    
    const campaignOptions = campaigns.map(campaign => ({ 
      id: campaign.id_campanya, 
      name: campaign.campanya_nom || `Campaign ID: ${campaign.id_campanya}`
    }));
    
    // Get total count for pagination - this might need to be adjusted based on your API
    // For now, we'll estimate based on the current page data
    const totalAssignments = assignments.length === itemsPerPage 
      ? (page * itemsPerPage) + 1  // There might be more
      : (page - 1) * itemsPerPage + assignments.length;
    
    const totalPages = Math.ceil(totalAssignments / itemsPerPage);
    
    return json<LoaderData>({
      assignments: assignmentsWithNames,
      statusCounts,
      totalAssignments,
      agentOptions,
      campaignOptions,
      currentPage: page,
      totalPages,
      itemsPerPage,
      filterParams: {
        status,
        agentId,
        campaignId,
        priority,
        startDate,
        endDate
      }
    });
    
  } catch (error) {
    return handleApiError(error);
  }
};

export default function AssignmentsDashboard() {
  const data = useLoaderData<LoaderData>();
  
  // Destructure with defaults to prevent null/undefined errors
  const { 
    assignments = [], 
    statusCounts = {}, 
    totalAssignments = 0,
    agentOptions = [],
    campaignOptions = [],
    currentPage = 1,
    totalPages = 1,
    itemsPerPage = 10,
    filterParams = {}
  } = data || {};
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-blue-100 text-blue-800';
      case 'En progreso':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completada':
        return 'bg-green-100 text-green-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get priority label
  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return 'Muy baja';
      case 2: return 'Baja';
      case 3: return 'Media';
      case 4: return 'Alta';
      case 5: return 'Muy alta';
      default: return `${priority}`;
    }
  };
  
  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Reset filters
  const handleResetFilters = () => {
    // Keep only pagination parameters
    const newParams = new URLSearchParams();
    newParams.set('page', '1');
    newParams.set('itemsPerPage', itemsPerPage.toString());
    setSearchParams(newParams);
  };
  
  // Navigate to page
  const goToPage = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };
  
  // Calculate status percentages for the progress bars - with safety check for null/undefined
  const safeStatusCounts = statusCounts || {};
  const totalStatusCount = Object.values(safeStatusCounts).reduce((sum, count) => sum + count, 0);
  const statusPercentages = Object.entries(safeStatusCounts).map(([status, count]) => ({
    status,
    count,
    percentage: totalStatusCount > 0 ? Math.round((count / totalStatusCount) * 100) : 0
  }));
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard de Asignaciones</h1>
        <Link
          to="/assignments/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          <span className="mr-2">+</span> Nueva Asignación
        </Link>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">TOTAL ASIGNACIONES</h3>
          <div className="mt-2 text-3xl font-bold">{totalAssignments}</div>
        </div>
        
        {/* Ensure we have a stable set of status cards even if data is incomplete */}
        {Object.entries(safeStatusCounts).length > 0 ? (
          // If we have status data, show it
          Object.entries(safeStatusCounts).map(([status, count]) => {
            const percentage = statusPercentages.find(sp => sp.status === status)?.percentage || 0;
            const statusColorClass = getStatusColor(status)
              .replace('bg-blue-100', 'bg-blue-500')
              .replace('bg-yellow-100', 'bg-yellow-500')
              .replace('bg-green-100', 'bg-green-500')
              .replace('bg-red-100', 'bg-red-500')
              .replace('text-blue-800', '')
              .replace('text-yellow-800', '')
              .replace('text-green-800', '')
              .replace('text-red-800', '');
              
            return (
              <div key={status} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-gray-500 text-sm font-medium">{status.toUpperCase()}</h3>
                <div className="mt-2 text-3xl font-bold">{count}</div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${statusColorClass}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          // Fallback cards if no status data yet
          ['Pendiente', 'En progreso', 'Completada'].map(status => (
            <div key={status} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-500 text-sm font-medium">{status.toUpperCase()}</h3>
              <div className="mt-2 text-3xl font-bold">0</div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">Filtros</h2>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
        </div>
        
        {showFilters && (
          <div className="p-6">
            <Form method="get" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Estado:</label>
                <select 
                  name="status" 
                  className="w-full border rounded p-2"
                  defaultValue={filterParams.status || ''}
                >
                  <option value="">Todos</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Agente:</label>
                <select 
                  name="agentId" 
                  className="w-full border rounded p-2"
                  defaultValue={filterParams.agentId || ''}
                >
                  <option value="">Todos</option>
                  {agentOptions.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Campaña:</label>
                <select 
                  name="campaignId" 
                  className="w-full border rounded p-2"
                  defaultValue={filterParams.campaignId || ''}
                >
                  <option value="">Todas</option>
                  {campaignOptions.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Prioridad:</label>
                <select 
                  name="priority" 
                  className="w-full border rounded p-2"
                  defaultValue={filterParams.priority || ''}
                >
                  <option value="">Todas</option>
                  <option value="1">1 - Muy baja</option>
                  <option value="2">2 - Baja</option>
                  <option value="3">3 - Media</option>
                  <option value="4">4 - Alta</option>
                  <option value="5">5 - Muy alta</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Fecha Inicio:</label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full border rounded p-2"
                  defaultValue={filterParams.startDate}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Fecha Fin:</label>
                <input
                  type="date"
                  name="endDate"
                  className="w-full border rounded p-2"
                  defaultValue={filterParams.endDate}
                />
              </div>
              
              <div className="md:col-span-3 flex space-x-4 mt-4">
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Aplicar Filtros
                </button>
                <button 
                  type="button" 
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Limpiar Filtros
                </button>
              </div>
            </Form>
          </div>
        )}
      </div>
      
      {/* Assignments Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Listado de Asignaciones</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaña</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.length > 0 ? (
                assignments.map(({ assignment, leadName, agentName, campaignName }) => (
                  <tr key={assignment.id_fitxes_asignacions} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{assignment.id_fitxes_asignacions}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{leadName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{agentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{campaignName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(assignment.estat_fitxes_assignacions)}`}>
                        {assignment.estat_fitxes_assignacions}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-2.5 w-${assignment.prioritat_fitxes_assignacions * 2} rounded bg-blue-600 mr-2`}></div>
                        <span className="text-sm text-gray-900">{getPriorityLabel(assignment.prioritat_fitxes_assignacions)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(assignment.data_creacio_fitxes_assignacions)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/assignments/${assignment.id_fitxes_asignacions}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Ver
                        </Link>
                        <Link 
                          to={`/assignments/${assignment.id_fitxes_asignacions}/edit`}
                          className="text-green-600 hover:text-green-900"
                        >
                          Editar
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron asignaciones con los filtros seleccionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalAssignments)}</span> de <span className="font-medium">{totalAssignments}</span> resultados
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded text-sm ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Anterior
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Logic to show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 rounded text-sm ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded text-sm ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Siguiente
              </button>
            </div>
            
            <div>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  searchParams.set('itemsPerPage', e.target.value);
                  searchParams.set('page', '1');
                  setSearchParams(searchParams);
                }}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="5">5 por página</option>
                <option value="10">10 por página</option>
                <option value="25">25 por página</option>
                <option value="50">50 por página</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}