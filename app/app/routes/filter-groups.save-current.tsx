// ~/routes/filter-groups._index.tsx
import { json } from "@remix-run/node";
import { useEffect, useState } from "react";
import { Link, useSubmit, Form } from "@remix-run/react";
import { FilterGroup, FilterGroupService } from "~/services/filter-group.service";
import { AgentService } from "~/services/agents.service";
import { CampanyaService } from "~/services/campanya.service";
import type { Agent, Campanya } from "~/lib/types";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

// Interfaces para los datos
interface LoaderData {
  agents: Agent[];
  campanyas: Campanya[];
}

// Cargamos agentes y campañas para la asignación
export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const [agents, campanyas] = await Promise.all([
      AgentService.getAll(),
      CampanyaService.getAll(),
    ]);
    
    return json<LoaderData>({
      agents,
      campanyas,
    });
  } catch (error) {
    console.error("Error cargando datos:", error);
    return json<LoaderData>({
      agents: [],
      campanyas: [],
    });
  }
};

// Acción para aplicar grupos de filtros
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const filterGroupIds = formData.getAll("filterGroupIds") as string[];
  const agentIds = formData.getAll("agentIds").map(id => parseInt(id.toString()));
  const campanyaIds = formData.getAll("campanyaIds").map(id => parseInt(id.toString()));
  
  // Construir la URL para redireccionar a la página de asignación masiva
  let url = "/assignments/bulk?";
  
  // Si hay grupos de filtros seleccionados, los añadimos a la URL
  if (filterGroupIds.length > 0) {
    url += `filterGroupId=${filterGroupIds[0]}`;
    // Podríamos añadir soporte para múltiples grupos en el futuro
  }
  
  // Si hay agentes y campañas seleccionados, también los añadimos
  if (agentIds.length > 0 && campanyaIds.length > 0) {
    url += "&preselectedAgents=" + agentIds.join(",");
    url += "&preselectedCampanyas=" + campanyaIds.join(",");
  }
  
  return json({ redirect: url });
};

