// app/services/filter-group.service.ts
import { apiClient } from "~/lib/api/client";
import type { LeadFilters } from "~/lib/types";

export interface FilterGroup {
  id: number;
  name: string;
  description: string | null;
  filters: LeadFilters;
  created_at: string;
  updated_at: string;
}

export class FilterGroupService {
  private static BASE_URL = '/filter-groups/';

  /**
   * Obtiene todos los grupos de filtros
   * @returns Lista de grupos de filtros
   */
  static async getAll(): Promise<FilterGroup[]> {
    try {
      return await apiClient.get<FilterGroup[]>(this.BASE_URL);
    } catch (error) {
      console.error('Error fetching filter groups:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene un grupo de filtros por su ID
   * @param id ID del grupo de filtros
   * @returns Grupo de filtros encontrado
   */
  static async getById(id: number): Promise<FilterGroup> {
    try {
      return await apiClient.get<FilterGroup>(`${this.BASE_URL}${id}`);
    } catch (error) {
      console.error(`Error fetching filter group with ID ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Crea un nuevo grupo de filtros
   * @param name Nombre del grupo
   * @param description Descripción del grupo
   * @param filters Filtros guardados
   * @returns Grupo de filtros creado
   */
  static async create(name: string, description: string, filters: LeadFilters): Promise<FilterGroup> {
    try {
      return await apiClient.post<FilterGroup>(this.BASE_URL, {
        name,
        description,
        filters
      });
    } catch (error) {
      console.error('Error creating filter group:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Actualiza un grupo de filtros existente
   * @param id ID del grupo
   * @param data Datos a actualizar
   * @returns Grupo de filtros actualizado
   */
  static async update(id: number, data: Partial<FilterGroup>): Promise<FilterGroup> {
    try {
      return await apiClient.put<FilterGroup>(`${this.BASE_URL}${id}`, data);
    } catch (error) {
      console.error(`Error updating filter group ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Elimina un grupo de filtros
   * @param id ID del grupo
   * @returns Resultado de la operación
   */
  static async delete(id: number): Promise<{ detail: string }> {
    try {
      return await apiClient.delete<{ detail: string }>(`${this.BASE_URL}${id}`);
    } catch (error) {
      console.error(`Error deleting filter group ${id}:`, error);
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
      return new Error(error.toUserFriendlyMessage() || `Error API: ${error.message}`);
    }

    // Si es un error de axios con respuesta
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.detail || 'Error desconocido';

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