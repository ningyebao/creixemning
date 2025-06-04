// app/routes/campaigns.tsx
import React, { useState, useEffect } from 'react';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData, useRevalidator } from '@remix-run/react';
import type { Campanya } from '~/lib/types';
import { CampanyaService } from '~/services/campanya.service';

export const loader: LoaderFunction = async () => {
  try {
    const campaigns = await CampanyaService.getAll();
    return json({ campaigns, error: null });
  } catch (error) {
    console.error('Error loading campaigns:', error);
    return json({ campaigns: [], error: 'Error al cargar las campañas. Por favor, inténtelo de nuevo.' });
  }
};

export default function CampaignsPage() {
  const { campaigns: initialCampaigns, error } = useLoaderData<{ campaigns: Campanya[]; error: string | null }>();
  const [campaigns, setCampaigns] = useState<Campanya[]>(initialCampaigns);
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
  const revalidator = useRevalidator();

  useEffect(() => {
    setCampaigns(initialCampaigns);
  }, [initialCampaigns]);

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (!searchTerm) return true;
    const searchTermLower = searchTerm.toLowerCase();
    return (
      campaign.id_campanya.toString().includes(searchTermLower) ||
      campaign.campanya_nom.toLowerCase().includes(searchTermLower) ||
      campaign.id_client.toString().includes(searchTermLower)
    );
  });

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

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id_client || !formData.campanya_nom) {
      setMessage({ type: 'error', text: 'Complete los campos obligatorios marcados con *' });
      return;
    }

    setLoading(true);
    setMessage({ type: null, text: null });
    try {
      const newCampaignData = {
        ...formData,
        data_creacio_campanya: new Date().toISOString()
      };

      const result = await CampanyaService.create(newCampaignData);
      setMessage({
        type: 'success',
        text: `Campaña '${formData.campanya_nom}' creada exitosamente con ID: ${result.id_campanya}`
      });
      setActiveTab('list');
      resetForm();
      revalidator.revalidate();
    } catch (error) {
      console.error('Error creating campaign:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear la campaña.';
      setMessage({ type: 'error', text: `Error al crear la campaña: ${errorMessage}` });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaign = async (id_campanya: number, campanya_nom: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar la campaña "${campanya_nom}" (ID: ${id_campanya})? Esta acción no se puede deshacer.`)) {
      return;
    }

    setLoading(true);
    setMessage({ type: null, text: null });
    try {
      await CampanyaService.delete(id_campanya);
      setMessage({ type: 'success', text: `Campaña "${campanya_nom}" eliminada exitosamente.` });
      
      if (selectedCampaign && selectedCampaign.id_campanya === id_campanya) {
        setSelectedCampaign(null);
        if (activeTab === 'edit') {
          setActiveTab('list');
        }
      }
      revalidator.revalidate();
    } catch (error) {
      console.error(`Error deleting campaign ${id_campanya}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al eliminar la campaña.';
      setMessage({ type: 'error', text: `Error al eliminar la campaña: ${errorMessage}` });
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => {
        setMessage({ type: null, text: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="campaigns-container p-4 md:p-6 max-w-screen-2xl mx-auto">
      {/* Header con título y navegación de pestañas en una sola línea */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Gestión de Campañas</h2>
        
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
            onClick={() => { setActiveTab('new'); setSelectedCampaign(null); resetForm(); }}
            disabled={loading}
          >
            Nueva
          </button>
          <button
            className={`py-2 px-4 font-medium rounded-r-lg border-l border-gray-300 ${activeTab === 'edit' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => {
              if (selectedCampaign) setActiveTab('edit');
            }}
            disabled={!selectedCampaign || loading}
          >
            Editar
          </button>
        </div>
      </div>
      
      {/* Mensajes de alerta */}
      {message.type && (
        <div className={`mb-4 p-4 rounded-lg shadow-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      {error && !message.text && (
        <div className="mb-4 p-4 rounded-lg shadow-sm bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {/* Contenido principal con diseño horizontal */}
      <div className="mb-6">
        {activeTab === 'list' && (
          <div>
            {/* Vista de lista y detalles en diseño de dos columnas */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Columna izquierda: Búsqueda y tabla de campañas */}
              <div className="lg:w-3/5 space-y-4">
                <div className="flex items-center bg-white rounded-lg shadow-sm p-2 border border-gray-200">
                  <input
                    type="text"
                    placeholder="Buscar campaña por ID, nombre o cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border-0 focus:outline-none focus:ring-0"
                    disabled={loading}
                  />
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>

                {loading && campaigns.length === 0 && (
                  <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                    Cargando campañas...
                  </div>
                )}

                {!loading && filteredCampaigns.length === 0 && campaigns.length > 0 && (
                  <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                    No se encontraron campañas con los criterios de búsqueda.
                  </div>
                )}

                {!loading && campaigns.length === 0 && !error && (
                  <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                    Aún no hay campañas registradas. ¡Crea una nueva!
                  </div>
                )}

                {filteredCampaigns.length > 0 && (
                  <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                          <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredCampaigns.map((campaign) => {
                          const fechaInicio = campaign.data_inici_campanya ? new Date(campaign.data_inici_campanya).toLocaleDateString() : '-';
                          const fechaFin = campaign.data_fi_campanya ? new Date(campaign.data_fi_campanya).toLocaleDateString() : '-';
                          return (
                            <tr 
                              key={campaign.id_campanya} 
                              className={`${selectedCampaign?.id_campanya === campaign.id_campanya ? 'bg-primary-50' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
                              onClick={() => setSelectedCampaign(campaign)}
                            >
                              <td className="py-3 px-4 whitespace-nowrap text-sm">{campaign.id_campanya}</td>
                              <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.campanya_nom}</td>
                              <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">{fechaInicio} - {fechaFin}</td>
                              <td className="py-3 px-4 whitespace-nowrap text-sm">
                                <div className="flex items-center space-x-2">
                                  <div className={`h-2.5 w-2.5 rounded-full ${campaign.activa_campanya ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                  <span>{campaign.activa_campanya ? 'Activa' : 'Inactiva'}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap text-sm">
                                <div className="flex space-x-3">
                                  <button
                                    className="text-primary-600 hover:text-primary-800 font-medium disabled:opacity-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCampaign(campaign);
                                      const dataForForm = {
                                        id_client: campaign.id_client,
                                        campanya_nom: campaign.campanya_nom,
                                        campanya_num_altes_acordades: campaign.campanya_num_altes_acordades,
                                        data_inici_campanya: campaign.data_inici_campanya ? campaign.data_inici_campanya.split('T')[0] : new Date().toISOString().split('T')[0],
                                        data_fi_campanya: campaign.data_fi_campanya ? campaign.data_fi_campanya.split('T')[0] : new Date().toISOString().split('T')[0],
                                        activa_campanya: campaign.activa_campanya,
                                        objectiu_campanya: campaign.objectiu_campanya ?? '',
                                        objectiu_assolit_campanya: campaign.objectiu_assolit_campanya,
                                        observacions_campanya: campaign.observacions_campanya ?? ''
                                      };
                                      setFormData(dataForForm);
                                      setActiveTab('edit');
                                    }}
                                    disabled={loading}
                                  >
                                    Editar
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteCampaign(campaign.id_campanya, campaign.campanya_nom);
                                    }}
                                    disabled={loading}
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

              {/* Columna derecha: Detalles de la campaña seleccionada */}
              <div className="lg:w-2/5">
                {selectedCampaign ? (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-700">
                        Detalles de la Campaña
                      </h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        ID: {selectedCampaign.id_campanya}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">Nombre</h5>
                        <p className="text-sm font-medium">{selectedCampaign.campanya_nom}</p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">ID Cliente</h5>
                        <p className="text-sm">{selectedCampaign.id_client}</p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">Altas Acordadas</h5>
                        <p className="text-sm">{selectedCampaign.campanya_num_altes_acordades}</p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">Estado</h5>
                        <div className="flex items-center space-x-2">
                          <div className={`h-2.5 w-2.5 rounded-full ${selectedCampaign.activa_campanya ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm">{selectedCampaign.activa_campanya ? 'Activa' : 'Inactiva'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">Fecha Inicio</h5>
                        <p className="text-sm">{selectedCampaign.data_inici_campanya ? new Date(selectedCampaign.data_inici_campanya).toLocaleDateString() : '-'}</p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">Fecha Fin</h5>
                        <p className="text-sm">{selectedCampaign.data_fi_campanya ? new Date(selectedCampaign.data_fi_campanya).toLocaleDateString() : '-'}</p>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">Objetivo Alcanzado</h5>
                        <div className="flex items-center space-x-2">
                          <div className={`h-2.5 w-2.5 rounded-full ${selectedCampaign.objectiu_assolit_campanya ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <span className="text-sm">{selectedCampaign.objectiu_assolit_campanya ? 'Alcanzado' : 'Pendiente'}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">Fecha Creación</h5>
                        <p className="text-sm">{selectedCampaign.data_creacio_campanya ? new Date(selectedCampaign.data_creacio_campanya).toLocaleString() : '-'}</p>
                      </div>
                    </div>
                    
                    {selectedCampaign.objectiu_campanya && (
                      <div className="mb-4 space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">Objetivo</h5>
                        <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100">{selectedCampaign.objectiu_campanya}</p>
                      </div>
                    )}
                    
                    {selectedCampaign.observacions_campanya && (
                      <div className="space-y-1">
                        <h5 className="text-xs uppercase text-gray-500 font-semibold">Observaciones</h5>
                        <p className="text-sm bg-gray-50 p-3 rounded border border-gray-100">{selectedCampaign.observacions_campanya}</p>
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded border border-primary-200 hover:bg-primary-100 transition-colors"
                        onClick={() => {
                          const dataForForm = {
                            id_client: selectedCampaign.id_client,
                            campanya_nom: selectedCampaign.campanya_nom,
                            campanya_num_altes_acordades: selectedCampaign.campanya_num_altes_acordades,
                            data_inici_campanya: selectedCampaign.data_inici_campanya ? selectedCampaign.data_inici_campanya.split('T')[0] : new Date().toISOString().split('T')[0],
                            data_fi_campanya: selectedCampaign.data_fi_campanya ? selectedCampaign.data_fi_campanya.split('T')[0] : new Date().toISOString().split('T')[0],
                            activa_campanya: selectedCampaign.activa_campanya,
                            objectiu_campanya: selectedCampaign.objectiu_campanya ?? '',
                            objectiu_assolit_campanya: selectedCampaign.objectiu_assolit_campanya,
                            observacions_campanya: selectedCampaign.observacions_campanya ?? ''
                          };
                          setFormData(dataForForm);
                          setActiveTab('edit');
                        }}
                      >
                        Editar Campaña
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                    <div className="flex justify-center mb-3">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-2">Ninguna campaña seleccionada</h4>
                    <p className="text-gray-500 text-sm">Selecciona una campaña de la lista para ver sus detalles</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'new' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-6 text-gray-700 border-b border-gray-200 pb-3">Crear Nueva Campaña</h3>
            <form onSubmit={handleCreateCampaign} className="space-y-6">
              {/* Información Básica - Formato horizontal */}
              <div className="p-4 rounded border border-gray-100 bg-gray-50">
                <h4 className="text-lg font-medium mb-4 text-gray-600">Información Básica</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="id_client_new" className="block text-sm font-medium text-gray-700 mb-1">
                      ID del Cliente *
                    </label>
                    <input
                      type="number"
                      name="id_client"
                      id="id_client_new"
                      value={formData.id_client}
                      onChange={handleNumberChange}
                      min="1"
                      step="1"
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="campanya_nom_new" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre de la Campaña *
                    </label>
                    <input
                      type="text"
                      name="campanya_nom"
                      id="campanya_nom_new"
                      value={formData.campanya_nom}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Detalles de la Campaña - Formato horizontal */}
              <div className="p-4 rounded border border-gray-100 bg-gray-50">
                <h4 className="text-lg font-medium mb-4 text-gray-600">Detalles de la Campaña</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label htmlFor="campanya_num_altes_acordades_new" className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Altas Acordadas
                    </label>
                    <input
                      type="number"
                      name="campanya_num_altes_acordades"
                      id="campanya_num_altes_acordades_new"
                      value={formData.campanya_num_altes_acordades}
                      onChange={handleNumberChange}
                      min="0"
                      step="1"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="data_inici_campanya_new" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Inicio
                    </label>
                    <input
                      type="date"
                      name="data_inici_campanya"
                      id="data_inici_campanya_new"
                      value={formData.data_inici_campanya}
                      onChange={handleDateChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="data_fi_campanya_new" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Fin
                    </label>
                    <input
                      type="date"
                      name="data_fi_campanya"
                      id="data_fi_campanya_new"
                      value={formData.data_fi_campanya}
                      onChange={handleDateChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col justify-center space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="activa_campanya"
                        id="activa_campanya_new"
                        checked={formData.activa_campanya}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm"
                      />
                      <span className="ml-2 text-sm text-gray-700">Campaña Activa</span>
                    </label>
                    <label className="flex items-center cursor-pointer mt-4">
                      <input
                        type="checkbox"
                        name="objectiu_assolit_campanya"
                        id="objectiu_assolit_campanya_new"
                        checked={formData.objectiu_assolit_campanya}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm"
                      />
                      <span className="ml-2 text-sm text-gray-700">Objetivo Alcanzado</span>
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="objectiu_campanya_new" className="block text-sm font-medium text-gray-700 mb-1">
                      Objetivo de la Campaña
                    </label>
                    <textarea
                      name="objectiu_campanya"
                      id="objectiu_campanya_new"
                      value={formData.objectiu_campanya}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              <div className="p-4 rounded border border-gray-100 bg-gray-50">
                <h4 className="text-lg font-medium mb-4 text-gray-600">Observaciones</h4>
                <textarea
                  name="observacions_campanya"
                  id="observacions_campanya_new"
                  value={formData.observacions_campanya}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => { resetForm(); setActiveTab('list'); }}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                >
                  Limpiar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Guardar Campaña'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'edit' && selectedCampaign && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
              <h3 className="text-xl font-semibold text-gray-700">Editar Campaña</h3>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                ID: {selectedCampaign.id_campanya}
              </span>
            </div>
            
            {/* Aquí iría un formulario de edición similar al de creación, pre-llenado con selectedCampaign */}
            <div className="p-4 rounded border border-gray-100 bg-gray-50 mb-6">
              <h4 className="text-lg font-medium mb-4 text-gray-600">Datos de la Campaña</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Campaña *
                  </label>
                  <input
                    type="text"
                    name="campanya_nom"
                    value={formData.campanya_nom}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded border border-gray-100 bg-gray-50 mb-6">
              <h4 className="text-lg font-medium mb-4 text-gray-600">Fechas y Detalles</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    name="data_inici_campanya"
                    value={formData.data_inici_campanya}
                    onChange={handleDateChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded border border-gray-100 bg-gray-50 mb-6">
              <h4 className="text-lg font-medium mb-4 text-gray-600">Estado y Objetivos</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="activa_campanya"
                        checked={formData.activa_campanya}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm"
                      />
                      <span className="ml-2 text-sm text-gray-700">Campaña Activa</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="objectiu_assolit_campanya"
                        checked={formData.objectiu_assolit_campanya}
                        onChange={handleCheckboxChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm"
                      />
                      <span className="ml-2 text-sm text-gray-700">Objetivo Alcanzado</span>
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Objetivo de la Campaña
                  </label>
                  <textarea
                    name="objectiu_campanya"
                    value={formData.objectiu_campanya}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded border border-gray-100 bg-gray-50">
              <h4 className="text-lg font-medium mb-4 text-gray-600">Observaciones</h4>
              <textarea
                name="observacions_campanya"
                value={formData.observacions_campanya}
                onChange={handleInputChange}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => { setActiveTab('list'); }}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button" 
                disabled={loading}
                className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
              >
                {loading ? 'Actualizando...' : 'Actualizar Campaña'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}