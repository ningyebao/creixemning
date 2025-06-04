// app/services/leads.service.ts
import { apiClient } from "~/lib/api/client";
import type { Lead, LeadFilters } from "~/lib/types";

// Definición de placeholder para CNAEOption si no existe en tus tipos globales
// Si ya tienes esta definición en "~/lib/types" o similar, puedes quitar esta.
interface CNAEOption {
  code: string;
  description: string;
  // Agrega más propiedades si es necesario
}

export class LeadService {
  // Ruta base para las operaciones con leads
  private static BASE_URL = '/leads/';

  /**
   * Obtiene todos los leads
   * @param skip Número de registros a omitir para paginación
   * @param limit Límite de registros por página
   * @param filters Filtros opcionales para la búsqueda
   * @returns Lista de leads
   */
  static async getAll(skip = 0, limit = 100, filters?: LeadFilters): Promise<Lead[]> {
    try {
      const params = { skip, limit, ...filters };
      console.log('Obteniendo todos los leads con parámetros:', params);
      return await apiClient.get<Lead[]>(this.BASE_URL, { params });
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene un lead por su ID
   * @param id ID del lead
   * @returns Lead encontrado
   */
  static async getById(id: number): Promise<Lead> {
    try {
      return await apiClient.get<Lead>(`${this.BASE_URL}${id}/`); // Asegúrate que la URL base no termine en / o esta sí
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
  static async getUnassigned(skip = 0, limit = 100, filters?: Record<string, any>): Promise<Lead[]> {
    try {
      const params: Record<string, any> = { skip, limit };

      if (filters) {
        Object.assign(params, filters);
      }

      console.log('=== DEBUG: LeadService.getUnassigned ===');
      console.log('URL base:', this.BASE_URL);
      console.log('Filtros recibidos:', JSON.stringify(filters, null, 2));
      console.log('Parámetros completos:', JSON.stringify(params, null, 2));

      // IMPORTANTE: Verificar cuál es el endpoint correcto en tu backend
      // Opción 1: Si el backend filtra con un parámetro
      // const url = this.BASE_URL;
      // params.is_assigned = false;  // o params.asignado = false

      // Opción 2: Si el backend tiene un endpoint específico
      // Prueba con estas opciones hasta encontrar la correcta:

      // const url = `${this.BASE_URL}unassigned/`;  // /leads/unassigned/
      // const url = `${this.BASE_URL}no-asignados/`;  // /leads/no-asignados/
      // const url = `${this.BASE_URL}sin-asignar/`;  // /leads/sin-asignar/
      const url = this.BASE_URL;  // /leads/ con parámetro is_assigned=false
      params.is_assigned = false;  // Agregar este parámetro si usas la URL base

      console.log('URL completa que se va a llamar:', url);
      console.log('Con parámetros:', new URLSearchParams(params).toString());

      try {
        // El método apiClient.get espera que el segundo argumento sea un objeto con una propiedad 'params'
        // cuando quieres pasar parámetros de consulta.
        const response = await apiClient.get<Lead[]>(url, params); // Modificado para que coincida con la firma de apiClient
        console.log('✅ Respuesta exitosa');
        console.log('Número de leads recibidos:', response.length);
        if (response.length > 0 && response[0]) { // Añadida verificación para response[0]
          console.log('Ejemplo del primer lead:', {
            id: response[0].id_lead,
            nombre: response[0].nom_lead,
            empresa: response[0].nom_empresarial_lead,
            provincia: response[0].provincia_lead
          });
        }
        return response;
      } catch (apiError: any) {
        console.error('❌ Error en la llamada API:');
        // En tu ApiClient, el error ya es un ApiError, así que puedes acceder a sus propiedades directamente
        console.error('Status:', apiError.status);
        console.error('Status Text:', apiError.message); // O apiError.details dependiendo de lo que quieras mostrar
        console.error('Error Details:', apiError.details); // El JSON.stringify(errorData) o el texto del error
        console.error('URL intentada:', url);

        // Si es 404, intenta con otra URL
        if (apiError.status === 404) {
          console.log('⚠️ El endpoint no existe. Posibles alternativas:');
          console.log('- /leads/?is_assigned=false');
          console.log('- /leads/?asignado=false');
          console.log('- /leads/unassigned/');
          console.log('- /leads/no-asignados/');
          console.log('- /leads/sin-asignar/');
        }

        throw apiError; // Re-lanza el ApiError
      }
    } catch (error) {
      console.error('Error general en getUnassigned:', error);
      throw this.handleError(error);
    }
  }


  /**
   * Obtiene todas las provincias disponibles
   * @returns Lista de provincias
   */
  static async getAllProvincias(): Promise<string[]> {
    try {
      return await apiClient.get<string[]>(`${this.BASE_URL}provincias/`);
    } catch (error) {
      console.error('Error fetching provincias:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene todas las poblaciones disponibles
   * @returns Lista de poblaciones
   */
  static async getAllPoblaciones(): Promise<string[]> {
    try {
      return await apiClient.get<string[]>(`${this.BASE_URL}poblaciones/`);
    } catch (error) {
      console.error('Error fetching poblaciones:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene todas las comarcas disponibles
   * @returns Lista de comarcas
   */
  static async getAllComarcas(): Promise<string[]> {
    try {
      return await apiClient.get<string[]>(`${this.BASE_URL}comarcas/`);
    } catch (error) {
      console.error('Error fetching comarcas:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene todas las actividades disponibles
   * @returns Lista de actividades
   */
  static async getAllActividades(): Promise<string[]> {
    try {
      return await apiClient.get<string[]>(`${this.BASE_URL}actividades/`);
    } catch (error) {
      console.error('Error fetching actividades:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene todos los códigos CNAE disponibles
   * @returns Lista de opciones CNAE con código y descripción
   */
  static async getAllCNAE(): Promise<CNAEOption[]> {
    try {
      console.log('=== DEBUG: LeadService.getAllCNAE ===');

      // Intenta llamar al endpoint si existe
      try {
        const url = `${this.BASE_URL}cnae/`;
        console.log('Intentando obtener CNAE desde:', url);
        const response = await apiClient.get<CNAEOption[]>(url);
        console.log('✅ CNAE obtenidos del servidor:', response.length);
        return response;
      } catch (error: any) {
        console.warn('⚠️ No se pudo obtener CNAE del servidor, usando lista vacía o de ejemplo.');
        // Si falla, retorna lista de ejemplo o vacía.
        // Aquí podrías tener una lista de CNAE por defecto si lo deseas.
        // Ejemplo:
        // return [
        //   { code: '0111', description: 'Cultivo de cereales (excepto arroz), leguminosas y semillas oleaginosas' },
        //   { code: '0113', description: 'Cultivo de hortalizas, raíces y tubérculos' },
        // ];
        return []; // Retorna vacío como en tu snippet
      }
    } catch (error) {
      console.error('Error fetching CNAE codes:', error);
      // Decide si lanzar el error o devolver un array vacío como fallback.
      // throw this.handleError(error); // Opción si quieres que el error se propague
      return []; // Devuelve vacío como en tu snippet
    }
  }

  /**
   * Crea un nuevo lead
   * @param leadData Datos del lead a crear
   * @returns Lead creado
   */
  static async create(leadData: Partial<Lead>): Promise<Lead> {
    try {
      return await apiClient.post<Lead>(this.BASE_URL, leadData);
    } catch (error) {
      console.error('Error creating lead:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Actualiza un lead existente
   * @param id ID del lead
   * @param leadData Datos del lead a actualizar
   * @returns Lead actualizado
   */
  static async update(id: number, leadData: Partial<Lead>): Promise<Lead> {
    try {
      return await apiClient.patch<Lead>(`${this.BASE_URL}${id}/`, leadData); // Asegúrate que la URL base no termine en / o esta sí
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
  static async delete(id: number): Promise<{ detail: string }> {
    try {
      return await apiClient.delete<{ detail: string }>(`${this.BASE_URL}${id}/`); // Asegúrate que la URL base no termine en / o esta sí
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
  private static handleError(error: any): Error {
    // Si es un ApiError de nuestro apiClient
    if (error.name === "ApiError" && typeof error.status === 'number') {
        console.error(`ApiError: Status ${error.status}, Message: ${error.message}, Details: ${error.details}`);
        // Puedes usar error.toUserFriendlyMessage() si esa lógica te sirve aquí.
        // O personalizar el mensaje basado en el status o details.
        return new Error(error.toUserFriendlyMessage() || `Error API: ${error.message}`);
    }

    // Si es un error de axios con respuesta (esto es por tu handleError original, pero nuestro ApiClient ya lo maneja)
    // Puede que quieras simplificar esta parte si confías 100% en ApiError.
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.detail || 'Error desconocido desde respuesta de error';

      switch (statusCode) {
        case 400:
          return new Error(`Error en la solicitud: ${errorMessage}`);
        case 401:
          return new Error('No autorizado. Por favor, inicie sesión nuevamente.');
        case 403:
          return new Error('No tiene permisos para realizar esta acción.');
        case 404:
          return new Error('El recurso solicitado no existe.');
        case 500:
          return new Error('Error del servidor. Por favor, intente más tarde.');
        default:
          return new Error(errorMessage);
      }
    }

    // Si es un error de red
    if (error.request) {
      return new Error('No se pudo conectar con el servidor. Compruebe su conexión a internet.');
    }

    // Para errores que no son de axios o errores personalizados
    return error instanceof Error ? error : new Error('Error desconocido');
  }
}