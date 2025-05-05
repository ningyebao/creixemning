// app/services/campanya.service.ts
import { apiClient } from "~/lib/api/client";
import type { Campanya } from "~/lib/types";

export class CampanyaService {
  static async getAll(): Promise<Campanya[]> {
    return await apiClient.get<Campanya[]>("/campanya");
  }
  
  static async getById(id: number): Promise<Campanya> {
    return await apiClient.get<Campanya>(`/campanya/${id}`);  // Corregido: añadida barra
  }
  
  static async create(campanya: Partial<Campanya>): Promise<Campanya> {
    return await apiClient.post<Campanya>("/campanya", campanya);
  }
  
 
}