// ~/routes/filter-groups._index.tsx
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { Link, useLoaderData, Form, useSubmit } from "@remix-run/react";
import { FilterGroup, FilterGroupService } from "~/services/filter-group.service";
import { AgentService } from "~/services/agents.service";
import { CampanyaService } from "~/services/campanya.service";
import { LeadService } from "~/services/leads.service";
import { AssignacioService } from "~/services/assignacio.service";
import type { Agent, Campanya, Lead, LeadFilters } from "~/lib/types";
import { formatMidaLead } from "~/lib/types";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// Interfaces para los datos
interface LoaderData {
  agents: Agent[];
  campanyas: Campanya[];
}

// Cargamos agentes y campañas para la asignación
export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const [agents, campanyas] = await Promise.all([
      AgentService.getAll(),
      CampanyaService.getAll(),
    ]);
    
    return json<LoaderData>({
      agents,
      campanyas,
    });
  } catch (error) {
    console.error("Error cargando datos:", error);
    return json<LoaderData>({
      agents: [],
      campanyas: [],
    });
  }
};

// Acción para aplicar grupos de filtros y realizar asignaciones
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  
  if (intent === "deleteGroup") {
    const groupId = formData.get("groupId")?.toString();
    if (groupId) {
      // La eliminación se hace en el cliente, pero enviamos la respuesta para
      // que la interfaz se actualice
      return json({ success: true, deletedGroupId: groupId });
    }
  }
  
  return json({ error: "Acción no reconocida" });
};

// Función para combinar filtros de múltiples grupos
function combineFilters(groups: FilterGroup[]): Record<string, any> {
  const combinedFilters: Record<string, any> = {};
  
  groups.forEach(group => {
    Object.entries(group.filters).forEach(([key, value]) => {
      if (combinedFilters.hasOwnProperty(key)) {
        // Para filtros de texto, si son diferentes, usamos una estrategia de OR
        if (typeof value === 'string' && typeof combinedFilters[key] === 'string') {
          if (value !== combinedFilters[key]) {
            // No hacemos nada, mantenemos el valor original para provincias/poblaciones/comarcas
            if (key === 'provincia_lead' || key === 'poblacio_lead' || key === 'comarca_lead' || key === 'cnae_lead') {
              // Mantener el valor original
            }
          }
        } 
        // Para valores booleanos, usamos OR lógico (true tiene precedencia)
        else if (typeof value === 'boolean' && typeof combinedFilters[key] === 'boolean') {
          combinedFilters[key] = combinedFilters[key] || value;
        }
        // Para valores numéricos, depende del tipo de filtro
        else if (typeof value === 'number' && typeof combinedFilters[key] === 'number') {
          // Para filtros de mínimo, tomamos el valor más pequeño
          if (key.includes('_min')) {
            combinedFilters[key] = Math.min(combinedFilters[key], value);
          }
          // Para filtros de máximo, tomamos el valor más grande
          else if (key.includes('_max')) {
            combinedFilters[key] = Math.max(combinedFilters[key], value);
          }
          // Para tamaño, prioridad, etc., usamos el valor más grande
          else {
            combinedFilters[key] = Math.max(combinedFilters[key], value);
          }
        }
      } else {
        // Si el filtro no existe, simplemente lo añadimos
        combinedFilters[key] = value;
      }
    });
  });
  
  return combinedFilters;
}

