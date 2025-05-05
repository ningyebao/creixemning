// app/lib/api/client.ts
import { json } from "@remix-run/node";

const API_URL = "http://localhost:8080";

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl = API_URL) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
  }

  private buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${cleanEndpoint}`;
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = this.buildUrl(endpoint);

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });
      
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    console.log(`API GET: ${url}`);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.defaultHeaders
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Error en GET:", error);
      throw new ApiError("Error de conexión con el servidor", 0, error instanceof Error ? error.message : String(error));
    }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    console.log(`API POST: ${url}`, data);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.defaultHeaders,
        body: JSON.stringify(data)
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Error en POST:", error);
      throw new ApiError("Error al comunicarse con el servidor", 0, error instanceof Error ? error.message : String(error));
    }
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    console.log(`API PUT: ${url}`, data);
    
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: this.defaultHeaders,
        body: JSON.stringify(data)
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Error en PUT:", error);
      throw new ApiError("Error de conexión con el servidor", 0, error instanceof Error ? error.message : String(error));
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    console.log(`API DELETE: ${url}`);
    
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: this.defaultHeaders
      });
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("Error en DELETE:", error);
      throw new ApiError("Error de conexión con el servidor", 0, error instanceof Error ? error.message : String(error));
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      console.error(`HTTP error: ${response.status}`, response);
      let errorMessage = `Error HTTP: ${response.status}`;
      let errorDetails = response.statusText;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
        errorDetails = JSON.stringify(errorData);
      } catch (e) {
        // si no podemos parsear el error, usamos valores por defecto
      }
      
      throw new ApiError(errorMessage, response.status, errorDetails);
    }

    // Si es 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    try {
      return await response.json() as T;
    } catch (error) {
      console.error("Error al parsear JSON:", error);
      throw new ApiError("Error al procesar la respuesta", 0, error instanceof Error ? error.message : String(error));
    }
  }
}

export class ApiError extends Error {
  status: number;
  details: string;

  constructor(message: string, status: number, details: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function handleApiError(error: unknown) {
  console.error("Handling API Error:", error);

  if (error instanceof ApiError) {
    return json(
      { message: error.message, details: error.details },
      { status: error.status || 500 }
    );
  }

  return json(
    { message: "Ha ocurrido un error inesperado." },
    { status: 500 }
  );
}

export const apiClient = new ApiClient();