export default function FilterGroupsIndex() {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [selectedFilterGroups, setSelectedFilterGroups] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [selectedCampanyas, setSelectedCampanyas] = useState<number[]>([]);
  const submit = useSubmit();

  // Carga los grupos de filtros de localStorage
  useEffect(() => {
    setFilterGroups(FilterGroupService.getAll());
  }, []);

  // Manejador para eliminar un grupo
  const handleDelete = (id: string) => {
    FilterGroupService.delete(id);
    setFilterGroups(FilterGroupService.getAll());
    setShowDeleteConfirm(null);
  };

  // Maneja la selección de un grupo
  const handleFilterGroupSelection = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFilterGroups([...selectedFilterGroups, id]);
    } else {
      setSelectedFilterGroups(selectedFilterGroups.filter(groupId => groupId !== id));
    }
  };

  // Maneja la aplicación de los filtros seleccionados
  const handleApplyFilterGroups = () => {
    const formData = new FormData();
    
    // Añadir los grupos seleccionados
    selectedFilterGroups.forEach(id => {
      formData.append("filterGroupIds", id);
    });
    
    // Añadir los agentes seleccionados
    selectedAgents.forEach(id => {
      formData.append("agentIds", id.toString());
    });
    
    // Añadir las campañas seleccionadas
    selectedCampanyas.forEach(id => {
      formData.append("campanyaIds", id.toString());
    });
    
    submit(formData, { method: "post" });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Grupos de Filtros</h1>
        <div className="flex space-x-2">
          <Link
            to="/filter-groups/new"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Nuevo Grupo de Filtros
          </Link>
          <Link
            to="/assignments/bulk"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Volver a Asignación Masiva
          </Link>
        </div>
      </div>

      {/* Panel de selección de grupos de filtros */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Selección de Grupos de Filtros</h2>
        </div>

        {filterGroups.length > 0 ? (
          <div className="p-4">
            <p className="mb-4 text-gray-600">
              Seleccione uno o más grupos de filtros para aplicar. Luego puede asignarlos a campañas y agentes.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selección</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de creación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filterGroups.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          checked={selectedFilterGroups.includes(group.id)}
                          onChange={(e) => handleFilterGroupSelection(group.id, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{group.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{group.description || "-"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(group.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Link
                            to={`/filter-groups/${group.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => setShowDeleteConfirm(group.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                          <Link
                            to={`/assignments/bulk?filterGroupId=${group.id}`}
                            className="text-green-600 hover:text-green-900"
                          >
                            Aplicar
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No hay grupos de filtros guardados.</p>
            <Link
              to="/filter-groups/new"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Crear primer grupo de filtros
            </Link>
          </div>
        )}
      </div>

      {/* Panel de asignación a campañas y agentes */}
      {selectedFilterGroups.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">Asignar a Campañas y Agentes</h2>
          </div>
          
          <div className="p-4">
            <p className="mb-4 text-blue-600">
              <span className="font-medium">Grupos seleccionados:</span> {selectedFilterGroups.length}
            </p>
            
            <Form method="post" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Selección de agentes */}
              <div>
                <h3 className="text-md font-medium mb-3">Seleccionar Agentes (opcional)</h3>
                <div className="border p-3 rounded max-h-60 overflow-y-auto">
                  {/* Aquí se renderizan los agentes */}
                  {/* Esto será renderizado con los datos reales del loader en la implementación final */}
                  <div className="space-y-2">
                    {/* Ejemplo de agentes */}
                    <div className="p-2 hover:bg-gray-100">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          name="agentIds" 
                          value="1"
                          onChange={(e) => {
                            const id = parseInt(e.target.value);
                            setSelectedAgents(prev => 
                              e.target.checked 
                                ? [...prev, id] 
                                : prev.filter(agentId => agentId !== id)
                            );
                          }}
                        />
                        <span>Agente 1</span>
                      </label>
                    </div>
                    <div className="p-2 hover:bg-gray-100">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          name="agentIds" 
                          value="2"
                          onChange={(e) => {
                            const id = parseInt(e.target.value);
                            setSelectedAgents(prev => 
                              e.target.checked 
                                ? [...prev, id] 
                                : prev.filter(agentId => agentId !== id)
                            );
                          }}
                        />
                        <span>Agente 2</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selección de campañas */}
              <div>
                <h3 className="text-md font-medium mb-3">Seleccionar Campañas (opcional)</h3>
                <div className="border p-3 rounded max-h-60 overflow-y-auto">
                  {/* Aquí se renderizan las campañas */}
                  {/* Esto será renderizado con los datos reales del loader en la implementación final */}
                  <div className="space-y-2">
                    {/* Ejemplo de campañas */}
                    <div className="p-2 hover:bg-gray-100">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          name="campanyaIds" 
                          value="1"
                          onChange={(e) => {
                            const id = parseInt(e.target.value);
                            setSelectedCampanyas(prev => 
                              e.target.checked 
                                ? [...prev, id] 
                                : prev.filter(campanyaId => campanyaId !== id)
                            );
                          }}
                        />
                        <span>Campaña 1</span>
                      </label>
                    </div>
                    <div className="p-2 hover:bg-gray-100">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          name="campanyaIds" 
                          value="2"
                          onChange={(e) => {
                            const id = parseInt(e.target.value);
                            setSelectedCampanyas(prev => 
                              e.target.checked 
                                ? [...prev, id] 
                                : prev.filter(campanyaId => campanyaId !== id)
                            );
                          }}
                        />
                        <span>Campaña 2</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Botón de aplicar */}
              <div className="col-span-1 md:col-span-2">
                <button 
                  type="button" 
                  onClick={handleApplyFilterGroups}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Aplicar Filtros y Continuar a Asignación
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmar eliminación</h3>
            <p className="mb-6">
              ¿Está seguro de que desea eliminar este grupo de filtros? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}