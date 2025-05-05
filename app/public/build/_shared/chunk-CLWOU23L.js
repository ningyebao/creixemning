import {
  apiClient
} from "/build/_shared/chunk-52EIYT2B.js";
import {
  createHotContext
} from "/build/_shared/chunk-XR3XMPCQ.js";
import {
  __publicField
} from "/build/_shared/chunk-RODUX5XG.js";

// app/services/assignacio.service.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\assignacio.service.ts"
  );
  import.meta.hot.lastModified = "1745592615060.9988";
}
var ESTADOS_ASIGNACION = {
  PENDIENTE: "Pendiente",
  EN_PROGRESO: "En progreso",
  COMPLETADA: "Completada",
  CANCELADA: "Cancelada"
};
var AssignacioService = class {
  /**
   * Obtiene una lista paginada y filtrada de asignaciones.
   */
  static async getAll(offset = 0, limit = 50, filters = {}) {
    try {
      const params = {
        offset,
        limit,
        ...filters
      };
      console.log(`AssignacioService.getAll: Fetching with params:`, params);
      const response = await apiClient.get(this.ENDPOINT, params);
      return response;
    } catch (error) {
      console.error(`AssignacioService.getAll: Error fetching assignments`, error);
      throw error;
    }
  }
  /**
   * Actualiza una asignación existente por su ID.
   */
  static async update(id, data) {
    try {
      const normalizedData = this.normalizeAssignmentData(data);
      const endpoint = `${this.ENDPOINT}/${id}/`;
      console.log(`AssignacioService.update: Updating assignment ${id} with data:`, normalizedData);
      const response = await apiClient.patch(endpoint, normalizedData);
      return response;
    } catch (error) {
      console.error(`AssignacioService.update: Error updating assignment ${id}`, error);
      throw error;
    }
  }
  /**
   * Realiza una asignación masiva de leads a agentes (Round-Robin, método equitativo)
   */
  static async bulkAssign(agentIds, leadIds, prioritat, potencial, observaciones = "", idCampanya = 1, idAutor = 1) {
    try {
      if (agentIds.length === 0 || leadIds.length === 0) {
        return {
          success: 0,
          error: 0,
          errorDetails: "No hay agentes o leads seleccionados"
        };
      }
      const leadId = leadIds[0];
      const agentId = agentIds[0];
      const iso = (/* @__PURE__ */ new Date()).toISOString();
      const naive = iso.replace("Z", "");
      const data = {
        id_agents: agentId,
        id_leads: leadId,
        id_autor: idAutor,
        id_campanya_leads: idCampanya,
        estat_fitxes_assignacions: ESTADOS_ASIGNACION.PENDIENTE,
        potencial_fitxes_assignacions: potencial,
        prioritat_fitxes_assignacions: prioritat,
        obsevacions_fitxes_assignacions: observaciones,
        // Usar el nombre de campo que espera el backend
        data_creacio_fitxes_assignacions: naive,
        id_fitxes_trucades_fitxes_asignacions: 0
      };
      console.log("bulkAssign payload:", data);
      const result = await this.create(data);
      console.log("Asignaci\xF3n creada:", result);
      return { success: 1, error: 0 };
    } catch (err) {
      console.error("Error en bulkAssign:", err);
      return {
        success: 0,
        error: 1,
        errorDetails: err instanceof Error ? err.message : String(err)
      };
    }
  }
  /**
   * Realiza una asignación masiva de todos los leads a todos los agentes seleccionados
   */
  static async bulkAssignAll(agentIds, leadIds, prioritat, potencial, observaciones = "", idCampanya = 1, idAutor = 1) {
    if (agentIds.length === 0 || leadIds.length === 0) {
      return {
        success: 0,
        error: 0,
        errorDetails: "No hay agentes o leads seleccionados"
      };
    }
    const assignments = [];
    const iso = (/* @__PURE__ */ new Date()).toISOString();
    const naive = iso.replace("Z", "");
    for (const leadId of leadIds) {
      for (const agentId of agentIds) {
        assignments.push({
          id_agents: agentId,
          id_leads: leadId,
          id_autor: idAutor,
          id_campanya_leads: idCampanya,
          estat_fitxes_assignacions: ESTADOS_ASIGNACION.PENDIENTE,
          potencial_fitxes_assignacions: potencial,
          prioritat_fitxes_assignacions: prioritat,
          obsevacions_fitxes_assignacions: observaciones,
          // Usar el nombre de campo consistente
          data_creacio_fitxes_assignacions: naive,
          id_fitxes_trucades_fitxes_asignacions: 0
        });
      }
    }
    console.log("bulkAssignAll assignments count:", assignments.length);
    console.log("bulkAssignAll sample payload:", assignments.slice(0, 1));
    const results = await Promise.allSettled(
      assignments.map((data) => this.create(data))
    );
    const successCount = results.filter((r) => r.status === "fulfilled").length;
    const rejected = results.filter((r) => r.status === "rejected");
    const errorCount = rejected.length;
    let errorDetails = "";
    if (errorCount > 0) {
      errorDetails = rejected.map((r) => {
        const reason = r.reason;
        if (reason instanceof Error) {
          return reason.message;
        }
        return String(reason);
      }).join("; ");
    }
    console.log("bulkAssignAll results:", { successCount, errorCount, errorDetails });
    return {
      success: successCount,
      error: errorCount,
      errorDetails: errorDetails || void 0
    };
  }
  /**
   * Crea una asignación individual de un lead a un agente para una campaña.
   */
  static async createIndividualAssignment(leadId, agentId, prioritat, potencial, observaciones, campanyaId, idAutor = 1) {
    const iso = (/* @__PURE__ */ new Date()).toISOString();
    const naive = iso.replace("Z", "");
    const data = {
      id_agents: agentId,
      id_leads: leadId,
      id_autor: idAutor,
      id_campanya_leads: campanyaId,
      estat_fitxes_assignacions: ESTADOS_ASIGNACION.PENDIENTE,
      potencial_fitxes_assignacions: potencial,
      prioritat_fitxes_assignacions: prioritat,
      obsevacions_fitxes_assignacions: observaciones,
      // Usar nombre consistente
      data_creacio_fitxes_assignacions: naive,
      id_fitxes_trucades_fitxes_asignacions: 0
    };
    console.log("createIndividualAssignment payload:", data);
    return this.create(data);
  }
  /** Método genérico para crear una asignación */
  static async create(data) {
    try {
      const normalizedData = this.normalizeAssignmentData(data);
      return apiClient.post(this.ENDPOINT, normalizedData);
    } catch (error) {
      console.error(`AssignacioService.create: Error creating assignment`, error);
      throw error;
    }
  }
  /**
   * Obtiene una asignación por su ID
   */
  static async getById(id) {
    try {
      const endpoint = `${this.ENDPOINT}/${id}/`;
      console.log(`AssignacioService.getById: Fetching from ${endpoint}`);
      const response = await apiClient.get(endpoint);
      return response;
    } catch (error) {
      console.error(`AssignacioService.getById: Error fetching assignment ${id}`, error);
      if (error && typeof error === "object" && "status" in error && error.status === 404) {
        return null;
      }
      throw error;
    }
  }
  /**
   * Elimina una asignación por su ID
   */
  static async delete(id) {
    try {
      const endpoint = `${this.ENDPOINT}/${id}/`;
      console.log(`AssignacioService.delete: Deleting assignment ${id} from ${endpoint}`);
      await apiClient.delete(endpoint);
    } catch (error) {
      console.error(`AssignacioService.delete: Error deleting assignment ${id}`, error);
      throw error;
    }
  }
  /**
   * Normaliza los datos de asignación para usar nombres de campo consistentes
   * Esta función ayuda a manejar las discrepancias entre diferentes partes del código
   */
  static normalizeAssignmentData(data) {
    const result = { ...data };
    if ("observacions_fitxes_assignacions" in result) {
      result["obsevacions_fitxes_assignacions"] = result["observacions_fitxes_assignacions"];
      delete result["observacions_fitxes_assignacions"];
    }
    return result;
  }
};
// Constante para el endpoint base - esto asegura consistencia
__publicField(AssignacioService, "ENDPOINT", "/fitxes_assignacions");

export {
  AssignacioService
};
//# sourceMappingURL=/build/_shared/chunk-CLWOU23L.js.map
