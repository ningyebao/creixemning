// app/services/auth.service.ts
import { apiClient } from "~/lib/api/client"; // Asumiendo que tienes apiClient configurado
import type { Agent } from "~/lib/types"; //

// Tipo para la respuesta esperada del endpoint /auth/login
interface LoginResponse {
  message: string;
  nom_agent: string; //
  id_agent: number; //
}

// Tipo para los datos que se envían al endpoint /auth/login
interface LoginPayload {
  nom_agent: string;
  contrasenya_agent: string; //
}

export class AuthService {
  private static readonly AUTH_ENDPOINT = "/auth"; // Coincide con el prefix del router en FastAPI

  /**
   * Realiza el login de un agente.
   * @param nom_agent - Nombre del agente.
   * @param contrasenya_agent - Contraseña del agente.
   * @returns Los datos del agente si el login es exitoso.
   * @throws Error si el login falla o hay un error de red.
   */
  static async login(
    nom_agent: string,
    contrasenya_agent: string
  ): Promise<LoginResponse> {
    const payload: LoginPayload = { nom_agent, contrasenya_agent };
    console.log(`AuthService: Intentando login para ${nom_agent}`);
    try {
      // El endpoint FastAPI es /auth/login, así que construimos la URL completa
      const response = await apiClient.post<LoginResponse>(
        `${this.AUTH_ENDPOINT}/login`,
        payload
      );
      console.log("AuthService: Respuesta de login", response);
      return response;
    } catch (error: any) {
      console.error("AuthService: Error en login()", error);
      // Propagar el error para que sea manejado por la lógica de la action en Remix
      // Puedes personalizar el mensaje de error si el apiClient devuelve una estructura específica
      if (error.response && error.response.data && error.response.data.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error("Error de comunicación con el servidor de autenticación.");
    }
  }
}