import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  createHotContext
} from "/build/_shared/chunk-WWESKXYW.js";
import {
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// app/lib/api/client.ts
var import_node = __toESM(require_node());
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\api\\client.ts"
  );
  import.meta.hot.lastModified = "1748531257219.3833";
}
var API_URL = "http://localhost:8080";
var DEFAULT_TIMEOUT = 3e4;
var ApiError = class extends Error {
  status;
  details;
  originalError;
  constructor(message, status, details, originalError) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
    this.originalError = originalError;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
  toUserFriendlyMessage() {
    if (this.status === 401)
      return "Tu sesi\xF3n ha expirado. Por favor, inicia sesi\xF3n nuevamente.";
    if (this.status === 403)
      return "No tienes permisos para realizar esta acci\xF3n.";
    if (this.status === 404)
      return "El recurso solicitado no existe.";
    if (this.status >= 500)
      return "Ha ocurrido un error en el servidor. Por favor, int\xE9ntalo m\xE1s tarde.";
    return this.message;
  }
};
var ApiClient = class {
  baseUrl;
  defaultHeaders;
  defaultTimeout;
  maxRetries;
  debug;
  authToken;
  /**
   * Constructor del cliente API
   * @param config Configuración opcional del cliente
   */
  constructor(config = {}) {
    const {
      baseUrl = API_URL,
      defaultHeaders = {},
      timeout = DEFAULT_TIMEOUT,
      retries = 0,
      debug = false
    } = config;
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    this.defaultTimeout = timeout;
    this.maxRetries = retries;
    this.debug = debug;
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
  setAuthToken(token) {
    this.authToken = token;
  }
  /**
   * Limpia el token de autenticación
   */
  clearAuthToken() {
    this.authToken = void 0;
  }
  /**
   * Construye la URL completa para un endpoint
   * @param endpoint Endpoint relativo
   * @returns URL completa
   */
  buildUrl(endpoint) {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${cleanEndpoint}`;
  }
  /**
   * Construye un query string para los parámetros de consulta
   * @param params Parámetros de consulta
   * @returns Query string formateado
   */
  buildQueryString(params) {
    if (!params || Object.keys(params).length === 0) {
      return "";
    }
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value === void 0 || value === null || value === "") {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== void 0 && item !== null && item !== "") {
            searchParams.append(`${key}[]`, String(item));
          }
        });
        return;
      }
      if (typeof value === "boolean") {
        searchParams.append(key, value ? "true" : "false");
        return;
      }
      searchParams.append(key, String(value));
    });
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  }
  /**
   * Prepara las cabeceras HTTP para una solicitud
   * @param customHeaders Cabeceras personalizadas
   * @returns Cabeceras combinadas
   */
  prepareHeaders(customHeaders) {
    const headers = new Headers();
    Object.entries(this.defaultHeaders).forEach(([key, value]) => {
      headers.append(key, value);
    });
    if (this.authToken) {
      headers.append("Authorization", `Bearer ${this.authToken}`);
    }
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
  async request(method, endpoint, data, params, options = {}) {
    const url = this.buildUrl(endpoint) + this.buildQueryString(params);
    const headers = this.prepareHeaders(options.headers);
    const timeout = options.timeout || this.defaultTimeout;
    const controller = new AbortController();
    const { signal } = options.signal ? { signal: options.signal } : controller;
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
      const requestOptions = {
        method,
        headers,
        signal,
        ...options.cache && { cache: options.cache }
      };
      if (data !== void 0 && ["POST", "PUT", "PATCH"].includes(method)) {
        requestOptions.body = JSON.stringify(data);
      }
      let response = null;
      let lastError = null;
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
            await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 100));
          }
        }
      }
      if (!response) {
        if (lastError?.name === "AbortError") {
          throw new ApiError("La solicitud ha excedido el tiempo de espera", 408, "Timeout", lastError);
        }
        throw new ApiError(
          "Error de conexi\xF3n con el servidor",
          0,
          lastError?.message || "Error desconocido",
          lastError || void 0
        );
      }
      return await this.handleResponse(response);
    } catch (error) {
      if (this.debug) {
        console.error(`Error en ${method} ${url}:`, error);
      }
      if (error instanceof ApiError) {
        throw error;
      }
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorName = error instanceof Error ? error.name : "Unknown";
      if (errorName === "AbortError") {
        throw new ApiError("La solicitud ha excedido el tiempo de espera", 408, "Timeout");
      }
      throw new ApiError(
        "Error al comunicarse con el servidor",
        0,
        errorMessage,
        error instanceof Error ? error : void 0
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
  async handleResponse(response) {
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
        const contentType2 = response.headers.get("content-type");
        if (contentType2 && contentType2.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
          errorDetails = JSON.stringify(errorData);
          if (this.debug) {
            console.error("Error response body:", errorData);
          }
        } else {
          errorDetails = await response.text();
          if (this.debug) {
            console.error("Error response text:", errorDetails);
          }
        }
      } catch (e) {
      }
      throw new ApiError(errorMessage, response.status, errorDetails);
    }
    if (response.status === 204) {
      return {};
    }
    const contentType = response.headers.get("content-type");
    if (!contentType) {
      return {};
    }
    try {
      if (contentType.includes("application/json")) {
        return await response.json();
      } else if (contentType.includes("text/")) {
        const text = await response.text();
        return text;
      } else {
        const blob = await response.blob();
        return blob;
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
  async get(endpoint, params, options) {
    return this.request("GET", endpoint, void 0, params, options);
  }
  /**
   * Realiza una solicitud POST
   * @param endpoint Endpoint relativo
   * @param data Datos a enviar
   * @param options Opciones adicionales
   * @returns Datos tipados
   */
  async post(endpoint, data, options) {
    return this.request("POST", endpoint, data, void 0, options);
  }
  /**
   * Realiza una solicitud PUT
   * @param endpoint Endpoint relativo
   * @param data Datos a enviar
   * @param options Opciones adicionales
   * @returns Datos tipados
   */
  async put(endpoint, data, options) {
    return this.request("PUT", endpoint, data, void 0, options);
  }
  /**
   * Realiza una solicitud PATCH
   * @param endpoint Endpoint relativo
   * @param data Datos a enviar
   * @param options Opciones adicionales
   * @returns Datos tipados
   */
  async patch(endpoint, data, options) {
    return this.request("PATCH", endpoint, data, void 0, options);
  }
  /**
   * Realiza una solicitud DELETE
   * @param endpoint Endpoint relativo
   * @param params Parámetros de consulta
   * @param options Opciones adicionales
   * @returns Datos tipados
   */
  async delete(endpoint, params, options) {
    return this.request("DELETE", endpoint, void 0, params, options);
  }
  /**
   * Habilita el logging detallado de las requests
   */
  enableDebugLogging() {
    this.debug = true;
  }
  /**
   * Deshabilita el logging detallado
   */
  disableDebugLogging() {
    this.debug = false;
  }
};
var apiClient = new ApiClient({
  debug: true
  // Siempre en true para debugging // Modificado según tu solicitud
});

export {
  apiClient
};
//# sourceMappingURL=/build/_shared/chunk-WCLFPUDL.js.map
