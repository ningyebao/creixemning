// ~/lib/automation/taskService.ts
import type { AssignmentRule, ScheduleConfig, AutomationExecutionLog } from "~/lib/types/automation";
import { AssignmentRuleService } from "~/services/assignmentRule.service";
import { AutomationSchedulerService } from "~/services/automationScheduler.service";
import { FilterTemplateService } from "~/services/filterTemplate.service";
import { LeadService } from "~/services/leads.service";
import { AssignacioService } from "~/services/assignacio.service";

/**
 * Servicio para gestionar las tareas automatizadas del sistema
 * Este servicio debe ser ejecutado por un cron job o similar
 */
export class AutomatedTaskService {

  /**
   * Ejecuta todas las reglas programadas que deban ejecutarse ahora
   * @returns Registro de las ejecuciones realizadas
   */
  static async executeScheduledTasks(): Promise<AutomationExecutionLog[]> {
    try {
      // Obtener todas las ejecuciones pendientes
      const pendingExecutions = await AutomationSchedulerService.getPendingExecutions();
      const currentTime = new Date();
      const results: AutomationExecutionLog[] = [];
      
      // Filtrar las ejecuciones que deben ejecutarse ahora
      const tasksToExecute = pendingExecutions.filter(task => {
        const scheduledTime = new Date(task.nextRun);
        return scheduledTime <= currentTime;
      });
      
      // Ejecutar cada tarea
      for (const task of tasksToExecute) {
        try {
          const executionLog = await this.executeRule(task.ruleId);
          results.push(executionLog);
          
          // Actualizar la próxima ejecución de la regla
          const rule = await AssignmentRuleService.getById(task.ruleId);
          if (rule.schedule) {
            const nextRunTime = this.calculateNextRun(rule.schedule);
            await AutomationSchedulerService.updateSchedule(rule.id, {
              ...rule.schedule,
              nextRun: nextRunTime.toISOString(),
              lastRun: new Date().toISOString()
            });
          }
        } catch (error) {
          console.error(`Error al ejecutar la regla ${task.ruleId}:`, error);
          // Registrar un log de error
          const errorMessage = error instanceof Error ? error.message : String(error);
          results.push({
            id: 0, // Será asignado por la base de datos
            ruleId: task.ruleId,
            executionTime: new Date().toISOString(),
            leadsProcessed: 0,
            leadsAssigned: 0,
            errors: [errorMessage],
            details: JSON.stringify({ error: errorMessage })
          });
        }
      }
      
      return results;
    } catch (error) {
      console.error("Error al ejecutar tareas programadas:", error);
      throw error;
    }
  }
  
