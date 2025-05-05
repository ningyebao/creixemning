// app/routes/clients.tsx
import React, { useState, useEffect } from 'react';
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

  const [activeTab, setActiveTab] = useState('list');
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
  const [message, setMessage] = useState<{ type: string | null; text: string | null }>({
    type: null,
    text: null,
  });
  const [loading, setLoading] = useState(false);

  // Función para crear un cliente usando ClientsService.create
  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario
    const errors: string[] = [];
    if (!formData.nom_client) {
      errors.push('El nombre es obligatorio');
    }
    if (!formData.telefon1_client.numero) {
      errors.push('El teléfono principal es obligatorio');
    }

    const telefon1 = formData.telefon1_client.numero.replace('+', '').replace(' ', '');
    if (telefon1 && !/^\d+$/.test(telefon1)) {
      errors.push('El teléfono principal debe ser numérico');
    }

    const telefon2 = formData.telefon2_client.numero.replace('+', '').replace(' ', '');
    if (telefon2 && !/^\d+$/.test(telefon2)) {
      errors.push('El teléfono secundario debe ser numérico');
    }

    if (errors.length > 0) {
      setMessage({ type: 'error', text: 'Error de validación: ' + errors.join(', ') });
      return;
    }

    setLoading(true);

    try {
      // Preparar el objeto a enviar; si el teléfono secundario es vacío, se puede omitir
      const newClient = {
        ...formData,
        telefon2_client: formData.telefon2_client.numero ? formData.telefon2_client : undefined,
        data_creacio_client: new Date().toISOString()
      };

      // Usamos el servicio unificado
      const result = await ClientsService.create(newClient);
      setMessage({
        type: 'success',
        text: `Cliente ${formData.nom_client} creado con ID: ${result.id_client}`,
      });
      setActiveTab('list');
      resetForm();

      // Recargar la página para mostrar el nuevo cliente
      window.location.reload();
    } catch (error) {
      console.error('Error creating client:', error);
      setMessage({ type: 'error', text: 'Error al crear el cliente' });
    } finally {
      setLoading(false);
    }
  };

  // Reinicia el formulario a su estado inicial
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

  // Manejo de cambios en inputs (incluyendo campos anidados para teléfonos)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'telefon1_client' || parent === 'telefon2_client') {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent] as PhoneData),
            [child]: value,
          },
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Limpiar mensaje después de 5 segundos
  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => {
        setMessage({ type: null, text: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="clients-container">
      <h2 className="text-xl font-semibold mb-4">Gestión de Clientes</h2>

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
        <div className="mb-4 p-4 rounded bg-red-100 text-red-700">
          {error}
        </div>
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
          Lista de Clientes
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'new'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('new')}
        >
          Nuevo Cliente
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'edit'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
          onClick={() => setActiveTab('edit')}
          disabled={!selectedClient}
        >
          Editar Cliente
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'list' && (
          <div>
            <h3 className="text-lg font-medium mb-2">Lista de Clientes</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">ID</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Nombre</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Teléfono</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Activo</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Especial</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Prioridad</th>
                    <th className="py-2 px-4 border-b bg-gray-50 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => {
                    const telefono = client.telefon1_client?.numero || '';
                    return (
                      <tr key={client.id_client} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{client.id_client}</td>
                        <td className="py-2 px-4 border-b">{client.nom_client}</td>
                        <td className="py-2 px-4 border-b">{telefono}</td>
                        <td className="py-2 px-4 border-b">
                          {client.actiu_client ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Activo
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Inactivo
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {client.especial_client ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Especial
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Normal
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              client.prioridad === 'Alta'
                                ? 'bg-red-100 text-red-800'
                                : client.prioridad === 'Media'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {client.prioridad}
                          </span>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <button
                            className="text-primary-600 hover:text-primary-800 mr-2"
                            onClick={() => {
                              setSelectedClient(client);
                              setActiveTab('edit');
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {
                              // Implementar eliminación con ClientsService.delete(...)
                            }}
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
            {selectedClient && (
              <div className="mt-6 p-4 border rounded bg-gray-50">
                <h4 className="text-md font-medium mb-2">Detalles del Cliente</h4>
                <pre className="bg-white p-4 rounded overflow-auto">
                  {JSON.stringify(selectedClient, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'new' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Crear Nuevo Cliente</h3>
            <form onSubmit={handleCreateClient} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Datos Básicos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
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
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Máximo 100 caracteres</p>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="actiu_client"
                          checked={formData.actiu_client}
                          onChange={handleCheckboxChange}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                        />
                        <span className="ml-2 text-sm text-gray-700">Cliente Activo</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Marcar si está activo</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Información de Contacto</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono Principal *
                    </label>
                    <input
                      type="text"
                      name="telefon1_client.numero"
                      value={formData.telefon1_client.numero}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Teléfono
                    </label>
                    <select
                      name="telefon1_client.tipo"
                      value={formData.telefon1_client.tipo}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="móvil">Móvil</option>
                      <option value="fijo">Fijo</option>
                      <option value="trabajo">Trabajo</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono Secundario
                    </label>
                    <input
                      type="text"
                      name="telefon2_client.numero"
                      value={formData.telefon2_client.numero}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Teléfono Secundario
                    </label>
                    <select
                      name="telefon2_client.tipo"
                      value={formData.telefon2_client.tipo}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="móvil">Móvil</option>
                      <option value="fijo">Fijo</option>
                      <option value="trabajo">Trabajo</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Información Adicional</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="especial_client"
                        checked={formData.especial_client}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Cliente Especial</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Marcar si requiere tratamiento especial
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prioridad
                    </label>
                    <select
                      name="prioridad"
                      value={formData.prioridad}
                      onChange={handleInputChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Nivel de prioridad para el cliente</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observaciones
                  </label>
                  <textarea
                    name="observacions_client"
                    value={formData.observacions_client}
                    onChange={handleInputChange}
                    rows={3}
                    maxLength={500}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Máximo 500 caracteres</p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
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
                  {loading ? 'Guardando...' : '💾 Guardar Cliente'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'edit' && selectedClient && (
          <div>
            <h3 className="text-lg font-medium mb-4">Editar Cliente</h3>
            {/* Formulario de edición similar al de creación */}
            <p className="text-gray-600">
              Implementación pendiente para editar el cliente con ID: {selectedClient.id_client}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
