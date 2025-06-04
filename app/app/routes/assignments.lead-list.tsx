// app/routes/assignments.lead-list.tsx
import { useState, useEffect, useRef } from 'react';
import type { Lead } from '~/lib/types';

interface LeadListProps {
  leads: Lead[];
  selectedLeads: Lead[];
  onSelectLeads: (leads: Lead[]) => void;
  isLoading: boolean;
}

export default function LeadList({ leads, selectedLeads, onSelectLeads, isLoading }: LeadListProps) {
  const [selectAll, setSelectAll] = useState(false);
  const [sortField, setSortField] = useState<keyof Lead | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [displayedLeads, setDisplayedLeads] = useState<Lead[]>(leads);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState<keyof Lead>('nom_lead');
  
  // Referencia a la tabla para poder hacer scroll
  const tableRef = useRef<HTMLDivElement>(null);

  // Actualizar displayedLeads cuando cambien los leads o el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayedLeads(leads);
    } else {
      const filtered = leads.filter(lead => {
        const value = lead[searchField];
        if (value === undefined || value === null) return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
      setDisplayedLeads(filtered);
    }
  }, [leads, searchTerm, searchField]);

  // Verificar si un lead está seleccionado
  const isLeadSelected = (leadId: number) => {
    return selectedLeads.some(lead => lead.id_lead === leadId);
  };

  // Manejar selección/deselección de un lead
  const handleLeadSelection = (lead: Lead, index: number, shiftKey: boolean = false) => {
    if (shiftKey && lastSelectedIndex !== null) {
      // Determinar rango de selección
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      const rangeLeads = displayedLeads.slice(start, end + 1);
      
      // Si el último lead seleccionado estaba seleccionado, seleccionar todo el rango
      // Si no, deseleccionar todo el rango
      if (isLeadSelected(displayedLeads[lastSelectedIndex].id_lead)) {
        // Añadir leads del rango que no estén ya seleccionados
        const leadsToAdd = rangeLeads.filter(l => !isLeadSelected(l.id_lead));
        onSelectLeads([...selectedLeads, ...leadsToAdd]);
      } else {
        // Quitar leads del rango que estén seleccionados
        const leadIdsToRemove = new Set(rangeLeads.map(l => l.id_lead));
        onSelectLeads(selectedLeads.filter(l => !leadIdsToRemove.has(l.id_lead)));
      }
    } else {
      if (isLeadSelected(lead.id_lead)) {
        onSelectLeads(selectedLeads.filter(item => item.id_lead !== lead.id_lead));
      } else {
        onSelectLeads([...selectedLeads, lead]);
      }
      setLastSelectedIndex(index);
    }
  };

  // Manejar selección/deselección de todos los leads
  const handleSelectAll = () => {
    if (selectAll) {
      onSelectLeads([]);
    } else {
      onSelectLeads([...displayedLeads]);
    }
    setSelectAll(!selectAll);
  };

  // Manejar selección por página o grupo
  const handleSelectPage = () => {
    // Seleccionar los leads visibles en la página actual
    onSelectLeads([...displayedLeads]);
    setSelectAll(true);
  };

  // Seleccionar por tipo
  const handleSelectByType = (field: keyof Lead, value: any) => {
    const leadsToSelect = displayedLeads.filter(lead => lead[field] === value);
    // Si todos los leads de este tipo ya están seleccionados, deseleccionarlos
    const allSelected = leadsToSelect.every(lead => isLeadSelected(lead.id_lead));
    
    if (allSelected) {
      // Deseleccionar los leads de este tipo
      onSelectLeads(selectedLeads.filter(lead => lead[field] !== value));
    } else {
      // Añadir los leads de este tipo que no estén seleccionados
      const currentSelectedIds = new Set(selectedLeads.map(lead => lead.id_lead));
      const newLeadsToAdd = leadsToSelect.filter(lead => !currentSelectedIds.has(lead.id_lead));
      onSelectLeads([...selectedLeads, ...newLeadsToAdd]);
    }
  };

  // Actualizar selectAll cuando cambien los leads o selectedLeads
  useEffect(() => {
    setSelectAll(displayedLeads.length > 0 && displayedLeads.length === selectedLeads.length);
  }, [displayedLeads, selectedLeads]);

  // Ordenar leads
  const handleSort = (field: keyof Lead) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);

    const sortedLeads = [...displayedLeads].sort((a, b) => {
      const valueA = a[field] === undefined ? '' : a[field];
      const valueB = b[field] === undefined ? '' : b[field];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return newDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }

      if (valueA === valueB) return 0;
      
      if (newDirection === 'asc') {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setDisplayedLeads(sortedLeads);
  };

  // Renderizar mensaje de loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3"></div>
        <p className="text-gray-600">Cargando leads...</p>
      </div>
    );
  }

  // Renderizar mensaje si no hay leads
  if (leads.length === 0) {
    return (
      <div className="text-center py-12 px-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 mx-4 my-4">
        <svg 
          className="mx-auto h-12 w-12 text-gray-400 mb-3" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1} 
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <p className="text-gray-600 font-medium mb-1">No se encontraron leads</p>
        <p className="text-sm text-gray-500">Prueba a modificar los filtros para obtener resultados.</p>
      </div>
    );
  }

  // Función para renderizar la flecha de ordenación
  const renderSortIcon = (field: keyof Lead) => {
    if (sortField !== field) {
      return (
        <svg className="w-3 h-3 opacity-0 group-hover:opacity-40" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  };

  // Contar leads por provincia para la selección por grupo
  const leadsCountByProvince: Record<string, number> = {};
  displayedLeads.forEach(lead => {
    const provincia = lead.provincia_lead || 'Sin provincia';
    leadsCountByProvince[provincia] = (leadsCountByProvince[provincia] || 0) + 1;
  });

  // Contar leads por actividad para la selección por grupo
  const leadsCountByActivity: Record<string, number> = {};
  displayedLeads.forEach(lead => {
    const actividad = lead.activitat_lead || 'Sin actividad';
    leadsCountByActivity[actividad] = (leadsCountByActivity[actividad] || 0) + 1;
  });

  return (
    <div>
      {/* Barra de búsqueda y herramientas de selección */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-3 justify-between items-center">
        {/* Búsqueda */}
        <div className="flex flex-1 min-w-0 sm:max-w-xs">
          <div className="relative rounded-md shadow-sm flex-1">
            <input
              type="text"
              placeholder={`Buscar por ${searchField === 'nom_lead' ? 'nombre' : searchField === 'nom_empresarial_lead' ? 'empresa' : 'provincia'}...`}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select
                className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm focus:border-blue-500 focus:ring-blue-500"
                value={searchField as string}
                onChange={e => setSearchField(e.target.value as keyof Lead)}
              >
                <option value="nom_lead">Nombre</option>
                <option value="nom_empresarial_lead">Empresa</option>
                <option value="provincia_lead">Provincia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Acciones de selección */}
        <div className="flex flex-wrap gap-2">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              id="select-options-menu"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => {
                const menu = document.getElementById('select-options-dropdown');
                if (menu) {
                  menu.classList.toggle('hidden');
                }
              }}
            >
              Seleccionar
              <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div
              id="select-options-dropdown"
              className="hidden origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="select-options-menu"
            >
              <div className="py-1" role="none">
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleSelectAll}
                  role="menuitem"
                >
                  {selectAll ? 'Deseleccionar todos' : 'Seleccionar todos'} ({displayedLeads.length})
                </button>
                <button
                  type="button"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleSelectPage}
                  role="menuitem"
                >
                  Seleccionar esta página ({displayedLeads.length})
                </button>
                
                {/* Selección por provincia */}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Por provincia
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {Object.entries(leadsCountByProvince)
                      .sort((a, b) => a[0].localeCompare(b[0]))
                      .map(([provincia, count]) => (
                        <button
                          key={provincia}
                          type="button"
                          className="block w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleSelectByType('provincia_lead', provincia === 'Sin provincia' ? null : provincia)}
                          role="menuitem"
                        >
                          {provincia} ({count})
                        </button>
                      ))
                    }
                  </div>
                </div>
                
                {/* Selección por actividad */}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <div className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Por actividad
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {Object.entries(leadsCountByActivity)
                      .sort((a, b) => a[0].localeCompare(b[0]))
                      .map(([actividad, count]) => (
                        <button
                          key={actividad}
                          type="button"
                          className="block w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleSelectByType('activitat_lead', actividad === 'Sin actividad' ? null : actividad)}
                          role="menuitem"
                        >
                          {actividad} ({count})
                        </button>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botón para invertir selección */}
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              const leadsToSelect = displayedLeads.filter(lead => !isLeadSelected(lead.id_lead));
              const leadsToKeep = selectedLeads.filter(lead => !displayedLeads.some(l => l.id_lead === lead.id_lead));
              onSelectLeads([...leadsToKeep, ...leadsToSelect]);
            }}
          >
            Invertir selección
          </button>

          {/* Botón para limpiar selección */}
          {selectedLeads.length > 0 && (
            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => onSelectLeads([])}
            >
              Limpiar selección
            </button>
          )}
        </div>
      </div>

      {/* Contador de selección */}
      {selectedLeads.length > 0 && (
        <div className="px-4 py-2 bg-blue-50 border-b border-blue-200 text-sm text-blue-700">
          <span className="font-medium">{selectedLeads.length}</span> leads seleccionados
          {selectedLeads.length !== displayedLeads.length && ` de ${displayedLeads.length} mostrados`}
        </div>
      )}

      {/* Tabla de leads */}
      <div className="overflow-x-auto" ref={tableRef}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-3 py-3 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  <span className="ml-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Todos
                  </span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('id_lead')}
              >
                <div className="flex items-center">
                  <span>ID</span>
                  <span className="ml-1">{renderSortIcon('id_lead')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('nom_lead')}
              >
                <div className="flex items-center">
                  <span>Nombre</span>
                  <span className="ml-1">{renderSortIcon('nom_lead')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('nom_empresarial_lead')}
              >
                <div className="flex items-center">
                  <span>Empresa</span>
                  <span className="ml-1">{renderSortIcon('nom_empresarial_lead')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('provincia_lead')}
              >
                <div className="flex items-center">
                  <span>Provincia</span>
                  <span className="ml-1">{renderSortIcon('provincia_lead')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('poblacio_lead')}
              >
                <div className="flex items-center">
                  <span>Población</span>
                  <span className="ml-1">{renderSortIcon('poblacio_lead')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('activitat_lead')}
              >
                <div className="flex items-center">
                  <span>Actividad</span>
                  <span className="ml-1">{renderSortIcon('activitat_lead')}</span>
                </div>
              </th>
              <th 
                scope="col" 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                onClick={() => handleSort('actiu_lead')}
              >
                <div className="flex items-center">
                  <span>Estado</span>
                  <span className="ml-1">{renderSortIcon('actiu_lead')}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedLeads.map((lead, index) => (
              <tr 
                key={lead.id_lead} 
                onClick={(e) => handleLeadSelection(lead, index, e.shiftKey)}
                className={`hover:bg-gray-50 cursor-pointer transition-colors ${isLeadSelected(lead.id_lead) ? 'bg-blue-50' : ''}`}
              >
                <td className="px-3 py-2.5 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={isLeadSelected(lead.id_lead)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleLeadSelection(lead, index);
                    }}
                  />
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-xs text-gray-500">
                  {lead.id_lead}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900">
                  {lead.nom_lead || 'N/A'}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-800">
                  {lead.nom_empresarial_lead || lead.nom_fiscal_lead || 'N/A'}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-600">
                  {lead.provincia_lead || 'N/A'}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-600">
                  {lead.poblacio_lead || 'N/A'}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm text-gray-600">
                  {lead.activitat_lead || 'N/A'}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap text-sm">
                  <span 
                    className={`px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${
                      lead.actiu_lead 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {lead.actiu_lead ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer de la tabla */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        <div className="flex justify-between items-center">
          <div>
            Mostrando {displayedLeads.length} de {leads.length} leads
          </div>
          <div>
            {searchTerm && (
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setSearchTerm('')}
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}