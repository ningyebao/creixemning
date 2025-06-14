// app/services/clients.service.ts
import { apiClient } from "~/lib/api/client";
import type { Client } from "~/lib/types";

export class ClientsService {
  static async getAll(): Promise<Client[]> {
    return await apiClient.get<Client[]>("/clients/");
  }
  
  static async getById(id: number): Promise<Client> {
    return await apiClient.get<Client>(`/clients/${id}`);
  }
  
  static async create(client: Partial<Client>): Promise<Client> {
    return await apiClient.post<Client>("/clients/", client);
  }

  
  static async update(id: number, client: Partial<Client>): Promise<Client> {
    return await apiClient.put<Client>(`/clients/${id}`, client);
  }

  
  static async delete(id: number): Promise<void> {
    await apiClient.delete<void>(`/clients/${id}`);
  }
}