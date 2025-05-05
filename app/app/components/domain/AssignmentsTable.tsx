// app/components/domain/AssignmentsTable.tsx
import { Link } from "@remix-run/react";
import type { Assignacio } from "~/lib/types";

interface AssignmentsTableProps {
  assignments: Assignacio[];
  showActions?: boolean;
  onStatusChange?: (assignmentId: number, newStatus: string) => void;
}

export function AssignmentsTable({ 
  assignments, 
  showActions = true,
  onStatusChange 
}: AssignmentsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lead
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Agente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Campaña
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prioridad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Potencial
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            {showActions && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <tr key={assignment.id_fitxes_asignacions} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.id_fitxes_asignacions}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.id_leads}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.id_agents}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.id_campanya_leads}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {onStatusChange ? (
                  <select 
                    value={assignment.estat_fitxes_assignacions}
                    onChange={(e) => onStatusChange(assignment.id_fitxes_asignacions, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                ) : (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${assignment.estat_fitxes_assignacions === "Pendiente" ? "bg-blue-100 text-blue-800" : 
                      assignment.estat_fitxes_assignacions === "En progreso" ? "bg-yellow-100 text-yellow-800" : 
                      assignment.estat_fitxes_assignacions === "Completada" ? "bg-green-100 text-green-800" : 
                      "bg-red-100 text-red-800"}`}
                  >
                    {assignment.estat_fitxes_assignacions}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {assignment.prioritat_fitxes_assignacions}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {assignment.potencial_fitxes_assignacions}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(assignment.data_creacio_fitxes_assignacions).toLocaleDateString()}
              </td>
              {showActions && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    to={`/assignments/${assignment.id_fitxes_asignacions}`} 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Ver
                  </Link>
                  <Link 
                    to={`/assignments/${assignment.id_fitxes_asignacions}/edit`} 
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Editar
                  </Link>
                  <Link
                    to={`/assignments/${assignment.id_fitxes_asignacions}/delete`}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}