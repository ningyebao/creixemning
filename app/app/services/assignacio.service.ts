// app/services/assignacio.service.ts
import { apiClient } from "~/lib/api/client";
import type { Assignacio, AssignacioFilters } from "~/lib/types";

// Definir estados válidos como tipo y constantes
type EstadoAsignacion = "Pendiente" | "En progreso" | "Completada" | "Cancelada";
const ESTADOS_ASIGNACION = {
  PENDIENTE: "Pendiente" as EstadoAsignacion,
  EN_PROGRESO: "En progreso" as EstadoAsignacion,
  COMPLETADA: "Completada" as EstadoAsignacion,
  CANCELADA: "Cancelada" as EstadoAsignacion
};

export class AssignacioService {
  // Constante para el endpoint base - esto asegura consistencia
  private static ENDPOINT = "/fitxes_assignacions";

  /**
   * Obtiene una lista paginada y filtrada de asignaciones.
   */
  static async getAll(
    offset: number = 0,
    limit: number = 50,
    filters: AssignacioFilters = {}
  ): Promise<Assignacio[]> {
    try {
      // Crear un objeto de parámetros de consulta
      const params: Record<string, any> = { 
        offset, 
        limit,
        ...filters 
      };
      
      console.log(`AssignacioService.getAll: Fetching with params:`, params);
      const response = await apiClient.get<Assignacio[]>(this.ENDPOINT, params);
      return response;
    } catch (error) {
      console.error(`AssignacioService.getAll: Error fetching assignments`, error);
      throw error;
    }
  }

  /**
   * Actualiza una asignación existente por su ID.
   */
  static async update(
    id: number,
    data: Partial<Omit<Assignacio, 'id_fitxes_asignacions'>>
  ): Promise<Assignacio> {
    try {
      // Asegurar que estamos utilizando un formato de campo consistente
      const normalizedData = this.normalizeAssignmentData(data);
      
      const endpoint = `${this.ENDPOINT}/${id}/`;
      console.log(`AssignacioService.update: Updating assignment ${id} with data:`, normalizedData); 
      const response = await apiClient.patch<Assignacio>(endpoint, normalizedData);
      return response;
    } catch (error) {
      console.error(`AssignacioService.update: Error updating assignment ${id}`, error);
      throw error;
    }
  }

