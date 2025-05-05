// ~/routes/api.automation.webhook.tsx
import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { AutomatedTaskService } from "~/lib/automation/taskService";

/**
 * Endpoint para ejecutar tareas programadas
 * Este endpoint debe ser llamado por un servicio de cron externo
 * Se debe proteger con un token de seguridad
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    // Verificar el método de la solicitud
    if (request.method !== "POST") {
      return json({ success: false, message: "Método no permitido" }, { status: 405 });
    }
    
    // Verificar el token de seguridad
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json({ success: false, message: "No autorizado" }, { status: 401 });
    }
    
    const token = authHeader.split(" ")[1];
    // Comparar con el token almacenado en las variables de entorno
    // Idealmente, este token debería ser un valor largo y aleatorio
    const validToken = process.env.AUTOMATION_WEBHOOK_TOKEN;
    
    if (!validToken || token !== validToken) {
      return json({ success: false, message: "Token inválido" }, { status: 403 });
    }
    
    // Obtener el tipo de ejecución (opcional)
    const data = await request.json().catch(() => ({}));
    const taskType = data.type || "scheduled";
    
    let results;
    
    // Ejecutar las tareas según el tipo
    switch (taskType) {
      case "scheduled":
        // Ejecutar todas las tareas programadas
        results = await AutomatedTaskService.executeScheduledTasks();
        break;
        
      case "rule":
        // Ejecutar una regla específica
        if (!data.ruleId) {
          return json({ 
            success: false, 
            message: "Se requiere ruleId para ejecutar una regla específica" 
          }, { status: 400 });
        }
        
        const executionLog = await AutomatedTaskService.executeRule(data.ruleId);
        results = [executionLog];
        break;
        
      default:
        return json({ 
          success: false, 
          message: `Tipo de tarea no reconocido: ${taskType}` 
        }, { status: 400 });
    }
    
    // Devolver los resultados
    return json({
      success: true,
      timestamp: new Date().toISOString(),
      executionCount: results.length,
      results: results.map(log => ({
        ruleId: log.ruleId,
        executionTime: log.executionTime,
        leadsProcessed: log.leadsProcessed,
        leadsAssigned: log.leadsAssigned,
        hasErrors: log.errors.length > 0,
        errorCount: log.errors.length
      }))
    });
  } catch (error) {
    console.error("Error al ejecutar el webhook de automatización:", error);
    
    return json({
      success: false,
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : "Error desconocido",
      error: error instanceof Error ? error.toString() : String(error)
    }, { status: 500 });
  }
};

// Método para verificar que el servicio está activo
export const loader = async ({ request }: { request: Request }) => {
  // Obtener la hora actual
  const now = new Date();
  
  return json({
    status: "active",
    timestamp: now.toISOString(),
    message: "El servicio de automatización está activo",
    note: "Para ejecutar tareas, envía una solicitud POST con autenticación"
  });
};