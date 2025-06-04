// app/routes/leads._index.tsx
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import { LeadService, type Lead } from "~/services/leads.service";

// Función auxiliar para formatear el tamaño del lead
const formatMidaLead = (mida?: number): string => {
  switch (mida) {
    case 1:
      return "Microempresa";
    case 2:
      return "Pequeña";
    case 3:
      return "Mediana";
    case 4:
      return "Grande";
    default:
      return "Sin definir";
  }
};

// Función auxiliar para asegurar que todos los leads tienen un ID utilizable
const ensureLeadIds = (leads: any[]): Lead[] => {
  return leads.map((lead, index) => {
    // Si el lead no tiene id, intentamos encontrarlo bajo otra propiedad como id_lead
    // Si no existe ninguna de esas propiedades, asignamos un ID temporal basado en el índice
    if (lead.id === undefined) {
      console.warn("Lead sin ID estándar encontrado:", lead);
      // Intentamos buscar el ID en otras propiedades conocidas
      const leadId = lead.id_lead || lead.lead_id;
      
      return {
        ...lead,
        // Asignar el ID encontrado o usar el índice como fallback
        id: leadId !== undefined ? leadId : index + 1
      };
    }
    return lead;
  });
};

// Definir el tipo de datos que devolverá el loader
interface LoaderData {
  leads: Lead[];
  page: number;
  limit: number;
  totalLeads: number;
  searchTerm: string;
  error: string | null;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  // Parámetros de paginación
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;
  
  // Búsqueda
  const searchTerm = url.searchParams.get("search") || "";
  
  // Construir objeto de filtros simplificado
  const filters: Record<string, any> = {};
  
  // Recorrer todos los parámetros de URL excepto los de paginación
  for (const [key, value] of url.searchParams.entries()) {
    if (key !== "page" && key !== "limit" && key !== "search") {
      // Convertir valores según corresponda
      if (value === "true") {
        filters[key] = true;
      } else if (value === "false") {
        filters[key] = false;
      } else if (!isNaN(Number(value)) && 
                key !== "fecha_registro_inicio" && 
                key !== "fecha_registro_fin") {
        filters[key] = Number(value);
      } else {
        filters[key] = value;
      }
    }
  }
  
  try {
    // Cargar leads (ya sea por búsqueda o con filtros)
    let leads: any[] = [];
    
    try {
      if (searchTerm && searchTerm.length >= 2) {
        leads = await LeadService.search(searchTerm, skip, limit);
      } else {
        leads = await LeadService.getAll(skip, limit, filters);
      }
      
      // Verificar y loguear los datos recibidos para depuración
      console.log("Datos de leads recibidos:", JSON.stringify(leads, null, 2));
      
      // Asegurar que todos los leads tienen un ID utilizable
      leads = ensureLeadIds(leads);
      
    } catch (error) {
      console.error("Error al cargar leads:", error);
      
      return json<LoaderData>({
        leads: [],
        page,
        limit,
        totalLeads: 0,
        searchTerm,
        error: "Error al cargar los leads. Por favor, intenta de nuevo más tarde."
      });
    }
    
    return json<LoaderData>({
      leads,
      page,
      limit,
      totalLeads: leads.length,
      searchTerm,
      error: null
    });
  } catch (error) {
    console.error("Error general:", error);
    
    return json<LoaderData>({
      leads: [],
      page,
      limit,
      totalLeads: 0,
      searchTerm,
      error: "Error al procesar la solicitud. Por favor, intenta de nuevo más tarde."
    });
  }
}

