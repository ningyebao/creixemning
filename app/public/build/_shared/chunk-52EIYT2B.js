import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  createHotContext
} from "/build/_shared/chunk-XR3XMPCQ.js";
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
  import.meta.hot.lastModified = "1746438788324.9072";
}
var API_URL = "http://localhost:8080";
var ApiClient = class {
  baseUrl;
  defaultHeaders;
  constructor(baseUrl = API_URL) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
  }
  buildUrl(endpoint) {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${this.baseUrl}${cleanEndpoint}`;
  }
  async get(endpoint, params) {
    let url = this.buildUrl(endpoint);
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== void 0 && value !== null && value !== "") {
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
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error en GET:", error);
      throw new ApiError("Error de conexi\xF3n con el servidor", 0, error instanceof Error ? error.message : String(error));
    }
  }
  async post(endpoint, data) {
    const url = this.buildUrl(endpoint);
    console.log(`API POST: ${url}`, data);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.defaultHeaders,
        body: JSON.stringify(data)
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error en POST:", error);
      throw new ApiError("Error al comunicarse con el servidor", 0, error instanceof Error ? error.message : String(error));
    }
  }
  async put(endpoint, data) {
    const url = this.buildUrl(endpoint);
    console.log(`API PUT: ${url}`, data);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: this.defaultHeaders,
        body: JSON.stringify(data)
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error en PUT:", error);
      throw new ApiError("Error de conexi\xF3n con el servidor", 0, error instanceof Error ? error.message : String(error));
    }
  }
  async delete(endpoint) {
    const url = this.buildUrl(endpoint);
    console.log(`API DELETE: ${url}`);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: this.defaultHeaders
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error("Error en DELETE:", error);
      throw new ApiError("Error de conexi\xF3n con el servidor", 0, error instanceof Error ? error.message : String(error));
    }
  }
  async handleResponse(response) {
    if (!response.ok) {
      console.error(`HTTP error: ${response.status}`, response);
      let errorMessage = `Error HTTP: ${response.status}`;
      let errorDetails = response.statusText;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorMessage;
        errorDetails = JSON.stringify(errorData);
      } catch (e) {
      }
      throw new ApiError(errorMessage, response.status, errorDetails);
    }
    if (response.status === 204) {
      return {};
    }
    try {
      return await response.json();
    } catch (error) {
      console.error("Error al parsear JSON:", error);
      throw new ApiError("Error al procesar la respuesta", 0, error instanceof Error ? error.message : String(error));
    }
  }
};
var ApiError = class extends Error {
  status;
  details;
  constructor(message, status, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
};
var apiClient = new ApiClient();

export {
  apiClient
};
//# sourceMappingURL=/build/_shared/chunk-52EIYT2B.js.map
