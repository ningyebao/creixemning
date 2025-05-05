import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData, Form, useSubmit, useNavigation, Link, useSearchParams } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { LeadService } from "~/services/leads.service";
import { AgentService } from "~/services/agents.service";
import { CampanyaService } from "~/services/campanya.service";
import { AssignacioService } from "~/services/assignacio.service";
import { FilterGroupService } from "~/services/filter-group.service";
import type { Agent, Campanya, Lead } from "~/lib/types";
import { formatMidaLead } from "~/lib/types";
import { handleApiError } from "~/lib/api/client";
import CNAESelect, { CNAEOption } from "~/components/CNAESelect";

// Interfaces para tipar los datos del loader y action
interface LoaderData {
  provincias: string[];
  poblaciones: string[];
  comarcas: string[];
  agents: Agent[];
  campanyas: Campanya[];
  filteredLeads: Lead[];
  hasFilters: boolean;
  currentFilters: Record<string, any>;
}

interface ActionData {
  success: boolean;
  results?: Array<{
    campanyaId: number;
    success: number;
    error: number;
  }>;
  totalSuccess?: number;
  totalError?: number;
  message?: string;
  error?: string;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    
    // Obtener todos los filtros con valores por defecto seguros
    const filters: Record<string, any> = {
      provincia_lead: url.searchParams.get("provincia_lead") || "",
      poblacio_lead: url.searchParams.get("poblacio_lead") || "",
      comarca_lead: url.searchParams.get("comarca_lead") || "",
      cnae_lead: url.searchParams.get("cnae_lead") || "",
      email_lead: url.searchParams.get("email_lead") || "",
      mida_lead: 0,
      any_creacio_lead: url.searchParams.get("any_creacio_lead") || "",
      idioma_preferent_lead: url.searchParams.get("idioma_preferent_lead") || "",
      importa_exporta_lead: url.searchParams.get("importa_exporta_lead") || ""
    };
    
    // Parsear valores numéricos de forma segura
    if (url.searchParams.get("mida_lead")) {
      try {
        filters.mida_lead = parseInt(url.searchParams.get("mida_lead") || "0");
      } catch (e) {
        console.error("Error al parsear mida_lead:", e);
      }
    }
    
    // Parsear rangos numéricos
    const numericRanges = [
      "nombre_treballadors_lead_min",
      "nombre_treballadors_lead_max",
      "capital_social_lead_min",
      "capital_social_lead_max"
    ];
    
    numericRanges.forEach(param => {
      if (url.searchParams.get(param)) {
        try {
          filters[param] = parseInt(url.searchParams.get(param) || "0");
        } catch (e) {
          console.error(`Error al parsear ${param}:`, e);
        }
      }
    });
    
    // Manejar valores booleanos
    const booleanParams = [
      "actiu_lead",
      "cotitza_borsa_lead",
      "nomes_temporada_lead",
      "conciencia_ecologica_lead",
      "solidaria_social_lead"
    ];
    
    booleanParams.forEach(param => {
      const value = url.searchParams.get(param);
      if (value && value !== "Todos") {
        filters[param] = value === "true";
      }
    });
    
    // Limpiar filtros vacíos
    Object.keys(filters).forEach(key => {
      if (
        filters[key] === "" || 
        filters[key] === undefined || 
        filters[key] === null ||
        (filters[key] === 0 && key !== "mida_lead")
      ) {
        delete filters[key];
      }
    });
    
    console.log("Filtros aplicados en el loader:", filters);
    
    // Definir datos por defecto con tipos correctos
    let defaultData: LoaderData = {
      provincias: [],
      poblaciones: [],
      comarcas: [],
      agents: [],
      campanyas: [],
      filteredLeads: [],
      hasFilters: Object.keys(filters).length > 0,
      currentFilters: filters
    };
    
    // Usar Promise.allSettled para gestionar fallos independientes
    const [
      provinciasResult, 
      poblacionesResult, 
      comarcasResult, 
      agentsResult, 
      campanyasResult, 
      filteredLeadsResult
    ] = await Promise.allSettled([
      LeadService.getAllProvincias(),
      LeadService.getAllPoblaciones(),
      LeadService.getAllComarcas(),
      AgentService.getAll(),
      CampanyaService.getAll(),
      LeadService.getUnassigned(0, 500, filters)
    ]);
    
    // Extraer datos de forma segura
    if (provinciasResult.status === 'fulfilled') defaultData.provincias = provinciasResult.value;
    else console.error("Error obteniendo provincias:", provinciasResult.reason);
    
    if (poblacionesResult.status === 'fulfilled') defaultData.poblaciones = poblacionesResult.value;
    else console.error("Error obteniendo poblaciones:", poblacionesResult.reason);
    
    if (comarcasResult.status === 'fulfilled') defaultData.comarcas = comarcasResult.value;
    else console.error("Error obteniendo comarcas:", comarcasResult.reason);
    
    if (agentsResult.status === 'fulfilled') defaultData.agents = agentsResult.value;
    else console.error("Error obteniendo agentes:", agentsResult.reason);
    
    if (campanyasResult.status === 'fulfilled') defaultData.campanyas = campanyasResult.value;
    else console.error("Error obteniendo campañas:", campanyasResult.reason);
    
    if (filteredLeadsResult.status === 'fulfilled') defaultData.filteredLeads = filteredLeadsResult.value;
    else console.error("Error obteniendo leads filtrados:", filteredLeadsResult.reason);
    
