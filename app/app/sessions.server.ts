// app/sessions.server.ts
import { createCookieSessionStorage, Session } from "@remix-run/node";

/**
 * 1. Se exige la variable de entorno –en producción nunca debe haber un valor por defecto.
 * 2. Para desarrollo se permite un fallback, pero avisa claramente si falta.
 */
const sessionSecret =
  process.env.SESSION_SECRET ?? "⚠️  insecure_dev_secret_change_me";

if (!sessionSecret) {
  throw new Error(
    "SESSION_SECRET debe estar definido — añade SESSION_SECRET al .env"
  );
}

/**
 * Configuración del cookie-session-storage.
 */
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",          // Nombre de la cookie
    httpOnly: true,             // No accesible vía document.cookie
    path: "/",                  // Disponible en toda la app
    sameSite: "lax",            // CSRF básico
    secrets: [sessionSecret],   // Firmado
    secure: process.env.NODE_ENV === "production", // Solo HTTPS en prod
    maxAge: 60 * 60 * 24 * 30,  // 30 días
  },
});

/**
 * API de sesión típica — Remix nos devuelve helpers listos.
 */
export const {
  getSession,     // Lee la cookie y la deserializa
  commitSession,  // Serializa y firma para Set-Cookie
  destroySession, // Borra la cookie
} = sessionStorage;

/* ------------------------------------------------------------------------- */
/*  Helpers específicos para mensajes flash                                  */
/* ------------------------------------------------------------------------- */

/**
 * Añade un mensaje flash del tipo indicado.
 *
 * @example
 *   const session = await getSession(request.headers.get("cookie"));
 *   flash(session, "success", "Agente creado (42) exitosamente");
 *   return redirect("/agents", {
 *     headers: { "Set-Cookie": await commitSession(session) },
 *   });
 */
export function flash(
  session: Session,
  type: "success" | "error" | "info",
  message: string
) {
  session.flash(type, message);
}

/**
 * Recupera y elimina un mensaje flash (si existe).
 *
 * @example
 *   const session = await getSession(request.headers.get("cookie"));
 *   const successMsg = popFlash<string>(session, "success");
 */
export function popFlash<T = string>(session: Session, type: string): T | null {
  const data = session.get(type) as T | undefined;
  // Al usar `get`, Remix borrará la clave cuando hagamos commitSession
  return data ?? null;
}