  /**
   * Realiza una asignación masiva de leads a agentes (Round-Robin, método equitativo)
   */
  static async bulkAssign(
    agentIds: number[],
    leadIds: number[],
    prioritat: number,
    potencial: number,
    observaciones = '',
    idCampanya = 1,
    idAutor = 1
  ): Promise<{ success: number; error: number; errorDetails?: string }> {
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

      const iso = new Date().toISOString();
      const naive = iso.replace('Z', '');

      // Usar un nombre de campo consistente para observaciones y el tipo correcto para el estado
      const data: Omit<Assignacio, 'id_fitxes_asignacions'> = {
        id_agents: agentId,
        id_leads: leadId,
        id_autor: idAutor,
        id_campanya_leads: idCampanya,
        estat_fitxes_assignacions: ESTADOS_ASIGNACION.PENDIENTE,
        potencial_fitxes_assignacions: potencial,
        prioritat_fitxes_assignacions: prioritat,
        obsevacions_fitxes_assignacions: observaciones, // Usar el nombre de campo que espera el backend
        data_creacio_fitxes_assignacions: naive,
        id_fitxes_trucades_fitxes_asignacions: 0
      };

      console.log('bulkAssign payload:', data);

      const result = await this.create(data);
      console.log('Asignación creada:', result);
      return { success: 1, error: 0 };
    } catch (err) {
      console.error('Error en bulkAssign:', err);
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
  static async bulkAssignAll(
    agentIds: number[],
    leadIds: number[],
    prioritat: number,
    potencial: number,
    observaciones = '',
    idCampanya = 1,
    idAutor = 1
  ): Promise<{ success: number; error: number; errorDetails?: string }> {
    if (agentIds.length === 0 || leadIds.length === 0) {
      return { 
        success: 0, 
        error: 0, 
        errorDetails: "No hay agentes o leads seleccionados" 
      };
    }

    const assignments: Omit<Assignacio, 'id_fitxes_asignacions'>[] = [];
    const iso = new Date().toISOString();
    const naive = iso.replace('Z', '');

    // Crear todas las asignaciones lead-agente
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
          obsevacions_fitxes_assignacions: observaciones, // Usar el nombre de campo consistente
          data_creacio_fitxes_assignacions: naive,
          id_fitxes_trucades_fitxes_asignacions: 0
        });
      }
    }

    console.log('bulkAssignAll assignments count:', assignments.length);
    console.log('bulkAssignAll sample payload:', assignments.slice(0, 1));

    // Usar Promise.allSettled para manejar casos de éxito y fallo
    const results = await Promise.allSettled(
      assignments.map(data => this.create(data))
    );

    const successCount = results.filter(r => r.status === 'fulfilled').length;
    const rejected = results.filter(r => r.status === 'rejected') as PromiseRejectedResult[];
    const errorCount = rejected.length;
    
    let errorDetails = '';
    if (errorCount > 0) {
      // Extraer información detallada de los errores
      errorDetails = rejected.map(r => {
        const reason = r.reason;
        if (reason instanceof Error) {
          return reason.message;
        }
        return String(reason);
      }).join('; ');
    }

    console.log('bulkAssignAll results:', { successCount, errorCount, errorDetails });

    return { 
      success: successCount, 
      error: errorCount, 
      errorDetails: errorDetails || undefined 
    };
  }

  /**
   * Crea una asignación individual de un lead a un agente para una campaña.
   */
  static async createIndividualAssignment(
    leadId: number,
    agentId: number,
    prioritat: number,
    potencial: number,
    observaciones: string,
    campanyaId: number,
    idAutor = 1
  ): Promise<Assignacio> {
    const iso = new Date().toISOString();
    const naive = iso.replace('Z', '');

    const data: Omit<Assignacio, 'id_fitxes_asignacions'> = {
      id_agents: agentId,
      id_leads: leadId,
      id_autor: idAutor,
      id_campanya_leads: campanyaId,
      estat_fitxes_assignacions: ESTADOS_ASIGNACION.PENDIENTE,
      potencial_fitxes_assignacions: potencial,
      prioritat_fitxes_assignacions: prioritat,
      obsevacions_fitxes_assignacions: observaciones, // Usar nombre consistente
      data_creacio_fitxes_assignacions: naive,
      id_fitxes_trucades_fitxes_asignacions: 0
    };

    console.log('createIndividualAssignment payload:', data);
    return this.create(data);
  }

  /** Método genérico para crear una asignación */
  static async create(
    data: Omit<Assignacio, 'id_fitxes_asignacions'>
  ): Promise<Assignacio> {
    try {
      // Normalizar datos antes de enviar
      const normalizedData = this.normalizeAssignmentData(data);
      
      // Asegurarnos de que estamos usando el endpoint correcto
      return apiClient.post<Assignacio>(this.ENDPOINT, normalizedData);
    } catch (error) {
      console.error(`AssignacioService.create: Error creating assignment`, error);
      throw error;
    }
  }

  /**
   * Obtiene una asignación por su ID
   */
  static async getById(id: number): Promise<Assignacio | null> {
    try {
      const endpoint = `${this.ENDPOINT}/${id}/`;
      console.log(`AssignacioService.getById: Fetching from ${endpoint}`);
      const response = await apiClient.get<Assignacio>(endpoint);
      return response;
    } catch (error) {
      console.error(`AssignacioService.getById: Error fetching assignment ${id}`, error);
      // Si el error es 404, devolvemos null en lugar de lanzar el error
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        return null;
      }
      throw error;
    }
  }
  
  /**
   * Elimina una asignación por su ID
   */
  static async delete(id: number): Promise<void> {
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
  private static normalizeAssignmentData(data: Record<string, any>): Record<string, any> {
    const result = { ...data };
    
    // Si existe 'observacions_fitxes_assignacions', convertirlo a 'obsevacions_fitxes_assignacions'
    if ('observacions_fitxes_assignacions' in result) {
      result['obsevacions_fitxes_assignacions'] = result['observacions_fitxes_assignacions'];
      delete result['observacions_fitxes_assignacions'];
    }
    
    return result;
  }
}