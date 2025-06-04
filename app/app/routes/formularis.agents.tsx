import React, { useState, useEffect } from 'react';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData, useRevalidator } from '@remix-run/react';
import type { Agent } from '~/lib/types';
import { AgentsService } from '~/services/agents.service';

export const loader: LoaderFunction = async () => {
  try {
    // Usamos la clase AgentsService para mantener consistencia
    const agents = await AgentsService.getAll();
    return json({ agents: agents || [], error: null });
  } catch (error) {
    console.error('Error loading agents:', error);
    return json({ agents: [], error: 'Error al cargar los agentes. Por favor, inténtelo de nuevo.' });
  }
};

type MessageType = {
  type: 'success' | 'error' | null;
  text: string | null;
};

export default function AgentsPage() {
  // Carga de datos y estado global
  const { agents: initialAgents, error } = useLoaderData<{ agents: Agent[]; error: string | null }>();
  const [agents, setAgents] = useState<Agent[]>(initialAgents || []);
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'edit'>('list');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState<MessageType>({ type: null, text: null });
  const [loading, setLoading] = useState(false);
  const revalidator = useRevalidator();

  // Formulario inicial vacío
  const initialForm: Omit<Agent, 'data_creacio_agent' | 'data_modificacio_agent'> = {
    id_agent: 0,
    nom_agent: '',
    contrasenya_agent: 'creixem123', // Valor por defecto
    data_alta_agent: new Date().toISOString().split('T')[0],
    data_baixa_agent: null,
    cognom1_agent: '',
    cognom2_agent: '',
    adreça_agent: '',
    codi_postal_agent: '',
    poblacio_agent: '',
    telefon_agent: '',
    mobil_agent: '',
    NIF_agent: '',
    seguretat_social_agent: '',
    compte_corrent_agent: '',
    Agents_nom_firma: '',
    observacions_agent: ''
  };

  const [formData, setFormData] = useState(initialForm);

  // Actualizar agents cuando cambien los datos iniciales
  useEffect(() => {
    setAgents(initialAgents || []);
  }, [initialAgents]);

  // Filtrar agentes según el término de búsqueda
  const filteredAgents = agents.filter((agent) => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    
    return (
      (agent.id_agent && agent.id_agent.toString().includes(searchTermLower)) ||
      (agent.nom_agent && agent.nom_agent.toLowerCase().includes(searchTermLower)) ||
      (agent.cognom1_agent && agent.cognom1_agent.toLowerCase().includes(searchTermLower)) ||
      (agent.NIF_agent && agent.NIF_agent.toLowerCase().includes(searchTermLower))
    );
  });

  // Resetear el formulario
  const resetForm = () => {
    setFormData(initialForm);
    setSelectedAgent(null);
  };

  // Manejador para cambios en inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Mostrar mensaje temporal
  const showMessage = (messageType: 'success' | 'error', messageText: string) => {
    setMessage({ type: messageType, text: messageText });
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      setMessage({ type: null, text: null });
    }, 5000);
  };

  // Manejador para crear un nuevo agente
  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nom_agent.trim()) {
      showMessage('error', 'El nombre del agente es obligatorio');
      return;
    }

    setLoading(true);
    setMessage({ type: null, text: null });
    
    try {
      // Eliminar el id_agent del objeto que se envía para crear
      const { id_agent, ...dataToSend } = formData;

      // Usamos la clase AgentsService en lugar de la función directa
      const result = await AgentsService.create(dataToSend);
      
      showMessage(
        'success',
        `Agente '${formData.nom_agent}' creado exitosamente con ID: ${result.id_agent}`
      );
      
      resetForm();
      setActiveTab('list');
      revalidator.revalidate();
    } catch (error) {
      console.error('Error creating agent:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear el agente.';
      showMessage('error', `Error al crear el agente: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Manejador para actualizar un agente
  const handleUpdateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAgent) {
      showMessage('error', 'No hay ningún agente seleccionado para actualizar');
      return;
    }

    if (!formData.nom_agent.trim()) {
      showMessage('error', 'El nombre del agente es obligatorio');
      return;
    }

    setLoading(true);
    setMessage({ type: null, text: null });
    
    try {
      // Asegurarse de que el ID es un número válido
      const agentId = Number(selectedAgent.id_agent);
      
      if (isNaN(agentId)) {
        throw new Error(`ID de agente inválido: ${selectedAgent.id_agent}`);
      }
      
      // No enviar el id_agent en el body de la petición
      const { id_agent, ...updateData } = formData;
      
      // Usamos la clase AgentsService en lugar de la función directa
      const result = await AgentsService.update(agentId, updateData);
      
      showMessage(
        'success',
        `Agente '${formData.nom_agent}' actualizado exitosamente`
      );
      
      setSelectedAgent(result);
      setActiveTab('list');
      revalidator.revalidate();
    } catch (error) {
      console.error('Error al actualizar el agente:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al actualizar el agente.';
      showMessage('error', `Error al actualizar el agente: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Manejador para eliminar un agente
  const handleDeleteAgent = async (agent: Agent) => {
    // Validar que el agente tenga un ID válido
    if (!agent || !agent.id_agent) {
      showMessage('error', 'Agente inválido');
      return;
    }

    const agentId = Number(agent.id_agent);
    
    if (isNaN(agentId)) {
      showMessage('error', `ID de agente inválido: ${agent.id_agent}`);
      return;
    }
    
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el agente "${agent.nom_agent}" (ID: ${agentId})? Esta acción no se puede deshacer.`)) {
      return;
    }

    setLoading(true);
    setMessage({ type: null, text: null });
    
    try {
      // Usamos la clase AgentsService en lugar de la función directa
      // La función delete retorna void, así que no esperamos un valor de retorno
      await AgentsService.delete(agentId);
      
      // Como no hay valor de retorno, consideramos que si no hay excepción, es exitoso
      showMessage('success', `Agente "${agent.nom_agent}" eliminado exitosamente.`);
      
      // Si el agente eliminado es el seleccionado actualmente, limpiamos la selección
      if (selectedAgent && selectedAgent.id_agent === agentId) {
        setSelectedAgent(null);
        resetForm();
        if (activeTab === 'edit') {
          setActiveTab('list');
        }
      }
      
      revalidator.revalidate();
    } catch (error) {
      console.error(`Error al eliminar agente ${agentId}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al eliminar el agente.';
      showMessage('error', `Error al eliminar el agente: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos de un agente en el formulario
  const loadAgentToForm = (agent: Agent) => {
    if (!agent) return;
    
    setFormData({
      id_agent: agent.id_agent || 0,
      nom_agent: agent.nom_agent || '',
      contrasenya_agent: agent.contrasenya_agent || 'creixem123',
      data_alta_agent: agent.data_alta_agent ? new Date(agent.data_alta_agent).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      data_baixa_agent: agent.data_baixa_agent ? new Date(agent.data_baixa_agent).toISOString().split('T')[0] : null,
      cognom1_agent: agent.cognom1_agent || '',
      cognom2_agent: agent.cognom2_agent || '',
      adreça_agent: agent.adreça_agent || '',
      codi_postal_agent: agent.codi_postal_agent || '',
      poblacio_agent: agent.poblacio_agent || '',
      telefon_agent: agent.telefon_agent || '',
      mobil_agent: agent.mobil_agent || '',
      NIF_agent: agent.NIF_agent || '',
      seguretat_social_agent: agent.seguretat_social_agent || '',
      compte_corrent_agent: agent.compte_corrent_agent || '',
      Agents_nom_firma: agent.Agents_nom_firma || '',
      observacions_agent: agent.observacions_agent || ''
    });
  };

  // Manejador para seleccionar un agente
  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    loadAgentToForm(agent);
  };

  // Renderizado de componentes
  return (
    <div className="agents-container p-4 md:p-6 max-w-screen-2xl mx-auto">
      {/* Header con título y navegación de pestañas */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Agentes</h2>
        
        <div className="flex border border-gray-300 rounded-lg bg-white shadow-sm">
          <button
            className={`py-2 px-4 font-medium rounded-l-lg transition-all ${
              activeTab === 'list' 
                ? 'bg-primary-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('list')}
            disabled={loading}
            aria-pressed={activeTab === 'list'}
          >
            Lista
          </button>
          <button
            className={`py-2 px-4 font-medium border-l border-gray-300 transition-all ${
              activeTab === 'new' 
                ? 'bg-primary-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => { 
              setActiveTab('new'); 
              setSelectedAgent(null); 
              resetForm(); 
            }}
            disabled={loading}
            aria-pressed={activeTab === 'new'}
          >
            Nuevo
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-r-lg border-l border-gray-300 transition-all ${
              activeTab === 'edit' 
                ? 'bg-primary-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            } ${
              !selectedAgent ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => {
              if (selectedAgent) {
                loadAgentToForm(selectedAgent);
                setActiveTab('edit');
              }
            }}
            disabled={!selectedAgent || loading}
            aria-pressed={activeTab === 'edit'}
          >
            Editar
          </button>
        </div>
      </div>
      
      {/* Mensajes de alerta */}
      {message.type && (
        <div className={`mb-4 p-4 rounded-lg shadow-sm ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}
        role="alert"
        aria-live="polite"
        >
          {message.text}
        </div>
      )}

      {error && !message.text && (
        <div className="mb-4 p-4 rounded-lg shadow-sm bg-red-50 text-red-700 border border-red-200"
        role="alert">
          {error}
        </div>
      )}

      {/* Vista de Lista */}
      {activeTab === 'list' && (
        <div>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Columna izquierda: Búsqueda y tabla de agentes */}
            <div className="lg:w-3/5 space-y-4">
              <div className="flex items-center bg-white rounded-lg shadow-sm p-2 border border-gray-200">
                <input
                  type="text"
                  placeholder="Buscar agente por ID, nombre, apellido o NIF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border-0 focus:outline-none focus:ring-0"
                  disabled={loading}
                  aria-label="Buscar agentes"
                />
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
              </div>

              {loading && agents.length === 0 && (
                <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                  Cargando agentes...
                </div>
              )}

              {!loading && filteredAgents.length === 0 && agents.length > 0 && (
                <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                  No se encontraron agentes con los criterios de búsqueda.
                </div>
              )}

              {!loading && agents.length === 0 && !error && (
                <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                  Aún no hay agentes registrados. ¡Crea uno nuevo!
                </div>
              )}

              {filteredAgents.length > 0 && (
                <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Apellidos</th>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Alta</th>
                        <th scope="col" className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredAgents.map((agent) => {
                        const fechaAlta = agent.data_alta_agent ? new Date(agent.data_alta_agent).toLocaleDateString() : '-';
                        const apellidos = `${agent.cognom1_agent || ''} ${agent.cognom2_agent || ''}`.trim() || '-';
                        
                        return (
                          <tr 
                            key={`agent-${agent.id_agent}`} 
                            className={`${
                              selectedAgent?.id_agent === agent.id_agent 
                                ? 'bg-primary-50' 
                                : 'hover:bg-gray-50'
                            } cursor-pointer transition-colors`}
                            onClick={() => handleSelectAgent(agent)}
                          >
                            <td className="py-3 px-4 whitespace-nowrap text-sm">{agent.id_agent}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{agent.nom_agent}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">{apellidos}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">{fechaAlta}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-3">
                                <button
                                  type="button"
                                  className="text-primary-600 hover:text-primary-800 font-medium disabled:opacity-50 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectAgent(agent);
                                    setActiveTab('edit');
                                  }}
                                  disabled={loading}
                                  aria-label={`Editar agente ${agent.nom_agent}`}
                                >
                                  Editar
                                </button>
                                <button
                                  type="button"
                                  className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAgent(agent);
                                  }}
                                  disabled={loading}
                                  aria-label={`Eliminar agente ${agent.nom_agent}`}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Columna derecha: Detalles del agente seleccionado */}
            <div className="lg:w-2/5">
              {selectedAgent ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-gray-700">
                      Detalles del Agente
                    </h4>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      ID: {selectedAgent.id_agent}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Nombre</h5>
                      <p className="text-sm font-medium">{selectedAgent.nom_agent}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Apellidos</h5>
                      <p className="text-sm font-medium">
                        {`${selectedAgent.cognom1_agent || ''} ${selectedAgent.cognom2_agent || ''}`.trim() || '-'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">NIF</h5>
                      <p className="text-sm font-medium">{selectedAgent.NIF_agent || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Fecha Alta</h5>
                      <p className="text-sm font-medium">
                        {selectedAgent.data_alta_agent ? new Date(selectedAgent.data_alta_agent).toLocaleDateString() : '-'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Dirección</h5>
                      <p className="text-sm">{selectedAgent.adreça_agent || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Población</h5>
                      <p className="text-sm">{selectedAgent.poblacio_agent || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Código Postal</h5>
                      <p className="text-sm">{selectedAgent.codi_postal_agent || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Fecha Creación</h5>
                      <p className="text-sm">
                        {selectedAgent.data_creacio_agent ? new Date(selectedAgent.data_creacio_agent).toLocaleString() : '-'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Teléfono</h5>
                      <p className="text-sm">{selectedAgent.telefon_agent || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Móvil</h5>
                      <p className="text-sm">{selectedAgent.mobil_agent || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Seg. Social</h5>
                      <p className="text-sm">{selectedAgent.seguretat_social_agent || '-'}</p>
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Cuenta Corriente</h5>
                      <p className="text-sm">{selectedAgent.compte_corrent_agent || '-'}</p>
                    </div>
                  </div>
                  
                  {selectedAgent.observacions_agent && (
                    <div className="space-y-1">
                      <h5 className="text-xs uppercase text-gray-500 font-semibold">Observaciones</h5>
                      <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100">{selectedAgent.observacions_agent}</p>
                    </div>
                  )}
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded border border-primary-200 hover:bg-primary-100 transition-colors"
                      onClick={() => {
                        loadAgentToForm(selectedAgent);
                        setActiveTab('edit');
                      }}
                      disabled={loading}
                    >
                      Editar Agente
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="flex justify-center mb-3">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Ningún agente seleccionado</h4>
                  <p className="text-gray-500 text-sm">Selecciona un agente de la lista para ver sus detalles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Formulario Nuevo Agente */}
      {activeTab === 'new' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-700 border-b border-gray-200 pb-3">Crear Nuevo Agente</h3>
          <form onSubmit={handleCreateAgent} className="space-y-6">
            {/* Información Básica */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Información Básica</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="nom_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom_agent"
                    id="nom_agent"
                    value={formData.nom_agent}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="cognom1_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Primer Apellido
                  </label>
                  <input
                    type="text"
                    name="cognom1_agent"
                    id="cognom1_agent"
                    value={formData.cognom1_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="cognom2_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Segundo Apellido
                  </label>
                  <input
                    type="text"
                    name="cognom2_agent"
                    id="cognom2_agent"
                    value={formData.cognom2_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Datos de Acceso */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Datos de Acceso</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contrasenya_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="contrasenya_agent"
                    id="contrasenya_agent"
                    value={formData.contrasenya_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="data_alta_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Alta
                  </label>
                  <input
                    type="date"
                    name="data_alta_agent"
                    id="data_alta_agent"
                    value={formData.data_alta_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Datos de Contacto */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Datos de Contacto</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="adreça_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="adreça_agent"
                    id="adreça_agent"
                    value={formData.adreça_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="poblacio_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Población
                  </label>
                  <input
                    type="text"
                    name="poblacio_agent"
                    id="poblacio_agent"
                    value={formData.poblacio_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="codi_postal_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    name="codi_postal_agent"
                    id="codi_postal_agent"
                    value={formData.codi_postal_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="telefon_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefon_agent"
                    id="telefon_agent"
                    value={formData.telefon_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="mobil_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Móvil
                  </label>
                  <input
                    type="tel"
                    name="mobil_agent"
                    id="mobil_agent"
                    value={formData.mobil_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="NIF_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    NIF
                  </label>
                  <input
                    type="text"
                    name="NIF_agent"
                    id="NIF_agent"
                    value={formData.NIF_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Datos Laborales */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Datos Laborales</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="seguretat_social_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Número Seguridad Social
                  </label>
                  <input
                    type="text"
                    name="seguretat_social_agent"
                    id="seguretat_social_agent"
                    value={formData.seguretat_social_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="compte_corrent_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Cuenta Corriente
                  </label>
                  <input
                    type="text"
                    name="compte_corrent_agent"
                    id="compte_corrent_agent"
                    value={formData.compte_corrent_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="Agents_nom_firma" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre para Firma
                  </label>
                  <input
                    type="text"
                    name="Agents_nom_firma"
                    id="Agents_nom_firma"
                    value={formData.Agents_nom_firma}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Observaciones */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Observaciones</legend>
              <textarea
                name="observacions_agent"
                id="observacions_agent"
                value={formData.observacions_agent}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </fieldset>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => { 
                  resetForm(); 
                  setActiveTab('list'); 
                }}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors"
              >
                Limpiar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Guardando...' : 'Guardar Agente'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Formulario Editar Agente */}
      {activeTab === 'edit' && selectedAgent && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
            <h3 className="text-xl font-semibold text-gray-700">Editar Agente</h3>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              ID: {selectedAgent.id_agent}
            </span>
          </div>
          
          <form onSubmit={handleUpdateAgent} className="space-y-6">
            {/* Información Básica */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Información Básica</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="edit_nom_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom_agent"
                    id="edit_nom_agent"
                    value={formData.nom_agent}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="edit_cognom1_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Primer Apellido
                  </label>
                  <input
                    type="text"
                    name="cognom1_agent"
                    id="edit_cognom1_agent"
                    value={formData.cognom1_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_cognom2_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Segundo Apellido
                  </label>
                  <input
                    type="text"
                    name="cognom2_agent"
                    id="edit_cognom2_agent"
                    value={formData.cognom2_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Datos de Acceso */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Datos de Acceso</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="edit_contrasenya_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="contrasenya_agent"
                    id="edit_contrasenya_agent"
                    value={formData.contrasenya_agent}
                    onChange={handleInputChange}
                    placeholder="Dejar en blanco para no cambiar"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_data_alta_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Alta
                  </label>
                  <input
                    type="date"
                    name="data_alta_agent"
                    id="edit_data_alta_agent"
                    value={formData.data_alta_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Datos de Contacto */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Datos de Contacto</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label htmlFor="edit_adreça_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    name="adreça_agent"
                    id="edit_adreça_agent"
                    value={formData.adreça_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_poblacio_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Población
                  </label>
                  <input
                    type="text"
                    name="poblacio_agent"
                    id="edit_poblacio_agent"
                    value={formData.poblacio_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_codi_postal_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    name="codi_postal_agent"
                    id="edit_codi_postal_agent"
                    value={formData.codi_postal_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="edit_telefon_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefon_agent"
                    id="edit_telefon_agent"
                    value={formData.telefon_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_mobil_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Móvil
                  </label>
                  <input
                    type="tel"
                    name="mobil_agent"
                    id="edit_mobil_agent"
                    value={formData.mobil_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_NIF_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    NIF
                  </label>
                  <input
                    type="text"
                    name="NIF_agent"
                    id="edit_NIF_agent"
                    value={formData.NIF_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Datos Laborales */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Datos Laborales</legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="edit_seguretat_social_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Número Seguridad Social
                  </label>
                  <input
                    type="text"
                    name="seguretat_social_agent"
                    id="edit_seguretat_social_agent"
                    value={formData.seguretat_social_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_compte_corrent_agent" className="block text-sm font-medium text-gray-700 mb-1">
                    Cuenta Corriente
                  </label>
                  <input
                    type="text"
                    name="compte_corrent_agent"
                    id="edit_compte_corrent_agent"
                    value={formData.compte_corrent_agent}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="edit_Agents_nom_firma" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre para Firma
                  </label>
                  <input
                    type="text"
                    name="Agents_nom_firma"
                    id="edit_Agents_nom_firma"
                    value={formData.Agents_nom_firma}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Observaciones */}
            <fieldset className="p-4 rounded border border-gray-100 bg-gray-50">
              <legend className="text-lg font-medium mb-4 text-gray-600">Observaciones</legend>
              <textarea
                name="observacions_agent"
                id="edit_observacions_agent"
                value={formData.observacions_agent}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </fieldset>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => { 
                  setActiveTab('list'); 
                }}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit" 
                disabled={loading}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Actualizando...' : 'Actualizar Agente'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}