  /**
   * Ejecuta una regla de asignación específica
   * @param ruleId ID de la regla a ejecutar
   * @returns Log de la ejecución
   */
  static async executeRule(ruleId: number): Promise<AutomationExecutionLog> {
    try {
      // Obtener la regla
      const rule = await AssignmentRuleService.getById(ruleId);
      if (!rule.isActive) {
        throw new Error(`La regla ${ruleId} está inactiva`);
      }
      
      // Obtener la plantilla de filtros asociada
      const template = await FilterTemplateService.getById(rule.filterTemplateId);
      
      // Obtener los leads que cumplen con los filtros
      const leads = await LeadService.getUnassigned(0, 1000, template.filters);
      
      // Si no hay leads, no hacer nada
      if (leads.length === 0) {
        return {
          id: 0, // Será asignado por la base de datos
          ruleId,
          executionTime: new Date().toISOString(),
          leadsProcessed: 0,
          leadsAssigned: 0,
          errors: [],
          details: JSON.stringify({ message: "No se encontraron leads para asignar" })
        };
      }
      
      // Preparar los IDs de leads
      const leadIds = leads.map(lead => lead.id_lead);
      
      // Variables para el seguimiento de resultados
      let totalSuccess = 0;
      let totalError = 0;
      const errors: string[] = [];
      
      // Ejecutar la asignación para cada campaña
      for (const campanyaId of rule.campanyaIds) {
        try {
          let result;
          if (rule.distribucion === "equitativo") {
            // Asignación equitativa (round-robin)
            result = await AssignacioService.bulkAssign(
              rule.agentIds,
              leadIds,
              rule.prioritat,
              rule.potencial,
              rule.observaciones,
              campanyaId
            );
          } else {
            // Todos los leads a todos los agentes
            result = await AssignacioService.bulkAssignAll(
              rule.agentIds,
              leadIds,
              rule.prioritat,
              rule.potencial,
              rule.observaciones,
              campanyaId
            );
          }
          
          // Actualizar contadores
          totalSuccess += result.success;
          totalError += result.error;
          
          // Registrar errores específicos si los hay
          if (result.error > 0 && result.errorDetails) {
            errors.push(`Campaña ${campanyaId}: ${result.errorDetails}`);
          }
        } catch (error) {
          totalError += leadIds.length;
          const errorMessage = error instanceof Error ? error.message : String(error);
          errors.push(`Error en campaña ${campanyaId}: ${errorMessage}`);
        }
      }
      
      // Crear el log de ejecución
      const executionLog: AutomationExecutionLog = {
        id: 0, // Será asignado por la base de datos
        ruleId,
        executionTime: new Date().toISOString(),
        leadsProcessed: leadIds.length,
        leadsAssigned: totalSuccess,
        errors,
        details: JSON.stringify({
          leadCount: leadIds.length,
          campaigns: rule.campanyaIds,
          agents: rule.agentIds,
          success: totalSuccess,
          error: totalError
        })
      };
      
      // Guardar el log de ejecución en la base de datos
      // Asumimos que este método existe en el servicio de reglas
      await AssignmentRuleService.saveExecutionLog(executionLog);
      
      return executionLog;
    } catch (error) {
      console.error(`Error al ejecutar la regla ${ruleId}:`, error);
      throw error;
    }
  }
  
  /**
   * Calcula la próxima fecha de ejecución basada en la configuración
   * @param schedule Configuración de programación
   * @returns Fecha de la próxima ejecución
   */   
  static calculateNextRun(schedule: ScheduleConfig): Date {
    const now = new Date();
    const [hours, minutes] = schedule.time.split(':').map(Number);
    let nextRun = new Date();
    
    // Establecer hora y minutos
    nextRun.setHours(hours, minutes, 0, 0);
    
    // Si la hora ya pasó hoy, programar para mañana
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
    
    switch (schedule.frequency) {
      case 'daily':
        // Ya está configurado para el día siguiente
        break;
        
      case 'weekly':
        if (!schedule.daysOfWeek || schedule.daysOfWeek.length === 0) {
          throw new Error('La configuración semanal debe especificar días de la semana');
        }
        
        // Encontrar el próximo día de la semana programado
        // En JavaScript: 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
        const currentDay = nextRun.getDay(); // 0-6
        let daysToAdd = 0;
        let found = false;
        
        // Buscar el próximo día programado
        for (let i = 1; i <= 7; i++) {
          const checkDay = (currentDay + i) % 7;
          if (schedule.daysOfWeek.includes(checkDay)) {
            daysToAdd = i;
            found = true;
            break;
          }
        }
        
        if (!found) {
          throw new Error('No se encontró un día válido en la configuración semanal');
        }
        
        nextRun.setDate(now.getDate() + daysToAdd);
        break;
        
      case 'monthly':
        if (!schedule.daysOfMonth || schedule.daysOfMonth.length === 0) {
          throw new Error('La configuración mensual debe especificar días del mes');
        }
        
        // Ordenar los días del mes
        const sortedDays = [...schedule.daysOfMonth].sort((a, b) => a - b);
        const currentDate = now.getDate();
        
        // Buscar el próximo día en el mes actual
        const nextDayThisMonth = sortedDays.find(day => day > currentDate);
        
        if (nextDayThisMonth) {
          // Hay un día programado este mes
          nextRun.setDate(nextDayThisMonth);
        } else {
          // Pasar al próximo mes y usar el primer día programado
          nextRun.setMonth(nextRun.getMonth() + 1);
          nextRun.setDate(sortedDays[0]);
        }
        break;
        
      default:
        throw new Error(`Frecuencia no soportada: ${schedule.frequency}`);
    }
    
    return nextRun;
  }
}