// app/services/agents.service.ts
import { apiClient } from "~/lib/api/client";
import type { Agent } from "~/lib/types";

// Exportaciones individuales
export async function getAllAgents(): Promise<Agent[]> {
  return await apiClient.get<Agent[]>("/agents/agents/");
}

export async function getAll(): Promise<Agent[]> {
  return getAllAgents();
}

export async function getAgentById(id: number): Promise<Agent> {
  // Uso la ruta correcta según el Swagger
  return await apiClient.get<Agent>(`/agents/agents/${id}`);
}

export async function getById(id: number): Promise<Agent> {
  return getAgentById(id);
}

export async function createAgent(agent: Partial<Agent>): Promise<Agent> {
  return await apiClient.post<Agent>("/agents/agents/", agent);
}

export async function create(agent: Partial<Agent>): Promise<Agent> {
  return createAgent(agent);
}

export async function updateAgent(id: number, agent: Partial<Agent>): Promise<Agent> {
  return await apiClient.put<Agent>(`/agents/agents/${id}`, agent);
}

export async function update(id: number, agent: Partial<Agent>): Promise<Agent> {
  return updateAgent(id, agent);
}

export async function deleteAgent(id: number): Promise<void> {
  await apiClient.delete<void>(`/agents/agents/${id}`);
}

export async function delete_(id: number): Promise<void> {
  return deleteAgent(id);
}

// Mantenemos también la clase con métodos estáticos para compatibilidad
export class AgentsService {
  static async getAllAgents(): Promise<Agent[]> {
    return getAllAgents();
  }
  
  static async getAll(): Promise<Agent[]> {
    return getAllAgents();
  }
  
  static async getAgentById(id: number): Promise<Agent> {
    return getAgentById(id);
  }
  
  static async getById(id: number): Promise<Agent> {
    return getAgentById(id);
  }
  
  static async createAgent(agent: Partial<Agent>): Promise<Agent> {
    return createAgent(agent);
  }
  
  static async create(agent: Partial<Agent>): Promise<Agent> {
    return createAgent(agent);
  }
  
  static async updateAgent(id: number, agent: Partial<Agent>): Promise<Agent> {
    return updateAgent(id, agent);
  }
  
  static async update(id: number, agent: Partial<Agent>): Promise<Agent> {
    return updateAgent(id, agent);
  }
  
  static async deleteAgent(id: number): Promise<void> {
    return deleteAgent(id);
  }
  
  static async delete(id: number): Promise<void> {
    return deleteAgent(id);
  }
}