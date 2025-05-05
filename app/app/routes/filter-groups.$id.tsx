// ~/routes/filter-groups.$id.tsx
import { json } from "@remix-run/node";
import { useNavigate, useParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { FilterGroup, FilterGroupService } from "~/services/filter-group.service";

// This is a client-side only route, loader is needed for types
export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json({ id: params.id });
};

export default function FilterGroupForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [error, setError] = useState("");
  const [showFilterDetails, setShowFilterDetails] = useState(false);

  // Load filter group if editing
  useEffect(() => {
    if (!isNew && id) {
      const filterGroup = FilterGroupService.getById(id);
      if (filterGroup) {
        setName(filterGroup.name);
        setDescription(filterGroup.description || "");
        setFilters(filterGroup.filters);
      } else {
        setError("Grupo de filtros no encontrado");
      }
    }
  }, [id, isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    
    try {
      FilterGroupService.save({
        id: isNew ? undefined : id,
        name,
        description,
        filters
      });
      
      navigate("/filter-groups");
    } catch (err) {
      setError("Error al guardar el grupo de filtros");
      console.error(err);
    }
  };

  // Format filter values for display
  const formatFilterValue = (key: string, value: any) => {
    if (key === 'mida_lead') {
      const sizeMap: Record<string, string> = {
        '1': 'Microempresa',
        '2': 'Pequeña',
        '3': 'Mediana',
        '4': 'Grande'
      };
      return sizeMap[value] || value;
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No';
    }
    
    return value;
  };

  // Group filters by category for better display
  const groupFiltersByCategory = (filters: Record<string, any>) => {
    const categories: Record<string, Record<string, any>> = {
      "Información básica": {},
      "Ubicación": {},
      "Características": {},
      "Detalles financieros": {},
      "Contacto": {},
      "Otros": {}
    };
    
    // Asignar cada filtro a su categoría
    Object.entries(filters).forEach(([key, value]) => {
      if (["nom_lead", "nom_basic_lead", "nom_empresarial_lead", "nom_fiscal_lead", "activitat_lead", "cnae_lead", "mida_lead", "actiu_lead"].includes(key)) {
        categories["Información básica"][key] = value;
      }
      else if (["provincia_lead", "poblacio_lead", "comarca_lead", "adreca_lead", "codi_postal_lead"].includes(key)) {
        categories["Ubicación"][key] = value;
      }
      else if (["nomes_temporada_lead", "conciencia_ecologica_lead", "solidaria_social_lead", "importa_exporta_lead", "any_creacio_lead", "nombre_treballadors_lead_min", "nombre_treballadors_lead_max"].includes(key)) {
        categories["Características"][key] = value;
      }
      else if (["capital_social_lead_min", "capital_social_lead_max", "cotitza_borsa_lead"].includes(key)) {
        categories["Detalles financieros"][key] = value;
      }
      else if (["email_lead", "NIF_lead", "xarxe_social_lead", "link_web_lead", "idioma_preferent_lead"].includes(key)) {
        categories["Contacto"][key] = value;
      }
      else {
        categories["Otros"][key] = value;
      }
    });
    
    // Eliminar categorías vacías
    for (const category in categories) {
      if (Object.keys(categories[category]).length === 0) {
        delete categories[category];
      }
    }
    
    return categories;
  };

  // Render formatted filter labels
  const getFilterLabel = (key: string): string => {
    const filterLabels: Record<string, string> = {
      'provincia_lead': 'Provincia',
      'poblacio_lead': 'Población',
      'comarca_lead': 'Comarca',
      'adreca_lead': 'Dirección',
      'codi_postal_lead': 'Código postal',
      'cnae_lead': 'CNAE',
      'mida_lead': 'Tamaño',
      'actiu_lead': 'Activo',
      'any_creacio_lead': 'Año creación',
      'nombre_treballadors_lead_min': 'Trabajadores (mín)',
      'nombre_treballadors_lead_max': 'Trabajadores (máx)',
      'idioma_preferent_lead': 'Idioma',
      'cotitza_borsa_lead': 'Cotiza en bolsa',
      'nomes_temporada_lead': 'Temporada',
      'conciencia_ecologica_lead': 'Ecológica',
      'solidaria_social_lead': 'Solidaria',
      'importa_exporta_lead': 'Importa/Exporta',
      'email_lead': 'Email',
      'NIF_lead': 'NIF',
      'nom_basic_lead': 'Nombre básico',
      'nom_empresarial_lead': 'Nombre empresarial',
      'nom_fiscal_lead': 'Nombre fiscal',
      'activitat_lead': 'Actividad',
      'capital_social_lead_min': 'Capital social (mín)',
      'capital_social_lead_max': 'Capital social (máx)',
      'xarxe_social_lead': 'Redes sociales',
      'link_web_lead': 'Sitio web'
    };
    
    return filterLabels[key] || key.replace('_lead', '');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isNew ? "Nuevo Grupo de Filtros" : "Editar Grupo de Filtros"}
        </h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Nombre:
              </label>
              <input
                id="name"
                type="text"
                className="w-full border rounded p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Descripción (opcional):
              </label>
              <textarea
                id="description"
                className="w-full border rounded p-2"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {!isNew && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Filtros Guardados</h3>
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-900 text-sm"
                    onClick={() => setShowFilterDetails(!showFilterDetails)}
                  >
                    {showFilterDetails ? 'Ocultar detalles' : 'Mostrar detalles'}
                  </button>
                </div>
                
                {showFilterDetails && Object.keys(filters).length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded border">
                    {Object.entries(groupFiltersByCategory(filters)).map(([category, categoryFilters]) => (
                      <div key={category} className="mb-4">
                        <h4 className="text-sm font-medium mb-2 text-gray-700">{category}</h4>
                        <ul className="space-y-1">
                          {Object.entries(categoryFilters).map(([key, value]) => (
                            <li key={key} className="text-sm">
                              <strong>{getFilterLabel(key)}:</strong> {formatFilterValue(key, value)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded border text-gray-500 text-sm">
                    {Object.keys(filters).length === 0 
                      ? 'No hay filtros configurados.' 
                      : `Este grupo tiene ${Object.keys(filters).length} filtros configurados.`}
                  </div>
                )}
                
                <p className="text-sm text-gray-500 mt-2">
                  Para modificar los filtros, debes aplicar este grupo en la página de asignación masiva,
                  hacer los cambios necesarios y guardar como un nuevo grupo de filtros.
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/filter-groups")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}