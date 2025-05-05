// app/services/lead.service.ts
import { apiClient } from "~/lib/api/client";
import type { Lead, LeadFilters } from "~/lib/types";

export class LeadService {
  /**
   * Obtiene todos los leads con filtros opcionales
   */
  static async getAll(skip = 0, limit = 100, filters?: LeadFilters): Promise<Lead[]> {
    const params = { skip, limit, ...filters };
    return apiClient.get<Lead[]>("/leads/", params);
  }

  /**
   * Obtiene leads no asignados con filtros opcionales
   */
  static async getUnassigned(skip = 0, limit = 100, filters?: LeadFilters): Promise<Lead[]> {
    const params = { skip, limit, ...filters };
    return apiClient.get<Lead[]>("/leads/unassigned/", params);
  }

  /**
   * Busca leads por término de búsqueda
   */
  static async search(searchTerm: string, skip = 0, limit = 100): Promise<Lead[]> {
    const params = { q: searchTerm, skip, limit };
    return apiClient.get<Lead[]>("/leads/search/", params);
  }

  /**
   * Obtiene un lead por su ID
   */
  static async getById(id: number): Promise<Lead> {
    return apiClient.get<Lead>(`/leads/${id}`);
  }

  /**
   * Obtiene estadísticas de leads agrupados por estado
   */
  static async getStatusStats(): Promise<{ status: string; count: number }[]> {
    return apiClient.get<{ status: string; count: number }[]>('/leads/status-stats/');
  }

  /**
   * Obtiene todas las provincias disponibles
   */
  static async getAllProvincias(): Promise<string[]> {
    const leads = await this.getAll(0, 1000);
    const provincias = new Set<string>();

    leads.forEach(lead => {
      if (lead.provincia_lead && lead.provincia_lead.trim()) {
        provincias.add(lead.provincia_lead);
      }
    });

    return Array.from(provincias).sort();
  }

  /**
   * Obtiene todas las poblaciones disponibles
   */
  static async getAllPoblaciones(): Promise<string[]> {
    const leads = await this.getAll(0, 1000);
    const poblaciones = new Set<string>();

    leads.forEach(lead => {
      if (lead.poblacio_lead && lead.poblacio_lead.trim()) {
        poblaciones.add(lead.poblacio_lead);
      }
    });

    return Array.from(poblaciones).sort();
  }

  /**
   * Obtiene todas las comarcas disponibles
   */
  static async getAllComarcas(): Promise<string[]> {
    const leads = await this.getAll(0, 1000);
    const comarcas = new Set<string>();

    leads.forEach(lead => {
      if (lead.comarca_lead && lead.comarca_lead.trim()) {
        comarcas.add(lead.comarca_lead);
      }
    });

    return Array.from(comarcas).sort();
  }
}
