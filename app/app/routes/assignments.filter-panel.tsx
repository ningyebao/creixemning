// app/routes/assignments.filter-panel.tsx
import { useState, useEffect, useMemo } from 'react';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { LeadFilters } from '~/lib/types';
import { LeadService } from '~/services/leads.service';
import { LeadSize, formatMidaLead } from '~/lib/types';
// Importar el nuevo componente CNAESelect
import CNAESelect from '~/components/CNAESelect';
// Importar hooks personalizados
import { useGeografiaData } from '~/hooks/useGeografiaData';
import { useCNAEData, type CNAEOption } from '~/hooks/useCNAEData';

interface FilterPanelProps {
  onApplyFilters: (filters: LeadFilters) => void;
  initialFilters?: LeadFilters;
  isLoading?: boolean;
  activeFilterCount?: number;
}

export const loader = async () => {
  try {
    console.log('=== FILTER PANEL LOADER ===');
    
    // Obtenemos las actividades
    const actividades = await LeadService.getAllActividades();
    console.log('Actividades cargadas:', actividades?.length || 0);
    
    return json({
      actividades: actividades || []
    });
  } catch (error) {
    console.error("Error cargando datos para el FilterPanel:", error);
    return json({
      actividades: []
    });
  }
};

export default function FilterPanel({ 
  onApplyFilters, 
  initialFilters = {}, 
  isLoading = false,
  activeFilterCount = 0
}: FilterPanelProps) {
  const loaderData = useLoaderData<typeof loader>();
  const actividades = loaderData?.actividades || [];
  
  // Usar hooks para cargar los datos
  const { data: geografiaData, isLoading: isLoadingGeografia, error: geografiaError } = useGeografiaData();
  const { isLoading: isLoadingCNAE, error: cnaeError } = useCNAEData();
  
  // Estados para los filtros
  const [filters, setFilters] = useState<LeadFilters>(initialFilters);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Estados para geografía
  const [selectedProvincia, setSelectedProvincia] = useState(initialFilters.provincia_lead || '');
  const [selectedComarca, setSelectedComarca] = useState(initialFilters.comarca_lead || '');
  const [selectedMunicipio, setSelectedMunicipio] = useState(initialFilters.poblacio_lead || '');
  
  // Resetear los filtros cuando cambien los initialFilters
  useEffect(() => {
    console.log('Initial filters changed:', initialFilters);
    setFilters(initialFilters);
    setSelectedProvincia(initialFilters.provincia_lead || '');
    setSelectedComarca(initialFilters.comarca_lead || '');
    setSelectedMunicipio(initialFilters.poblacio_lead || '');
  }, [initialFilters]);

  // Debug logging
  useEffect(() => {
    console.log('=== FILTER PANEL MOUNTED ===');
    console.log('Geografía data cargada:', !!geografiaData);
    if (geografiaData) {
      console.log('Número de provincias:', geografiaData.provincias?.length || 0);
      console.log('Provincias disponibles:', geografiaData.provincias?.map(p => p.provincia));
    }
    console.log('Actividades disponibles:', actividades);
    
    if (geografiaError) {
      console.error('Error al cargar datos geográficos:', geografiaError);
    }
    if (cnaeError) {
      console.error('Error al cargar datos CNAE:', cnaeError);
    }
  }, [geografiaData, actividades, geografiaError, cnaeError]);

  // Obtener comarcas disponibles basado en provincia seleccionada
  const availableComarcas = useMemo(() => {
    if (!selectedProvincia || !geografiaData?.provincias) {
      return [];
    }
    const provincia = geografiaData.provincias.find((p) => p.provincia === selectedProvincia);
    console.log('Comarcas para', selectedProvincia, ':', provincia?.comarcas?.length || 0);
    return provincia?.comarcas || [];
  }, [selectedProvincia, geografiaData]);

  // Obtener municipios disponibles basado en comarca seleccionada
  const availableMunicipios = useMemo(() => {
    if (!selectedComarca || !availableComarcas.length) {
      return [];
    }
    const comarca = availableComarcas.find((c) => c.comarca === selectedComarca);
    console.log('Municipios para', selectedComarca, ':', comarca?.municipios?.length || 0);
    return comarca?.municipios || [];
  }, [selectedComarca, availableComarcas]);

  // Manejar cambios en los campos de filtro
  const handleFilterChange = (
    field: keyof LeadFilters, 
    value: string | number | boolean | undefined
  ) => {
    console.log(`Filter change: ${field} = ${value}`);
    if (value === '' || value === undefined) {
      const newFilters = { ...filters };
      delete newFilters[field];
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  // Manejar cambios en geografía
  const handleProvinciaChange = (provincia: string) => {
    console.log('Provincia changed:', provincia);
    setSelectedProvincia(provincia);
    setSelectedComarca('');
    setSelectedMunicipio('');
    
    const newFilters = { ...filters };
    if (provincia) {
      newFilters.provincia_lead = provincia;
    } else {
      delete newFilters.provincia_lead;
    }
    delete newFilters.comarca_lead;
    delete newFilters.poblacio_lead;
    setFilters(newFilters);
  };

  const handleComarcaChange = (comarca: string) => {
    console.log('Comarca changed:', comarca);
    setSelectedComarca(comarca);
    setSelectedMunicipio('');
    
    const newFilters = { ...filters };
    if (comarca) {
      newFilters.comarca_lead = comarca;
    } else {
      delete newFilters.comarca_lead;
    }
    delete newFilters.poblacio_lead;
    setFilters(newFilters);
  };

  const handleMunicipioChange = (municipio: string) => {
    console.log('Municipio changed:', municipio);
    setSelectedMunicipio(municipio);
    
    const newFilters = { ...filters };
    if (municipio) {
      newFilters.poblacio_lead = municipio;
    } else {
      delete newFilters.poblacio_lead;
    }
    setFilters(newFilters);
  };

  // Manejar selección de CNAE
  const handleCNAESelect = (cnae: CNAEOption) => {
  console.log('CNAE selected:', cnae);
  
  handleFilterChange('cnae_lead', String(cnae.codigo));
};

  // Aplicar filtros
  const handleApplyFilters = () => {
    console.log('=== APLICANDO FILTROS ===');
    console.log('Filtros actuales:', filters);
    
    // Crear un nuevo objeto con los valores correctamente procesados
    const booleanFields = [
      'actiu_lead', 'cotitza_borsa_lead', 'nomes_temporada_lead', 
      'conciencia_ecologica_lead', 'solidaria_social_lead'
    ];
    
    // Construir un nuevo objeto procesando los valores
    const processedFilters = Object.entries(filters).reduce<Record<string, any>>((result, [key, value]) => {
      // Si es un campo booleano y el valor es string, convertirlo a booleano real
      if (booleanFields.includes(key) && typeof value === 'string') {
        result[key] = value === 'true';
      } else {
        result[key] = value;
      }
      return result;
    }, {});
    
    console.log('Filtros procesados:', processedFilters);
    onApplyFilters(processedFilters as LeadFilters);
  };

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    console.log('Limpiando todos los filtros');
    setFilters({});
    setSelectedProvincia('');
    setSelectedComarca('');
    setSelectedMunicipio('');
    onApplyFilters({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header con indicador de filtros activos y título */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-700">Filtrar Leads</h3>
        {activeFilterCount > 0 && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {activeFilterCount} activos
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="space-y-5">
          {/* Sección de geografía */}
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Ubicación</h4>
            <div className="grid grid-cols-1 gap-3">
              {/* Provincia */}
              <div>
                <label htmlFor="provincia" className="block text-xs font-medium text-gray-500 mb-1">
                  Provincia
                </label>
                <select
                  id="provincia"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={selectedProvincia}
                  onChange={(e) => handleProvinciaChange(e.target.value)}
                  disabled={isLoadingGeografia}
                >
                  <option value="">Todas las provincias</option>
                  {geografiaData?.provincias?.map((provincia) => (
                    <option key={provincia.provincia} value={provincia.provincia}>
                      {provincia.provincia}
                    </option>
                  )) || null}
                </select>
                {isLoadingGeografia && (
                  <p className="text-xs text-blue-600 mt-1">Cargando provincias...</p>
                )}
                {geografiaError && (
                  <p className="text-xs text-red-600 mt-1">Error al cargar datos geográficos</p>
                )}
              </div>

              {/* Comarca */}
              <div>
                <label htmlFor="comarca" className="block text-xs font-medium text-gray-500 mb-1">
                  Comarca
                </label>
                <select
                  id="comarca"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                  value={selectedComarca}
                  onChange={(e) => handleComarcaChange(e.target.value)}
                  disabled={!selectedProvincia || isLoadingGeografia}
                >
                  <option value="">Todas las comarcas</option>
                  {availableComarcas.map((comarca) => (
                    <option key={comarca.comarca} value={comarca.comarca}>
                      {comarca.comarca}
                    </option>
                  ))}
                </select>
              </div>

              {/* Municipio */}
              <div>
                <label htmlFor="municipio" className="block text-xs font-medium text-gray-500 mb-1">
                  Municipio
                </label>
                <select
                  id="municipio"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                  value={selectedMunicipio}
                  onChange={(e) => handleMunicipioChange(e.target.value)}
                  disabled={!selectedComarca || isLoadingGeografia}
                >
                  <option value="">Todos los municipios</option>
                  {availableMunicipios.map((municipio: string) => (
                    <option key={municipio} value={municipio}>
                      {municipio}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sección de datos básicos */}
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Información Básica</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Tamaño de empresa */}
              <div>
                <label htmlFor="mida_lead" className="block text-xs font-medium text-gray-500 mb-1">
                  Tamaño de empresa
                </label>
                <select
                  id="mida_lead"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={filters.mida_lead || ''}
                  onChange={(e) => handleFilterChange('mida_lead', e.target.value ? Number(e.target.value) : undefined)}
                >
                  <option value="">Cualquier tamaño</option>
                  <option value={LeadSize.MICROEMPRESA}>{formatMidaLead(LeadSize.MICROEMPRESA)}</option>
                  <option value={LeadSize.PEQUEÑA}>{formatMidaLead(LeadSize.PEQUEÑA)}</option>
                  <option value={LeadSize.MEDIANA}>{formatMidaLead(LeadSize.MEDIANA)}</option>
                  <option value={LeadSize.GRANDE}>{formatMidaLead(LeadSize.GRANDE)}</option>
                </select>
              </div>

              {/* Actividad */}
              <div>
                <label htmlFor="activitat_lead" className="block text-xs font-medium text-gray-500 mb-1">
                  Actividad
                </label>
                <select
                  id="activitat_lead"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={(filters as any).activitat_lead || ''}
                  onChange={(e) => handleFilterChange('activitat_lead' as any, e.target.value || undefined)}
                >
                  <option value="">Todas las actividades</option>
                  {actividades?.map((actividad) => (
                    <option key={actividad} value={actividad}>
                      {actividad}
                    </option>
                  ))}
                </select>
              </div>

              {/* Estado activo/inactivo */}
              <div>
                <label htmlFor="actiu_lead" className="block text-xs font-medium text-gray-500 mb-1">
                  Estado
                </label>
                <select
                  id="actiu_lead"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={filters.actiu_lead === undefined ? '' : String(filters.actiu_lead)}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      handleFilterChange('actiu_lead', undefined);
                    } else {
                      handleFilterChange('actiu_lead', value === 'true');
                    }
                  }}
                >
                  <option value="">Todos los estados</option>
                  <option value="true">Activos</option>
                  <option value="false">Inactivos</option>
                </select>
              </div>

              {/* CNAE con componente CNAESelect mejorado */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Código CNAE
                </label>
                <CNAESelect
                  value={filters.cnae_lead}
                  onSelect={handleCNAESelect}
                  placeholder="Buscar por código o descripción..."
                />
              </div>
            </div>
          </div>

          {/* Botón para mostrar/ocultar filtros avanzados */}
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <svg 
              className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showAdvancedFilters ? 'Ocultar filtros avanzados' : 'Mostrar filtros avanzados'}
          </button>

          {/* Filtros avanzados */}
          {showAdvancedFilters && (
            <div className="space-y-5 pt-2 border-t border-gray-200">
              {/* Sección de datos temporales */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Datos Temporales</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Año de creación */}
                  <div>
                    <label htmlFor="any_creacio_lead" className="block text-xs font-medium text-gray-500 mb-1">
                      Año de creación
                    </label>
                    <input
                      type="text"
                      id="any_creacio_lead"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                      value={filters.any_creacio_lead || ''}
                      onChange={(e) => handleFilterChange('any_creacio_lead', e.target.value || undefined)}
                      placeholder="Ej: 2020"
                    />
                  </div>

                  {/* Temporada */}
                  <div className="flex items-center h-full pt-5">
                    <label className="flex items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={!!filters.nomes_temporada_lead}
                        onChange={(e) => handleFilterChange('nomes_temporada_lead', e.target.checked || undefined)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Solo temporada</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sección de datos económicos */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Datos Económicos</h4>
                
                {/* Rango de trabajadores */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Rango de trabajadores
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      id="nombre_treballadors_lead_min"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                      value={filters.nombre_treballadors_lead_min || ''}
                      onChange={(e) => handleFilterChange('nombre_treballadors_lead_min', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Mínimo"
                      min="0"
                    />
                    <input
                      type="number"
                      id="nombre_treballadors_lead_max"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                      value={filters.nombre_treballadors_lead_max || ''}
                      onChange={(e) => handleFilterChange('nombre_treballadors_lead_max', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Máximo"
                      min="0"
                    />
                  </div>
                </div>

                {/* Rango de capital social */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Capital social (€)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      id="capital_social_lead_min"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                      value={filters.capital_social_lead_min || ''}
                      onChange={(e) => handleFilterChange('capital_social_lead_min', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Mínimo"
                      min="0"
                    />
                    <input
                      type="number"
                      id="capital_social_lead_max"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                      value={filters.capital_social_lead_max || ''}
                      onChange={(e) => handleFilterChange('capital_social_lead_max', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Máximo"
                      min="0"
                    />
                  </div>
                </div>

                {/* Cotiza en bolsa */}
                <div>
                  <label className="flex items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={!!filters.cotitza_borsa_lead}
                      onChange={(e) => handleFilterChange('cotitza_borsa_lead', e.target.checked || undefined)}
                    />
                    <span className="ml-2 text-sm text-gray-700">Cotiza en bolsa</span>
                  </label>
                </div>
              </div>

              {/* Sección de características adicionales */}
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">Características Adicionales</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Características especiales */}
                  <div className="space-y-1">
                    <label className="flex items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={!!filters.conciencia_ecologica_lead}
                        onChange={(e) => handleFilterChange('conciencia_ecologica_lead', e.target.checked || undefined)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Conciencia ecológica</span>
                    </label>
                    <label className="flex items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={!!filters.solidaria_social_lead}
                        onChange={(e) => handleFilterChange('solidaria_social_lead', e.target.checked || undefined)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Solidaria social</span>
                    </label>
                  </div>

                  {/* Selectores */}
                  <div className="space-y-3">
                    {/* Importa/Exporta */}
                    <div>
                      <label htmlFor="importa_exporta_lead" className="block text-xs font-medium text-gray-500 mb-1">
                        Importa/Exporta
                      </label>
                      <select
                        id="importa_exporta_lead"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                        value={filters.importa_exporta_lead || ''}
                        onChange={(e) => handleFilterChange('importa_exporta_lead', e.target.value || undefined)}
                      >
                        <option value="">Cualquiera</option>
                        <option value="Importa">Importa</option>
                        <option value="Exporta">Exporta</option>
                        <option value="Ambos">Ambos</option>
                        <option value="Ninguno">Ninguno</option>
                      </select>
                    </div>

                    {/* Idioma preferente */}
                    <div>
                      <label htmlFor="idioma_preferent_lead" className="block text-xs font-medium text-gray-500 mb-1">
                        Idioma preferente
                      </label>
                      <select
                        id="idioma_preferent_lead"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                        value={filters.idioma_preferent_lead || ''}
                        onChange={(e) => handleFilterChange('idioma_preferent_lead', e.target.value || undefined)}
                      >
                        <option value="">Cualquiera</option>
                        <option value="Catalán">Catalán</option>
                        <option value="Castellano">Castellano</option>
                        <option value="Inglés">Inglés</option>
                        <option value="Francés">Francés</option>
                        <option value="Alemán">Alemán</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="flex-1 px-3 py-2 text-sm bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              onClick={handleClearFilters}
              disabled={isLoading}
            >
              Limpiar
            </button>
            <button
              type="button"
              className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm flex justify-center items-center gap-2"
              onClick={handleApplyFilters}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Aplicando...</span>
                </>
              ) : (
                <span>Aplicar filtros</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}