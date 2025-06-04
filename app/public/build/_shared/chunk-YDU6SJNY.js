import {
  apiClient
} from "/build/_shared/chunk-WCLFPUDL.js";
import {
  createHotContext
} from "/build/_shared/chunk-WWESKXYW.js";
import {
  __publicField
} from "/build/_shared/chunk-RODUX5XG.js";

// app/services/leads.service.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\leads.service.ts"
  );
  import.meta.hot.lastModified = "1748619725694.9238";
}
var LeadService = class {
  /**
   * Obtiene todos los leads
   * @param skip Número de registros a omitir para paginación
   * @param limit Límite de registros por página
   * @param filters Filtros opcionales para la búsqueda
   * @returns Lista de leads
   */
  static async getAll(skip = 0, limit = 100, filters) {
    try {
      const params = { skip, limit, ...filters };
      console.log("Obteniendo todos los leads con par\xE1metros:", params);
      return await apiClient.get(this.BASE_URL, { params });
    } catch (error) {
      console.error("Error fetching leads:", error);
      throw this.handleError(error);
    }
  }
  /**
   * Obtiene un lead por su ID
   * @param id ID del lead
   * @returns Lead encontrado
   */
  static async getById(id) {
    try {
      return await apiClient.get(`${this.BASE_URL}${id}/`);
    } catch (error) {
      console.error(`Error fetching lead with ID ${id}:`, error);
      throw this.handleError(error);
    }
  }
  /**
   * Obtiene leads no asignados con filtros opcionales
   * @param skip Número de registros a omitir para paginación
   * @param limit Límite de registros por página
   * @param filters Filtros opcionales para la búsqueda
   * @returns Lista de leads no asignados
   */
  static async getUnassigned(skip = 0, limit = 100, filters) {
    try {
      const params = { skip, limit };
      if (filters) {
        Object.assign(params, filters);
      }
      console.log("=== DEBUG: LeadService.getUnassigned ===");
      console.log("URL base:", this.BASE_URL);
      console.log("Filtros recibidos:", JSON.stringify(filters, null, 2));
      console.log("Par\xE1metros completos:", JSON.stringify(params, null, 2));
      const url = this.BASE_URL;
      params.is_assigned = false;
      console.log("URL completa que se va a llamar:", url);
      console.log("Con par\xE1metros:", new URLSearchParams(params).toString());
      try {
        const response = await apiClient.get(url, params);
        console.log("\u2705 Respuesta exitosa");
        console.log("N\xFAmero de leads recibidos:", response.length);
        if (response.length > 0 && response[0]) {
          console.log("Ejemplo del primer lead:", {
            id: response[0].id_lead,
            nombre: response[0].nom_lead,
            empresa: response[0].nom_empresarial_lead,
            provincia: response[0].provincia_lead
          });
        }
        return response;
      } catch (apiError) {
        console.error("\u274C Error en la llamada API:");
        console.error("Status:", apiError.status);
        console.error("Status Text:", apiError.message);
        console.error("Error Details:", apiError.details);
        console.error("URL intentada:", url);
        if (apiError.status === 404) {
          console.log("\u26A0\uFE0F El endpoint no existe. Posibles alternativas:");
          console.log("- /leads/?is_assigned=false");
          console.log("- /leads/?asignado=false");
          console.log("- /leads/unassigned/");
          console.log("- /leads/no-asignados/");
          console.log("- /leads/sin-asignar/");
        }
        throw apiError;
      }
    } catch (error) {
      console.error("Error general en getUnassigned:", error);
      throw this.handleError(error);
    }
  }
  /**
   * Obtiene todas las provincias disponibles
   * @returns Lista de provincias
   */
  static async getAllProvincias() {
    try {
      return await apiClient.get(`${this.BASE_URL}provincias/`);
    } catch (error) {
      console.error("Error fetching provincias:", error);
      throw this.handleError(error);
    }
  }
  /**
   * Obtiene todas las poblaciones disponibles
   * @returns Lista de poblaciones
   */
  static async getAllPoblaciones() {
    try {
      return await apiClient.get(`${this.BASE_URL}poblaciones/`);
    } catch (error) {
      console.error("Error fetching poblaciones:", error);
      throw this.handleError(error);
    }
  }
  /**
   * Obtiene todas las comarcas disponibles
   * @returns Lista de comarcas
   */
  static async getAllComarcas() {
    try {
      return await apiClient.get(`${this.BASE_URL}comarcas/`);
    } catch (error) {
      console.error("Error fetching comarcas:", error);
      throw this.handleError(error);
    }
  }
  /**
   * Obtiene todas las actividades disponibles
   * @returns Lista de actividades
   */
  static async getAllActividades() {
    try {
      return await apiClient.get(`${this.BASE_URL}actividades/`);
    } catch (error) {
      console.error("Error fetching actividades:", error);
      throw this.handleError(error);
    }
  }
  /**
   * Obtiene todos los códigos CNAE disponibles
   * @returns Lista de opciones CNAE con código y descripción
   */
  static async getAllCNAE() {
    try {
      console.log("=== DEBUG: LeadService.getAllCNAE ===");
      try {
        const url = `${this.BASE_URL}cnae/`;
        console.log("Intentando obtener CNAE desde:", url);
        const response = await apiClient.get(url);
        console.log("\u2705 CNAE obtenidos del servidor:", response.length);
        return response;
      } catch (error) {
        console.warn("\u26A0\uFE0F No se pudo obtener CNAE del servidor, usando lista vac\xEDa o de ejemplo.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching CNAE codes:", error);
      return [];
    }
  }
  /**
   * Crea un nuevo lead
   * @param leadData Datos del lead a crear
   * @returns Lead creado
   */
  static async create(leadData) {
    try {
      return await apiClient.post(this.BASE_URL, leadData);
    } catch (error) {
      console.error("Error creating lead:", error);
      throw this.handleError(error);
    }
  }
  /**
   * Actualiza un lead existente
   * @param id ID del lead
   * @param leadData Datos del lead a actualizar
   * @returns Lead actualizado
   */
  static async update(id, leadData) {
    try {
      return await apiClient.patch(`${this.BASE_URL}${id}/`, leadData);
    } catch (error) {
      console.error(`Error updating lead ${id}:`, error);
      throw this.handleError(error);
    }
  }
  /**
   * Elimina un lead
   * @param id ID del lead
   * @returns Resultado de la operación
   */
  static async delete(id) {
    try {
      return await apiClient.delete(`${this.BASE_URL}${id}/`);
    } catch (error) {
      console.error(`Error deleting lead ${id}:`, error);
      throw this.handleError(error);
    }
  }
  /**
   * Maneja errores de la API y los transforma en mensajes de error amigables
   * @param error Error original
   * @returns Error procesado
   */
  static handleError(error) {
    if (error.name === "ApiError" && typeof error.status === "number") {
      console.error(`ApiError: Status ${error.status}, Message: ${error.message}, Details: ${error.details}`);
      return new Error(error.toUserFriendlyMessage() || `Error API: ${error.message}`);
    }
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.detail || "Error desconocido desde respuesta de error";
      switch (statusCode) {
        case 400:
          return new Error(`Error en la solicitud: ${errorMessage}`);
        case 401:
          return new Error("No autorizado. Por favor, inicie sesi\xF3n nuevamente.");
        case 403:
          return new Error("No tiene permisos para realizar esta acci\xF3n.");
        case 404:
          return new Error("El recurso solicitado no existe.");
        case 500:
          return new Error("Error del servidor. Por favor, intente m\xE1s tarde.");
        default:
          return new Error(errorMessage);
      }
    }
    if (error.request) {
      return new Error("No se pudo conectar con el servidor. Compruebe su conexi\xF3n a internet.");
    }
    return error instanceof Error ? error : new Error("Error desconocido");
  }
};
// Ruta base para las operaciones con leads
__publicField(LeadService, "BASE_URL", "/leads/");

export {
  LeadService
};
//# sourceMappingURL=/build/_shared/chunk-YDU6SJNY.js.map
