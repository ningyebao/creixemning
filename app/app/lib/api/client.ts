// app/lib/api/client.ts
import { json } from "@remix-run/node";
import type { TypedResponse } from "@remix-run/node";

/**
 * Configuración global del cliente API
 */
interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

/**
 * Opciones para una solicitud individual
 */
interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  cache?: RequestCache;
}


interface QueryParams {
  [key: string]: any;
}

const API_URL = "http://localhost:8080";

const DEFAULT_TIMEOUT = 30000;

export class ApiError extends Error {
  status: number;
  details: string;
  originalError?: Error;

  constructor(message: string, status: number, details: string, originalError?: Error) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
    this.originalError = originalError;

    Object.setPrototypeOf(this, ApiError.prototype);
  }


  toUserFriendlyMessage(): string {
    if (this.status === 401) return "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
    if (this.status === 403) return "No tienes permisos para realizar esta acción.";
    if (this.status === 404) return "El recurso solicitado no existe.";
    if (this.status >= 500) return "Ha ocurrido un error en el servidor. Por favor, inténtalo más tarde.";
    return this.message;
  }
}


export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number;
  private maxRetries: number;
  private debug: boolean;
  private authToken?: string;

  /**
   * Constructor del cliente API
   * @param config Configuración opcional del cliente
   */
  constructor(config: Partial<ApiClientConfig> = {}) {
    const {
      baseUrl = API_URL,
      defaultHeaders = {},
      timeout = DEFAULT_TIMEOUT,
      retries = 0,
      debug = false
    } = config;

    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.defaultTimeout = timeout;
    this.maxRetries = retries;
    this.debug = debug;

    // Headers por defecto
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...defaultHeaders
    };
  }

  /**
   * Establece el token de autenticación para las solicitudes
   * @param token Token de autenticación
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Limpia el token de autenticación
   */
  clearAuthToken(): void {
    this.authToken = undefined;
  }

  /**
   * Construye la URL completa para un endpoint
   * @param endpoint Endpoint relativo
   * @returns URL completa
   */
  private buildUrl(endpoint: string): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${cleanEndpoint}`;
  }

  /**
   * Construye un query string para los parámetros de consulta
   * @param params Parámetros de consulta
   * @returns Query string formateado
   */
  private buildQueryString(params?: QueryParams): string {
    if (!params || Object.keys(params).length === 0) {
      return '';
    }

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      // Skip undefined, null or empty string values
      if (value === undefined || value === null || value === "") {
        return;
      }

      // Handle arrays
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item !== undefined && item !== null && item !== "") {
            searchParams.append(`${key}[]`, String(item));
          }
        });
        return;
      }

      // Handle boolean values
      if (typeof value === 'boolean') {
        searchParams.append(key, value ? 'true' : 'false');
        return;
      }

      // Handle all other values
      searchParams.append(key, String(value));
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Prepara las cabeceras HTTP para una solicitud
   * @param customHeaders Cabeceras personalizadas
   * @returns Cabeceras combinadas
   */
  private prepareHeaders(customHeaders?: Record<string, string>): Headers {
    const headers = new Headers();

    // Añadir headers por defecto
    Object.entries(this.defaultHeaders).forEach(([key, value]) => {
      headers.append(key, value);
    });

    // Añadir token de autenticación si existe
    if (this.authToken) {
      headers.append('Authorization', `Bearer ${this.authToken}`);
    }

    // Añadir headers personalizados
    if (customHeaders) {
      Object.entries(customHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    return headers;
  }

  /**
   * Realiza una solicitud HTTP
   * @param method Método HTTP
   * @param endpoint Endpoint relativo
   * @param data Datos para enviar (para POST, PUT, PATCH)
   * @param params Parámetros de consulta
   * @param options Opciones adicionales
   * @returns Respuesta tipada
   */
  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    params?: QueryParams,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = this.buildUrl(endpoint) + this.buildQueryString(params);
    const headers = this.prepareHeaders(options.headers);
    const timeout = options.timeout || this.defaultTimeout;

    // Crear controlador de aborto para timeout
    const controller = new AbortController();
    const { signal } = options.signal ? { signal: options.signal } : controller;

    // Establecer timeout
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    if (this.debug) {
      console.log(`=== API ${method} REQUEST ===`);
      console.log(`URL: ${url}`);
      console.log(`Headers:`, Object.fromEntries(headers.entries()));
      if (data) {
        console.log(`Body:`, JSON.stringify(data, null, 2));
      }
      if (params) {
        console.log(`Query Params:`, params);
      }
    }

    try {
      const requestOptions: RequestInit = {
        method,
        headers,
        signal,
        ...(options.cache && { cache: options.cache }),
      };

      // Añadir body si es necesario
      if (data !== undefined && ['POST', 'PUT', 'PATCH'].includes(method)) {
        requestOptions.body = JSON.stringify(data);
      }

      // Realizar petición con reintentos si es necesario
      let response: Response | null = null;
      let lastError: Error | null = null;
      let attempt = 0;

      while (attempt <= this.maxRetries && !response) {
        if (attempt > 0 && this.debug) {
          console.log(`Reintento ${attempt} para ${method} ${url}`);
        }

        try {
          response = await fetch(url, requestOptions);
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));
          attempt++;

          if (attempt <= this.maxRetries) {
            // Esperar antes de reintentar (backoff exponencial)
            await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 100));
          }
        }
      }

      // Si aún no hay respuesta después de los reintentos, lanzar el último error
      if (!response) {
        if (lastError?.name === 'AbortError') {
          throw new ApiError("La solicitud ha excedido el tiempo de espera", 408, "Timeout", lastError);
        }
        throw new ApiError(
          "Error de conexión con el servidor",
          0,
          lastError?.message || "Error desconocido",
          lastError || undefined
        );
      }

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (this.debug) {
        console.error(`Error en ${method} ${url}:`, error);
      }

      if (error instanceof ApiError) {
        throw error;
      }

      // Otros tipos de errores
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorName = error instanceof Error ? error.name : 'Unknown';

      if (errorName === 'AbortError') {
        throw new ApiError("La solicitud ha excedido el tiempo de espera", 408, "Timeout");
      }

      throw new ApiError(
        "Error al comunicarse con el servidor",
        0,
        errorMessage,
        error instanceof Error ? error : undefined
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Procesa la respuesta HTTP
   * @param response Objeto Response de fetch
   * @returns Datos tipados de la respuesta
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (this.debug) {
      console.log(`=== API RESPONSE ===`);
      console.log(`Status: ${response.status} ${response.statusText}`);
      console.log(`Headers:`, Object.fromEntries(response.headers.entries()));
    }

    if (!response.ok) {
      if (this.debug) {
        console.error(`HTTP error: ${response.status}`, response);
      }

      let errorMessage = `Error HTTP: ${response.status}`;
      let errorDetails = response.statusText;

      try {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
          errorDetails = JSON.stringify(errorData);

          if (this.debug) {
            console.error('Error response body:', errorData);
          }
        } else {
          errorDetails = await response.text();
          if (this.debug) {
            console.error('Error response text:', errorDetails);
          }
        }
      } catch (e) {
        // Si no podemos parsear el error, usamos valores por defecto
      }

      throw new ApiError(errorMessage, response.status, errorDetails);
    }

    // Si es 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    // Verificar el Content-Type
    const contentType = response.headers.get('content-type');

    // Si no hay datos que devolver
    if (!contentType) {
      return {} as T;
    }

    try {
      if (contentType.includes('application/json')) {
        return await response.json() as T;
      } else if (contentType.includes('text/')) {
        const text = await response.text();
        return text as unknown as T;
      } else {
        // Blob, ArrayBuffer u otros formatos según sea necesario
        const blob = await response.blob();
        return blob as unknown as T;
      }
    } catch (error) {
      console.error("Error al procesar la respuesta:", error);
      throw new ApiError(
        "Error al procesar la respuesta",
        0,
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  /**
   * Realiza una solicitud GET
   * @param endpoint Endpoint relativo
   * @param params Parámetros de consulta
   * @param options Opciones adicionales
   * @returns Datos tipados
   */
  async get<T>(
    endpoint: string,
    params?: QueryParams,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, params, options);
  }

  /**
   * Realiza una solicitud POST
   * @param endpoint Endpoint relativo
   * @param data Datos a enviar
   * @param options Opciones adicionales
   * @returns Datos tipados
   */
  async post<T>(
    endpoint: string,
    data: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('POST', endpoint, data, undefined, options);
  }

  /**
   * Realiza una solicitud PUT
   * @param endpoint Endpoint relativo
   * @param data Datos a enviar
   * @param options Opciones adicionales
   * @returns Datos tipados
   */
  async put<T>(
    endpoint: string,
    data: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('PUT', endpoint, data, undefined, options);
  }

  /**
   * Realiza una solicitud PATCH
   * @param endpoint Endpoint relativo
   * @param data Datos a enviar
   * @param options Opciones adicionales
   * @returns Datos tipados
   */
  async patch<T>(
    endpoint: string,
    data: any,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, undefined, options);
  }

  /**
   * Realiza una solicitud DELETE
   * @param endpoint Endpoint relativo
   * @param params Parámetros de consulta
   * @param options Opciones adicionales
   * @returns Datos tipados
   */
  async delete<T>(
    endpoint: string,
    params?: QueryParams,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, params, options);
  }

  /**
   * Habilita el logging detallado de las requests
   */
  enableDebugLogging(): void {
    this.debug = true;
  }

  /**
   * Deshabilita el logging detallado
   */
  disableDebugLogging(): void {
    this.debug = false;
  }
}

/**
 * Maneja errores de API para respuestas de Remix
 * @param error Error a manejar
 * @returns Respuesta JSON tipada
 */
export function handleApiError(error: unknown): TypedResponse {
  if (error instanceof ApiError) {
    // Determinar un código de estado HTTP significativo
    const status = error.status || 500;

    return json(
      {
        success: false,
        message: error.toUserFriendlyMessage(),
        details: error.details,
        status
      },
      { status }
    );
  }

  // Para errores desconocidos
  console.error("Error inesperado:", error);

  return json(
    {
      success: false,
      message: "Ha ocurrido un error inesperado.",
      status: 500
    },
    { status: 500 }
  );
}

// Instancia por defecto del cliente API
export const apiClient = new ApiClient({
  debug: true // Siempre en true para debugging // Modificado según tu solicitud
});