export default function FilterGroupsIndex() {
  const { agents, campanyas } = useLoaderData<LoaderData>();
  const submit = useSubmit();
  
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [selectedFilterGroups, setSelectedFilterGroups] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [selectedCampanyas, setSelectedCampanyas] = useState<number[]>([]);
  
  // Estados para la previsualización de leads
  const [previewLeads, setPreviewLeads] = useState<Lead[]>([]);
  const [showPreviewLeads, setShowPreviewLeads] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewMessage, setPreviewMessage] = useState<string | null>(null);
  
  // Estado para el diálogo de confirmación
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Estado para el resultado de la asignación
  const [assignmentResult, setAssignmentResult] = useState<{
    success?: boolean;
    message?: string;
    totalSuccess?: number;
    totalError?: number;
  } | null>(null);

  // Definición de la función formatFilterValue
  const formatFilterValue = (key: string, value: any): string => {
    if (key === 'mida_lead') {
      const sizes = ['', 'Microempresa', 'Pequeña', 'Mediana', 'Grande'];
      return sizes[parseInt(value)] || value;
    }
    
    if (key === 'actiu_lead' || key === 'cotitza_borsa_lead' || 
        key === 'nomes_temporada_lead' || key === 'conciencia_ecologica_lead' || 
        key === 'solidaria_social_lead') {
      return value === true || value === 'true' ? 'Sí' : 'No';
    }
    
    return value.toString();
  };

  // Definición de la función renderGroupFilters
  const renderGroupFilters = (filters: Record<string, any>) => {
    const filterLabels: Record<string, string> = {
      'provincia_lead': 'Provincia',
      'poblacio_lead': 'Población',
      'comarca_lead': 'Comarca',
      'adreca_lead': 'Dirección',
      'codi_postal_lead': 'Código postal',
      'cnae_lead': 'CNAE',
      'mida_lead': 'Tamaño',
      'actiu_lead': 'Activo',
      'any_creacio_lead': 'Año creación',
      'nombre_treballadors_lead_min': 'Trabajadores (mín)',
      'nombre_treballadors_lead_max': 'Trabajadores (máx)',
      'capital_social_lead_min': 'Capital social (mín)',
      'capital_social_lead_max': 'Capital social (máx)',
      'idioma_preferent_lead': 'Idioma',
      'cotitza_borsa_lead': 'Cotiza en bolsa',
      'nomes_temporada_lead': 'Temporada',
      'conciencia_ecologica_lead': 'Ecológica',
      'solidaria_social_lead': 'Solidaria',
      'importa_exporta_lead': 'Importa/Exporta',
      'email_lead': 'Email',
      'NIF_lead': 'NIF',
      'nom_basic_lead': 'Nombre básico',
      'nom_empresarial_lead': 'Nombre empresarial',
      'nom_fiscal_lead': 'Nombre fiscal',
      'xarxe_social_lead': 'Redes sociales',
      'link_web_lead': 'Web'
    };
    
    return (
      <div className="text-xs text-gray-600 mt-1">
        {Object.entries(filters).map(([key, value], index) => (
          <span key={key} className="mr-2">
            {filterLabels[key] || key.replace('_lead', '')}: <strong>{formatFilterValue(key, value)}</strong>
            {index < Object.entries(filters).length - 1 ? ' • ' : ''}
          </span>
        ))}
      </div>
    );
  };

  // Carga los grupos de filtros de localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFilterGroups(FilterGroupService.getAll());
    }
  }, []);
  
  // Efecto para previsualizar leads cuando se seleccionan grupos de filtros
  useEffect(() => {
    if (selectedFilterGroups.length > 0) {
      previewLeadsForSelectedGroups();
    } else {
      // Limpiar la vista previa si no hay grupos seleccionados
      setPreviewLeads([]);
      setShowPreviewLeads(false);
    }
  }, [selectedFilterGroups]);

  // Función para previsualizar los leads automáticamente
  const previewLeadsForSelectedGroups = async () => {
    if (selectedFilterGroups.length === 0) {
      setPreviewError("Selecciona al menos un grupo de filtros para previsualizar");
      return;
    }
    
    console.log("🔍 Iniciando previsualización de leads para grupos:", selectedFilterGroups);
    setPreviewLoading(true);
    setPreviewError(null);
    setPreviewMessage(null);
    
    try {
      // Obtener los filtros combinados
      const groups = selectedFilterGroups
        .map(id => {
          const group = FilterGroupService.getById(id);
          console.log(`Grupo de filtros ${id}:`, group);
          return group;
        })
        .filter(Boolean) as FilterGroup[];
      
      console.log("Grupos encontrados:", groups.length);
      
      const combinedFilters = combineFilters(groups);
      console.log("Filtros combinados:", combinedFilters);
      
      // Hacer la solicitud directamente al API
      console.log("🌐 Llamando a LeadService.getUnassigned con filtros:", combinedFilters);
      
      // Verificar la implementación de LeadService.getUnassigned
      console.log("Método LeadService.getUnassigned:", typeof LeadService.getUnassigned);
      
      try {
        const leads = await LeadService.getUnassigned(0, 50, combinedFilters);
        console.log("✅ Leads recibidos:", leads ? leads.length : 0);
        
        setPreviewLeads(leads || []);
        setPreviewMessage(
          leads.length > 0 
            ? `Se encontraron ${leads.length} leads que cumplen con los filtros.`
            : "No se encontraron leads que cumplan con los filtros seleccionados."
        );
        setShowPreviewLeads(leads.length > 0);
        setPreviewLoading(false);
      } catch (apiError) {
        console.error("❌ Error específico en la llamada a getUnassigned:", apiError);
        
        // Detalles adicionales del error
        if (apiError instanceof Error) {
          console.error("Mensaje:", apiError.message);
          console.error("Nombre:", apiError.name);
          console.error("Stack:", apiError.stack);
        }
        
        throw apiError; // Relanzar para ser capturado por el bloque catch exterior
      }
    } catch (error) {
      console.error("❌ Error al previsualizar leads:", error);
      
      // Información más detallada del error
      if (error instanceof Error) {
        console.error("Tipo de error:", error.constructor.name);
        console.error("Mensaje:", error.message);
        console.error("Stack:", error.stack);
      } else {
        console.error("Error no es instancia de Error:", typeof error);
      }
      
      // Intentar acceder a propiedades específicas del error si es un objeto
      if (error && typeof error === 'object') {
        console.error("Propiedades del objeto error:", Object.keys(error));
        
        // Si hay una propiedad 'response' (común en errores de axios)
        if ('response' in error) {
          const response = (error as any).response;
          console.error("Response status:", response?.status);
          console.error("Response data:", response?.data);
        }
      }
      
      setPreviewError("Error al cargar los leads. Comprueba la consola para más detalles.");
      setPreviewLoading(false);
    }
  };

  // Manejador para eliminar un grupo
  const handleDelete = (id: string) => {
    FilterGroupService.delete(id);
    setFilterGroups(FilterGroupService.getAll());
    setShowDeleteConfirm(null);
    
    // Quitar el grupo eliminado de la selección si estaba seleccionado
    setSelectedFilterGroups(prev => prev.filter(groupId => groupId !== id));
  };

  // Maneja la selección de un grupo
  const handleFilterGroupSelection = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFilterGroups([...selectedFilterGroups, id]);
    } else {
      setSelectedFilterGroups(selectedFilterGroups.filter(groupId => groupId !== id));
    }
  };

  // Función para iniciar la asignación (mostrar confirmación)
  const handleStartAssignment = () => {
    if (selectedFilterGroups.length === 0) {
      setPreviewError("Selecciona al menos un grupo de filtros");
      return;
    }
    
    if (selectedAgents.length === 0) {
      setPreviewError("Selecciona al menos un agente");
      return;
    }
    
    if (selectedCampanyas.length === 0) {
      setPreviewError("Selecciona al menos una campaña");
      return;
    }
    
    // Mostrar diálogo de confirmación
    setShowConfirmDialog(true);
  };
  
  // Función para realizar la asignación
  const handleConfirmAssignment = async () => {
    try {
      setPreviewLoading(true);
      setAssignmentResult(null);
      
      // Obtener los filtros combinados
      const groups = selectedFilterGroups
        .map(id => FilterGroupService.getById(id))
        .filter(Boolean) as FilterGroup[];
      
      const combinedFilters = combineFilters(groups);
      
      // Buscar los leads que cumplen con los filtros
      const leads = await LeadService.getUnassigned(0, 500, combinedFilters);
      
      if (leads.length === 0) {
        setAssignmentResult({
          success: false,
          message: "No se encontraron leads que cumplan con los filtros seleccionados"
        });
        setPreviewLoading(false);
        setShowConfirmDialog(false);
        return;
      }
      
      // Realizar la asignación
      const leadIds = leads.map(lead => lead.id_lead);
      
      let totalSuccess = 0;
      let totalError = 0;
      
      // Realizar la asignación para cada campaña
      for (const campanyaId of selectedCampanyas) {
        const result = await AssignacioService.bulkAssignAll(
          selectedAgents,
          leadIds,
          3, // prioridad media por defecto
          3, // potencial medio por defecto
          "Asignación automática desde grupos de filtros",
          campanyaId
        );
        
        totalSuccess += result.success;
        totalError += result.error;
      }
      
      setAssignmentResult({
        success: true,
        message: `Se completó la asignación automática de leads.`,
        totalSuccess,
        totalError
      });
      
      setPreviewLoading(false);
      setShowConfirmDialog(false);
      
    } catch (error) {
      console.error("Error al realizar la asignación:", error);
      setAssignmentResult({
        success: false,
        message: "Error al procesar la asignación: " + (error instanceof Error ? error.message : String(error))
      });
      setPreviewLoading(false);
      setShowConfirmDialog(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Grupos de Filtros</h1>
        <div>
          <Link
            to="/filter-groups/new"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Nuevo Grupo de Filtros
          </Link>
        </div>
      </div>
      
      {/* Instrucciones */}
      <div className="bg-blue-50 p-4 rounded border border-blue-200">
        <h2 className="text-lg font-medium text-blue-800 mb-2">¿Cómo funciona?</h2>
        <ol className="list-decimal pl-5 text-blue-700 space-y-1">
          <li>Selecciona uno o más grupos de filtros (puedes combinarlos)</li>
          <li>Los leads que cumplen con los filtros se mostrarán automáticamente</li>
          <li>Selecciona agentes y campañas</li>
          <li>Haz clic en "Asignar Leads Automáticamente" para completar el proceso</li>
        </ol>
      </div>

      {/* Panel de selección de grupos de filtros */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Seleccione Grupos de Filtros para Asignar</h2>
        </div>

        {filterGroups.length > 0 ? (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="mr-2 font-medium">
                  {selectedFilterGroups.length} grupos seleccionados
                </span>
                {selectedFilterGroups.length > 0 && (
                  <button
                    onClick={() => setSelectedFilterGroups([])}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Limpiar selección
                  </button>
                )}
              </div>
            </div>
            
            {/* Mensajes de error o información */}
            {previewError && (
              <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
                {previewError}
              </div>
            )}
            {previewMessage && !previewError && (
              <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
                {previewMessage}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterGroups.map((group) => (
                <div 
                  key={group.id} 
                  className={`border rounded-lg p-4 transition-colors ${
                    selectedFilterGroups.includes(group.id) 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`group-${group.id}`}
                        checked={selectedFilterGroups.includes(group.id)}
                        onChange={(e) => handleFilterGroupSelection(group.id, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                      />
                      <label htmlFor={`group-${group.id}`} className="font-medium cursor-pointer">{group.name}</label>
                    </div>
                    <div className="flex space-x-1">
                      <Link
                        to={`/filter-groups/${group.id}`}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => setShowDeleteConfirm(group.id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  {group.description && (
                    <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                  )}
                  <div className="border-t border-gray-100 pt-2 mt-2">
                    {renderGroupFilters(group.filters)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500 mb-4">No hay grupos de filtros guardados.</p>
            <Link
              to="/filter-groups/new"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Crear primer grupo de filtros
            </Link>
          </div>
        )}
      </div>

      {/* Previsualización de leads */}
      {showPreviewLeads && previewLeads.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between">
            <h2 className="text-lg font-medium">Leads encontrados ({previewLeads.length})</h2>
            <button 
              className="text-blue-600 hover:text-blue-800 text-sm"
              onClick={() => setShowPreviewLeads(!showPreviewLeads)}
            >
              {showPreviewLeads ? "Ocultar leads" : "Mostrar leads"}
            </button>
          </div>
          
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNAE</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provincia</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Población</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previewLeads.slice(0, 10).map((lead) => (
                    <tr key={lead.id_lead} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{lead.id_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.nom_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.nom_empresarial_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.email_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.cnae_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.provincia_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.poblacio_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatMidaLead(lead.mida_lead)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {previewLeads.length > 10 && (
              <div className="mt-2 text-sm text-gray-500 text-center">
                Mostrando 10 de {previewLeads.length} leads encontrados.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Panel de asignación a campañas y agentes */}
      {selectedFilterGroups.length > 0 && previewLeads.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Asignar a Campañas y Agentes</h2>
          </div>
          
          <div className="p-4">
            <div className="bg-green-50 p-3 rounded border border-green-200 mb-4">
              <p className="text-green-800">
                <span className="font-medium">Listos para asignar:</span> {previewLeads.length} leads que cumplen con los filtros
              </p>
              <p className="text-xs text-green-700 mt-1">
                Selecciona los agentes y campañas a los que quieres asignar estos leads.
              </p>
            </div>
            
            {/* Resultado de la asignación */}
            {assignmentResult && (
              <div className={`p-4 rounded mb-4 ${
                assignmentResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                <p className="font-medium">{assignmentResult.message}</p>
                {assignmentResult.success && (
                  <p className="text-sm mt-1">
                    Se crearon {assignmentResult.totalSuccess} asignaciones con éxito.
                    {assignmentResult.totalError && assignmentResult.totalError > 0 && 
                      ` Hubo ${assignmentResult.totalError} errores.`}
                  </p>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Selección de agentes */}
              <div>
                <h3 className="text-md font-medium mb-3">Seleccionar Agentes</h3>
                <div className="border p-3 rounded max-h-60 overflow-y-auto">
                  {agents.length > 0 ? (
                    <div className="space-y-2">
                      {agents.map((agent) => (
                        <div key={agent.id_agent} className="p-2 hover:bg-gray-100">
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              name="agentIds" 
                              value={agent.id_agent}
                              onChange={(e) => {
                                const id = parseInt(e.target.value);
                                setSelectedAgents(prev => 
                                  e.target.checked 
                                    ? [...prev, id] 
                                    : prev.filter(agentId => agentId !== id)
                                );
                              }}
                              checked={selectedAgents.includes(agent.id_agent)}
                            />
                            <span>{agent.nom_agent}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-2">Cargando agentes...</p>
                  )}
                </div>
              </div>
              
              {/* Selección de campañas */}
              <div>
                <h3 className="text-md font-medium mb-3">Seleccionar Campañas</h3>
                <div className="border p-3 rounded max-h-60 overflow-y-auto">
                  {campanyas.length > 0 ? (
                    <div className="space-y-2">
                      {campanyas.map((campanya) => (
                        <div key={campanya.id_campanya} className="p-2 hover:bg-gray-100">
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              name="campanyaIds" 
                              value={campanya.id_campanya}
                              onChange={(e) => {
                                const id = parseInt(e.target.value);
                                setSelectedCampanyas(prev => 
                                  e.target.checked 
                                    ? [...prev, id] 
                                    : prev.filter(campanyaId => campanyaId !== id)
                                );
                              }}
                              checked={selectedCampanyas.includes(campanya.id_campanya)}
                            />
                            <span>{campanya.id_campanya} - {campanya.campanya_nom}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-2">Cargando campañas...</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Botón de asignar */}
            <div className="mt-6">
              <button 
                type="button"
                onClick={handleStartAssignment}
                disabled={
                  previewLoading || 
                  selectedFilterGroups.length === 0 || 
                  selectedAgents.length === 0 || 
                  selectedCampanyas.length === 0
                }
                className={`w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex justify-center items-center ${
                  previewLoading || 
                  selectedFilterGroups.length === 0 || 
                  selectedAgents.length === 0 || 
                  selectedCampanyas.length === 0
                    ? "bg-green-300 cursor-not-allowed"
                    : ""
                }`}
              >
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Asignar Leads Automáticamente
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Esta acción asignará los {previewLeads.length} leads seleccionados a los agentes y campañas elegidos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo de confirmación de asignación */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmar asignación</h3>
            <p className="mb-2">
              ¿Está seguro de que desea asignar los leads a los agentes y campañas seleccionados?
            </p>
            <p className="mb-6 text-sm text-gray-600">
              Esta acción asignará todos los leads que cumplan con los filtros seleccionados.
            </p>
            
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200 mb-4">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Resumen:</span>
              </p>
              <ul className="mt-1 text-sm text-yellow-700 list-disc pl-5">
                <li>Grupos de filtros: {selectedFilterGroups.length}</li>
                <li>Agentes seleccionados: {selectedAgents.length}</li>
                <li>Campañas seleccionadas: {selectedCampanyas.length}</li>
                <li>Leads afectados: {previewLeads.length}{previewLeads.length === 50 ? "+" : ""}</li>
              </ul>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAssignment}
                disabled={previewLoading}
                className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
                  previewLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {previewLoading ? "Procesando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmar eliminación</h3>
            <p className="mb-6">
              ¿Está seguro de que desea eliminar este grupo de filtros? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}