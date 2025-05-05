export async function apiFetch(path: string, options: RequestInit = {}) {
    const API_URL = process.env.API_URL;
    if (!API_URL) {
      throw new Error("La variable de entorno API_URL no está definida");
    }
    const url = `${API_URL}${path}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en ${url}: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return await response.json();
  }
  