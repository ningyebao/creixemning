// app/routes/assignments.tsx
import { useState, useEffect } from 'react';
import { json, type LoaderFunction, type ActionFunction } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import type { Lead, Agent, Campanya, LeadFilters } from '~/lib/types';
import { LeadService } from '~/services/leads.service';
import { AgentsService } from '~/services/agents.service';
import { CampanyaService } from '~/services/campanya.service';
import { AssignacioService } from '~/services/assignacio.service';
import { FilterGroupService } from '~/services/filter-group.services';
import { handleApiError } from '~/lib/api/client';

import FilterPanel from './assignments.filter-panel';
import LeadList from './assignments.lead-list';
import AgentSelection from './assignments.agent-selection';
import AutoFilter from './assignments.auto-filter';
import SavedFilters from './assignments.saved-filters';
import FilterActions from './assignments.filter-actions';

interface LoaderData {
  agents: Agent[];
  campanyas: Campanya[];
  initialLeads: Lead[];
}

type ActionData = {
  success?: boolean;
  message?: string;
  error?: string;
  type?: 'success' | 'error' | 'info';
};

export const loader: LoaderFunction = async () => {
  try {
    const [agents, campanyas, initialLeads] = await Promise.all([
      AgentsService.getAll(),
      CampanyaService.getAll(),
      LeadService.getUnassigned(0, 20)
    ]);

    return json<LoaderData>({
      agents,
      campanyas,
      initialLeads
    });
  } catch (error) {
    console.error('Error en loader de assignments:', error);
    return handleApiError(error);
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get('action') as string;

  try {
    if (action === 'assignLeads') {
      const leadIds = JSON.parse(formData.get('leadIds') as string) as number[];
      const agentIds = JSON.parse(formData.get('agentIds') as string) as number[];
      const assignmentType = formData.get('assignmentType') as string;
      const prioritat = Number(formData.get('prioritat'));
      const potencial = Number(formData.get('potencial'));
      const observaciones = formData.get('observaciones') as string;
      const campanyaId = Number(formData.get('campanyaId'));
      const authorId = Number(formData.get('authorId') || 1);

      if (leadIds.length === 0 || agentIds.length === 0) {
        return json<ActionData>({
          success: false,
          error: 'Debes seleccionar al menos un lead y un agente para realizar la asignación.'
        });
      }

      let result;
      
      if (assignmentType === 'roundRobin') {
        result = await AssignacioService.bulkAssign(
          agentIds, leadIds, prioritat, potencial, observaciones, campanyaId, authorId
        );
      } else if (assignmentType === 'all') {
        result = await AssignacioService.bulkAssignAll(
          agentIds, leadIds, prioritat, potencial, observaciones, campanyaId, authorId
        );
      } else {
        return json<ActionData>({
          success: false,
          error: 'Tipo de asignación no válido.'
        });
      }

      if (result.error > 0) {
        return json<ActionData>({
          success: result.success > 0,
          message: `Se asignaron ${result.success} leads correctamente.`,
          error: `Ocurrieron ${result.error} errores: ${result.errorDetails}`
        });
      }

      return json<ActionData>({
        success: true,
        message: `Se asignaron ${result.success} leads correctamente.`
      });
    }

    if (action === 'notification') {
      const type = formData.get('type') as 'success' | 'error' | 'info';
      const message = formData.get('message') as string;
      
      return json<ActionData>({
        success: type === 'success',
        message: type === 'success' || type === 'info' ? message : undefined,
        error: type === 'error' ? message : undefined,
        type
      });
    }

    return json<ActionData>({
      success: false,
      error: 'Acción no reconocida.'
    });
  } catch (error) {
    console.error('Error en action de assignments:', error);
    return handleApiError(error);
  }
};

export default function Assignments() {
  const loaderData = useLoaderData<LoaderData>();
  const fetcher = useFetcher<ActionData>();
  
  // Estados
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<Agent[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(loaderData.initialLeads);
  const [activeFilters, setActiveFilters] = useState<LeadFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCampanya, setSelectedCampanya] = useState<number | null>(null);
  const [assignmentType, setAssignmentType] = useState<'roundRobin' | 'all'>('roundRobin');
  const [prioritat, setPrioritat] = useState<number>(2);
  const [potencial, setPotencial] = useState<number>(3);
  const [observaciones, setObservaciones] = useState<string>('');
  const [showAutoFilterConfig, setShowAutoFilterConfig] = useState(false);
  const [filterError, setFilterError] = useState<string | null>(null);
  const [showSavedFilters, setShowSavedFilters] = useState(false);

  // Aplicar filtros
  const applyFilters = async (filters: LeadFilters) => {
    setIsLoading(true);
    
    // Asegurar que activeFilters se actualiza correctamente primero
    setActiveFilters(filters);
    setFilterError(null);
    
    try {
      const apiFilters: Record<string, any> = {};
      
      // Procesamiento más preciso de los filtros
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          if (key === 'any_creacio_lead') {
            apiFilters[key] = String(value);
          }
          else if (['actiu_lead', 'cotitza_borsa_lead', 'nomes_temporada_lead', 
                    'conciencia_ecologica_lead', 'solidaria_social_lead'].includes(key)) {
            // Asegurarnos de enviar valores booleanos reales
            apiFilters[key] = typeof value === 'string' 
              ? value === 'true' 
              : Boolean(value);
          }
          else if (['mida_lead', 'nombre_treballadors_lead_min', 'nombre_treballadors_lead_max',
                    'capital_social_lead_min', 'capital_social_lead_max'].includes(key)) {
            apiFilters[key] = Number(value);
          }
          else {
            apiFilters[key] = value;
          }
        }
      });
      
      console.log('Aplicando filtros:', apiFilters);
      console.log('Active filters actualizados:', filters); // Log para debug
      
      // Llamada al servicio con los filtros procesados
      const leads = await LeadService.getUnassigned(0, 100, apiFilters);
      setFilteredLeads(leads);
      
      if (leads.length === 0) {
        setFilterError('No se encontraron leads con los filtros aplicados.');
      }
      
      setSelectedLeads([]);
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
      setFilterError('Error al consultar los datos. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar la asignación
  const handleAssign = () => {
    if (selectedLeads.length === 0 || selectedAgents.length === 0 || !selectedCampanya) {
      return;
    }

    const formData = new FormData();
    formData.append('action', 'assignLeads');
    formData.append('leadIds', JSON.stringify(selectedLeads.map(lead => lead.id_lead)));
    formData.append('agentIds', JSON.stringify(selectedAgents.map(agent => agent.id_agent)));
    formData.append('assignmentType', assignmentType);
    formData.append('prioritat', prioritat.toString());
    formData.append('potencial', potencial.toString());
    formData.append('observaciones', observaciones);
    formData.append('campanyaId', selectedCampanya.toString());

    fetcher.submit(formData, { method: 'post' });
  };

  // Guardar grupo de filtros
  const handleSaveFilterGroup = (name: string, description: string) => {
    if (!name.trim()) return;

    // Usar el servicio para guardar los filtros
    FilterGroupService.create(name, description, activeFilters)
      .then((response) => {
        // Mostrar mensaje de éxito
        console.log('Grupo de filtros guardado:', response);
        
        // Usar fetcher para mostrar un mensaje de éxito
        const formData = new FormData();
        formData.append('action', 'notification');
        formData.append('type', 'success');
        formData.append('message', `Grupo de filtros "${name}" guardado correctamente.`);
        fetcher.submit(formData, { method: 'post' });
      })
      .catch((error) => {
        console.error('Error al guardar grupo de filtros:', error);
        
        // Mostrar mensaje de error
        const formData = new FormData();
        formData.append('action', 'notification');
        formData.append('type', 'error');
        formData.append('message', 'No se pudo guardar el grupo de filtros. Por favor, inténtelo de nuevo.');
        fetcher.submit(formData, { method: 'post' });
      });
  };

  // Actualizar después de asignación exitosa
  useEffect(() => {
    if (fetcher.data?.success && fetcher.data?.type !== 'success') {
      applyFilters(activeFilters);
    }
  }, [fetcher.data]);

  // Contar filtros activos
  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-5">
            <h1 className="text-2xl font-bold text-gray-900">Asignación de Leads</h1>
            <p className="mt-1 text-sm text-gray-500">
              Busca, filtra y asigna leads a tus agentes comerciales
            </p>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      {(fetcher.data?.message || fetcher.data?.error) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          {fetcher.data?.message && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center mb-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {fetcher.data.message}
            </div>
          )}
          {fetcher.data?.error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {fetcher.data.error}
            </div>
          )}
        </div>
      )}

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Panel lateral - Filtros y acciones */}
          <div className="lg:col-span-3 space-y-4">
            {/* Panel de filtros */}
            <FilterPanel 
              onApplyFilters={applyFilters} 
              initialFilters={activeFilters} 
              isLoading={isLoading}
              activeFilterCount={activeFilterCount}
            />

            {/* Acciones de filtros - Usando el nuevo componente */}
            <FilterActions 
              activeFilters={activeFilters}
              onSaveFilters={handleSaveFilterGroup}
              onToggleAutoFilter={() => setShowAutoFilterConfig(!showAutoFilterConfig)}
              onToggleSavedFilters={() => setShowSavedFilters(!showSavedFilters)}
              showAutoFilter={showAutoFilterConfig}
              showSavedFilters={showSavedFilters}
            />

            {/* Error de filtros */}
            {filterError && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md">
                <p className="text-sm">{filterError}</p>
              </div>
            )}

            {/* Panel de filtros guardados */}
            {showSavedFilters && (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100">
                  <h3 className="text-base font-medium text-indigo-800">Filtros guardados</h3>
                </div>
                <div className="p-4">
                  <SavedFilters onSelectFilter={applyFilters} />
                </div>
              </div>
            )}

            {/* Panel de automatización */}
            {showAutoFilterConfig && (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100">
                  <h3 className="text-base font-medium text-indigo-800">Automatización de filtros</h3>
                </div>
                <div className="p-4">
                  <AutoFilter 
                    selectedFilters={activeFilters}
                    agents={loaderData.agents}
                    campanyas={loaderData.campanyas}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Panel principal - Resultados y configuración */}
          <div className="lg:col-span-9 space-y-6">
            {/* Lista de leads */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    Leads disponibles
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {filteredLeads.length} leads encontrados • {selectedLeads.length} seleccionados
                  </p>
                </div>
                {isLoading && (
                  <div className="flex items-center text-blue-600">
                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cargando...
                  </div>
                )}
              </div>
              
              <LeadList 
                leads={filteredLeads}
                selectedLeads={selectedLeads}
                onSelectLeads={setSelectedLeads}
                isLoading={isLoading}
              />
            </div>

            {/* Panel de asignación */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">
                  Configurar asignación
                </h2>
              </div>
              
              <div className="p-4">
                <AgentSelection 
                  agents={loaderData.agents}
                  campanyas={loaderData.campanyas}
                  selectedAgents={selectedAgents}
                  onSelectAgents={setSelectedAgents}
                  selectedCampanya={selectedCampanya}
                  onSelectCampanya={setSelectedCampanya}
                  assignmentType={assignmentType}
                  onChangeAssignmentType={setAssignmentType}
                  prioritat={prioritat}
                  onChangePrioritat={setPrioritat}
                  potencial={potencial}
                  onChangePotencial={setPotencial}
                  observaciones={observaciones}
                  onChangeObservaciones={setObservaciones}
                />

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
                    onClick={handleAssign}
                    disabled={selectedLeads.length === 0 || selectedAgents.length === 0 || !selectedCampanya || fetcher.state !== 'idle'}
                  >
                    {fetcher.state !== 'idle' ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Asignando...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Asignar {selectedLeads.length} leads a {selectedAgents.length} agentes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}