// app/services/productes.service.ts
import { apiClient } from '~/lib/api/client';
import type { Producte } from '~/lib/types';

export class ProductesService {
  // Usamos la ruta exacta que está en el backend
  private static readonly BASE_ENDPOINT = '/productes/';

  static async getAll(): Promise<Producte[]> {
    // Añadamos un log para depuración
    console.log('ProductesService: Llamando a getAll()');
    try {
      const productes = await apiClient.get<Producte[]>(this.BASE_ENDPOINT);
      console.log('ProductesService: Respuesta de getAll()', productes);
      return productes;
    } catch (error) {
      console.error('ProductesService: Error en getAll()', error);
      throw error;
    }
  }

  static async getById(id: number): Promise<Producte> {
    return apiClient.get<Producte>(`${this.BASE_ENDPOINT}${id}`);
  }

  static async create(producteData: Partial<Producte>): Promise<Producte> {
    // Convertir datos null a undefined para que coincidan con el tipo Producte
    const cleanedData = Object.fromEntries(
      Object.entries(producteData).map(([k, v]) => [k, v === null ? undefined : v])
    );
    
    return apiClient.post<Producte>(this.BASE_ENDPOINT, cleanedData);
  }

  static async update(id: number, producteData: Partial<Producte>): Promise<Producte> {
    // Convertir datos null a undefined para que coincidan con el tipo Producte
    const cleanedData = Object.fromEntries(
      Object.entries(producteData).map(([k, v]) => [k, v === null ? undefined : v])
    );
    
    return apiClient.post<Producte>(`${this.BASE_ENDPOINT}${id}`, cleanedData);
  }

  static async delete(id: number): Promise<void> {
    return apiClient.get<void>(`${this.BASE_ENDPOINT}${id}/delete`);
  }
}