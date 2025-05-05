// ~/services/assignmentRule.service.ts

import axios from "axios";
import type { AssignmentRule, AutomationExecutionLog } from "~/lib/types/automation";

export class AssignmentRuleService {
  private static apiUrl = "/assignment-rules";

  static async getAll(): Promise<AssignmentRule[]> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  static async getById(id: number): Promise<AssignmentRule> {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    return response.data;
  }

  static async create(
    rule: Omit<AssignmentRule, "id" | "createdAt" | "updatedAt">
  ): Promise<AssignmentRule> {
    const response = await axios.post(this.apiUrl, rule);
    return response.data;
  }

  static async update(
    id: number,
    rule: Partial<AssignmentRule>
  ): Promise<AssignmentRule> {
    const response = await axios.put(`${this.apiUrl}/${id}`, rule);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  static async executeRule(id: number): Promise<{
    success: boolean;
    leadsAssigned: number;
    errors: string[];
  }> {
    const response = await axios.post(`${this.apiUrl}/${id}/execute`);
    return response.data;
  }

  static async getLogs(id: number): Promise<AutomationExecutionLog[]> {
    const response = await axios.get(`${this.apiUrl}/${id}/logs`);
    return response.data;
  }

  static async toggleActive(
    id: number,
    isActive: boolean
  ): Promise<AssignmentRule> {
    const response = await axios.patch(
      `${this.apiUrl}/${id}/toggle`,
      { isActive }
    );
    return response.data;
  }

  /**
   * Guarda un log de ejecución en el backend.
   * Ahora acepta solo el objeto `log` y usa su propiedad `ruleId`
   * para construir la URL correcta.
   */
  static async saveExecutionLog(
    log: AutomationExecutionLog
  ): Promise<AutomationExecutionLog> {
    const { ruleId, ...payload } = log;
    const response = await axios.post(
      `${this.apiUrl}/${ruleId}/logs`,
      payload
    );
    return response.data;
  }
}
