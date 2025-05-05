// app/routes/campaigns.tsx
import React, { useState, useEffect } from 'react';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Campanya } from '~/lib/types';
import { CampanyaService } from '~/services/campanya.service';

export const loader: LoaderFunction = async () => {
  try {
    // Se usa el método unificado del CampanyaService
    const campaigns = await CampanyaService.getAll();
    return json({ campaigns, error: null });
  } catch (error) {
    console.error('Error loading campaigns:', error);
    return json({ campaigns: [], error: 'Error al cargar las campañas. Por favor, inténtelo de nuevo.' });
  }
};

export default function CampaignsPage() {
  const { campaigns, error } = useLoaderData<{ campaigns: Campanya[]; error: string | null }>();
  const [activeTab, setActiveTab] = useState('list');
  const [selectedCampaign, setSelectedCampaign] = useState<Campanya | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    id_client: 1,
    campanya_nom: '',
    campanya_num_altes_acordades: 0,
    data_inici_campanya: new Date().toISOString().split('T')[0],
    data_fi_campanya: new Date().toISOString().split('T')[0],
    activa_campanya: true,
    objectiu_campanya: '',
    objectiu_assolit_campanya: false,
    observacions_campanya: ''
  });
  const [message, setMessage] = useState<{ type: string | null; text: string | null }>({ type: null, text: null });
  const [loading, setLoading] = useState(false);

  // Se filtran las campañas según el término de búsqueda
  const filteredCampaigns = campaigns.filter((campaign) => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      campaign.id_campanya.toString().includes(searchTermLower) ||
      campaign.campanya_nom.toLowerCase().includes(searchTermLower) ||
      campaign.id_client.toString().includes(searchTermLower)
    );
  });

  // Función para crear una campaña usando CampanyaService
  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación mínima de campos obligatorios
    if (!formData.id_client || !formData.campanya_nom) {
      setMessage({ type: 'error', text: 'Complete los campos obligatorios marcados con *' });
      return;
    }

    setLoading(true);
    try {
      const newCampaign = {
        ...formData,
        data_creacio_campanya: new Date().toISOString()
      };

      // Se usa el método create del CampanyaService
      const result = await CampanyaService.create(newCampaign);
      setMessage({
        type: 'success',
        text: `Campaña '${formData.campanya_nom}' creada exitosamente con ID: ${result.id_campanya}`
      });
      setActiveTab('list');
      resetForm();

      // Recargar para actualizar la lista
      window.location.reload();
    } catch (error) {
      console.error('Error creating campaign:', error);
      setMessage({ type: 'error', text: 'Error al crear la campaña' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id_client: 1,
      campanya_nom: '',
      campanya_num_altes_acordades: 0,
      data_inici_campanya: new Date().toISOString().split('T')[0],
      data_fi_campanya: new Date().toISOString().split('T')[0],
      activa_campanya: true,
      objectiu_campanya: '',
      objectiu_assolit_campanya: false,
      observacions_campanya: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="campaigns-container">
      <h2 className="text-xl font-semibold mb-4">Gestión de Campañas</h2>

      {message.type && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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
          className={`py-2 px-4 ${activeTab === 'list' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('list')}
        >
          Lista de Campañas
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'new' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('new')}
        >
          Nueva Campaña
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'edit' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-600 hover:text-gray-800'}`}
          onClick={() => setActiveTab('edit')}
          disabled={!selectedCampaign}
        >
          Editar Campaña
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'list' && (
          <div>
            <h3 className="text-lg font-medium mb-2">Listado de Campañas</h3>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar campaña por ID, nombre o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">ID</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">ID Cliente</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Nombre</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Altas Acordadas</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Inicio</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Fin</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Activa</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Objetivo Alcanzado</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => {
                    const fechaInicio = campaign.data_inici_campanya ? campaign.data_inici_campanya.split('T')[0] : '';
                    const fechaFin = campaign.data_fi_campanya ? campaign.data_fi_campanya.split('T')[0] : '';
                    return (
                      <tr key={campaign.id_campanya} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-200">{campaign.id_campanya}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{campaign.id_client}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{campaign.campanya_nom}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{campaign.campanya_num_altes_acordades}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{fechaInicio}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{fechaFin}</td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {campaign.activa_campanya ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Activa
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Inactiva
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {campaign.objectiu_assolit_campanya ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Alcanzado
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Pendiente
                            </span>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <button
                            className="text-primary-600 hover:text-primary-800 mr-2"
                            onClick={() => {
                              setSelectedCampaign(campaign);
                              setActiveTab('edit');
                            }}
                          >
                            Editar
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800"
                            onClick={() => {
                              // Implementar la eliminación con CampanyaService.delete
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

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No se encontraron campañas con los criterios de búsqueda.
              </div>
            )}

            {selectedCampaign && (
              <div className="mt-6 p-4 border border-gray-200 rounded bg-gray-50">
                <h4 className="text-md font-medium mb-2">Detalles de la Campaña</h4>
                <pre className="bg-white p-4 rounded overflow-auto">
                  {JSON.stringify(selectedCampaign, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'new' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Crear Nueva Campaña</h3>

            <form onSubmit={handleCreateCampaign} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Información Básica</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID del Cliente *
                    </label>
                    <input
                      type="number"
                      name="id_client"
                      value={formData.id_client}
                      onChange={handleNumberChange}
                      min="1"
                      step="1"
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de la Campaña *
                    </label>
                    <input
                      type="text"
                      name="campanya_nom"
                      value={formData.campanya_nom}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Detalles de la Campaña</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Altas Acordadas
                    </label>
                    <input
                      type="number"
                      name="campanya_num_altes_acordades"
                      value={formData.campanya_num_altes_acordades}
                      onChange={handleNumberChange}
                      min="0"
                      step="1"
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="activa_campanya"
                        checked={formData.activa_campanya}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">Campaña Activa</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      name="data_inici_campanya"
                      value={formData.data_inici_campanya}
                      onChange={handleDateChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Fin
                    </label>
                    <input
                      type="date"
                      name="data_fi_campanya"
                      value={formData.data_fi_campanya}
                      onChange={handleDateChange}
                      className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objetivo de la Campaña
                  </label>
                  <textarea
                    name="objectiu_campanya"
                    value={formData.objectiu_campanya}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="objectiu_assolit_campanya"
                      checked={formData.objectiu_assolit_campanya}
                      onChange={handleCheckboxChange}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-700">Objetivo Alcanzado</span>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <h4 className="text-md font-medium mb-3">Observaciones</h4>
                <textarea
                  name="observacions_campanya"
                  value={formData.observacions_campanya}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
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
                  {loading ? 'Guardando...' : 'Guardar Campaña'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'edit' && selectedCampaign && (
          <div>
            <h3 className="text-lg font-medium mb-4">Editar Campaña</h3>
            {/* Formulario de edición similar al de creación */}
            <p className="text-gray-600">
              Implementación pendiente para editar la campaña con ID: {selectedCampaign.id_campanya}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