    return json<LoaderData>(defaultData);
  } catch (error) {
    console.error("Error general en loader:", error);
    
    // Devolver datos vacíos pero bien tipados en caso de error
    return json<LoaderData>({
      provincias: [],
      poblaciones: [],
      comarcas: [],
      agents: [],
      campanyas: [],
      filteredLeads: [],
      hasFilters: false,
      currentFilters: {}
    });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const intent = formData.get("intent");
    
    console.log("Acción recibida:", intent);
    
    if (intent === "search") {
      const url = new URL(request.url);
      // Limpiar parámetros existentes
      url.searchParams.forEach((_, key) => url.searchParams.delete(key));
      
      // Procesar valores del formulario con validación
      formData.forEach((value, key) => {
        if (key.startsWith("filter_")) {
          const filterName = key.replace("filter_", "");
          const strValue = value ? value.toString() : "";
          
          // Solo añadir si el valor no está vacío y no es el valor por defecto
          if (
            strValue && 
            strValue !== "0" && 
            strValue !== "false" && 
            strValue !== "Todos"
          ) {
            url.searchParams.append(filterName, strValue);
          }
        }
      });
      
      // Añadir loadLeads=true siempre
      url.searchParams.append("loadLeads", "true");
      
      // Preservar otros parámetros importantes
      const currentUrl = new URL(request.url);
      const paramsToPreserve = ["autoAssign", "preselectedAgents", "preselectedCampanyas"];
      
      paramsToPreserve.forEach(param => {
        const value = currentUrl.searchParams.get(param);
        if (value) {
          url.searchParams.append(param, value);
        }
      });
      
      console.log("URL de redirección en action:", url.toString());
      return redirect(url.toString());
    } else if (intent === "assign") {
      try {
        // Validar y procesar IDs de agentes
        const agentIds = formData.getAll("agentIds").map(id => {
          const parsedId = parseInt(id.toString());
          if (isNaN(parsedId)) {
            throw new Error(`ID de agente inválido: ${id}`);
          }
          return parsedId;
        });
        
        // Validar y procesar IDs de leads
        const leadIds = formData.getAll("leadIds").map(id => {
          const parsedId = parseInt(id.toString());
          if (isNaN(parsedId)) {
            throw new Error(`ID de lead inválido: ${id}`);
          }
          return parsedId;
        });
        
        // Validar y procesar IDs de campañas
        const campanyaIds = formData.getAll("campanyaIds").map(id => {
          const parsedId = parseInt(id.toString());
          if (isNaN(parsedId)) {
            throw new Error(`ID de campaña inválido: ${id}`);
          }
          return parsedId;
        });
        
        // Validar existencia de datos requeridos
        if (agentIds.length === 0) {
          return json<ActionData>({ 
            success: false, 
            error: "Debes seleccionar al menos un agente"
          }, { status: 400 });
        }
        
        if (leadIds.length === 0) {
          return json<ActionData>({ 
            success: false, 
            error: "Debes seleccionar al menos un lead"
          }, { status: 400 });
        }
        
        if (campanyaIds.length === 0) {
          return json<ActionData>({ 
            success: false, 
            error: "Debes seleccionar al menos una campaña"
          }, { status: 400 });
        }
        
        // Obtener otros parámetros con valores por defecto
        const distribucion = formData.get("distribucion")?.toString() || "equitativo";
        const prioritat = parseInt(formData.get("prioritat")?.toString() || "3");
        const potencial = parseInt(formData.get("potencial")?.toString() || "3");
        const observaciones = formData.get("observaciones")?.toString() || "";
        
        // Procesar asignaciones con manejo de errores
        const results: Array<{ campanyaId: number; success: number; error: number }> = [];
        
        for (const campanyaId of campanyaIds) {
          try {
            let result;
            if (distribucion === "equitativo") {
              result = await AssignacioService.bulkAssign(
                agentIds,
                leadIds,
                prioritat,
                potencial,
                observaciones,
                campanyaId
              );
            } else {
              result = await AssignacioService.bulkAssignAll(
                agentIds,
                leadIds,
                prioritat,
                potencial,
                observaciones,
                campanyaId
              );
            }
            results.push({ campanyaId, ...result });
          } catch (error) {
            console.error(`Error en la asignación para campaña ${campanyaId}:`, error);
            results.push({ campanyaId, success: 0, error: leadIds.length });
          }
        }
        
        const totalSuccess = results.reduce((sum: number, r) => sum + r.success, 0);
        const totalError = results.reduce((sum: number, r) => sum + r.error, 0);
        
        return json<ActionData>({
          success: true,
          results,
          totalSuccess,
          totalError,
          message: `Se realizaron ${totalSuccess} asignaciones correctamente. Hubo ${totalError} errores.`
        });
      } catch (error) {
        console.error("Error en acción de asignación:", error);
        return json<ActionData>({ 
          success: false, 
          error: error instanceof Error ? error.message : "Error durante el proceso de asignación" 
        }, { status: 400 });
      }
    }
    
    return json<ActionData>({ success: false, error: "Acción no válida" }, { status: 400 });
  } catch (error) {
    console.error("Error general en action:", error);
    return json<ActionData>({ 
      success: false, 
      error: "Ha ocurrido un error inesperado" 
    }, { status: 500 });
  }
};

