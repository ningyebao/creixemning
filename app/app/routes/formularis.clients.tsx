// app/routes/clients.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Client } from '~/lib/types';
import { ClientsService } from '~/services/clients.service';

// Tipos para datos de teléfono y formulario
interface PhoneData {
  numero: string;
  tipo: 'móvil' | 'fijo' | 'trabajo' | 'otro';
}

interface FormData {
  nom_client: string;
  telefon1_client: PhoneData;
  telefon2_client: PhoneData;
  actiu_client: boolean;
  especial_client: boolean;
  observacions_client: string;
  prioridad: 'Baja' | 'Media' | 'Alta';
}

// Loader utilizando el servicio unificado
export const loader: LoaderFunction = async () => {
  try {
    const clients = await ClientsService.getAll();
    return json({ clients, error: null });
  } catch (error) {
    console.error('Error loading clients:', error);
    return json({
      clients: [],
      error: 'Error al cargar los clientes. Por favor, inténtelo de nuevo.'
    });
  }
};

export default function ClientsPage() {
  const { clients, error } = useLoaderData<{ clients: Client[]; error: string | null }>();

  // Estado para manejar la lista local y actualizaciones en caliente
  const [clientsList, setClientsList] = useState<Client[]>(clients);
  // Para saber qué botón de eliminar está en proceso
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'edit'>('list');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nom_client: '',
    telefon1_client: { numero: '', tipo: 'móvil' },
    telefon2_client: { numero: '', tipo: 'móvil' },
    actiu_client: true,
    especial_client: false,
    observacions_client: '',
    prioridad: 'Media'
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string | null }>({
    type: null,
    text: null,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
 
  // Filtrar clientes por término de búsqueda
  const filteredClients = clientsList.filter((client) => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      client.id_client.toString().includes(searchTermLower) ||
      client.nom_client.toLowerCase().includes(searchTermLower) ||
      (client.telefon1_client?.numero && client.telefon1_client.numero.includes(searchTermLower))
    );
  });

  // Handler para eliminar cliente
  const handleDeleteClient = useCallback(async (id: number) => {
    const cliente = clientsList.find(c => c.id_client === id);
    if (!cliente) return;

    if (!window.confirm(`¿Seguro que deseas eliminar al cliente "${cliente.nom_client}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await ClientsService.delete(id);
      setClientsList(prev => prev.filter(c => c.id_client !== id));
      setMessage({ type: 'success', text: 'Cliente eliminado correctamente.' });
    } catch (error) {
      console.error('Error deleting client:', error);
      setMessage({ type: 'error', text: 'Error al eliminar el cliente. Inténtelo de nuevo.' });
    } finally {
      setDeletingId(null);
    }
  }, [clientsList]);

  // Función para crear un nuevo cliente
  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario
    const errors: string[] = [];
    if (!formData.nom_client) errors.push('El nombre es obligatorio');
    if (!formData.telefon1_client.numero) errors.push('El teléfono principal es obligatorio');

    const telefon1 = formData.telefon1_client.numero.replace('+', '').replace(' ', '');
    if (telefon1 && !/^\d+$/.test(telefon1)) errors.push('El teléfono principal debe ser numérico');

    const telefon2 = formData.telefon2_client.numero.replace('+', '').replace(' ', '');
    if (telefon2 && !/^\d+$/.test(telefon2)) errors.push('El teléfono secundario debe ser numérico');

    if (errors.length > 0) {
      setMessage({ type: 'error', text: 'Error de validación: ' + errors.join(', ') });
      return;
    }

    setLoading(true);
    try {
      const newClient = {
        ...formData,
        telefon2_client: formData.telefon2_client.numero ? formData.telefon2_client : undefined,
        data_creacio_client: new Date().toISOString()
      };
      const result = await ClientsService.create(newClient);
      setMessage({
        type: 'success',
        text: `Cliente ${formData.nom_client} creado con ID: ${result.id_client}`,
      });
      resetForm();
      setClientsList(prev => [...prev, { ...newClient, id_client: result.id_client } as Client]);
      setActiveTab('list');
    } catch (error) {
      console.error('Error creating client:', error);
      setMessage({ type: 'error', text: 'Error al crear el cliente' });
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar cliente existente
  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClient) {
      setMessage({ type: 'error', text: 'No hay cliente seleccionado para actualizar' });
      return;
    }

    // Validar formulario
    const errors: string[] = [];
    if (!formData.nom_client) errors.push('El nombre es obligatorio');
    if (!formData.telefon1_client.numero) errors.push('El teléfono principal es obligatorio');

    const telefon1 = formData.telefon1_client.numero.replace('+', '').replace(' ', '');
    if (telefon1 && !/^\d+$/.test(telefon1)) errors.push('El teléfono principal debe ser numérico');

    const telefon2 = formData.telefon2_client.numero.replace('+', '').replace(' ', '');
    if (telefon2 && !/^\d+$/.test(telefon2)) errors.push('El teléfono secundario debe ser numérico');

    if (errors.length > 0) {
      setMessage({ type: 'error', text: 'Error de validación: ' + errors.join(', ') });
      return;
    }

    setLoading(true);
    try {
      // Preparar datos para la actualización de acuerdo con la interfaz Client
      const clienteActualizado: Partial<Client> = {
        nom_client: formData.nom_client,
        telefon1_client: {
          numero: formData.telefon1_client.numero,
          tipo: formData.telefon1_client.tipo
        },
        actiu_client: formData.actiu_client,
        especial_client: formData.especial_client,
        observacions_client: formData.observacions_client,
        prioridad: formData.prioridad
      };
      
      // Solo añadir telefon2_client si tiene número
      if (formData.telefon2_client.numero) {
        clienteActualizado.telefon2_client = {
          numero: formData.telefon2_client.numero,
          tipo: formData.telefon2_client.tipo
        };
      }
      
      const updatedClient = await ClientsService.update(selectedClient.id_client, clienteActualizado);
      
      // Actualizar cliente en la lista local asegurando que el tipo sea correcto
      setClientsList(prevList => 
        prevList.map(c => c.id_client === selectedClient.id_client ? {...c, ...updatedClient} : c)
      );
      
      setMessage({
        type: 'success',
        text: `Cliente ${formData.nom_client} actualizado correctamente.`,
      });
      
      setActiveTab('list');
    } catch (error) {
      console.error('Error updating client:', error);
      setMessage({ type: 'error', text: 'Error al actualizar el cliente' });
    } finally {
      setLoading(false);
    }
  };

  // Reinicia el formulario
  const resetForm = () => {
    setFormData({
      nom_client: '',
      telefon1_client: { numero: '', tipo: 'móvil' },
      telefon2_client: { numero: '', tipo: 'móvil' },
      actiu_client: true,
      especial_client: false,
      observacions_client: '',
      prioridad: 'Media'
    });
  };

  // Manejo de cambios en inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as PhoneData),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Cargar datos del cliente al formulario cuando se selecciona editar
  useEffect(() => {
    if (selectedClient && activeTab === 'edit') {
      // Asegurarse de que telefon1_client y telefon2_client tengan la estructura correcta
      const telefon1 = {
        numero: selectedClient.telefon1_client?.numero || '',
        tipo: (selectedClient.telefon1_client?.tipo as "móvil" | "fijo" | "trabajo" | "otro") || "móvil"
      };
      
      const telefon2 = {
        numero: selectedClient.telefon2_client?.numero || '',
        tipo: (selectedClient.telefon2_client?.tipo as "móvil" | "fijo" | "trabajo" | "otro") || "móvil"
      };
      
      setFormData({
        nom_client: selectedClient.nom_client,
        telefon1_client: telefon1,
        telefon2_client: telefon2,
        actiu_client: selectedClient.actiu_client,
        especial_client: selectedClient.especial_client,
        observacions_client: selectedClient.observacions_client || '',
        prioridad: selectedClient.prioridad || 'Media'
      });
    }
  }, [selectedClient, activeTab]);
  
  // Limpia mensajes tras 5s
  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => setMessage({ type: null, text: null }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="clients-container p-4 md:p-6 max-w-screen-2xl mx-auto">
      {/* SVG Icons */}
      <div className="hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
          {/* Icono para Clientes */}
          <g id="client-icon" transform="translate(50, 50)">
            <circle cx="25" cy="20" r="20" fill="#4f46e5" opacity="0.2"/>
            <circle cx="25" cy="15" r="10" fill="#4f46e5" opacity="0.6"/>
            <path d="M0 50 Q25 40 50 50 L50 70 Q25 65 0 70 Z" fill="#4f46e5" opacity="0.6"/>
          </g>
          
          {/* Icono para Teléfono */}
          <g id="phone-icon" transform="translate(150, 50)">
            <rect x="10" y="0" width="30" height="60" rx="5" fill="#4f46e5" opacity="0.3"/>
            <rect x="15" y="5" width="20" height="40" rx="2" fill="#fff"/>
            <circle cx="25" cy="50" r="5" fill="#4f46e5" opacity="0.6"/>
          </g>
          
          {/* Icono para Status */}
          <g id="status-icon" transform="translate(250, 50)">
            <circle cx="25" cy="25" r="25" fill="#4f46e5" opacity="0.1"/>
            <path d="M15 25 L20 35 L35 15" stroke="#4f46e5" stroke-width="4" fill="none"/>
          </g>
          
          {/* Icono para Editar */}
          <g id="edit-icon" transform="translate(50, 150)">
            <rect x="5" y="5" width="40" height="40" rx="5" fill="#4f46e5" opacity="0.1"/>
            <path d="M15 30 L35 30 M15 20 L35 20 M15 40 L25 40" stroke="#4f46e5" stroke-width="2"/>
            <path d="M40 10 L45 15 L35 25 L30 20 Z" fill="#4f46e5"/>
          </g>
          
          {/* Icono para Eliminar */}
          <g id="delete-icon" transform="translate(150, 150)">
            <rect x="10" y="10" width="30" height="40" rx="2" fill="#ef4444" opacity="0.2"/>
            <rect x="5" y="5" width="40" height="10" rx="2" fill="#ef4444" opacity="0.6"/>
            <path d="M20 20 L20 45 M30 20 L30 45" stroke="#ef4444" stroke-width="2"/>
          </g>
          
          {/* Icono para Observaciones */}
          <g id="notes-icon" transform="translate(250, 150)">
            <rect x="5" y="5" width="40" height="50" rx="3" fill="#4f46e5" opacity="0.1"/>
            <path d="M15 15 L35 15 M15 25 L35 25 M15 35 L30 35 M15 45 L25 45" stroke="#4f46e5" stroke-width="2"/>
          </g>
          
          {/* Icono para Búsqueda */}
          <g id="search-icon" transform="translate(50, 220)">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#4f46e5" stroke-width="3"/>
            <path d="M30 30 L40 40" stroke="#4f46e5" stroke-width="3" stroke-linecap="round"/>
          </g>
        </svg>
      </div>

      {/* Header con título y navegación de pestañas */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Clientes</h2>
        
        <div className="flex border border-gray-300 rounded-lg bg-white shadow-sm">
          <button
            className={`py-2 px-4 font-medium rounded-l-lg ${activeTab === 'list' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('list')}
            disabled={loading}
          >
            Lista
          </button>
          <button
            className={`py-2 px-4 font-medium border-l border-gray-300 ${activeTab === 'new' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            onClick={() => { setActiveTab('new'); setSelectedClient(null); resetForm(); }}
            disabled={loading}
          >
            Nuevo
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-r-lg border-l border-gray-300 ${activeTab === 'edit' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => {
              if (selectedClient) setActiveTab('edit');
            }}
            disabled={!selectedClient || loading}
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
        }`}>
          {message.text}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 rounded-lg shadow-sm bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <div className="mb-6">
        {/* LISTADO - Vista horizontal con detalles */}
        {activeTab === 'list' && (
          <div>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Columna izquierda: Búsqueda y tabla de clientes */}
              <div className="lg:w-3/5 space-y-4">
                <div className="flex items-center bg-white rounded-lg shadow-sm p-2 border border-gray-200">
                  <input
                    type="text"
                    placeholder="Buscar cliente por ID, nombre o teléfono..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border-0 focus:outline-none focus:ring-0"
                    disabled={loading}
                  />
                  <div className="w-5 h-5 text-gray-400 mr-2">
                  
                  </div>
                </div>

                {loading && clientsList.length === 0 && (
                  <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                    Cargando clientes...
                  </div>
                )}

                {!loading && filteredClients.length === 0 && (
                  <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                    No se encontraron clientes con los criterios de búsqueda.
                  </div>
                )}

                {filteredClients.length > 0 && (
                  <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <div className="flex items-center">
                             
                              <span className="ml-1">Teléfono</span>
                            </div>
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <div className="flex items-center">
                              
                              <span className="ml-1">Estado</span>
                            </div>
                          </th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredClients.map(client => (
                          <tr 
                            key={client.id_client} 
                            className={`${selectedClient?.id_client === client.id_client ? 'bg-primary-50' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
                            onClick={() => setSelectedClient(client)}
                          >
                            <td className="py-3 px-4 whitespace-nowrap text-sm">{client.id_client}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">{client.nom_client}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm">{client.telefon1_client?.numero}</td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm">
                              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  client.actiu_client ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {client.actiu_client ? 'Activo' : 'Inactivo'}
                                </span>
                                {client.especial_client && (
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Especial
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-3">
                                <button
                                  className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedClient(client);
                                    setActiveTab('edit');
                                  }}
                                >
                                  <div className="w-4 h-4 mr-1">
                             
                                  </div>
                                  Editar
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-800 font-medium flex items-center disabled:opacity-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClient(client.id_client);
                                  }}
                                  disabled={deletingId === client.id_client}
                                >
                                  <div className="w-4 h-4 mr-1">
                               
                                  </div>
                                  {deletingId === client.id_client ? 'Eliminando…' : 'Eliminar'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Columna derecha: Detalles del cliente seleccionado */}
              <div className="lg:w-2/5">
                {selectedClient ? (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-700">
                        Detalle del Cliente
                      </h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        ID: {selectedClient.id_client}
                      </span>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Información básica */}
                      <div className="pb-4 border-b border-gray-100">
                        <h5 className="text-sm text-gray-500 font-medium mb-3">Información Básica</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-xs uppercase text-gray-500 font-semibold">Nombre</h6>
                            <p className="text-sm font-medium">{selectedClient.nom_client}</p>
                          </div>
                          <div>
                            <h6 className="text-xs uppercase text-gray-500 font-semibold">Prioridad</h6>
                            <span className={`mt-1 inline-flex px-2 py-1 text-xs leading-none font-medium rounded-full ${
                              selectedClient.prioridad === 'Alta'
                                ? 'bg-red-100 text-red-800'
                                : selectedClient.prioridad === 'Media'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {selectedClient.prioridad}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Estado */}
                      <div className="pb-4 border-b border-gray-100">
                        <h5 className="text-sm text-gray-500 font-medium mb-3">Estado</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <div className={`h-2.5 w-2.5 rounded-full ${selectedClient.actiu_client ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm">{selectedClient.actiu_client ? 'Activo' : 'Inactivo'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`h-2.5 w-2.5 rounded-full ${selectedClient.especial_client ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                            <span className="text-sm">{selectedClient.especial_client ? 'Cliente Especial' : 'Cliente Normal'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Contacto */}
                      <div className="pb-4 border-b border-gray-100">
                        <h5 className="text-sm text-gray-500 font-medium mb-3">
                          <div className="flex items-center">
                            <div className="w-4 h-4 mr-1">
                            
                            </div>
                            Información de Contacto
                          </div>
                        </h5>
                        <div className="space-y-3">
                          {selectedClient.telefon1_client?.numero && (
                            <div>
                              <h6 className="text-xs uppercase text-gray-500 font-semibold">Teléfono Principal ({selectedClient.telefon1_client.tipo})</h6>
                              <p className="text-sm">{selectedClient.telefon1_client.numero}</p>
                            </div>
                          )}
                          
                          {selectedClient.telefon2_client?.numero && (
                            <div>
                              <h6 className="text-xs uppercase text-gray-500 font-semibold">Teléfono Secundario ({selectedClient.telefon2_client.tipo})</h6>
                              <p className="text-sm">{selectedClient.telefon2_client.numero}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Observaciones */}
                      {selectedClient.observacions_client && (
                        <div>
                          <h5 className="text-sm text-gray-500 font-medium mb-2">
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-1">
                           
                              </div>
                              Observaciones
                            </div>
                          </h5>
                          <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100">{selectedClient.observacions_client}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded border border-primary-200 hover:bg-primary-100 transition-colors flex items-center"
                        onClick={() => setActiveTab('edit')}
                      >
                        <div className="w-4 h-4 mr-1">
                
                        </div>
                        Editar Cliente
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 text-gray-400">

                      </div>
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">Ningún cliente seleccionado</h4>
                    <p className="text-gray-500 text-sm">Selecciona un cliente de la lista para ver sus detalles</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* NUEVO CLIENTE - Formulario con layout horizontal */}
        {activeTab === 'new' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-6 text-gray-700 border-b border-gray-200 pb-3">Crear Nuevo Cliente</h3>
            <form onSubmit={handleCreateClient} className="space-y-6">
              {/* Datos Básicos - Layout horizontal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded border border-gray-100 bg-gray-50">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Cliente *
                  </label>
                  <input
                    type="text"
                    name="nom_client"
                    value={formData.nom_client}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Máximo 100 caracteres</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prioridad
                    </label>
                    <select
                      name="prioridad"
                      value={formData.prioridad}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Información de Contacto - Layout horizontal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded border border-gray-100 bg-gray-50">
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-600">Teléfono Principal</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número *
                      </label>
                      <input
                        type="text"
                        name="telefon1_client.numero"
                        value={formData.telefon1_client.numero}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo
                      </label>
                      <select
                        name="telefon1_client.tipo"
                        value={formData.telefon1_client.tipo}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="móvil">Móvil</option>
                        <option value="fijo">Fijo</option>
                        <option value="trabajo">Trabajo</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-600">Teléfono Secundario</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número
                      </label>
                      <input
                        type="text"
                        name="telefon2_client.numero"
                        value={formData.telefon2_client.numero}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo
                      </label>
                      <select
                        name="telefon2_client.tipo"
                        value={formData.telefon2_client.tipo}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="móvil">Móvil</option>
                        <option value="fijo">Fijo</option>
                        <option value="trabajo">Trabajo</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información Adicional - Layout horizontal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded border border-gray-100 bg-gray-50">
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-600">Estado</h4>
                  <div className="flex flex-col space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="actiu_client"
                        checked={formData.actiu_client}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Cliente Activo</span>
                    </label>
                    
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="especial_client"
                        checked={formData.especial_client}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Cliente Especial</span>
                    </label>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-1">
           
                      </div>
                      Observaciones
                    </div>
                  </label>
                  <textarea
                    name="observacions_client"
                    value={formData.observacions_client}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={500}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { resetForm(); setActiveTab('list'); }}
                  disabled={loading}
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
                  {loading ? 'Guardando...' : 'Guardar Cliente'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* EDITAR CLIENTE - Implementación */}
        {activeTab === 'edit' && selectedClient && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
              <h3 className="text-xl font-semibold text-gray-700">Editar Cliente</h3>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                ID: {selectedClient.id_client}
              </span>
            </div>
            
            <form onSubmit={handleUpdateClient} className="space-y-6">
              {/* Datos Básicos - Layout horizontal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded border border-gray-100 bg-gray-50">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Cliente *
                  </label>
                  <input
                    type="text"
                    name="nom_client"
                    value={formData.nom_client}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Máximo 100 caracteres</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prioridad
                    </label>
                    <select
                      name="prioridad"
                      value={formData.prioridad}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Información de Contacto - Layout horizontal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded border border-gray-100 bg-gray-50">
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-600">Teléfono Principal</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número *
                      </label>
                      <input
                        type="text"
                        name="telefon1_client.numero"
                        value={formData.telefon1_client.numero}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo
                      </label>
                      <select
                        name="telefon1_client.tipo"
                        value={formData.telefon1_client.tipo}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="móvil">Móvil</option>
                        <option value="fijo">Fijo</option>
                        <option value="trabajo">Trabajo</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-600">Teléfono Secundario</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número
                      </label>
                      <input
                        type="text"
                        name="telefon2_client.numero"
                        value={formData.telefon2_client.numero}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo
                      </label>
                      <select
                        name="telefon2_client.tipo"
                        value={formData.telefon2_client.tipo}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="móvil">Móvil</option>
                        <option value="fijo">Fijo</option>
                        <option value="trabajo">Trabajo</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información Adicional - Layout horizontal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded border border-gray-100 bg-gray-50">
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-600">Estado</h4>
                  <div className="flex flex-col space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="actiu_client"
                        checked={formData.actiu_client}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Cliente Activo</span>
                    </label>
                    
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="especial_client"
                        checked={formData.especial_client}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Cliente Especial</span>
                    </label>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-1">
                     
                      </div>
                      Observaciones
                    </div>
                  </label>
                  <textarea
                    name="observacions_client"
                    value={formData.observacions_client}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={500}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { setActiveTab('list'); }}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? 'Actualizando...' : 'Actualizar Cliente'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}