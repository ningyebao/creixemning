// app/lib/types/index.ts

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


// Client type definition
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

// Campaña type definition
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

// Producto type definition
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

export interface Lead {
  id_lead: number;
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
  data_registre_lead?: string;
  actiu_lead?: boolean;
  mida_lead?: number;
  observacions_lead?: string;
  cnae_lead?: string;
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
export interface FilterGroup {
  id: number;
  name: string;
  description: string;
  filters: Record<string, any>; // Los filtros tal cual se aplican en el loader
  autoAssignConfig?: {
    agentIds: number[];
    campanyaIds: number[];
    distribucion: 'equitativo' | 'todos';
    prioritat: number;
    potencial: number;
    observaciones: string;
    isActive: boolean;
    schedule?: {
      frequency: 'daily' | 'weekly' | 'monthly';
      dayOfWeek?: number; // Para frecuencia semanal (0-6, donde 0 es domingo)
      dayOfMonth?: number; // Para frecuencia mensual (1-31)
      time: string; // Formato "HH:MM"
      lastRun: string | null;
      nextRun: string | null;
    };
  };
  createdAt: string;
  updatedAt: string;
  createdBy: number; // ID del usuario que creó el grupo
}
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
}
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

export const formatMidaLead = (mida?: number): string => {
  switch (mida) {
    case 1:
      return "Microempresa";
    case 2:
      return "Pequeña";
    case 3:
      return "Mediana";
    case 4:
      return "Grande";
    default:
      return "Sin definir";
  }
};