export default function LeadsIndex() {
  const {
    leads,
    page,
    limit,
    totalLeads,
    searchTerm,
    error
  } = useLoaderData<typeof loader>();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchTerm);
  
  // Loguear para depuración 
  useEffect(() => {
    console.log("Leads en estado del componente:", leads);
  }, [leads]);
  
  // Manejar envío del formulario de búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    
    if (searchInput.trim()) {
      newParams.set("search", searchInput.trim());
    } else {
      newParams.delete("search");
    }
    
    newParams.set("page", "1"); // Resetear a página 1 al buscar
    setSearchParams(newParams);
  };
  
  // Manejar cambio en los filtros
  const handleFilterChange = (name: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }
    
    newParams.set("page", "1"); // Resetear a página 1 al filtrar
    setSearchParams(newParams);
  };
  
  // Limpiar todos los filtros y la búsqueda
  const clearFilters = () => {
    setSearchInput("");
    setSearchParams({ page: "1" });
  };
  
  // Manejar cambio de página
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };
  
  // Manejar la eliminación de un lead
  const handleDelete = (lead: Lead) => {
    if (window.confirm("¿Segur@ de la eliminación?")) {
      try {
        // Usar el campo id_lead que ahora está garantizado
        LeadService.delete(lead.id_lead)
          .then(() => {
            window.location.reload();
          })
          .catch(err => {
            alert("Error al eliminar: " + (err instanceof Error ? err.message : "Error desconocido"));
          });
      } catch (err) {
        alert("Error al eliminar");
        console.error(err);
      }
    }
  };
  
  // Calcular si hay más páginas
  const hasMoreResults = leads.length === limit;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Leads</h1>
        <Link
          to="/leads/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Nuevo Lead
        </Link>
      </div>
      
      {/* Panel de filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar por nombre, email, NIF..."
              className="flex-1 p-2 border rounded"
              aria-label="Buscar leads"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Limpiar
            </button>
          </div>
        </form>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro de provincia */}
          <div>
            <label htmlFor="provincia_lead" className="block text-sm font-medium text-gray-700 mb-1">
              Provincia
            </label>
            <select
              id="provincia_lead"
              value={searchParams.get("provincia_lead") || ""}
              onChange={(e) => handleFilterChange("provincia_lead", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Todas las provincias</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Madrid">Madrid</option>
              <option value="Valencia">Valencia</option>
              <option value="Sevilla">Sevilla</option>
              <option value="Alicante">Alicante</option>
            </select>
          </div>
          
          {/* Filtro de estado activo/inactivo */}
          <div>
            <label htmlFor="actiu_lead" className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              id="actiu_lead"
              value={searchParams.get("actiu_lead") || ""}
              onChange={(e) => handleFilterChange("actiu_lead", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Todos</option>
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </select>
          </div>
          
          {/* Filtro de tamaño */}
          <div>
            <label htmlFor="mida_lead" className="block text-sm font-medium text-gray-700 mb-1">
              Tamaño
            </label>
            <select
              id="mida_lead"
              value={searchParams.get("mida_lead") || ""}
              onChange={(e) => handleFilterChange("mida_lead", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Todos los tamaños</option>
              <option value="1">Microempresa</option>
              <option value="2">Pequeña</option>
              <option value="3">Mediana</option>
              <option value="4">Grande</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Mensaje de error si existe */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {/* Tabla de leads */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Población
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provincia
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tamaño
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.length > 0 ? (
                leads.map((lead, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lead.nom_lead}</div>
                      {lead.nom_fiscal_lead && (
                        <div className="text-sm text-gray-500">{lead.nom_fiscal_lead}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.email_lead || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.poblacio_lead || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.provincia_lead || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatMidaLead(lead.mida_lead)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${lead.actiu_lead ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {lead.actiu_lead ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/leads/${lead.id_lead}`}
                        className={`text-blue-600 hover:text-blue-900 mr-3 ${!lead.id_lead ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={(e) => {
                          if (!lead.id_lead) {
                            e.preventDefault();
                            alert('No se puede ver este lead porque no tiene un ID válido.');
                          }
                        }}
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/leads/${lead.id_lead}/edit`}
                        className={`text-indigo-600 hover:text-indigo-900 mr-3 ${!lead.id_lead ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={(e) => {
                          if (!lead.id_lead) {
                            e.preventDefault();
                            alert('No se puede editar este lead porque no tiene un ID válido.');
                          }
                        }}
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(lead)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm
                      ? "No se encontraron leads con los criterios de búsqueda especificados."
                      : "No hay leads disponibles. Crea un nuevo lead para comenzar."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Paginación */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          {totalLeads > 0 && (
            <span>
              Mostrando <span className="font-medium">{Math.min((page - 1) * limit + 1, totalLeads)}</span>
              {" - "}
              <span className="font-medium">{Math.min(page * limit, totalLeads)}</span>
              {" de resultados"}
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className={`px-4 py-2 border rounded ${
              page <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-50"
            }`}
          >
            Anterior
          </button>
          
          <span className="px-4 py-2 border rounded bg-blue-50 text-blue-600">
            Página {page}
          </span>
          
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasMoreResults}
            className={`px-4 py-2 border rounded ${
              !hasMoreResults
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-50"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}