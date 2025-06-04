// app/lib/types.ts

export interface Agent {
  id_agent: number;
  nom_agent: string;
  contrasenya_agent: string;
  data_alta_agent: string;
  data_baixa_agent?: string | null;
  data_creacio_agent: string;
  cognom1_agent: string;
  cognom2_agent?: string;
  adreça_agent?: string;
  codi_postal_agent?: string;
  poblacio_agent?: string;
  telefon_agent?: string;
  mobil_agent?: string;
  NIF_agent?: string;
  seguretat_social_agent?: string;
  compte_corrent_agent?: string;
  Agents_nom_firma?: string;
  observacions_agent?: string;
}


export interface Client {
  id_client: number;
  nom_client: string;
  telefon1_client: {
    numero: string;
    tipo: string;
  };
  telefon2_client?: {
    numero: string;
    tipo: string;
  };
  actiu_client: boolean;
  especial_client: boolean;
  data_creacio_client: string;
  observacions_client?: string;
  prioridad: 'Baja' | 'Media' | 'Alta';
}


export interface Campanya {
  id_campanya: number;
  id_client: number;
  campanya_nom: string;
  campanya_num_altes_acordades: number;
  data_creacio_campanya: string;
  data_inici_campanya: string;
  data_fi_campanya: string;
  activa_campanya: boolean;
  objectiu_campanya?: string;
  objectiu_assolit_campanya: boolean;
  observacions_campanya?: string;
}

/**
 * Representa un producto en el sistema
 */
export interface Producte {
  id_producte: number;
  id_client: number;
  nom_producte: string;
  preu_producte: number;
  descripcio_producte?: string;
  sector_producte?: string;
  significatiu_producte?: string;
  enquesta_producte?: string;
  actiu_producte: boolean;
  datacreacio_producte: string;
  databaixa_producte?: string;
}

/**
 * Representa un lead (cliente potencial) en el sistema
 */
export interface Lead {
  id_lead: number; // Cambiado de id: number para coincidir con el modelo de la base de datos
  nom_lead: string;
  adreca_lead?: string;
  codi_postal_lead?: string;
  poblacio_lead?: string;
  comarca_lead?: string;
  provincia_lead?: string;
  NIF_lead?: string;
  email_lead?: string;
  nom_basic_lead?: string;
  nom_empresarial_lead?: string;
  nom_fiscal_lead?: string;
  activitat_lead?: string;
  creador_lead?: string;
  actiu_lead?: boolean;
  mida_lead?: number;
  observacions_lead?: string;
  cnae_lead?: string;
  fecha_registro?: string;
  any_creacio_lead?: string;
  nombre_treballadors_lead?: number;
  capital_social_lead?: number;
  cotitza_borsa_lead?: boolean;
  nomes_temporada_lead?: boolean;
  conciencia_ecologica_lead?: boolean;
  solidaria_social_lead?: boolean;
  importa_exporta_lead?: string;
  link_web_lead?: string;
  xarxe_social_lead?: string;
  idioma_preferent_lead?: string;
  agent_id?: number;
}

/**
 * Representa una asignación de leads a agentes
 */
export interface Assignacio {
  id_fitxes_asignacions: number;
  id_agents: number;
  id_leads: number;
  id_autor: number;
  id_campanya_leads: number;
  estat_fitxes_assignacions: "Pendiente" | "En progreso" | "Completada" | "Cancelada";
  potencial_fitxes_assignacions: number;
  prioritat_fitxes_assignacions: number;
  obsevacions_fitxes_assignacions?: string;
  data_creacio_fitxes_assignacions: string;
  id_fitxes_trucades_fitxes_asignacions: number;
}

// -----------------------------------------------------------------
// INTERFACES DE FILTROS
// -----------------------------------------------------------------

/**
 * Filtros para consultar leads
 */
export interface LeadFilters {
  provincia_lead?: string;
  poblacio_lead?: string;
  comarca_lead?: string;
  cnae_lead?: string;
  mida_lead?: number;
  actiu_lead?: boolean | number;
  any_creacio_lead?: string;
  nombre_treballadors_lead_min?: number;
  nombre_treballadors_lead_max?: number;
  idioma_preferent_lead?: string;
  cotitza_borsa_lead?: boolean;
  nomes_temporada_lead?: boolean;
  capital_social_lead_min?: number;
  capital_social_lead_max?: number;
  conciencia_ecologica_lead?: boolean;
  solidaria_social_lead?: boolean;
  importa_exporta_lead?: string;
  email_lead?: string;
  adreca_lead?: string;
  codi_postal_lead?: string;
  NIF_lead?: string;
  nom_basic_lead?: string;
  nom_fiscal_lead?: string;
  creador_lead?: string;
  data_registre_lead?: string;
  observacions_lead?: string;
  xarxe_social_lead?: string;
  activitat_lead?: string;
}

