// app/routes/assignments.saved-filters.tsx
import { useState, useEffect } from 'react';
import type { LeadFilters } from '~/lib/types';
import { FilterGroupService, type FilterGroup } from '~/services/filter-group.services';

interface SavedFiltersProps {
  onSelectFilter: (filters: LeadFilters) => void;
}

export default function SavedFilters({ onSelectFilter }: SavedFiltersProps) {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Cargar los filtros guardados al montar el componente
  useEffect(() => {
    loadFilterGroups();
  }, []);

  // Función para cargar los filtros guardados
  const loadFilterGroups = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const groups = await FilterGroupService.getAll();
      setFilterGroups(groups);
    } catch (err) {
      console.error('Error al cargar los grupos de filtros:', err);
      setError('No se pudieron cargar los filtros guardados. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para aplicar un filtro seleccionado
  const applyFilter = (filters: LeadFilters) => {
    onSelectFilter(filters);
  };

  // Función para eliminar un filtro
  const deleteFilter = async (id: number) => {
    setIsLoading(true);
    try {
      await FilterGroupService.delete(id);
      // Actualizar la lista después de eliminar
      setFilterGroups(filterGroups.filter(group => group.id !== id));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Error al eliminar el filtro:', err);
      setError('No se pudo eliminar el filtro. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calcular la cantidad de filtros activos para cada grupo
  const countActiveFilters = (filters: LeadFilters) => {
    return Object.keys(filters).length;
  };

  if (isLoading && filterGroups.length === 0) {
    return (
      <div className="p-4 flex justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && filterGroups.length === 0) {
    return (
      <div className="p-4 text-red-600 text-sm">
        {error}
      </div>
    );
  }

  if (filterGroups.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-sm text-center">
        No hay filtros guardados
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {filterGroups.map((group) => (
        <div 
          key={group.id} 
          className="border border-gray-200 rounded-md overflow-hidden hover:border-blue-300 transition-colors"
        >
          <div className="bg-gray-50 px-3 py-2 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-gray-700">{group.name}</h3>
              <p className="text-xs text-gray-500">
                {countActiveFilters(group.filters)} filtros
              </p>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => applyFilter(group.filters)}
                className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                title="Aplicar filtros"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {showDeleteConfirm === group.id ? (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => deleteFilter(group.id)}
                    className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
                    title="Confirmar eliminación"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                    title="Cancelar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowDeleteConfirm(group.id)}
                  className="p-1.5 bg-gray-50 text-gray-500 rounded hover:bg-gray-100"
                  title="Eliminar filtro"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {group.description && (
            <div className="px-3 py-2 text-xs text-gray-600 border-t border-gray-100">
              {group.description}
            </div>
          )}
          
          <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(group.filters).slice(0, 5).map(([key, value]) => (
                <span 
                  key={key} 
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {key.replace(/_/g, ' ')}: {String(value).substring(0, 15)}
                  {String(value).length > 15 && '...'}
                </span>
              ))}
              {Object.keys(group.filters).length > 5 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                  +{Object.keys(group.filters).length - 5} más
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}