// app/services/assignacio.service.ts
import { apiClient } from "~/lib/api/client";
import type { Assignacio, AssignacioFilters } from "~/lib/types";

/**
 * Resultado de operaciones masivas
 */
interface BulkResult {
  success: number;
  error: number;
  errorDetails?: string;
}

export class AssignacioService {
  // Ruta correcta según la configuración del backend
  private static BASE_URL = '/fitxes-assignacions/';

  /**
   * Obtiene todas las asignaciones con filtros opcionales
   * @param skip Número de registros a omitir para paginación
   * @param limit Límite de registros por página
   * @param filters Filtros opcionales para la búsqueda
   * @returns Lista de asignaciones
   */
  static async getAll(skip = 0, limit = 100, filters?: AssignacioFilters): Promise<Assignacio[]> {
    try {
      const params = { skip, limit, ...filters };
      console.log('Obteniendo asignaciones con filtros:', JSON.stringify(filters, null, 2));
      return await apiClient.get<Assignacio[]>(this.BASE_URL, { params });
    } catch (error) {
      console.error('Error fetching assignacions:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene una asignación por su ID
   * @param id ID de la asignación
   * @returns Asignación encontrada
   */
  static async getById(id: number): Promise<Assignacio> {
    try {
      return await apiClient.get<Assignacio>(`${this.BASE_URL}${id}`);
    } catch (error) {
      console.error(`Error fetching assignacio with ID ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene asignaciones por ID de agente
   * @param agentId ID del agente
   * @param skip Número de registros a omitir para paginación
   * @param limit Límite de registros por página
   * @returns Lista de asignaciones del agente
   */
  static async getByAgent(agentId: number, skip = 0, limit = 100): Promise<Assignacio[]> {
    try {
      const params = { id_agents: agentId, skip, limit };
      return await apiClient.get<Assignacio[]>(this.BASE_URL, { params });
    } catch (error) {
      console.error(`Error fetching assignacions for agent ${agentId}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Obtiene asignaciones por ID de lead
   * @param leadId ID del lead
   * @param skip Número de registros a omitir para paginación
   * @param limit Límite de registros por página
   * @returns Lista de asignaciones del lead
   */
  static async getByLead(leadId: number, skip = 0, limit = 100): Promise<Assignacio[]> {
    try {
      const params = { id_leads: leadId, skip, limit };
      return await apiClient.get<Assignacio[]>(this.BASE_URL, { params });
    } catch (error) {
      console.error(`Error fetching assignacions for lead ${leadId}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Asigna un lead a un agente
   * @param agentId ID del agente
   * @param leadId ID del lead
   * @param prioritat Prioridad de la asignación
   * @param potencial Potencial de la asignación
   * @param observaciones Observaciones opcionales
   * @param campanyaId ID de la campaña
   * @param authorId ID del autor de la asignación
   * @returns Asignación creada
   */
  static async assign(
    agentId: number,
    leadId: number,
    prioritat: number,
    potencial: number,
    observaciones: string,
    campanyaId: number,
    authorId: number = 1
  ): Promise<Assignacio> {
    try {
      console.log(`Asignando lead ${leadId} a agente ${agentId}`);
      
      // IMPORTANTE: Ahora usamos id_campanya como lo requiere el backend
      const data = {
        id_agents: agentId,
        id_leads: leadId,
        prioritat_fitxes_assignacions: prioritat,
        potencial_fitxes_assignacions: potencial,
        obsevacions_fitxes_assignacions: observaciones,
        id_campanya: campanyaId, // Nombre requerido por el backend
        id_autor: authorId,
        estat_fitxes_assignacions: "Pendiente" // Estado por defecto
      };

      console.log('Datos de asignación:', data);
      return await apiClient.post<Assignacio>(this.BASE_URL, data);
    } catch (error) {
      console.error(`Error assigning lead ${leadId} to agent ${agentId}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Asigna múltiples leads a múltiples agentes en modo round-robin
   * @param agentIds Array de IDs de agentes
   * @param leadIds Array de IDs de leads
   * @param prioritat Prioridad de las asignaciones
   * @param potencial Potencial de las asignaciones
   * @param observaciones Observaciones opcionales
   * @param campanyaId ID de la campaña
   * @param authorId ID del autor de las asignaciones
   * @returns Resultado de la operación
   */
  static async bulkAssign(
    agentIds: number[],
    leadIds: number[],
    prioritat: number,
    potencial: number,
    observaciones: string,
    campanyaId: number,
    authorId: number = 1
  ): Promise<BulkResult> {
    try {
      console.log('Iniciando asignación masiva round-robin con:', {
        agentIds, leadIds, prioritat, potencial, observaciones, campanyaId, authorId
      });
      
      // Implementar lógica de round-robin manualmente
      let assignedCount = 0;
      let errorCount = 0;
      let errorDetails = '';
      
      // Asignación round-robin (distribuir leads entre agentes)
      for (let i = 0; i < leadIds.length; i++) {
        const agentIndex = i % agentIds.length;
        const agentId = agentIds[agentIndex];
        const leadId = leadIds[i];
        
        try {
          console.log(`Asignando lead ${leadId} a agente ${agentId} (${i+1}/${leadIds.length})`);
          await this.assign(agentId, leadId, prioritat, potencial, observaciones, campanyaId, authorId);
          assignedCount++;
        } catch (assignError: any) {
          errorCount++;
          errorDetails += `Lead ${leadId} a Agente ${agentId}: ${assignError.message}. `;
          console.error(`Error al asignar lead ${leadId} a agente ${agentId}:`, assignError);
        }
      }
      
      console.log(`Asignación round-robin completada: ${assignedCount} éxitos, ${errorCount} errores`);
      return {
        success: assignedCount,
        error: errorCount,
        errorDetails: errorDetails || undefined
      };
    } catch (error) {
      console.error('Error en bulkAssign:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Asigna múltiples leads a múltiples agentes (todos a todos)
   * @param agentIds Array de IDs de agentes
   * @param leadIds Array de IDs de leads
   * @param prioritat Prioridad de las asignaciones
   * @param potencial Potencial de las asignaciones
   * @param observaciones Observaciones opcionales
   * @param campanyaId ID de la campaña
   * @param authorId ID del autor de las asignaciones
   * @returns Resultado de la operación
   */
  static async bulkAssignAll(
    agentIds: number[],
    leadIds: number[],
    prioritat: number,
    potencial: number,
    observaciones: string,
    campanyaId: number,
    authorId: number = 1
  ): Promise<BulkResult> {
    try {
      console.log('Iniciando asignación masiva todos-a-todos con:', {
        agentIds, leadIds, prioritat, potencial, observaciones, campanyaId, authorId
      });
      
      // Implementar asignación todos a todos manualmente
      let assignedCount = 0;
      let errorCount = 0;
      let errorDetails = '';
      const totalAssignments = agentIds.length * leadIds.length;
      let currentAssignment = 0;
      
      // Asignación de todos los leads a todos los agentes
      for (const agentId of agentIds) {
        for (const leadId of leadIds) {
          currentAssignment++;
          try {
            console.log(`Asignando lead ${leadId} a agente ${agentId} (${currentAssignment}/${totalAssignments})`);
            await this.assign(agentId, leadId, prioritat, potencial, observaciones, campanyaId, authorId);
            assignedCount++;
          } catch (assignError: any) {
            errorCount++;
            errorDetails += `Lead ${leadId} a Agente ${agentId}: ${assignError.message}. `;
            console.error(`Error al asignar lead ${leadId} a agente ${agentId}:`, assignError);
          }
        }
      }
      
      console.log(`Asignación todos-a-todos completada: ${assignedCount} éxitos, ${errorCount} errores`);
      return {
        success: assignedCount,
        error: errorCount,
        errorDetails: errorDetails || undefined
      };
    } catch (error) {
      console.error('Error en bulkAssignAll:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Actualiza el estado de una asignación
   * @param id ID de la asignación
   * @param estado Nuevo estado
   * @returns Asignación actualizada
   */
  static async updateStatus(id: number, estado: string): Promise<Assignacio> {
    try {
      return await apiClient.patch<Assignacio>(`${this.BASE_URL}${id}`, { 
        estat_fitxes_assignacions: estado 
      });
    } catch (error) {
      console.error(`Error updating status for assignacio ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Elimina una asignación
   * @param id ID de la asignación
   * @returns Resultado de la operación
   */
  static async delete(id: number): Promise<{detail: string}> {
    try {
      return await apiClient.delete<{detail: string}>(`${this.BASE_URL}${id}`);
    } catch (error) {
      console.error(`Error deleting assignacio ${id}:`, error);
      throw this.handleError(error);
    }
  }

  /**
   * Maneja errores de la API y los transforma en mensajes de error amigables
   * @param error Error original
   * @returns Error procesado
   */
  private static handleError(error: any): Error {
    console.error('Error en AssignacioService:', error);
    
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