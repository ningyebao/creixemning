// app/routes/assignments.filter-actions.tsx
import { useState } from 'react';
import type { LeadFilters } from '~/lib/types';

interface FilterActionsProps {
  activeFilters: LeadFilters;
  onSaveFilters: (name: string, description: string) => void;
  onToggleAutoFilter: () => void;
  onToggleSavedFilters: () => void;
  showAutoFilter: boolean;
  showSavedFilters: boolean;
}

export default function FilterActions({
  activeFilters,
  onSaveFilters,
  onToggleAutoFilter,
  onToggleSavedFilters,
  showAutoFilter,
  showSavedFilters
}: FilterActionsProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterDescription, setFilterDescription] = useState('');
  const [saveError, setSaveError] = useState('');

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  const handleSave = () => {
    setSaveError('');
    
    if (!filterName.trim()) {
      setSaveError('El nombre es obligatorio');
      return;
    }

    console.log('Guardando filtros:', {
      name: filterName,
      description: filterDescription,
      filters: activeFilters
    });

    onSaveFilters(filterName.trim(), filterDescription.trim());
    
    // Resetear el formulario
    setFilterName('');
    setFilterDescription('');
    setShowSaveDialog(false);
  };

  const handleCancel = () => {
    setFilterName('');
    setFilterDescription('');
    setSaveError('');
    setShowSaveDialog(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-base font-medium text-gray-800">Acciones de filtros</h3>
      </div>
      
      <div className="p-4 space-y-3">
        {/* Botón para guardar filtros */}
        <button
          type="button"
          disabled={!hasActiveFilters}
          onClick={() => setShowSaveDialog(true)}
          className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            hasActiveFilters
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
          </svg>
          Guardar filtros actuales
        </button>

        {/* Botón para ver filtros guardados */}
        <button
          type="button"
          onClick={onToggleSavedFilters}
          className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            showSavedFilters
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          Ver filtros guardados
        </button>

        {/* Botón para automatización */}
        <button
          type="button"
          onClick={onToggleAutoFilter}
          className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            showAutoFilter
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Automatizar filtros
        </button>
      </div>

      {/* Dialog para guardar filtros */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Guardar grupo de filtros</h3>
            </div>
            
            <div className="px-6 py-4 space-y-4">
              <div>
                <label htmlFor="filter-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del grupo *
                </label>
                <input
                  type="text"
                  id="filter-name"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ej: Leads Barcelona Activos"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="filter-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (opcional)
                </label>
                <textarea
                  id="filter-description"
                  value={filterDescription}
                  onChange={(e) => setFilterDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  placeholder="Describe para qué se usan estos filtros..."
                />
              </div>

              {/* Mostrar los filtros que se van a guardar */}
              <div className="bg-gray-50 rounded-md p-3">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Filtros a guardar ({Object.keys(activeFilters).length}):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(activeFilters).map(([key, value]) => (
                    <span 
                      key={key}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {key.replace(/_/g, ' ')}: {String(value)}
                    </span>
                  ))}
                </div>
              </div>

              {saveError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                  {saveError}
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}