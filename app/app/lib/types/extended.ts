// app/lib/types/extended.ts
import type { LeadFilters } from "./index";

/**
 * Extensión de LeadFilters para incluir campos adicionales que no están en la API
 * pero que necesitamos para nuestro sistema de filtrado en la UI
 */
export interface ExtendedLeadFilters extends Omit<LeadFilters, 'actiu_lead'> {
  actiu_lead?: boolean | number; // Permitimos number para compatibilidad con formularios
  activitat_lead?: string;       // Añadimos activitat_lead que no está en la API original
}