// app/services/productes.services.ts
import { apiClient } from '~/lib/api/client';
import type { Producte } from '~/lib/types'; // Asumiendo que este es tu index.ts con las interfaces

// Podrías necesitar un tipo específico para la creación/actualización si es diferente de Producte.
// Basado en tu backend (ProducteCreate para POST y PUT), vamos a usar Partial<Producte>
// o un tipo más específico si lo tienes (ej. ProducteInput o ProductePayload).
// Por simplicidad y consistencia con tu backend que usa ProducteCreate para input:
export interface ProducteDataInput extends Omit<Producte, 'id_producte' | 'datacreacio_producte'> {
  // Incluye todos los campos que se pueden enviar al crear o actualizar
  // Opcionalmente, podrías definir campos específicos aquí.
  // Por ejemplo, si 'databaixa_producte' solo se establece a través de una acción específica,
  // podría no estar aquí, o ser opcional.
}


export class ProductesService {
  private static readonly BASE_ENDPOINT = '/productes/'; // Coincide con el prefix del router en FastAPI

  /**
   * Obtiene todos los productos.
   * Corresponde a: GET /productes/
   */
  static async getAll(): Promise<Producte[]> {
    console.log(`ProductesService: Llamando a getAll() en ${this.BASE_ENDPOINT}`);
    try {
      const productes = await apiClient.get<Producte[]>(this.BASE_ENDPOINT);
      console.log('ProductesService: Respuesta de getAll()', productes);
      return productes;
    } catch (error) {
      console.error('ProductesService: Error en getAll()', error);
      throw error; // Re-lanzar para que el componente lo maneje
    }
  }

  /**
   * Obtiene un producto específico por su ID.
   * Corresponde a: GET /productes/{producte_id}
   */
  static async getById(id: number): Promise<Producte> {
    const endpoint = `${this.BASE_ENDPOINT}${id}`;
    console.log(`ProductesService: Llamando a getById(${id}) en ${endpoint}`);
    try {
      const producte = await apiClient.get<Producte>(endpoint);
      console.log(`ProductesService: Respuesta de getById(${id})`, producte);
      if (!producte) { // Opcional: algunos apiClients pueden devolver null/undefined en lugar de lanzar 404
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      return producte;
    } catch (error) {
      console.error(`ProductesService: Error en getById(${id})`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo producto.
   * Corresponde a: POST /productes/
   * El backend espera un objeto ProducteCreate.
   */
  static async create(producteData: ProducteDataInput): Promise<Producte> {
    console.log(`ProductesService: Llamando a create() en ${this.BASE_ENDPOINT} con datos:`, producteData);
    try {
      // Asegurarse que los datos enviados coinciden con lo que ProducteCreate espera.
      // Tu backend FastAPI se encarga de la validación con Pydantic.
      const nouProducte = await apiClient.post<Producte>(this.BASE_ENDPOINT, producteData);
      console.log('ProductesService: Respuesta de create()', nouProducte);
      return nouProducte;
    } catch (error) {
      console.error('ProductesService: Error en create()', error);
      throw error;
    }
  }

  /**
   * Actualiza un producto existente.
   * Corresponde a: PUT /productes/{producte_id}
   * El backend espera un objeto ProducteCreate para los datos de actualización.
   */
  static async update(id: number, producteUpdateData: ProducteDataInput): Promise<Producte> {
    const endpoint = `${this.BASE_ENDPOINT}${id}`;
    console.log(`ProductesService: Llamando a update(${id}) en ${endpoint} con datos:`, producteUpdateData);
    try {
      // Asegurarse que los datos enviados coinciden con lo que ProducteCreate espera para la actualización.
      const producteActualitzat = await apiClient.put<Producte>(endpoint, producteUpdateData);
      console.log(`ProductesService: Respuesta de update(${id})`, producteActualitzat);
      return producteActualitzat;
    } catch (error) {
      console.error(`ProductesService: Error en update(${id})`, error);
      throw error;
    }
  }

  /**
   * Elimina un producto por su ID.
   * Corresponde a: DELETE /productes/{producte_id}
   */
  static async delete(id: number): Promise<void> { // El backend devuelve {"detail": "Producte deleted successfully"}
    const endpoint = `${this.BASE_ENDPOINT}${id}`;
    console.log(`ProductesService: Llamando a delete(${id}) en ${endpoint}`);
    try {
      // apiClient.delete podría devolver una respuesta (como el mensaje de éxito del backend)
      // o simplemente void si está configurado para no devolver contenido en éxito.
      // Ajusta el tipo de retorno de apiClient.delete si es necesario.
      await apiClient.delete<void>(endpoint); // O apiClient.delete<{ detail: string }>(endpoint);
      console.log(`ProductesService: Petición de eliminación enviada para el producto con ID: ${id}.`);
      // No es necesario devolver nada más si la operación es void.
    } catch (error) {
      console.error(`ProductesService: Error en delete(${id})`, error);
      throw error;
    }
  }

  /**
   * Limpia los valores nulos de un objeto, convirtiéndolos a undefined
   * para que no se envíen en el payload si no es necesario (especialmente útil para Pydantic).
   * Nota: Tu backend parece manejar esto con `producte_in.dict(exclude_unset=True)`,
   * por lo que este paso en el frontend podría ser redundante si los campos opcionales
   * ya son `undefined` cuando no se proporcionan.
   * Sin embargo, si el formulario puede enviar `null` explícitamente, esto es útil.
   */
  private static cleanData<T extends object>(data: Partial<T>): Partial<T> {
    const cleanedData = { ...data };
    for (const key in cleanedData) {
      if (cleanedData[key as keyof T] === null) {
        delete cleanedData[key as keyof T]; // O asignar undefined: cleanedData[key as keyof T] = undefined;
      }
    }
    return cleanedData;
  }
}