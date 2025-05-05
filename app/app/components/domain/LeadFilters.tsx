// app/components/domain/LeadFilters.tsx
import { useState } from "react";
import type { LeadFilters } from "~/lib/types";

interface LeadFiltersProps {
  provincias: string[];
  poblaciones: string[];
  comarcas: string[];
  initialFilters?: Partial<LeadFilters>;
  onFilterChange?: (filters: Partial<LeadFilters>) => void;
  onApplyFilters?: (filters: Partial<LeadFilters>) => void;
  onClearFilters?: () => void;
}

export function LeadFiltersComponent({
  provincias,
  poblaciones,
  comarcas,
  initialFilters = {},
  onFilterChange,
  onApplyFilters,
  onClearFilters
}: LeadFiltersProps) {
  // Estado para los filtros
  const [filters, setFilters] = useState<Partial<LeadFilters>>(initialFilters);
  
  // Función para actualizar un filtro
  const updateFilter = (key: keyof LeadFilters, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };
  
  // Limpiar todos los filtros
  const clearFilters = () => {
    setFilters({});
    
    if (onClearFilters) {
      onClearFilters();
    }
  };
  
  // Aplicar filtros
  const applyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Filtros</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Primera columna */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Provincia:</label>
            <select 
              className="w-full border rounded p-2"
              value={filters.provincia_lead || ""}
              onChange={(e) => updateFilter("provincia_lead", e.target.value)}
            >
              <option value="">Todas</option>
              {provincias.map(provincia => (
                <option key={provincia} value={provincia}>{provincia}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Población:</label>
            <select 
              className="w-full border rounded p-2"
              value={filters.poblacio_lead || ""}
              onChange={(e) => updateFilter("poblacio_lead", e.target.value)}
            >
              <option value="">Todas</option>
              {poblaciones.map(poblacion => (
                <option key={poblacion} value={poblacion}>{poblacion}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Comarca:</label>
            <select 
              className="w-full border rounded p-2"
              value={filters.comarca_lead || ""}
              onChange={(e) => updateFilter("comarca_lead", e.target.value)}
            >
              <option value="">Todas</option>
              {comarcas.map(comarca => (
                <option key={comarca} value={comarca}>{comarca}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Año de creación:</label>
            <select 
              className="w-full border rounded p-2"
              value={filters.any_creacio_lead || ""}
              onChange={(e) => updateFilter("any_creacio_lead", e.target.value)}
            >
              <option value="">Todos</option>
              {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Segunda columna */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">CNAE:</label>
            <input 
              type="text" 
              className="w-full border rounded p-2"
              value={filters.cnae_lead || ""}
              onChange={(e) => updateFilter("cnae_lead", e.target.value)}
              placeholder="Código CNAE"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tamaño de empresa:</label>
            <select 
              className="w-full border rounded p-2"
              value={filters.mida_lead || "0"}
              onChange={(e) => updateFilter("mida_lead", Number(e.target.value))}
            >
              <option value="0">Todos</option>
              <option value="1">Microempresa</option>
              <option value="2">Pequeña</option>
              <option value="3">Mediana</option>
              <option value="4">Grande</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Estado:</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  checked={filters.actiu_lead === undefined}
                  onChange={() => updateFilter("actiu_lead", undefined)}
                  className="mr-1"
                />
                <span>Todos</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  checked={filters.actiu_lead === true}
                  onChange={() => updateFilter("actiu_lead", true)}
                  className="mr-1"
                />
                <span>Activos</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  checked={filters.actiu_lead === false}
                  onChange={() => updateFilter("actiu_lead", false)}
                  className="mr-1"
                />
                <span>Inactivos</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Idioma preferente:</label>
            <select 
              className="w-full border rounded p-2"
              value={filters.idioma_preferent_lead || ""}
              onChange={(e) => updateFilter("idioma_preferent_lead", e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Catalán">Catalán</option>
              <option value="Castellano">Castellano</option>
              <option value="Inglés">Inglés</option>
              <option value="Francés">Francés</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
        </div>
        
        {/* Tercera columna */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Cotiza en bolsa:</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  checked={filters.cotitza_borsa_lead === undefined}
                  onChange={() => updateFilter("cotitza_borsa_lead", undefined)}
                  className="mr-1"
                />
                <span>Todos</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio"
                  checked={filters.cotitza_borsa_lead === true}
                  onChange={() => updateFilter("cotitza_borsa_lead", true)}
                  className="mr-1"
                />
                <span>Sí</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio"
                  checked={filters.cotitza_borsa_lead === false}
                  onChange={() => updateFilter("cotitza_borsa_lead", false)}
                  className="mr-1"
                />
                <span>No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Empresa de temporada:</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  checked={filters.nomes_temporada_lead === undefined}
                  onChange={() => updateFilter("nomes_temporada_lead", undefined)}
                  className="mr-1"
                />
                <span>Todos</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio"
                  checked={filters.nomes_temporada_lead === true}
                  onChange={() => updateFilter("nomes_temporada_lead", true)}
                  className="mr-1"
                />
                <span>Sí</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio"
                  checked={filters.nomes_temporada_lead === false}
                  onChange={() => updateFilter("nomes_temporada_lead", false)}
                  className="mr-1"
                />
                <span>No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Conciencia ecológica:</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  checked={filters.conciencia_ecologica_lead === undefined}
                  onChange={() => updateFilter("conciencia_ecologica_lead", undefined)}
                  className="mr-1"
                />
                <span>Todos</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio"
                  checked={filters.conciencia_ecologica_lead === true}
                  onChange={() => updateFilter("conciencia_ecologica_lead", true)}
                  className="mr-1"
                />
                <span>Sí</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio"
                  checked={filters.conciencia_ecologica_lead === false}
                  onChange={() => updateFilter("conciencia_ecologica_lead", false)}
                  className="mr-1"
                />
                <span>No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Empresa solidaria:</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  checked={filters.solidaria_social_lead === undefined}
                  onChange={() => updateFilter("solidaria_social_lead", undefined)}
                  className="mr-1"
                />
                <span>Todos</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio"
                  checked={filters.solidaria_social_lead === true}
                  onChange={() => updateFilter("solidaria_social_lead", true)}
                  className="mr-1"
                />
                <span>Sí</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio"
                  checked={filters.solidaria_social_lead === false}
                  onChange={() => updateFilter("solidaria_social_lead", false)}
                  className="mr-1"
                />
                <span>No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Importa/Exporta:</label>
            <select 
              className="w-full border rounded p-2"
              value={filters.importa_exporta_lead || ""}
              onChange={(e) => updateFilter("importa_exporta_lead", e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Importa">Importa</option>
              <option value="Exporta">Exporta</option>
              <option value="Ambas">Ambas</option>
              <option value="Ninguna">Ninguna</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex space-x-4">
        <button 
          type="button" 
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          <span className="mr-1">🔍</span> Aplicar Filtros
        </button>
        
        <button 
          type="button" 
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 flex items-center"
        >
          <span className="mr-1">🔄</span> Limpiar Filtros
        </button>
      </div>
    </div>
  );
}