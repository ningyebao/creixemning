import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link, useSubmit } from "@remix-run/react";
import { useState } from "react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import { AssignacioService } from "~/services/assignacio.service";
import { LeadService } from "~/services/leads.service"; // Asegúrate de que el archivo se llame leads.service.ts
import { AgentService } from "~/services/agents.service";
import { handleApiError } from "~/lib/api/client";
import type { Assignacio, Lead, Agent } from "~/lib/types";

type LoaderData = {
  assignacio: Assignacio;
  lead: Lead;
  agent: Agent;
};

export const loader = async ({ params }: LoaderFunctionArgs): Promise<Response> => {
  const { id } = params;
  invariant(id, "Se requiere un ID de asignación");

  try {
    const assignacioId = parseInt(id, 10);
    const assignacio = await AssignacioService.getById(assignacioId);
    if (!assignacio) {
      throw new Error("Asignación no encontrada");
    }
    const [lead, agent] = await Promise.all([
      LeadService.getById(parseInt(assignacio.id_leads.toString(), 10)),
      AgentService.getById(parseInt(assignacio.id_agents.toString(), 10))
    ]);

    return json<LoaderData>({ assignacio, lead, agent });
  } catch (error) {
    return handleApiError(error);
  }
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { id } = params;
  invariant(id, "Se requiere un ID de asignación");

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    try {
      await AssignacioService.delete(parseInt(id, 10));
      return redirect("/assignments");
    } catch (error) {
      return handleApiError(error);
    }
  } else if (intent === "updateStatus") {
    const newStatusRaw = formData.get("status")?.toString();
    invariant(newStatusRaw, "Se requiere un nuevo estado");

    // Validar que el estado es uno de los permitidos
    if (
      newStatusRaw !== "Pendiente" &&
      newStatusRaw !== "En progreso" &&
      newStatusRaw !== "Completada" &&
      newStatusRaw !== "Cancelada"
    ) {
      throw new Error("Estado inválido");
    }

    const newStatus = newStatusRaw as "Pendiente" | "En progreso" | "Completada" | "Cancelada";

    try {
      await AssignacioService.update(parseInt(id, 10), {
        estat_fitxes_assignacions: newStatus
      });
      return json({ success: true });
    } catch (error) {
      return handleApiError(error);
    }
  }

  return json({ error: "Acción no válida" }, { status: 400 });
};

export default function AssignmentView() {
  const { assignacio, lead, agent } = useLoaderData<LoaderData>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const submit = useSubmit();

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Manejar el cambio de estado
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const formData = new FormData();
    formData.append("intent", "updateStatus");
    formData.append("status", e.target.value);
    submit(formData, { method: "post" });
  };

  // Manejar eliminación
  const handleDelete = () => {
    const formData = new FormData();
    formData.append("intent", "delete");
    submit(formData, { method: "post" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/assignments" className="text-blue-600 hover:text-blue-800">
            ← Volver a asignaciones
          </Link>
          <h1 className="text-2xl font-bold">
            Asignación #{assignacio.id_fitxes_asignacions}
          </h1>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/assignments/${assignacio.id_fitxes_asignacions}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Editar
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Información de la asignación */}
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h2 className="text-xl font-semibold mb-4">Detalles de la asignación</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Información general</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">ID:</dt>
                  <dd>{assignacio.id_fitxes_asignacions}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Campaña:</dt>
                  <dd>{assignacio.id_campanya_leads}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Fecha de creación:</dt>
                  <dd>{formatDate(assignacio.data_creacio_fitxes_assignacions)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">ID de autor:</dt>
                  <dd>{assignacio.id_autor}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Estado y prioridad</h3>
              <dl className="space-y-2">
                <div className="flex justify-between items-center">
                  <dt className="text-gray-500">Estado:</dt>
                  <dd>
                    <select
                      value={assignacio.estat_fitxes_assignacions}
                      onChange={handleStatusChange}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En progreso">En progreso</option>
                      <option value="Completada">Completada</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Prioridad:</dt>
                  <dd className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {assignacio.prioritat_fitxes_assignacions}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Potencial:</dt>
                  <dd className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {assignacio.potencial_fitxes_assignacions}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Observaciones</h3>
            <div className="bg-gray-50 p-4 rounded border">
              {assignacio.obsevacions_fitxes_assignacions || "Sin observaciones"}
            </div>
          </div>
        </div>
        {/* Información del Lead y Agente */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Lead</h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium">{lead.nom_lead}</p>
                <p className="text-gray-500">{lead.nom_empresarial_lead}</p>
              </div>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">ID:</dt>
                  <dd>{lead.id_lead}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">CNAE:</dt>
                  <dd>{lead.cnae_lead}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Provincia:</dt>
                  <dd>{lead.provincia_lead}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Población:</dt>
                  <dd>{lead.poblacio_lead}</dd>
                </div>
              </dl>
              <div className="pt-4 border-t">
                <Link to={`/leads/${lead.id_lead}`} className="text-blue-600 hover:text-blue-900 flex items-center text-sm">
                  <span className="mr-1">→</span> Ver lead completo
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Agente</h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium">{agent.nom_agent}</p>
              </div>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">ID:</dt>
                  <dd>{agent.id_agent}</dd>
                </div>
              </dl>
              <div className="pt-4 border-t">
                <Link to={`/agents/${agent.id_agent}`} className="text-blue-600 hover:text-blue-900 flex items-center text-sm">
                  <span className="mr-1">→</span> Ver agente completo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmar eliminación</h3>
            <p className="mb-6">
              ¿Está seguro de que desea eliminar la asignación #{assignacio.id_fitxes_asignacions}? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Cancelar
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