export default function BulkAssignmentPage() {
  const {
    provincias = [],
    poblaciones = [],
    comarcas = [],
    agents = [],
    campanyas = [],
    filteredLeads = [],
    hasFilters = false,
    currentFilters = {}
  } = useLoaderData<LoaderData>() || {};
  
  const actionData = useActionData<ActionData>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  
  const [activeTab, setActiveTab] = useState("filtrado");
  const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);
  
  // Estado para grupos de filtros
  const [filterGroups, setFilterGroups] = useState<any[]>([]);
  const [selectedFilterGroupId, setSelectedFilterGroupId] = useState<string>("");
  
  // Estados para el modo de asignación automática
  const [autoAssignMode, setAutoAssignMode] = useState(false);
  const [assignmentReady, setAssignmentReady] = useState(false);
  const [leadsLoaded, setLeadsLoaded] = useState(false);
  
  // Estados para el modal de guardar filtros
  const [showSaveFilterModal, setShowSaveFilterModal] = useState(false);
  const [filterGroupName, setFilterGroupName] = useState("");
  const [filterGroupDesc, setFilterGroupDesc] = useState("");
  const [saveFilterError, setSaveFilterError] = useState("");
  
  // Estados para preselección de agentes y campañas
  const [preselectedAgentIds, setPreselectedAgentIds] = useState<number[]>([]);
  const [preselectedCampanyaIds, setPreselectedCampanyaIds] = useState<number[]>([]);
  
  const isFirstLoad = useRef(true);
  
  // Estados para filtros individuales
  const [provinciaFilter, setProvinciaFilter] = useState<string>(currentFilters?.provincia_lead || "");
  const [poblacionFilter, setPoblacionFilter] = useState<string>(currentFilters?.poblacio_lead || "");
  const [comarcaFilter, setComarcaFilter] = useState<string>(currentFilters?.comarca_lead || "");
  const [cnaeFilter, setCnaeFilter] = useState<string>(currentFilters?.cnae_lead || "");
  const [midaFilter, setMidaFilter] = useState<number>(currentFilters?.mida_lead || 0);
  const [activoFilter, setActivoFilter] = useState<string>(
    currentFilters?.actiu_lead !== undefined
      ? (currentFilters?.actiu_lead ? "true" : "false")
      : "Todos"
  );
  const [yearFilter, setYearFilter] = useState<string>(currentFilters?.any_creacio_lead || "");
  const [workersMinFilter, setWorkersMinFilter] = useState<string>(
    currentFilters?.nombre_treballadors_lead_min?.toString() || ""
  );
  const [workersMaxFilter, setWorkersMaxFilter] = useState<string>(
    currentFilters?.nombre_treballadors_lead_max?.toString() || ""
  );
  const [capitalMinFilter, setCapitalMinFilter] = useState<string>(
    currentFilters?.capital_social_lead_min?.toString() || ""
  );
  const [capitalMaxFilter, setCapitalMaxFilter] = useState<string>(
    currentFilters?.capital_social_lead_max?.toString() || ""
  );
  const [idiomFilter, setIdiomFilter] = useState<string>(currentFilters?.idioma_preferent_lead || "");
  const [cotizaFilter, setCotizaFilter] = useState<string>(
    currentFilters?.cotitza_borsa_lead !== undefined
      ? (currentFilters?.cotitza_borsa_lead ? "true" : "false")
      : "Todos"
  );
  const [temporadaFilter, setTemporadaFilter] = useState<string>(
    currentFilters?.nomes_temporada_lead !== undefined
      ? (currentFilters?.nomes_temporada_lead ? "true" : "false")
      : "Todos"
  );
  const [ecologicaFilter, setEcologicaFilter] = useState<string>(
    currentFilters?.conciencia_ecologica_lead !== undefined
      ? (currentFilters?.conciencia_ecologica_lead ? "true" : "false")
      : "Todos"
  );
  const [solidariaFilter, setSolidariaFilter] = useState<string>(
    currentFilters?.solidaria_social_lead !== undefined
      ? (currentFilters?.solidaria_social_lead ? "true" : "false")
      : "Todos"
  );
  const [importaExportaFilter, setImportaExportaFilter] = useState<string>(
    currentFilters?.importa_exporta_lead || ""
  );
  const [emailFilter, setEmailFilter] = useState<string>(
    currentFilters?.email_lead || ""
  );
  
  // Detectar el modo de asignación automática
  useEffect(() => {
    const autoAssign = searchParams.get("autoAssign") === "true";
    if (autoAssign) {
      setAutoAssignMode(true);
    }
  }, [searchParams]);
  
  // Cargar grupos de filtros y verificar parámetros al montar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFilterGroups(FilterGroupService.getAll());
      
      // Verificar si hay un único grupo de filtros o múltiples
      const filterGroupId = searchParams.get("filterGroupId");
      const selectedFilterGroups = searchParams.get("selectedFilterGroups");
      
      if (filterGroupId) {
        // Modo antiguo: usar un solo grupo
        setSelectedFilterGroupId(filterGroupId);
        const group = FilterGroupService.getById(filterGroupId);
        if (group) {
          applyFilterGroup(group);
        }
      } else if (selectedFilterGroups) {
        // Modo nuevo: aplicar múltiples grupos combinados
        const groupIds = selectedFilterGroups.split(",");
        const groups = groupIds
          .map(id => FilterGroupService.getById(id))
          .filter(group => group !== undefined) as any[];
        
        if (groups.length > 0) {
          applyCombinedFilterGroups(groups);
        }
      }
      
      // Verificar si hay agentes preseleccionados
      const preselectedAgents = searchParams.get("preselectedAgents");
      if (preselectedAgents) {
        const agentIds = preselectedAgents.split(",").map(id => parseInt(id));
        setPreselectedAgentIds(agentIds);
      }
      
      // Verificar si hay campañas preseleccionadas
      const preselectedCampanyas = searchParams.get("preselectedCampanyas");
      if (preselectedCampanyas) {
        const campanyaIds = preselectedCampanyas.split(",").map(id => parseInt(id));
        setPreselectedCampanyaIds(campanyaIds);
      }
    }
  }, [searchParams]);
  
  // Aplicar un grupo de filtros
  // Función mejorada para aplicar un grupo de filtros
  const applyFilterGroup = (group: any) => {
    try {
      // Actualizar estados de filtros con validación
      setProvinciaFilter(group.filters.provincia_lead || "");
      setPoblacionFilter(group.filters.poblacio_lead || "");
      setComarcaFilter(group.filters.comarca_lead || "");
      setCnaeFilter(group.filters.cnae_lead || "");
      
      // Parseo seguro de valores numéricos
      setMidaFilter(group.filters.mida_lead ? parseInt(group.filters.mida_lead.toString()) : 0);
      
      // Manejo seguro de booleanos
      if (group.filters.actiu_lead !== undefined) {
        setActivoFilter(group.filters.actiu_lead.toString());
      } else {
        setActivoFilter("Todos");
      }
      
      setYearFilter(group.filters.any_creacio_lead || "");
      
      // Parseo seguro para rangos numéricos
      setWorkersMinFilter(group.filters.nombre_treballadors_lead_min?.toString() || "");
      setWorkersMaxFilter(group.filters.nombre_treballadors_lead_max?.toString() || "");
      setCapitalMinFilter(group.filters.capital_social_lead_min?.toString() || "");
      setCapitalMaxFilter(group.filters.capital_social_lead_max?.toString() || "");
      
      setIdiomFilter(group.filters.idioma_preferent_lead || "");
      
      // Manejo seguro de booleanos
      if (group.filters.cotitza_borsa_lead !== undefined) {
        setCotizaFilter(group.filters.cotitza_borsa_lead.toString());
      } else {
        setCotizaFilter("Todos");
      }
      
      if (group.filters.nomes_temporada_lead !== undefined) {
        setTemporadaFilter(group.filters.nomes_temporada_lead.toString());
      } else {
        setTemporadaFilter("Todos");
      }
      
      if (group.filters.conciencia_ecologica_lead !== undefined) {
        setEcologicaFilter(group.filters.conciencia_ecologica_lead.toString());
      } else {
        setEcologicaFilter("Todos");
      }
      
      if (group.filters.solidaria_social_lead !== undefined) {
        setSolidariaFilter(group.filters.solidaria_social_lead.toString());
      } else {
        setSolidariaFilter("Todos");
      }
      
      setImportaExportaFilter(group.filters.importa_exporta_lead || "");
      setEmailFilter(group.filters.email_lead || "");
      
      // Preparar el FormData con validación
      const formData = new FormData();
      formData.append("intent", "search");
      
      // Agregar todos los filtros al FormData con el prefijo filter_
      Object.entries(group.filters).forEach(([key, value]) => {
        // Solo añadir valores válidos
        if (value !== undefined && value !== null) {
          formData.append(`filter_${key}`, value.toString());
        }
      });
      
      // Enviar el formulario con try/catch
      try {
        submit(formData, { method: "post" });
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    } catch (error) {
      console.error("Error al aplicar grupo de filtros:", error);
    }
  };
  
  // Función para combinar múltiples grupos de filtros
  const applyCombinedFilterGroups = (groups: any[]) => {
    // Objeto para almacenar los filtros combinados
    const combinedFilters: Record<string, any> = {};
    
    // Para cada grupo de filtros
    groups.forEach(group => {
      // Combinar los filtros del grupo actual
      Object.entries(group.filters).forEach(([key, value]) => {
        // Si el filtro ya existe, aplicamos lógica de combinación
        if (combinedFilters.hasOwnProperty(key)) {
          // Para filtros de texto, si son diferentes, usamos una estrategia de OR
          if (typeof value === 'string' && typeof combinedFilters[key] === 'string') {
            if (value !== combinedFilters[key]) {
              // Si son provincias/poblaciones diferentes, no hacemos nada (incompatible)
              if (key === 'provincia_lead' || key === 'poblacio_lead' || key === 'comarca_lead') {
                // No hacemos nada, mantenemos el valor original
              } 
              // Para CNAE, podríamos fusionar o mantener el más específico
              else if (key === 'cnae_lead') {
                // Mantener el valor original
              }
              // Para otros filtros de texto, mantenemos el valor original
              else {
                // No hacemos nada, mantenemos el valor original
              }
            }
          } 
          // Para valores booleanos, usamos OR lógico (true tiene precedencia)
          else if (typeof value === 'boolean' && typeof combinedFilters[key] === 'boolean') {
            combinedFilters[key] = combinedFilters[key] || value;
          }
          // Para valores numéricos, depende del tipo de filtro
          else if (typeof value === 'number' && typeof combinedFilters[key] === 'number') {
            // Para filtros de mínimo, tomamos el valor más pequeño
            if (key.includes('_min')) {
              combinedFilters[key] = Math.min(combinedFilters[key], value);
            }
            // Para filtros de máximo, tomamos el valor más grande
            else if (key.includes('_max')) {
              combinedFilters[key] = Math.max(combinedFilters[key], value);
            }
            // Para tamaño, prioridad, etc., usamos el valor más grande
            else {
              combinedFilters[key] = Math.max(combinedFilters[key], value);
            }
          }
        } else {
          // Si el filtro no existe, simplemente lo añadimos
          combinedFilters[key] = value;
        }
      });
    });
    
    // Actualizar los estados de los filtros
    if (combinedFilters.provincia_lead !== undefined) 
      setProvinciaFilter(combinedFilters.provincia_lead);
    
    if (combinedFilters.poblacio_lead !== undefined) 
      setPoblacionFilter(combinedFilters.poblacio_lead);
    
    if (combinedFilters.comarca_lead !== undefined) 
      setComarcaFilter(combinedFilters.comarca_lead);
    
    if (combinedFilters.cnae_lead !== undefined) 
      setCnaeFilter(combinedFilters.cnae_lead);
    
    if (combinedFilters.mida_lead !== undefined) 
      setMidaFilter(combinedFilters.mida_lead);
    
    if (combinedFilters.actiu_lead !== undefined)
      setActivoFilter(combinedFilters.actiu_lead.toString());
    else
      setActivoFilter("Todos");
    
    if (combinedFilters.any_creacio_lead !== undefined) 
      setYearFilter(combinedFilters.any_creacio_lead);
      
    if (combinedFilters.nombre_treballadors_lead_min !== undefined)
      setWorkersMinFilter(combinedFilters.nombre_treballadors_lead_min.toString());
      
    if (combinedFilters.nombre_treballadors_lead_max !== undefined)
      setWorkersMaxFilter(combinedFilters.nombre_treballadors_lead_max.toString());
      
    if (combinedFilters.capital_social_lead_min !== undefined)
      setCapitalMinFilter(combinedFilters.capital_social_lead_min.toString());
      
    if (combinedFilters.capital_social_lead_max !== undefined)
      setCapitalMaxFilter(combinedFilters.capital_social_lead_max.toString());
      
    if (combinedFilters.idioma_preferent_lead !== undefined)
      setIdiomFilter(combinedFilters.idioma_preferent_lead);
      
    if (combinedFilters.cotitza_borsa_lead !== undefined)
      setCotizaFilter(combinedFilters.cotitza_borsa_lead.toString());
    else
      setCotizaFilter("Todos");
      
    if (combinedFilters.nomes_temporada_lead !== undefined)
      setTemporadaFilter(combinedFilters.nomes_temporada_lead.toString());
    else
      setTemporadaFilter("Todos");
      
    if (combinedFilters.conciencia_ecologica_lead !== undefined)
      setEcologicaFilter(combinedFilters.conciencia_ecologica_lead.toString());
    else
      setEcologicaFilter("Todos");
      
    if (combinedFilters.solidaria_social_lead !== undefined)
      setSolidariaFilter(combinedFilters.solidaria_social_lead.toString());
    else
      setSolidariaFilter("Todos");
      
    if (combinedFilters.importa_exporta_lead !== undefined)
      setImportaExportaFilter(combinedFilters.importa_exporta_lead);
      
    if (combinedFilters.email_lead !== undefined)
      setEmailFilter(combinedFilters.email_lead);
    
    // Preparar FormData para enviar los filtros
    const formData = new FormData();
    formData.append("intent", "search");
    
    // Agregar todos los filtros combinados al FormData
    Object.entries(combinedFilters).forEach(([key, value]) => {
      formData.append(`filter_${key}`, value.toString());
    });
    
    // Enviar el formulario para aplicar los filtros
    submit(formData, { method: "post" });
    
    // Mostrar mensaje sobre la combinación de filtros (opcional)
    console.log("Filtros combinados aplicados:", combinedFilters);
  };

  useEffect(() => {
    if (isFirstLoad.current && filteredLeads.length > 0) {
      // Solo seleccionar automáticamente todos los leads si estamos en modo auto-asignación
      if (autoAssignMode) {
        setSelectedLeadIds(filteredLeads.map((lead: Lead) => lead.id_lead));
      } else {
        // En modo normal, no seleccionamos ningún lead automáticamente
        setSelectedLeadIds([]);
      }
      
      isFirstLoad.current = false;
      setLeadsLoaded(true);
    }
  }, [filteredLeads, autoAssignMode]);
  
  // Si hay preselecciones, automáticamente cambiamos a la pestaña de asignación si hay leads seleccionados
  useEffect(() => {
    // Si hay agentes o campañas preseleccionados y hay leads seleccionados, vamos a la pestaña de asignación
    if ((preselectedAgentIds.length > 0 || preselectedCampanyaIds.length > 0) && 
        selectedLeadIds.length > 0 && 
        activeTab === "filtrado") {
      setActiveTab("asignacion");
    }
  }, [selectedLeadIds, preselectedAgentIds, preselectedCampanyaIds, activeTab]);
  
  // Manejar la asignación automática cuando todo está listo
  useEffect(() => {
    // Verificar si estamos en modo auto-asignación y los leads están cargados
    if (autoAssignMode && leadsLoaded && selectedLeadIds.length > 0 && 
        (preselectedAgentIds.length > 0 || preselectedCampanyaIds.length > 0)) {
      
      // Cambiar a la pestaña de asignación
      setActiveTab("asignacion");
      
      // Indicar que estamos listos para asignar
      setAssignmentReady(true);
    }
  }, [autoAssignMode, leadsLoaded, selectedLeadIds, preselectedAgentIds, preselectedCampanyaIds]);
  
  // Realizar la asignación automática cuando esté todo listo
  useEffect(() => {
    if (assignmentReady && autoAssignMode) {
      // Pequeño retraso para permitir que la UI se actualice
      const timeoutId = setTimeout(() => {
        performAutoAssignment();
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [assignmentReady, autoAssignMode]);

  // Función para realizar la asignación automática
  const performAutoAssignment = () => {
    if (!assignmentReady || selectedLeadIds.length === 0 || 
       (preselectedAgentIds.length === 0 && preselectedCampanyaIds.length === 0)) {
      console.error("No se puede realizar la asignación automática: faltan datos");
      return;
    }
    
    // Construir el FormData para el envío
    const formData = new FormData();
    formData.append("intent", "assign");
    
    // Añadir leads seleccionados
    selectedLeadIds.forEach(id => {
      formData.append("leadIds", id.toString());
    });
    
    // Añadir agentes preseleccionados
    if (preselectedAgentIds.length > 0) {
      preselectedAgentIds.forEach(id => {
        formData.append("agentIds", id.toString());
      });
    } else {
      // Si no hay agentes preseleccionados, seleccionar el primero por defecto
      if (agents.length > 0) {
        formData.append("agentIds", agents[0].id_agent.toString());
      }
    }
    
    // Añadir campañas preseleccionadas
    if (preselectedCampanyaIds.length > 0) {
      preselectedCampanyaIds.forEach(id => {
        formData.append("campanyaIds", id.toString());
      });
    } else {
      // Si no hay campañas preseleccionadas, seleccionar la primera por defecto
      if (campanyas.length > 0) {
        formData.append("campanyaIds", campanyas[0].id_campanya.toString());
      }
    }
    
    // Añadir otros parámetros necesarios
    formData.append("distribucion", "equitativo");
    formData.append("prioritat", "3");
    formData.append("potencial", "3");
    formData.append("observaciones", "Asignación automática desde grupos de filtros");
    
    // Enviar el formulario
    submit(formData, { method: "post" });
    
    // Reiniciar el modo de asignación automática
    setAssignmentReady(false);
    setAutoAssignMode(false);
  };

  // Funciones para manejar la selección de leads
  const handleLeadSelection = (leadId: number, isSelected: boolean) => {
    setSelectedLeadIds(prev => {
      if (isSelected) {
        // Si el lead ya está seleccionado, no lo añadimos de nuevo
        if (prev.includes(leadId)) return prev;
        return [...prev, leadId];
      } else {
        // Si no está seleccionado, lo eliminamos
        return prev.filter(id => id !== leadId);
      }
    });
  };
  

  const selectAllLeads = () => setSelectedLeadIds(filteredLeads.map((lead: Lead) => lead.id_lead));
  const deselectAllLeads = () => setSelectedLeadIds([]);
  const toggleAllLeads = () => {
    const allLeadIds = filteredLeads.map((lead: Lead) => lead.id_lead);
    const newSelection = allLeadIds.filter((id: number) => !selectedLeadIds.includes(id));
    setSelectedLeadIds(newSelection.length > 0 ? newSelection : []);
  };

  // Función para guardar filtros
  const handleSaveFilterGroup = () => {
    if (!filterGroupName.trim()) {
      setSaveFilterError("El nombre es obligatorio");
      return;
    }

    // Construir el objeto de filtros a partir de los estados actuales
    const filtersToSave: Record<string, any> = {};
    
    if (provinciaFilter) filtersToSave.provincia_lead = provinciaFilter;
    if (poblacionFilter) filtersToSave.poblacio_lead = poblacionFilter;
    if (comarcaFilter) filtersToSave.comarca_lead = comarcaFilter;
    if (cnaeFilter) filtersToSave.cnae_lead = cnaeFilter;
    if (midaFilter > 0) filtersToSave.mida_lead = midaFilter;
    if (activoFilter !== "Todos") {
      filtersToSave.actiu_lead = activoFilter === "true";
    }
    if (yearFilter) filtersToSave.any_creacio_lead = yearFilter;
    if (workersMinFilter) filtersToSave.nombre_treballadors_lead_min = parseInt(workersMinFilter);
    if (workersMaxFilter) filtersToSave.nombre_treballadors_lead_max = parseInt(workersMaxFilter);
    if (capitalMinFilter) filtersToSave.capital_social_lead_min = parseInt(capitalMinFilter);
    if (capitalMaxFilter) filtersToSave.capital_social_lead_max = parseInt(capitalMaxFilter);
    if (idiomFilter) filtersToSave.idioma_preferent_lead = idiomFilter;
    if (cotizaFilter !== "Todos") {
      filtersToSave.cotitza_borsa_lead = cotizaFilter === "true";
    }
    if (temporadaFilter !== "Todos") {
      filtersToSave.nomes_temporada_lead = temporadaFilter === "true";
    }
    if (ecologicaFilter !== "Todos") {
      filtersToSave.conciencia_ecologica_lead = ecologicaFilter === "true";
    }
    if (solidariaFilter !== "Todos") {
      filtersToSave.solidaria_social_lead = solidariaFilter === "true";
    }
    if (importaExportaFilter) filtersToSave.importa_exporta_lead = importaExportaFilter;
    if (emailFilter) filtersToSave.email_lead = emailFilter;
    
    // Verificar que haya al menos un filtro
    if (Object.keys(filtersToSave).length === 0) {
      setSaveFilterError("No hay filtros para guardar");
      return;
    }
    
    try {
      // Guardar el grupo de filtros
      FilterGroupService.save({
        name: filterGroupName,
        description: filterGroupDesc,
        filters: filtersToSave
      });
      
      // Actualizar la lista de grupos
      setFilterGroups(FilterGroupService.getAll());
      
      // Limpiar y cerrar el modal
      setFilterGroupName("");
      setFilterGroupDesc("");
      setSaveFilterError("");
      setShowSaveFilterModal(false);
    } catch (error) {
      console.error("Error al guardar el grupo de filtros:", error);
      setSaveFilterError("Error al guardar el grupo de filtros");
    }
  };

  // Manejar el formulario de búsqueda
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    // Log de cada par clave-valor enviado
    for (let [key, value] of new FormData(form).entries()) {
      console.log("Campo enviado:", key, value);
    }
    submit(form, { method: "post" });
  };

  // Modal para guardar filtros
  const renderSaveFilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Guardar Filtros como Grupo</h3>
        
        {saveFilterError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {saveFilterError}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="filterGroupName">
              Nombre:
            </label>
            <input
              id="filterGroupName"
              type="text"
              className="w-full border rounded p-2"
              value={filterGroupName}
              onChange={(e) => setFilterGroupName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="filterGroupDesc">
              Descripción (opcional):
            </label>
            <textarea
              id="filterGroupDesc"
              className="w-full border rounded p-2"
              rows={3}
              value={filterGroupDesc}
              onChange={(e) => setFilterGroupDesc(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => {
              setShowSaveFilterModal(false);
              setFilterGroupName("");
              setFilterGroupDesc("");
              setSaveFilterError("");
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSaveFilterGroup}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizado de la pestaña de filtrado y selección
  const renderFilterTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Filtrado y Selección de Leads</h2>
      
      {/* Sección de selección de grupo de filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Grupos de Filtros</h3>
        <div className="flex space-x-4">
          <div className="flex-grow">
            <select
              className="w-full border rounded p-2"
              value={selectedFilterGroupId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedFilterGroupId(id);
                if (id) {
                  const group = FilterGroupService.getById(id);
                  if (group) {
                    applyFilterGroup(group);
                  }
                }
              }}
            >
              <option value="">Seleccionar grupo de filtros</option>
              {(filterGroups || []).map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
            </select>
          </div>
          <Link
            to="/filter-groups"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
          >
            Gestionar Grupos
          </Link>
        </div>
      </div>
      
      {/* Panel de filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Filtros</h3>
          <button
            type="button"
            onClick={() => setShowSaveFilterModal(true)}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center"
            disabled={!hasFilters}
          >
            <span className="mr-1">💾</span> Guardar estos filtros
          </button>
        </div>
        
        <Form method="post" onSubmit={handleSearch}>
          <input type="hidden" name="intent" value="search" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Primera columna */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Provincia:</label>
                <select 
                  name="filter_provincia_lead" 
                  className="w-full border rounded p-2"
                  value={provinciaFilter}
                  onChange={e => setProvinciaFilter(e.target.value)}
                >
                  <option value="">Todas</option>
                  {provincias.map((provincia: string) => (
                    <option key={provincia} value={provincia}>
                      {provincia}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Población:</label>
                <select 
                  name="filter_poblacio_lead" 
                  className="w-full border rounded p-2"
                  value={poblacionFilter}
                  onChange={e => setPoblacionFilter(e.target.value)}
                >
                  <option value="">Todas</option>
                  {poblaciones.map((poblacion: string) => (
                    <option key={poblacion} value={poblacion}>
                      {poblacion}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Comarca:</label>
                <select 
                  name="filter_comarca_lead" 
                  className="w-full border rounded p-2"
                  value={comarcaFilter}
                  onChange={e => setComarcaFilter(e.target.value)}
                >
                  <option value="">Todas</option>
                  {comarcas.map((comarca: string) => (
                    <option key={comarca} value={comarca}>
                      {comarca}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Año de creación:</label>
                <select 
                  name="filter_any_creacio_lead" 
                  className="w-full border rounded p-2"
                  value={yearFilter}
                  onChange={e => setYearFilter(e.target.value)}
                >
                  <option value="">Todos</option>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year: number) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Número de trabajadores:</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Mínimo:</label>
                    <input
                      type="number"
                      name="filter_nombre_treballadors_lead_min"
                      className="w-full border rounded p-2"
                      placeholder="Mín"
                      value={workersMinFilter}
                      onChange={e => setWorkersMinFilter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Máximo:</label>
                    <input
                      type="number"
                      name="filter_nombre_treballadors_lead_max"
                      className="w-full border rounded p-2"
                      placeholder="Máx"
                      value={workersMaxFilter}
                      onChange={e => setWorkersMaxFilter(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Capital social:</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Mínimo:</label>
                    <input
                      type="number"
                      name="filter_capital_social_lead_min"
                      className="w-full border rounded p-2"
                      placeholder="Mín"
                      value={capitalMinFilter}
                      onChange={e => setCapitalMinFilter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Máximo:</label>
                    <input
                      type="number"
                      name="filter_capital_social_lead_max"
                      className="w-full border rounded p-2"
                      placeholder="Máx"
                      value={capitalMaxFilter}
                      onChange={e => setCapitalMaxFilter(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Segunda columna */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">CNAE:</label>
                <input 
                  type="text" 
                  name="filter_cnae_lead" 
                  className="w-full border rounded p-2"
                  value={cnaeFilter}
                  onChange={e => setCnaeFilter(e.target.value)}
                  placeholder="Código CNAE"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input 
                  type="text" 
                  name="filter_email_lead" 
                  className="w-full border rounded p-2"
                  value={emailFilter}
                  onChange={e => setEmailFilter(e.target.value)}
                  placeholder="Correo electrónico"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tamaño de empresa:</label>
                <select 
                  name="filter_mida_lead" 
                  className="w-full border rounded p-2"
                  value={midaFilter}
                  onChange={e => setMidaFilter(Number(e.target.value))}
                >
                  <option value="0">Todos</option>
                  <option value="1">Microempresa</option>
                  <option value="2">Pequeña</option>
                  <option value="3">Mediana</option>
                  <option value="4">Grande</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Estado:</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_actiu_lead" 
                      value="Todos"
                      checked={activoFilter === "Todos"}
                      onChange={() => setActivoFilter("Todos")}
                      className="mr-1"
                    />
                    <span>Todos</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_actiu_lead" 
                      value="true"
                      checked={activoFilter === "true"}
                      onChange={() => setActivoFilter("true")}
                      className="mr-1"
                    />
                    <span>Activos</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_actiu_lead" 
                      value="false"
                      checked={activoFilter === "false"}
                      onChange={() => setActivoFilter("false")}
                      className="mr-1"
                    />
                    <span>Inactivos</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Idioma preferente:</label>
                <select 
                  name="filter_idioma_preferent_lead" 
                  className="w-full border rounded p-2"
                  value={idiomFilter}
                  onChange={e => setIdiomFilter(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Catalán">Catalán</option>
                  <option value="Castellano">Castellano</option>
                  <option value="Inglés">Inglés</option>
                  <option value="Francés">Francés</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Cotiza en bolsa:</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_cotitza_borsa_lead" 
                      value="Todos" 
                      checked={cotizaFilter === "Todos"}
                      onChange={() => setCotizaFilter("Todos")}
                      className="mr-1" 
                    />
                    <span>Todos</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_cotitza_borsa_lead" 
                      value="true" 
                      checked={cotizaFilter === "true"}
                      onChange={() => setCotizaFilter("true")}
                      className="mr-1" 
                    />
                    <span>Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_cotitza_borsa_lead" 
                      value="false" 
                      checked={cotizaFilter === "false"}
                      onChange={() => setCotizaFilter("false")}
                      className="mr-1" 
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Tercera columna */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Empresa de temporada:</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_nomes_temporada_lead" 
                      value="Todos" 
                      checked={temporadaFilter === "Todos"}
                      onChange={() => setTemporadaFilter("Todos")}
                      className="mr-1" 
                    />
                    <span>Todos</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_nomes_temporada_lead" 
                      value="true" 
                      checked={temporadaFilter === "true"}
                      onChange={() => setTemporadaFilter("true")}
                      className="mr-1" 
                    />
                    <span>Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_nomes_temporada_lead" 
                      value="false" 
                      checked={temporadaFilter === "false"}
                      onChange={() => setTemporadaFilter("false")}
                      className="mr-1" 
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Conciencia ecológica:</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_conciencia_ecologica_lead" 
                      value="Todos" 
                      checked={ecologicaFilter === "Todos"}
                      onChange={() => setEcologicaFilter("Todos")}
                      className="mr-1" 
                    />
                    <span>Todos</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_conciencia_ecologica_lead" 
                      value="true" 
                      checked={ecologicaFilter === "true"}
                      onChange={() => setEcologicaFilter("true")}
                      className="mr-1" 
                    />
                    <span>Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_conciencia_ecologica_lead" 
                      value="false" 
                      checked={ecologicaFilter === "false"}
                      onChange={() => setEcologicaFilter("false")}
                      className="mr-1" 
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Empresa solidaria:</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_solidaria_social_lead" 
                      value="Todos" 
                      checked={solidariaFilter === "Todos"}
                      onChange={() => setSolidariaFilter("Todos")}
                      className="mr-1" 
                    />
                    <span>Todos</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_solidaria_social_lead" 
                      value="true" 
                      checked={solidariaFilter === "true"}
                      onChange={() => setSolidariaFilter("true")}
                      className="mr-1" 
                    />
                    <span>Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="filter_solidaria_social_lead" 
                      value="false" 
                      checked={solidariaFilter === "false"}
                      onChange={() => setSolidariaFilter("false")}
                      className="mr-1" 
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Importa/Exporta:</label>
                <select 
                  name="filter_importa_exporta_lead" 
                  className="w-full border rounded p-2"
                  value={importaExportaFilter}
                  onChange={e => setImportaExportaFilter(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Importa">Importa</option>
                  <option value="Exporta">Exporta</option>
                  <option value="Ambas">Ambas</option>
                  <option value="Ninguna">Ninguna</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
            >
              <span className="mr-1">🔍</span> Buscar Leads
            </button>
            
            <label className="inline-flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span>Auto-seleccionar</span>
            </label>
          </div>
        </Form>
      </div>
      
      {/* Resultados de la búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">
          Leads disponibles para asignar ({filteredLeads.length})
        </h3>
        
        {filteredLeads.length > 0 ? (
          <>
            <div className="flex space-x-4 mb-4">
              <button 
                type="button" 
                onClick={selectAllLeads}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Seleccionar todos
              </button>
              <button 
                type="button" 
                onClick={deselectAllLeads}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Deseleccionar todos
              </button>
              <button 
                type="button" 
                onClick={toggleAllLeads}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Invertir selección
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNAE</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provincia</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Población</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seleccionar</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map((lead: Lead) => (
                    <tr key={lead.id_lead} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{lead.id_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.nom_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.nom_empresarial_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.email_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.cnae_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.provincia_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{lead.poblacio_lead}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatMidaLead(lead.mida_lead)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          checked={selectedLeadIds.includes(lead.id_lead)}
                          onChange={(e) => handleLeadSelection(lead.id_lead, e.target.checked)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <div className="bg-blue-100 p-3 rounded">
                <strong>Leads seleccionados:</strong> {selectedLeadIds.length}
              </div>
              {selectedLeadIds.length > 0 && (
                <div className="mt-2 text-green-600 flex items-center">
                  <span className="mr-1">✅</span> Has seleccionado leads. Puedes continuar a la pestaña de asignación.
                </div>
              )}
            </div>
          </>
        ) : hasFilters ? (
          <div className="bg-yellow-100 p-3 rounded">
            No se encontraron leads que coincidan con los filtros.
          </div>
        ) : (
          <div className="bg-yellow-100 p-3 rounded">
            No hay leads disponibles. Utiliza los filtros para buscar leads.
          </div>
        )}
      </div>
      
      <button 
        type="button" 
        onClick={() => setActiveTab("asignacion")}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={selectedLeadIds.length === 0}
      >
        Continuar a Asignación ➡️
      </button>
      
      {showSaveFilterModal && renderSaveFilterModal()}
    </div>
  );

  // Renderizado de la pestaña de asignación de leads a agentes
  const renderAssignmentTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Asignación de Leads a Agentes</h2>
      
      {/* Mensaje de modo automático si está activo */}
      {autoAssignMode && (
        <div className="bg-blue-100 p-3 rounded mb-4">
          <p className="font-medium text-blue-800">
            Modo de asignación automática activo. {selectedLeadIds.length} leads se asignarán a los agentes y campañas seleccionados.
          </p>
        </div>
      )}
      
      {selectedLeadIds.length === 0 ? (
        <div className="bg-yellow-100 p-4 rounded">
          ⚠️ No hay leads seleccionados. Por favor, vuelve a la pestaña de filtrado para seleccionar leads.
        </div>
      ) : (
        <>
          <div className="bg-blue-100 p-3 rounded">
            <strong>Leads seleccionados:</strong> {selectedLeadIds.length}
          </div>
          
          {/* Tabla resumen de leads seleccionados */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Leads seleccionados</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provincia</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Población</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads
                    .filter((lead: Lead) => selectedLeadIds.includes(lead.id_lead))
                    .slice(0, 50) // Limitar a 50 para evitar problemas de rendimiento
                    .map((lead: Lead) => (
                      <tr key={lead.id_lead} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{lead.id_lead}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{lead.nom_lead}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{lead.nom_empresarial_lead}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{lead.email_lead}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{lead.provincia_lead}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{lead.poblacio_lead}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatMidaLead(lead.mida_lead)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Formulario de asignación */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Configuración de la Asignación</h3>
            
            <Form method="post" id="assignForm">
              <input type="hidden" name="intent" value="assign" />
              {/* Inputs ocultos para los IDs de los leads seleccionados */}
              {selectedLeadIds.map((leadId: number) => (
                <input key={leadId} type="hidden" name="leadIds" value={leadId} />
              ))}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Selección de agentes */}
                <div>
                  <h4 className="text-md font-medium mb-3">Selección de Agentes</h4>
                  <div className="border p-3 rounded">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Seleccionar Agente(s):</label>
                      <div className="max-h-48 overflow-y-auto border rounded">
                        {agents.map((agent: Agent) => (
                          <div key={agent.id_agent} className="p-2 hover:bg-gray-100">
                            <label className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                name="agentIds" 
                                value={agent.id_agent} 
                                defaultChecked={preselectedAgentIds.includes(agent.id_agent)}
                              />
                              <span>{agent.nom_agent}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-md font-medium mb-2">Método de Distribución</h5>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            name="distribucion" 
                            value="equitativo" 
                            defaultChecked 
                          />
                          <span>Equitativo (Round-Robin)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="radio" name="distribucion" value="todos" />
                          <span>Todos los leads a todos los agentes</span>
                        </label>
                        <div className="text-xs text-gray-500 mt-1">
                          Equitativo: distribuye los leads de forma balanceada entre los agentes seleccionados.
                          <br />
                          Todos a todos: asigna cada lead a todos los agentes seleccionados.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Configuración de asignaciones */}
                <div>
                  <h4 className="text-md font-medium mb-3">Configuración de Asignaciones</h4>
                  <div className="border p-3 rounded">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Seleccionar Campaña(s):</label>
                      <div className="max-h-48 overflow-y-auto border rounded">
                        {campanyas.map((campanya: Campanya) => (
                          <div key={campanya.id_campanya} className="p-2 hover:bg-gray-100">
                            <label className="flex items-center space-x-2">
                              <input 
                                type="checkbox" 
                                name="campanyaIds" 
                                value={campanya.id_campanya} 
                                defaultChecked={preselectedCampanyaIds.includes(campanya.id_campanya)}
                              />
                              <span>{campanya.id_campanya} - {campanya.campanya_nom}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Prioridad para las asignaciones:</label>
                        <select name="prioritat" className="w-full border rounded p-2" defaultValue="3">
                          <option value="1">1 - Muy baja</option>
                          <option value="2">2 - Baja</option>
                          <option value="3">3 - Media</option>
                          <option value="4">4 - Alta</option>
                          <option value="5">5 - Muy alta</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Potencial para las asignaciones:</label>
                        <select name="potencial" className="w-full border rounded p-2" defaultValue="3">
                          <option value="1">1 - Muy bajo</option>
                          <option value="2">2 - Bajo</option>
                          <option value="3">3 - Medio</option>
                          <option value="4">4 - Alto</option>
                          <option value="5">5 - Muy alto</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Observaciones:</label>
                        <textarea 
                          name="observaciones" 
                          className="w-full border rounded p-2"
                          rows={3}
                          placeholder="Observaciones para todas las asignaciones"
                          defaultValue={autoAssignMode ? "Asignación automática desde grupos de filtros" : ""}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Ejecutar Asignación</h3>
                <div className="bg-blue-50 p-4 rounded mb-4">
                  <h4 className="font-medium mb-2">Resumen de la asignación:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Leads seleccionados: {selectedLeadIds.length}</li>
                    <li>Agentes y campañas: Se utilizarán los seleccionados en el formulario</li>
                  </ul>
                </div>
                
                <button 
                  type="submit"
                  className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center"
                  disabled={navigation.state === "submitting"}
                >
                  <span className="mr-2">💾</span> 
                  {navigation.state === "submitting" ? "Asignando..." : "Realizar Asignación Masiva"}
                </button>
              </div>
            </Form>
            
            {actionData?.success && (
              <div className="mt-6 bg-green-100 p-4 rounded">
                <h4 className="font-medium mb-2">Resultado de la asignación:</h4>
                <div className="text-green-700 mb-2">
                  ✅ {actionData.totalSuccess} asignaciones creadas correctamente
                </div>
                {actionData.totalError && actionData.totalError > 0 && (
                  <div className="text-red-700 mb-2">
                    ❌ {actionData.totalError} asignaciones no pudieron ser creadas
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("filtrado");
                    setSelectedLeadIds([]);
                  }}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  🔄 Volver al Filtrado y Limpiar Selección
                </button>
              </div>
            )}
          </div>
        </>
      )}
      
      <button 
        type="button" 
        onClick={() => setActiveTab("filtrado")}
        className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        ⬅️ Volver a Filtrado
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Asignación Masiva de Leads</h1>
      
      {/* Pestañas de navegación */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "filtrado" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("filtrado")}
        >
          1️⃣ Filtrado y Selección
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "asignacion" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("asignacion")}
          disabled={selectedLeadIds.length === 0}
        >
          2️⃣ Asignación a Agentes
        </button>
      </div>
      
      {activeTab === "filtrado" ? renderFilterTab() : renderAssignmentTab()}
    </div>
  );
}