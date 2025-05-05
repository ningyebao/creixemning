import React, { useState, useEffect } from 'react';
import { LoaderFunction, json, ActionFunction, redirect } from '@remix-run/node';
import { useLoaderData, useSubmit, Form } from '@remix-run/react';
import type { Agent } from '~/lib/types';
import { AgentService } from '~/services/agents.service';
import { handleApiError } from '~/lib/api/client';

export const loader: LoaderFunction = async () => {
  try {
    const agents = await AgentService.getAll();
    return json({ agents, error: null });
  } catch (error) {
    console.error('Error loading agents:', error);
    return json({ agents: [], error: 'Error al cargar los agentes. Por favor, inténtelo de nuevo.' });
  }
};

// Función de ayuda para convertir los datos del formulario
const processFormData = (formData: FormData) => {
  // Función auxiliar para manejar valores posiblemente nulos
  const getValue = (key: string): string | undefined => {
    const value = formData.get(key);
    // Si el valor es null, undefined o una cadena vacía, devolvemos null
    return value !== null && value !== undefined && value !== '' ? String(value) : undefined;
  };

  // Para el caso de creación de nuevo agente, necesitamos manejar la contraseña
  const isNewAgent = formData.get('_action') === 'create';
  
  // Si estamos creando un nuevo agente y no hay contraseña, creamos una por defecto
  // Si estamos actualizando, no modificamos la contraseña existente (la API debería mantenerla)
  const contrasenya = isNewAgent 
    ? getValue('contrasenya_agent') || 'password_temporal'  // Valor por defecto
    : undefined;  // undefined para que no se actualice en caso de edición

  return {
    nom_agent: getValue('nom_agent') || '',
    cognom1_agent: getValue('cognom1_agent') || '',
    cognom2_agent: getValue('cognom2_agent'),
    adreça_agent: getValue('adreça_agent'),
    codi_postal_agent: getValue('codi_postal_agent'),
    poblacio_agent: getValue('poblacio_agent'),
    telefon_agent: getValue('telefon_agent'),
    mobil_agent: getValue('mobil_agent') || '',
    NIF_agent: getValue('NIF_agent') || '',
    seguretat_social_agent: getValue('seguretat_social_agent'),
    compte_corrent_agent: getValue('compte_corrent_agent'),
    Agents_nom_firma: getValue('Agents_nom_firma'),
    data_alta_agent: getValue('data_alta_agent') || new Date().toISOString().split('T')[0],
    observacions_agent: getValue('observacions_agent'),
    ...(contrasenya !== undefined && { contrasenya_agent: contrasenya })
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get('_action');

  try {
    if (action === 'delete') {
      const agentId = Number(formData.get('agentId'));
      await AgentService.delete(agentId);
      return json({ success: true, message: 'Agente eliminado correctamente' });
    } else if (action === 'edit') {
      const agentId = Number(formData.get('agentId'));
      const agentData = processFormData(formData);
      
      await AgentService.update(agentId, agentData);
      return redirect('/agents');
    } else if (action === 'create') {
      const agentData = processFormData(formData);
      
      await AgentService.create(agentData);
      return redirect('/agents');
    }
  } catch (error) {
    return handleApiError(error);
  }

  return null;
};

export default function AgentsPage() {
  const { agents, error } = useLoaderData<{ agents: Agent[]; error: string | null }>();
  const submit = useSubmit();

  const [activeTab, setActiveTab] = useState('list');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    nom_agent: '',
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
    data_alta_agent: new Date().toISOString().split('T')[0],
    data_baixa_agent: null as string | null,
    observacions_agent: ''
  });
  const [message, setMessage] = useState<{ type: string | null; text: string | null }>({
    type: null,
    text: null
  });
  const [loading, setLoading] = useState(false);

  // Reset form when changing tabs
  useEffect(() => {
    if (activeTab === 'new') {
      resetForm();
    } else if (activeTab === 'edit' && selectedAgent) {
      populateEditForm(selectedAgent);
    }
  }, [activeTab, selectedAgent]);

  const populateEditForm = (agent: Agent) => {
    setFormData({
      nom_agent: agent.nom_agent || '',
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
      data_alta_agent: agent.data_alta_agent ? new Date(agent.data_alta_agent).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      data_baixa_agent: agent.data_baixa_agent ? new Date(agent.data_baixa_agent).toISOString().split('T')[0] : null,
      observacions_agent: agent.observacions_agent || ''
    });
  };

  const handleDeleteClick = (agent: Agent) => {
    setAgentToDelete(agent);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!agentToDelete) return;
    
    const formData = new FormData();
    formData.append('_action', 'delete');
    formData.append('agentId', agentToDelete.id_agent.toString());
    
    submit(formData, { method: 'post' });
    setShowDeleteModal(false);
    setAgentToDelete(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const submitData = new FormData(e.target as HTMLFormElement);
    
    if (activeTab === 'edit' && selectedAgent) {
      submitData.append('_action', 'edit');
      submitData.append('agentId', selectedAgent.id_agent.toString());
    } else {
      submitData.append('_action', 'create');
    }
    
    submit(submitData, { method: 'post' });
  };

  const resetForm = () => {
    setFormData({
      nom_agent: '',
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
      data_alta_agent: new Date().toISOString().split('T')[0],
      data_baixa_agent: null,
      observacions_agent: ''
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="agents-container">
      <h2 className="text-xl font-semibold mb-4">Gestión de Agentes</h2>

      {message.type && (
        <div
          className={`mb-4 p-4 rounded ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 rounded bg-red-100 text-red-700">{error}</div>
      )}

      <div className="flex border-b border-gray-200">
        <button
          className={`py-2 px-4 ${
            activeTab === 'list'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('list')}
        >
          Lista de Agentes
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'new'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('new')}
        >
          Nuevo Agente
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'edit'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => activeTab !== 'edit' && selectedAgent && setActiveTab('edit')}
          disabled={!selectedAgent}
        >
          Editar Agente
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'list' && (
          <div>
            <h3 className="text-lg font-medium mb-2">Lista de Agentes</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">
                      ID
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">
                      Nombre
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">
                      Teléfono
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">
                      Móvil
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">
                      NIF
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">
                      Activo
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => {
                    const nombreCompleto = `${agent.nom_agent || ''} ${
                      agent.cognom1_agent || ''
                    } ${agent.cognom2_agent || ''}`.trim();
                    const activo = !agent.data_baixa_agent;

                    return (
                      <tr key={agent.id_agent} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-200">
                          {agent.id_agent}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {nombreCompleto}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {agent.telefon_agent}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {agent.mobil_agent}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {agent.NIF_agent}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {activo ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Activo
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Inactivo
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <button
                            className="text-primary-600 hover:text-primary-800 mr-2"
                            onClick={() => {
                              setSelectedAgent(agent);
                              setActiveTab('edit');
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteClick(agent)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(activeTab === 'new' || activeTab === 'edit') && (
          <div>
            <h3 className="text-lg font-medium mb-4">
              {activeTab === 'new' ? 'Crear Nuevo Agente' : `Editar Agente: ${selectedAgent?.nom_agent} ${selectedAgent?.cognom1_agent}`}
            </h3>

            <Form method="post" onSubmit={handleFormSubmit} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Datos Personales</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nom_agent"
                      value={formData.nom_agent}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primer Apellido *
                    </label>
                    <input
                      type="text"
                      name="cognom1_agent"
                      value={formData.cognom1_agent}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Segundo Apellido
                    </label>
                    <input
                      type="text"
                      name="cognom2_agent"
                      value={formData.cognom2_agent}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Información de Contacto</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="adreça_agent"
                      value={formData.adreça_agent}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      name="codi_postal_agent"
                      value={formData.codi_postal_agent}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Población
                    </label>
                    <input
                      type="text"
                      name="poblacio_agent"
                      value={formData.poblacio_agent}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono Fijo
                    </label>
                    <input
                      type="text"
                      name="telefon_agent"
                      value={formData.telefon_agent}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono Móvil *
                    </label>
                    <input
                      type="text"
                      name="mobil_agent"
                      value={formData.mobil_agent}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Información Administrativa</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIF/NIE *
                    </label>
                    <input
                      type="text"
                      name="NIF_agent"
                      value={formData.NIF_agent}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seguridad Social
                    </label>
                    <input
                      type="text"
                      name="seguretat_social_agent"
                      value={formData.seguretat_social_agent}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cuenta Corriente
                    </label>
                    <input
                      type="text"
                      name="compte_corrent_agent"
                      value={formData.compte_corrent_agent}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de Firma
                    </label>
                    <input
                      type="text"
                      name="Agents_nom_firma"
                      value={formData.Agents_nom_firma}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Alta
                    </label>
                    <input
                      type="date"
                      name="data_alta_agent"
                      value={formData.data_alta_agent}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Observaciones</h4>
                <textarea
                  name="observacions_agent"
                  value={formData.observacions_agent}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Limpiar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : activeTab === 'new' ? 'Crear Agente' : 'Actualizar Agente'}
                </button>
              </div>
            </Form>
          </div>
        )}
      </div>

      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Confirmar eliminación</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ¿Estás seguro de que deseas eliminar al agente {agentToDelete?.nom_agent} {agentToDelete?.cognom1_agent}? Esta acción no se puede deshacer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Eliminar
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}