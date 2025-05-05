import {
  apiClient
} from "/build/_shared/chunk-52EIYT2B.js";
import {
  createHotContext
} from "/build/_shared/chunk-XR3XMPCQ.js";

// app/services/leads.service.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\leads.service.ts"
  );
  import.meta.hot.lastModified = "1745320750899.3025";
}
var LeadService = class {
  /**
   * Obtiene todos los leads con filtros opcionales
   */
  static async getAll(skip = 0, limit = 100, filters) {
    const params = { skip, limit, ...filters };
    return apiClient.get("/leads/", params);
  }
  /**
   * Obtiene leads no asignados con filtros opcionales
   */
  static async getUnassigned(skip = 0, limit = 100, filters) {
    const params = { skip, limit, ...filters };
    return apiClient.get("/leads/unassigned/", params);
  }
  /**
   * Busca leads por término de búsqueda
   */
  static async search(searchTerm, skip = 0, limit = 100) {
    const params = { q: searchTerm, skip, limit };
    return apiClient.get("/leads/search/", params);
  }
  /**
   * Obtiene un lead por su ID
   */
  static async getById(id) {
    return apiClient.get(`/leads/${id}`);
  }
  /**
   * Obtiene estadísticas de leads agrupados por estado
   */
  static async getStatusStats() {
    return apiClient.get("/leads/status-stats/");
  }
  /**
   * Obtiene todas las provincias disponibles
   */
  static async getAllProvincias() {
    const leads = await this.getAll(0, 1e3);
    const provincias = /* @__PURE__ */ new Set();
    leads.forEach((lead) => {
      if (lead.provincia_lead && lead.provincia_lead.trim()) {
        provincias.add(lead.provincia_lead);
      }
    });
    return Array.from(provincias).sort();
  }
  /**
   * Obtiene todas las poblaciones disponibles
   */
  static async getAllPoblaciones() {
    const leads = await this.getAll(0, 1e3);
    const poblaciones = /* @__PURE__ */ new Set();
    leads.forEach((lead) => {
      if (lead.poblacio_lead && lead.poblacio_lead.trim()) {
        poblaciones.add(lead.poblacio_lead);
      }
    });
    return Array.from(poblaciones).sort();
  }
  /**
   * Obtiene todas las comarcas disponibles
   */
  static async getAllComarcas() {
    const leads = await this.getAll(0, 1e3);
    const comarcas = /* @__PURE__ */ new Set();
    leads.forEach((lead) => {
      if (lead.comarca_lead && lead.comarca_lead.trim()) {
        comarcas.add(lead.comarca_lead);
      }
    });
    return Array.from(comarcas).sort();
  }
};

export {
  LeadService
};
//# sourceMappingURL=/build/_shared/chunk-URVRSERQ.js.map
