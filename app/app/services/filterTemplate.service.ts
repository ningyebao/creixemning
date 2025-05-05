import axios from "axios";
import type { FilterTemplate } from "~/lib/types/automation";

export class FilterTemplateService {
  private static apiUrl = "/filter-templates";

  static async getAll(): Promise<FilterTemplate[]> {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  static async getById(id: number): Promise<FilterTemplate> {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    return response.data;
  }

  static async create(template: Omit<FilterTemplate, "id" | "createdAt" | "updatedAt">): Promise<FilterTemplate> {
    const response = await axios.post(this.apiUrl, template);
    return response.data;
  }

  static async update(id: number, template: Partial<FilterTemplate>): Promise<FilterTemplate> {
    const response = await axios.put(`${this.apiUrl}/${id}`, template);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  static async applyTemplate(id: number): Promise<any[]> {
    // Aplica el template y devuelve los leads que cumplen con los filtros
    const response = await axios.get(`${this.apiUrl}/${id}/apply`);
    return response.data;
  }
}