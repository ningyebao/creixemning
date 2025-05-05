// app/services/agents.service.ts
import { apiClient } from '~/lib/api/client';
import type { Agent } from '~/lib/types';

export class AgentService {
  // Usamos la ruta exacta que está en el backend
  private static readonly BASE_ENDPOINT = '/agents/';

  static async getAll(): Promise<Agent[]> {
    // Añadamos un log para depuración
    console.log('AgentService: Llamando a getAll()');
    try {
      const agents = await apiClient.get<Agent[]>(this.BASE_ENDPOINT);
      console.log('AgentService: Respuesta de getAll()', agents);
      return agents;
    } catch (error) {
      console.error('AgentService: Error en getAll()', error);
      throw error;
    }
  }

  static async getById(id: number): Promise<Agent> {
    return apiClient.get<Agent>(`${this.BASE_ENDPOINT}/${id}`);
  }

  static async create(agentData: Partial<Agent>): Promise<Agent> {
    // Convertir datos null a undefined para que coincidan con el tipo Agent
    const cleanedData = Object.fromEntries(
      Object.entries(agentData).map(([k, v]) => [k, v === null ? undefined : v])
    );
    
    return apiClient.post<Agent>(this.BASE_ENDPOINT, cleanedData);
  }

  static async update(id: number, agentData: Partial<Agent>): Promise<Agent> {
    // Convertir datos null a undefined para que coincidan con el tipo Agent
    const cleanedData = Object.fromEntries(
      Object.entries(agentData).map(([k, v]) => [k, v === null ? undefined : v])
    );
    
    return apiClient.post<Agent>(`${this.BASE_ENDPOINT}/${id}`, cleanedData);
  }

  static async delete(id: number): Promise<void> {
    return apiClient.get<void>(`${this.BASE_ENDPOINT}/${id}/delete`);
  }
}