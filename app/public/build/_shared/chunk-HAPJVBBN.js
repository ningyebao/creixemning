import {
  apiClient
} from "/build/_shared/chunk-WCLFPUDL.js";
import {
  createHotContext
} from "/build/_shared/chunk-WWESKXYW.js";

// app/services/agents.service.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\agents.service.ts"
  );
  import.meta.hot.lastModified = "1748246654129.6638";
}
async function getAllAgents() {
  return await apiClient.get("/agents/agents/");
}
async function getAgentById(id) {
  return await apiClient.get(`/agents/agents/${id}`);
}
async function createAgent(agent) {
  return await apiClient.post("/agents/agents/", agent);
}
async function updateAgent(id, agent) {
  return await apiClient.put(`/agents/agents/${id}`, agent);
}
async function deleteAgent(id) {
  await apiClient.delete(`/agents/agents/${id}`);
}
var AgentsService = class {
  static async getAllAgents() {
    return getAllAgents();
  }
  static async getAll() {
    return getAllAgents();
  }
  static async getAgentById(id) {
    return getAgentById(id);
  }
  static async getById(id) {
    return getAgentById(id);
  }
  static async createAgent(agent) {
    return createAgent(agent);
  }
  static async create(agent) {
    return createAgent(agent);
  }
  static async updateAgent(id, agent) {
    return updateAgent(id, agent);
  }
  static async update(id, agent) {
    return updateAgent(id, agent);
  }
  static async deleteAgent(id) {
    return deleteAgent(id);
  }
  static async delete(id) {
    return deleteAgent(id);
  }
};

export {
  AgentsService
};
//# sourceMappingURL=/build/_shared/chunk-HAPJVBBN.js.map
