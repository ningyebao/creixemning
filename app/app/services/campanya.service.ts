// app/services/campanya.service.ts
import { apiClient } from "~/lib/api/client";
import type { Campanya } from "~/lib/types";

export class CampanyaService {
  static async getAll(): Promise<Campanya[]> {
    return await apiClient.get<Campanya[]>("/campanya/");
  }
  
  static async getById(id: number): Promise<Campanya> {
    return await apiClient.get<Campanya>(`/campanya/${id}`);
  }
  
  static async create(campanya: Partial<Campanya>): Promise<Campanya> {
    return await apiClient.post<Campanya>("/campanya/", campanya);
  }
  
  static async delete(id: number): Promise<void> {
    await apiClient.delete<void>(`/campanya/${id}`);
  }
  
  static async update(id: number, campanya: Partial<Campanya>): Promise<Campanya> {
    return await apiClient.put<Campanya>(`/campanya/${id}`, campanya);
  }
}