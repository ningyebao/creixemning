// Definición de tipos para filtros guardados y reglas de automatización
// Guardar en ~/lib/types/automation.ts

export interface FilterTemplate {
    id: number;
    name: string;
    description: string;
    filters: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    createdBy: number; // ID del usuario que creó la plantilla
  }
  
  export interface AssignmentRule {
    id: number;
    name: string;
    description: string;
    filterTemplateId: number; // Referencia a una plantilla de filtros
    agentIds: number[]; // Agentes a los que se asignarán los leads
    campanyaIds: number[]; // Campañas asociadas con esta regla
    distribucion: 'equitativo' | 'todos'; // Método de distribución
    prioritat: number; // 1-5
    potencial: number; // 1-5
    observaciones: string;
    isActive: boolean; // Si la regla está activa o no
    schedule: ScheduleConfig | null; // Configuración de programación (null para manual)
    createdAt: string;
    updatedAt: string;
    createdBy: number; // ID del usuario que creó la regla
  }
  
  export interface ScheduleConfig {
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    daysOfWeek?: number[]; // 0-6, para frecuencia semanal
    daysOfMonth?: number[]; // 1-31, para frecuencia mensual
    time: string; // Hora del día en formato '00:00'
    timeZone: string;
    nextRun: string; // Próxima ejecución programada
    lastRun: string | null; // Última ejecución
  }
  
  export interface AutomationExecutionLog {
    id: number;
    ruleId: number;
    executionTime: string;
    leadsProcessed: number;
    leadsAssigned: number;
    errors: string[];
    details: string;
  }