/**
 * Filtros para consultar asignaciones
 */
export interface AssignacioFilters {
  id_agents?: number | number[];
  id_leads?: number;
  id_campanya_leads?: number;
  id_autor?: number;
  estat_fitxes_assignacions?: string | string[];
  prioritat_fitxes_assignacions?: number | number[];
  potencial_min?: number;
  potencial_max?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
}

// -----------------------------------------------------------------
// TIPOS Y ENUMERADOS
// -----------------------------------------------------------------

/**
 * Estados posibles para un lead
 */
export enum LeadStatus {
  PENDIENTE = "Pendiente",
  EN_PROGRESO = "En progreso",
  COMPLETADA = "Completada",
  CANCELADA = "Cancelada"
}

/**
 * Tamaños posibles para un lead (empresa)
 */
export enum LeadSize {
  MICROEMPRESA = 1,
  PEQUEÑA = 2,
  MEDIANA = 3,
  GRANDE = 4
}

// -----------------------------------------------------------------
// FUNCIONES UTILITARIAS
// -----------------------------------------------------------------

/**
 * Formatea el tamaño de un lead para su visualización
 * @param mida - Valor numérico del tamaño del lead
 * @returns Descripción textual del tamaño
 */
export const formatMidaLead = (mida?: number): string => {
  switch (mida) {
    case LeadSize.MICROEMPRESA:
      return "Microempresa";
    case LeadSize.PEQUEÑA:
      return "Pequeña";
    case LeadSize.MEDIANA:
      return "Mediana";
    case LeadSize.GRANDE:
      return "Grande";
    default:
      return "Sin definir";
  }
};

/**
 * Valida si un objeto cumple con la estructura de un Lead
 * @param obj - Objeto a validar
 * @returns true si el objeto es un Lead válido
 */
export const isValidLead = (obj: any): obj is Lead => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id_lead === 'number' &&
    typeof obj.nom_lead === 'string'
  );
};

/**
 * Crea un objeto Lead con valores por defecto
 * @returns Un objeto Lead con valores predeterminados
 */
export const createEmptyLead = (): Lead => ({
  id_lead: 0,
  nom_lead: '',
  actiu_lead: true,
  fecha_registro: new Date().toISOString()
});

// -----------------------------------------------------------------
// CONSTANTES
// -----------------------------------------------------------------

/**
 * Valores predeterminados para crear un nuevo Lead
 */
export const DEFAULT_LEAD_VALUES: Partial<Lead> = {
  actiu_lead: true,
  mida_lead: LeadSize.PEQUEÑA,
  conciencia_ecologica_lead: false,
  solidaria_social_lead: false,
  cotitza_borsa_lead: false,
  nomes_temporada_lead: false
};

/**
 * Valores posibles para el estado de una asignación
 */
export const ASSIGNMENT_STATUSES = [
  "Pendiente",
  "En progreso",
  "Completada",
  "Cancelada"
];

// -----------------------------------------------------------------
// INTERFACES PARA GRUPOS DE FILTROS (FilterGroup)
// -----------------------------------------------------------------

/**
 * Define la estructura base para la creación de un grupo de filtros.
 * Corresponde a `FilterGroupBase` y `FilterGroupCreate` en Pydantic.
 */
export interface FilterGroupCreatePayload {
  name: string;
  description?: string | null;
  filters: LeadFilters;
}

/**
 * Define la estructura para la actualización de un grupo de filtros.
 * Corresponde a `FilterGroupUpdate` en Pydantic.
 */
export interface FilterGroupUpdatePayload {
  name?: string;
  description?: string | null;
  filters?: LeadFilters;
}

/**
 * Representa un grupo de filtros en el sistema, tal como se almacena en la base de datos.
 * Corresponde al modelo SQLAlchemy `FilterGroup` y Pydantic `FilterGroupInDB`.
 */
export interface FilterGroup {
  id: number;
  name: string;
  description?: string | null;
  filters: LeadFilters;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}