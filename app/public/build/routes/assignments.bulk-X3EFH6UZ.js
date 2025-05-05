import {
  formatMidaLead
} from "/build/_shared/chunk-YUYTHXOG.js";
import {
  FilterGroupService
} from "/build/_shared/chunk-SUXX2XDJ.js";
import "/build/_shared/chunk-URVRSERQ.js";
import "/build/_shared/chunk-CLWOU23L.js";
import "/build/_shared/chunk-MDGFDLOQ.js";
import "/build/_shared/chunk-ZYFQMSET.js";
import "/build/_shared/chunk-52EIYT2B.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit
} from "/build/_shared/chunk-627P7KH4.js";
import {
  createHotContext
} from "/build/_shared/chunk-XR3XMPCQ.js";
import "/build/_shared/chunk-N4FG5RPV.js";
import "/build/_shared/chunk-OPGM6WIO.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WWEL7QKW.js";
import {
  require_react
} from "/build/_shared/chunk-2AFRYLX2.js";
import {
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// app/routes/assignments.bulk.tsx
var import_node = __toESM(require_node());
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.bulk.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.bulk.tsx"
  );
  import.meta.hot.lastModified = "1746433943225.9797";
}
function BulkAssignmentPage() {
  _s();
  const {
    provincias = [],
    poblaciones = [],
    comarcas = [],
    agents = [],
    campanyas = [],
    filteredLeads = [],
    hasFilters = false,
    currentFilters = {}
  } = useLoaderData() || {};
  const actionData = useActionData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = (0, import_react2.useState)("filtrado");
  const [selectedLeadIds, setSelectedLeadIds] = (0, import_react2.useState)([]);
  const [filterGroups, setFilterGroups] = (0, import_react2.useState)([]);
  const [selectedFilterGroupId, setSelectedFilterGroupId] = (0, import_react2.useState)("");
  const [autoAssignMode, setAutoAssignMode] = (0, import_react2.useState)(false);
  const [assignmentReady, setAssignmentReady] = (0, import_react2.useState)(false);
  const [leadsLoaded, setLeadsLoaded] = (0, import_react2.useState)(false);
  const [showSaveFilterModal, setShowSaveFilterModal] = (0, import_react2.useState)(false);
  const [filterGroupName, setFilterGroupName] = (0, import_react2.useState)("");
  const [filterGroupDesc, setFilterGroupDesc] = (0, import_react2.useState)("");
  const [saveFilterError, setSaveFilterError] = (0, import_react2.useState)("");
  const [preselectedAgentIds, setPreselectedAgentIds] = (0, import_react2.useState)([]);
  const [preselectedCampanyaIds, setPreselectedCampanyaIds] = (0, import_react2.useState)([]);
  const isFirstLoad = (0, import_react2.useRef)(true);
  const [provinciaFilter, setProvinciaFilter] = (0, import_react2.useState)(currentFilters?.provincia_lead || "");
  const [poblacionFilter, setPoblacionFilter] = (0, import_react2.useState)(currentFilters?.poblacio_lead || "");
  const [comarcaFilter, setComarcaFilter] = (0, import_react2.useState)(currentFilters?.comarca_lead || "");
  const [cnaeFilter, setCnaeFilter] = (0, import_react2.useState)(currentFilters?.cnae_lead || "");
  const [midaFilter, setMidaFilter] = (0, import_react2.useState)(currentFilters?.mida_lead || 0);
  const [activoFilter, setActivoFilter] = (0, import_react2.useState)(currentFilters?.actiu_lead !== void 0 ? currentFilters?.actiu_lead ? "true" : "false" : "Todos");
  const [yearFilter, setYearFilter] = (0, import_react2.useState)(currentFilters?.any_creacio_lead || "");
  const [workersMinFilter, setWorkersMinFilter] = (0, import_react2.useState)(currentFilters?.nombre_treballadors_lead_min?.toString() || "");
  const [workersMaxFilter, setWorkersMaxFilter] = (0, import_react2.useState)(currentFilters?.nombre_treballadors_lead_max?.toString() || "");
  const [capitalMinFilter, setCapitalMinFilter] = (0, import_react2.useState)(currentFilters?.capital_social_lead_min?.toString() || "");
  const [capitalMaxFilter, setCapitalMaxFilter] = (0, import_react2.useState)(currentFilters?.capital_social_lead_max?.toString() || "");
  const [idiomFilter, setIdiomFilter] = (0, import_react2.useState)(currentFilters?.idioma_preferent_lead || "");
  const [cotizaFilter, setCotizaFilter] = (0, import_react2.useState)(currentFilters?.cotitza_borsa_lead !== void 0 ? currentFilters?.cotitza_borsa_lead ? "true" : "false" : "Todos");
  const [temporadaFilter, setTemporadaFilter] = (0, import_react2.useState)(currentFilters?.nomes_temporada_lead !== void 0 ? currentFilters?.nomes_temporada_lead ? "true" : "false" : "Todos");
  const [ecologicaFilter, setEcologicaFilter] = (0, import_react2.useState)(currentFilters?.conciencia_ecologica_lead !== void 0 ? currentFilters?.conciencia_ecologica_lead ? "true" : "false" : "Todos");
  const [solidariaFilter, setSolidariaFilter] = (0, import_react2.useState)(currentFilters?.solidaria_social_lead !== void 0 ? currentFilters?.solidaria_social_lead ? "true" : "false" : "Todos");
  const [importaExportaFilter, setImportaExportaFilter] = (0, import_react2.useState)(currentFilters?.importa_exporta_lead || "");
  const [emailFilter, setEmailFilter] = (0, import_react2.useState)(currentFilters?.email_lead || "");
  (0, import_react2.useEffect)(() => {
    const autoAssign = searchParams.get("autoAssign") === "true";
    if (autoAssign) {
      setAutoAssignMode(true);
    }
  }, [searchParams]);
  (0, import_react2.useEffect)(() => {
    if (typeof window !== "undefined") {
      setFilterGroups(FilterGroupService.getAll());
      const filterGroupId = searchParams.get("filterGroupId");
      const selectedFilterGroups = searchParams.get("selectedFilterGroups");
      if (filterGroupId) {
        setSelectedFilterGroupId(filterGroupId);
        const group = FilterGroupService.getById(filterGroupId);
        if (group) {
          applyFilterGroup(group);
        }
      } else if (selectedFilterGroups) {
        const groupIds = selectedFilterGroups.split(",");
        const groups = groupIds.map((id) => FilterGroupService.getById(id)).filter((group) => group !== void 0);
        if (groups.length > 0) {
          applyCombinedFilterGroups(groups);
        }
      }
      const preselectedAgents = searchParams.get("preselectedAgents");
      if (preselectedAgents) {
        const agentIds = preselectedAgents.split(",").map((id) => parseInt(id));
        setPreselectedAgentIds(agentIds);
      }
      const preselectedCampanyas = searchParams.get("preselectedCampanyas");
      if (preselectedCampanyas) {
        const campanyaIds = preselectedCampanyas.split(",").map((id) => parseInt(id));
        setPreselectedCampanyaIds(campanyaIds);
      }
    }
  }, [searchParams]);
  const applyFilterGroup = (group) => {
    try {
      setProvinciaFilter(group.filters.provincia_lead || "");
      setPoblacionFilter(group.filters.poblacio_lead || "");
      setComarcaFilter(group.filters.comarca_lead || "");
      setCnaeFilter(group.filters.cnae_lead || "");
      setMidaFilter(group.filters.mida_lead ? parseInt(group.filters.mida_lead.toString()) : 0);
      if (group.filters.actiu_lead !== void 0) {
        setActivoFilter(group.filters.actiu_lead.toString());
      } else {
        setActivoFilter("Todos");
      }
      setYearFilter(group.filters.any_creacio_lead || "");
      setWorkersMinFilter(group.filters.nombre_treballadors_lead_min?.toString() || "");
      setWorkersMaxFilter(group.filters.nombre_treballadors_lead_max?.toString() || "");
      setCapitalMinFilter(group.filters.capital_social_lead_min?.toString() || "");
      setCapitalMaxFilter(group.filters.capital_social_lead_max?.toString() || "");
      setIdiomFilter(group.filters.idioma_preferent_lead || "");
      if (group.filters.cotitza_borsa_lead !== void 0) {
        setCotizaFilter(group.filters.cotitza_borsa_lead.toString());
      } else {
        setCotizaFilter("Todos");
      }
      if (group.filters.nomes_temporada_lead !== void 0) {
        setTemporadaFilter(group.filters.nomes_temporada_lead.toString());
      } else {
        setTemporadaFilter("Todos");
      }
      if (group.filters.conciencia_ecologica_lead !== void 0) {
        setEcologicaFilter(group.filters.conciencia_ecologica_lead.toString());
      } else {
        setEcologicaFilter("Todos");
      }
      if (group.filters.solidaria_social_lead !== void 0) {
        setSolidariaFilter(group.filters.solidaria_social_lead.toString());
      } else {
        setSolidariaFilter("Todos");
      }
      setImportaExportaFilter(group.filters.importa_exporta_lead || "");
      setEmailFilter(group.filters.email_lead || "");
      const formData = new FormData();
      formData.append("intent", "search");
      Object.entries(group.filters).forEach(([key, value]) => {
        if (value !== void 0 && value !== null) {
          formData.append(`filter_${key}`, value.toString());
        }
      });
      try {
        submit(formData, {
          method: "post"
        });
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    } catch (error) {
      console.error("Error al aplicar grupo de filtros:", error);
    }
  };
  const applyCombinedFilterGroups = (groups) => {
    const combinedFilters = {};
    groups.forEach((group) => {
      Object.entries(group.filters).forEach(([key, value]) => {
        if (combinedFilters.hasOwnProperty(key)) {
          if (typeof value === "string" && typeof combinedFilters[key] === "string") {
            if (value !== combinedFilters[key]) {
              if (key === "provincia_lead" || key === "poblacio_lead" || key === "comarca_lead") {
              } else if (key === "cnae_lead") {
              } else {
              }
            }
          } else if (typeof value === "boolean" && typeof combinedFilters[key] === "boolean") {
            combinedFilters[key] = combinedFilters[key] || value;
          } else if (typeof value === "number" && typeof combinedFilters[key] === "number") {
            if (key.includes("_min")) {
              combinedFilters[key] = Math.min(combinedFilters[key], value);
            } else if (key.includes("_max")) {
              combinedFilters[key] = Math.max(combinedFilters[key], value);
            } else {
              combinedFilters[key] = Math.max(combinedFilters[key], value);
            }
          }
        } else {
          combinedFilters[key] = value;
        }
      });
    });
    if (combinedFilters.provincia_lead !== void 0)
      setProvinciaFilter(combinedFilters.provincia_lead);
    if (combinedFilters.poblacio_lead !== void 0)
      setPoblacionFilter(combinedFilters.poblacio_lead);
    if (combinedFilters.comarca_lead !== void 0)
      setComarcaFilter(combinedFilters.comarca_lead);
    if (combinedFilters.cnae_lead !== void 0)
      setCnaeFilter(combinedFilters.cnae_lead);
    if (combinedFilters.mida_lead !== void 0)
      setMidaFilter(combinedFilters.mida_lead);
    if (combinedFilters.actiu_lead !== void 0)
      setActivoFilter(combinedFilters.actiu_lead.toString());
    else
      setActivoFilter("Todos");
    if (combinedFilters.any_creacio_lead !== void 0)
      setYearFilter(combinedFilters.any_creacio_lead);
    if (combinedFilters.nombre_treballadors_lead_min !== void 0)
      setWorkersMinFilter(combinedFilters.nombre_treballadors_lead_min.toString());
    if (combinedFilters.nombre_treballadors_lead_max !== void 0)
      setWorkersMaxFilter(combinedFilters.nombre_treballadors_lead_max.toString());
    if (combinedFilters.capital_social_lead_min !== void 0)
      setCapitalMinFilter(combinedFilters.capital_social_lead_min.toString());
    if (combinedFilters.capital_social_lead_max !== void 0)
      setCapitalMaxFilter(combinedFilters.capital_social_lead_max.toString());
    if (combinedFilters.idioma_preferent_lead !== void 0)
      setIdiomFilter(combinedFilters.idioma_preferent_lead);
    if (combinedFilters.cotitza_borsa_lead !== void 0)
      setCotizaFilter(combinedFilters.cotitza_borsa_lead.toString());
    else
      setCotizaFilter("Todos");
    if (combinedFilters.nomes_temporada_lead !== void 0)
      setTemporadaFilter(combinedFilters.nomes_temporada_lead.toString());
    else
      setTemporadaFilter("Todos");
    if (combinedFilters.conciencia_ecologica_lead !== void 0)
      setEcologicaFilter(combinedFilters.conciencia_ecologica_lead.toString());
    else
      setEcologicaFilter("Todos");
    if (combinedFilters.solidaria_social_lead !== void 0)
      setSolidariaFilter(combinedFilters.solidaria_social_lead.toString());
    else
      setSolidariaFilter("Todos");
    if (combinedFilters.importa_exporta_lead !== void 0)
      setImportaExportaFilter(combinedFilters.importa_exporta_lead);
    if (combinedFilters.email_lead !== void 0)
      setEmailFilter(combinedFilters.email_lead);
    const formData = new FormData();
    formData.append("intent", "search");
    Object.entries(combinedFilters).forEach(([key, value]) => {
      formData.append(`filter_${key}`, value.toString());
    });
    submit(formData, {
      method: "post"
    });
    console.log("Filtros combinados aplicados:", combinedFilters);
  };
  (0, import_react2.useEffect)(() => {
    if (isFirstLoad.current && filteredLeads.length > 0) {
      if (autoAssignMode) {
        setSelectedLeadIds(filteredLeads.map((lead) => lead.id_lead));
      } else {
        setSelectedLeadIds([]);
      }
      isFirstLoad.current = false;
      setLeadsLoaded(true);
    }
  }, [filteredLeads, autoAssignMode]);
  (0, import_react2.useEffect)(() => {
    if ((preselectedAgentIds.length > 0 || preselectedCampanyaIds.length > 0) && selectedLeadIds.length > 0 && activeTab === "filtrado") {
      setActiveTab("asignacion");
    }
  }, [selectedLeadIds, preselectedAgentIds, preselectedCampanyaIds, activeTab]);
  (0, import_react2.useEffect)(() => {
    if (autoAssignMode && leadsLoaded && selectedLeadIds.length > 0 && (preselectedAgentIds.length > 0 || preselectedCampanyaIds.length > 0)) {
      setActiveTab("asignacion");
      setAssignmentReady(true);
    }
  }, [autoAssignMode, leadsLoaded, selectedLeadIds, preselectedAgentIds, preselectedCampanyaIds]);
  (0, import_react2.useEffect)(() => {
    if (assignmentReady && autoAssignMode) {
      const timeoutId = setTimeout(() => {
        performAutoAssignment();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [assignmentReady, autoAssignMode]);
  const performAutoAssignment = () => {
    if (!assignmentReady || selectedLeadIds.length === 0 || preselectedAgentIds.length === 0 && preselectedCampanyaIds.length === 0) {
      console.error("No se puede realizar la asignaci\xF3n autom\xE1tica: faltan datos");
      return;
    }
    const formData = new FormData();
    formData.append("intent", "assign");
    selectedLeadIds.forEach((id) => {
      formData.append("leadIds", id.toString());
    });
    if (preselectedAgentIds.length > 0) {
      preselectedAgentIds.forEach((id) => {
        formData.append("agentIds", id.toString());
      });
    } else {
      if (agents.length > 0) {
        formData.append("agentIds", agents[0].id_agent.toString());
      }
    }
    if (preselectedCampanyaIds.length > 0) {
      preselectedCampanyaIds.forEach((id) => {
        formData.append("campanyaIds", id.toString());
      });
    } else {
      if (campanyas.length > 0) {
        formData.append("campanyaIds", campanyas[0].id_campanya.toString());
      }
    }
    formData.append("distribucion", "equitativo");
    formData.append("prioritat", "3");
    formData.append("potencial", "3");
    formData.append("observaciones", "Asignaci\xF3n autom\xE1tica desde grupos de filtros");
    submit(formData, {
      method: "post"
    });
    setAssignmentReady(false);
    setAutoAssignMode(false);
  };
  const handleLeadSelection = (leadId, isSelected) => {
    setSelectedLeadIds((prev) => {
      if (isSelected) {
        if (prev.includes(leadId))
          return prev;
        return [...prev, leadId];
      } else {
        return prev.filter((id) => id !== leadId);
      }
    });
  };
  const selectAllLeads = () => setSelectedLeadIds(filteredLeads.map((lead) => lead.id_lead));
  const deselectAllLeads = () => setSelectedLeadIds([]);
  const toggleAllLeads = () => {
    const allLeadIds = filteredLeads.map((lead) => lead.id_lead);
    const newSelection = allLeadIds.filter((id) => !selectedLeadIds.includes(id));
    setSelectedLeadIds(newSelection.length > 0 ? newSelection : []);
  };
  const handleSaveFilterGroup = () => {
    if (!filterGroupName.trim()) {
      setSaveFilterError("El nombre es obligatorio");
      return;
    }
    const filtersToSave = {};
    if (provinciaFilter)
      filtersToSave.provincia_lead = provinciaFilter;
    if (poblacionFilter)
      filtersToSave.poblacio_lead = poblacionFilter;
    if (comarcaFilter)
      filtersToSave.comarca_lead = comarcaFilter;
    if (cnaeFilter)
      filtersToSave.cnae_lead = cnaeFilter;
    if (midaFilter > 0)
      filtersToSave.mida_lead = midaFilter;
    if (activoFilter !== "Todos") {
      filtersToSave.actiu_lead = activoFilter === "true";
    }
    if (yearFilter)
      filtersToSave.any_creacio_lead = yearFilter;
    if (workersMinFilter)
      filtersToSave.nombre_treballadors_lead_min = parseInt(workersMinFilter);
    if (workersMaxFilter)
      filtersToSave.nombre_treballadors_lead_max = parseInt(workersMaxFilter);
    if (capitalMinFilter)
      filtersToSave.capital_social_lead_min = parseInt(capitalMinFilter);
    if (capitalMaxFilter)
      filtersToSave.capital_social_lead_max = parseInt(capitalMaxFilter);
    if (idiomFilter)
      filtersToSave.idioma_preferent_lead = idiomFilter;
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
    if (importaExportaFilter)
      filtersToSave.importa_exporta_lead = importaExportaFilter;
    if (emailFilter)
      filtersToSave.email_lead = emailFilter;
    if (Object.keys(filtersToSave).length === 0) {
      setSaveFilterError("No hay filtros para guardar");
      return;
    }
    try {
      FilterGroupService.save({
        name: filterGroupName,
        description: filterGroupDesc,
        filters: filtersToSave
      });
      setFilterGroups(FilterGroupService.getAll());
      setFilterGroupName("");
      setFilterGroupDesc("");
      setSaveFilterError("");
      setShowSaveFilterModal(false);
    } catch (error) {
      console.error("Error al guardar el grupo de filtros:", error);
      setSaveFilterError("Error al guardar el grupo de filtros");
    }
  };
  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    for (let [key, value] of new FormData(form).entries()) {
      console.log("Campo enviado:", key, value);
    }
    submit(form, {
      method: "post"
    });
  };
  const renderSaveFilterModal = () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-md w-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold mb-4", children: "Guardar Filtros como Grupo" }, void 0, false, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 766,
      columnNumber: 9
    }, this),
    saveFilterError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-3 bg-red-100 text-red-700 rounded", children: saveFilterError }, void 0, false, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 768,
      columnNumber: 29
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", htmlFor: "filterGroupName", children: "Nombre:" }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 774,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "filterGroupName", type: "text", className: "w-full border rounded p-2", value: filterGroupName, onChange: (e) => setFilterGroupName(e.target.value), required: true }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 777,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 773,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", htmlFor: "filterGroupDesc", children: "Descripci\xF3n (opcional):" }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 781,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "filterGroupDesc", className: "w-full border rounded p-2", rows: 3, value: filterGroupDesc, onChange: (e) => setFilterGroupDesc(e.target.value) }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 784,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 780,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 772,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end space-x-4 mt-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
        setShowSaveFilterModal(false);
        setFilterGroupName("");
        setFilterGroupDesc("");
        setSaveFilterError("");
      }, className: "px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300", children: "Cancelar" }, void 0, false, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 789,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: handleSaveFilterGroup, className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Guardar" }, void 0, false, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 797,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 788,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.bulk.tsx",
    lineNumber: 765,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/assignments.bulk.tsx",
    lineNumber: 764,
    columnNumber: 39
  }, this);
  const renderFilterTab = () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold", children: "Filtrado y Selecci\xF3n de Leads" }, void 0, false, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 806,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Grupos de Filtros" }, void 0, false, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 810,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-grow", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "w-full border rounded p-2", value: selectedFilterGroupId, onChange: (e) => {
          const id = e.target.value;
          setSelectedFilterGroupId(id);
          if (id) {
            const group = FilterGroupService.getById(id);
            if (group) {
              applyFilterGroup(group);
            }
          }
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Seleccionar grupo de filtros" }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 823,
            columnNumber: 15
          }, this),
          (filterGroups || []).map((group) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: group.id, children: group.name }, group.id, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 824,
            columnNumber: 50
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 813,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 812,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/filter-groups", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center", children: "Gestionar Grupos" }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 829,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 811,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 809,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium", children: "Filtros" }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 838,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => setShowSaveFilterModal(true), className: "px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center", disabled: !hasFilters, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1", children: "\u{1F4BE}" }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 840,
            columnNumber: 13
          }, this),
          " Guardar estos filtros"
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 839,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 837,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: handleSearch, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "search" }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 845,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Provincia:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 850,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "filter_provincia_lead", className: "w-full border rounded p-2", value: provinciaFilter, onChange: (e) => setProvinciaFilter(e.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todas" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 852,
                  columnNumber: 19
                }, this),
                provincias.map((provincia) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: provincia, children: provincia }, provincia, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 853,
                  columnNumber: 48
                }, this))
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 851,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 849,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Poblaci\xF3n:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 860,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "filter_poblacio_lead", className: "w-full border rounded p-2", value: poblacionFilter, onChange: (e) => setPoblacionFilter(e.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todas" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 862,
                  columnNumber: 19
                }, this),
                poblaciones.map((poblacion) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: poblacion, children: poblacion }, poblacion, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 863,
                  columnNumber: 49
                }, this))
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 861,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 859,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Comarca:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 870,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "filter_comarca_lead", className: "w-full border rounded p-2", value: comarcaFilter, onChange: (e) => setComarcaFilter(e.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todas" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 872,
                  columnNumber: 19
                }, this),
                comarcas.map((comarca) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: comarca, children: comarca }, comarca, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 873,
                  columnNumber: 44
                }, this))
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 871,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 869,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "A\xF1o de creaci\xF3n:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 880,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "filter_any_creacio_lead", className: "w-full border rounded p-2", value: yearFilter, onChange: (e) => setYearFilter(e.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todos" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 882,
                  columnNumber: 19
                }, this),
                Array.from({
                  length: 30
                }, (_, i) => (/* @__PURE__ */ new Date()).getFullYear() - i).map((year) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: year, children: year }, year, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 885,
                  columnNumber: 72
                }, this))
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 881,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 879,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "N\xFAmero de trabajadores:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 892,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-xs text-gray-500 mb-1", children: "M\xEDnimo:" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 895,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "filter_nombre_treballadors_lead_min", className: "w-full border rounded p-2", placeholder: "M\xEDn", value: workersMinFilter, onChange: (e) => setWorkersMinFilter(e.target.value) }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 896,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 894,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-xs text-gray-500 mb-1", children: "M\xE1ximo:" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 899,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "filter_nombre_treballadors_lead_max", className: "w-full border rounded p-2", placeholder: "M\xE1x", value: workersMaxFilter, onChange: (e) => setWorkersMaxFilter(e.target.value) }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 900,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 898,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 893,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 891,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Capital social:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 906,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-xs text-gray-500 mb-1", children: "M\xEDnimo:" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 909,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "filter_capital_social_lead_min", className: "w-full border rounded p-2", placeholder: "M\xEDn", value: capitalMinFilter, onChange: (e) => setCapitalMinFilter(e.target.value) }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 910,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 908,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-xs text-gray-500 mb-1", children: "M\xE1ximo:" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 913,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "filter_capital_social_lead_max", className: "w-full border rounded p-2", placeholder: "M\xE1x", value: capitalMaxFilter, onChange: (e) => setCapitalMaxFilter(e.target.value) }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 914,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 912,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 907,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 905,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 848,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "CNAE:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 923,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "filter_cnae_lead", className: "w-full border rounded p-2", value: cnaeFilter, onChange: (e) => setCnaeFilter(e.target.value), placeholder: "C\xF3digo CNAE" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 924,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 922,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Email:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 928,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "filter_email_lead", className: "w-full border rounded p-2", value: emailFilter, onChange: (e) => setEmailFilter(e.target.value), placeholder: "Correo electr\xF3nico" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 929,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 927,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Tama\xF1o de empresa:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 933,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "filter_mida_lead", className: "w-full border rounded p-2", value: midaFilter, onChange: (e) => setMidaFilter(Number(e.target.value)), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "0", children: "Todos" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 935,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "Microempresa" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 936,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "Peque\xF1a" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 937,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "Mediana" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 938,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "Grande" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 939,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 934,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 932,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Estado:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 944,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_actiu_lead", value: "Todos", checked: activoFilter === "Todos", onChange: () => setActivoFilter("Todos"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 947,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Todos" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 948,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 946,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_actiu_lead", value: "true", checked: activoFilter === "true", onChange: () => setActivoFilter("true"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 951,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Activos" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 952,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 950,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_actiu_lead", value: "false", checked: activoFilter === "false", onChange: () => setActivoFilter("false"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 955,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Inactivos" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 956,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 954,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 945,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 943,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Idioma preferente:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 962,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "filter_idioma_preferent_lead", className: "w-full border rounded p-2", value: idiomFilter, onChange: (e) => setIdiomFilter(e.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todos" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 964,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Catal\xE1n", children: "Catal\xE1n" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 965,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Castellano", children: "Castellano" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 966,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Ingl\xE9s", children: "Ingl\xE9s" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 967,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Franc\xE9s", children: "Franc\xE9s" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 968,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Otros", children: "Otros" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 969,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 963,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 961,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Cotiza en bolsa:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 974,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_cotitza_borsa_lead", value: "Todos", checked: cotizaFilter === "Todos", onChange: () => setCotizaFilter("Todos"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 977,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Todos" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 978,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 976,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_cotitza_borsa_lead", value: "true", checked: cotizaFilter === "true", onChange: () => setCotizaFilter("true"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 981,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "S\xED" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 982,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 980,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_cotitza_borsa_lead", value: "false", checked: cotizaFilter === "false", onChange: () => setCotizaFilter("false"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 985,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "No" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 986,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 984,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 975,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 973,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 921,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Empresa de temporada:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 995,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_nomes_temporada_lead", value: "Todos", checked: temporadaFilter === "Todos", onChange: () => setTemporadaFilter("Todos"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 998,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Todos" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 999,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 997,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_nomes_temporada_lead", value: "true", checked: temporadaFilter === "true", onChange: () => setTemporadaFilter("true"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1002,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "S\xED" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1003,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1001,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_nomes_temporada_lead", value: "false", checked: temporadaFilter === "false", onChange: () => setTemporadaFilter("false"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1006,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "No" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1007,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1005,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 996,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 994,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Conciencia ecol\xF3gica:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1013,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_conciencia_ecologica_lead", value: "Todos", checked: ecologicaFilter === "Todos", onChange: () => setEcologicaFilter("Todos"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1016,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Todos" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1017,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1015,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_conciencia_ecologica_lead", value: "true", checked: ecologicaFilter === "true", onChange: () => setEcologicaFilter("true"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1020,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "S\xED" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1021,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1019,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_conciencia_ecologica_lead", value: "false", checked: ecologicaFilter === "false", onChange: () => setEcologicaFilter("false"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1024,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "No" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1025,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1023,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1014,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1012,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Empresa solidaria:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1031,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_solidaria_social_lead", value: "Todos", checked: solidariaFilter === "Todos", onChange: () => setSolidariaFilter("Todos"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1034,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Todos" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1035,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1033,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_solidaria_social_lead", value: "true", checked: solidariaFilter === "true", onChange: () => setSolidariaFilter("true"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1038,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "S\xED" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1039,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1037,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "filter_solidaria_social_lead", value: "false", checked: solidariaFilter === "false", onChange: () => setSolidariaFilter("false"), className: "mr-1" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1042,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "No" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1043,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1041,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1032,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1030,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Importa/Exporta:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1049,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "filter_importa_exporta_lead", className: "w-full border rounded p-2", value: importaExportaFilter, onChange: (e) => setImportaExportaFilter(e.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todos" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1051,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Importa", children: "Importa" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1052,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Exporta", children: "Exporta" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1053,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Ambas", children: "Ambas" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1054,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Ninguna", children: "Ninguna" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1055,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1050,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1048,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 993,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 846,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 flex space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1", children: "\u{1F50D}" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1063,
              columnNumber: 15
            }, this),
            " Buscar Leads"
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1062,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "inline-flex items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", defaultChecked: true, className: "mr-2" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1067,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Auto-seleccionar" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1068,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1066,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1061,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 844,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 836,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: [
        "Leads disponibles para asignar (",
        filteredLeads.length,
        ")"
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 1076,
        columnNumber: 9
      }, this),
      filteredLeads.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-4 mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: selectAllLeads, className: "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300", children: "Seleccionar todos" }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1082,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: deselectAllLeads, className: "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300", children: "Deseleccionar todos" }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1085,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: toggleAllLeads, className: "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300", children: "Invertir selecci\xF3n" }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1088,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1081,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ID" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1097,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1098,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Empresa" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1099,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Email" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1100,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "CNAE" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1101,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Provincia" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1102,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Poblaci\xF3n" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1103,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tama\xF1o" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1104,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Seleccionar" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1105,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1096,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1095,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredLeads.map((lead) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.id_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1110,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.nom_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1111,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.nom_empresarial_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1112,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.email_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1113,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.cnae_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1114,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.provincia_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1115,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.poblacio_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1116,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: formatMidaLead(lead.mida_lead) }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1117,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", checked: selectedLeadIds.includes(lead.id_lead), onChange: (e) => handleLeadSelection(lead.id_lead, e.target.checked) }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1119,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1118,
              columnNumber: 23
            }, this)
          ] }, lead.id_lead, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1109,
            columnNumber: 46
          }, this)) }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1108,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1094,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1093,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-blue-100 p-3 rounded", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Leads seleccionados:" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1128,
              columnNumber: 17
            }, this),
            " ",
            selectedLeadIds.length
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1127,
            columnNumber: 15
          }, this),
          selectedLeadIds.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 text-green-600 flex items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1", children: "\u2705" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1131,
              columnNumber: 19
            }, this),
            " Has seleccionado leads. Puedes continuar a la pesta\xF1a de asignaci\xF3n."
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1130,
            columnNumber: 46
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1126,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 1080,
        columnNumber: 37
      }, this) : hasFilters ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-yellow-100 p-3 rounded", children: "No se encontraron leads que coincidan con los filtros." }, void 0, false, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 1134,
        columnNumber: 30
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-yellow-100 p-3 rounded", children: "No hay leads disponibles. Utiliza los filtros para buscar leads." }, void 0, false, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 1136,
        columnNumber: 20
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1075,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => setActiveTab("asignacion"), className: "w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", disabled: selectedLeadIds.length === 0, children: "Continuar a Asignaci\xF3n \u27A1\uFE0F" }, void 0, false, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1141,
      columnNumber: 7
    }, this),
    showSaveFilterModal && renderSaveFilterModal()
  ] }, void 0, true, {
    fileName: "app/routes/assignments.bulk.tsx",
    lineNumber: 805,
    columnNumber: 33
  }, this);
  const renderAssignmentTab = () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold", children: "Asignaci\xF3n de Leads a Agentes" }, void 0, false, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1150,
      columnNumber: 7
    }, this),
    autoAssignMode && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-blue-100 p-3 rounded mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-medium text-blue-800", children: [
      "Modo de asignaci\xF3n autom\xE1tica activo. ",
      selectedLeadIds.length,
      " leads se asignar\xE1n a los agentes y campa\xF1as seleccionados."
    ] }, void 0, true, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1154,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1153,
      columnNumber: 26
    }, this),
    selectedLeadIds.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-yellow-100 p-4 rounded", children: "\u26A0\uFE0F No hay leads seleccionados. Por favor, vuelve a la pesta\xF1a de filtrado para seleccionar leads." }, void 0, false, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1159,
      columnNumber: 39
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-blue-100 p-3 rounded", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Leads seleccionados:" }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1163,
          columnNumber: 13
        }, this),
        " ",
        selectedLeadIds.length
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 1162,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-4 rounded-lg shadow", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Leads seleccionados" }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1168,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ID" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1173,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1174,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Empresa" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1175,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Email" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1176,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Provincia" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1177,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Poblaci\xF3n" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1178,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tama\xF1o" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1179,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1172,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1171,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredLeads.filter((lead) => selectedLeadIds.includes(lead.id_lead)).slice(0, 50).map((lead) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.id_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1185,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.nom_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1186,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.nom_empresarial_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1187,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.email_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1188,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.provincia_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1189,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.poblacio_lead }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1190,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: formatMidaLead(lead.mida_lead) }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1191,
              columnNumber: 25
            }, this)
          ] }, lead.id_lead, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1184,
            columnNumber: 28
          }, this)) }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1182,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1170,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1169,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 1167,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-4 rounded-lg shadow", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Configuraci\xF3n de la Asignaci\xF3n" }, void 0, false, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1200,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", id: "assignForm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "assign" }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1203,
            columnNumber: 15
          }, this),
          selectedLeadIds.map((leadId) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "leadIds", value: leadId }, leadId, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1205,
            columnNumber: 46
          }, this)),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Selecci\xF3n de Agentes" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1210,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border p-3 rounded", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Seleccionar Agente(s):" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1213,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-h-48 overflow-y-auto border rounded", children: agents.map((agent) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-2 hover:bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "agentIds", value: agent.id_agent, defaultChecked: preselectedAgentIds.includes(agent.id_agent) }, void 0, false, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1217,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: agent.nom_agent }, void 0, false, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1218,
                      columnNumber: 31
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1216,
                    columnNumber: 29
                  }, this) }, agent.id_agent, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1215,
                    columnNumber: 46
                  }, this)) }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1214,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1212,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-md font-medium mb-2", children: "M\xE9todo de Distribuci\xF3n" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1225,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "distribucion", value: "equitativo", defaultChecked: true }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1228,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Equitativo (Round-Robin)" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1229,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1227,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "distribucion", value: "todos" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1232,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Todos los leads a todos los agentes" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1233,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1231,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-xs text-gray-500 mt-1", children: [
                      "Equitativo: distribuye los leads de forma balanceada entre los agentes seleccionados.",
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1237,
                        columnNumber: 27
                      }, this),
                      "Todos a todos: asigna cada lead a todos los agentes seleccionados."
                    ] }, void 0, true, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1235,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1226,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1224,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1211,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1209,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Configuraci\xF3n de Asignaciones" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1247,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border p-3 rounded", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Seleccionar Campa\xF1a(s):" }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1250,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-h-48 overflow-y-auto border rounded", children: campanyas.map((campanya) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-2 hover:bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "campanyaIds", value: campanya.id_campanya, defaultChecked: preselectedCampanyaIds.includes(campanya.id_campanya) }, void 0, false, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1254,
                      columnNumber: 31
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
                      campanya.id_campanya,
                      " - ",
                      campanya.campanya_nom
                    ] }, void 0, true, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1255,
                      columnNumber: 31
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1253,
                    columnNumber: 29
                  }, this) }, campanya.id_campanya, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1252,
                    columnNumber: 52
                  }, this)) }, void 0, false, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1251,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1249,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Prioridad para las asignaciones:" }, void 0, false, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1263,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "prioritat", className: "w-full border rounded p-2", defaultValue: "3", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "1 - Muy baja" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1265,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "2 - Baja" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1266,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "3 - Media" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1267,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "4 - Alta" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1268,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "5 - Muy alta" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1269,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1264,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1262,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Potencial para las asignaciones:" }, void 0, false, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1274,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "potencial", className: "w-full border rounded p-2", defaultValue: "3", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "1 - Muy bajo" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1276,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "2 - Bajo" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1277,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "3 - Medio" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1278,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "4 - Alto" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1279,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "5 - Muy alto" }, void 0, false, {
                        fileName: "app/routes/assignments.bulk.tsx",
                        lineNumber: 1280,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1275,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1273,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Observaciones:" }, void 0, false, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1285,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observaciones", className: "w-full border rounded p-2", rows: 3, placeholder: "Observaciones para todas las asignaciones", defaultValue: autoAssignMode ? "Asignaci\xF3n autom\xE1tica desde grupos de filtros" : "" }, void 0, false, {
                      fileName: "app/routes/assignments.bulk.tsx",
                      lineNumber: 1286,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/assignments.bulk.tsx",
                    lineNumber: 1284,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1261,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1248,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1246,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1207,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Ejecutar Asignaci\xF3n" }, void 0, false, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1294,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-blue-50 p-4 rounded mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "font-medium mb-2", children: "Resumen de la asignaci\xF3n:" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1296,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "list-disc pl-6 space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
                  "Leads seleccionados: ",
                  selectedLeadIds.length
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1298,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Agentes y campa\xF1as: Se utilizar\xE1n los seleccionados en el formulario" }, void 0, false, {
                  fileName: "app/routes/assignments.bulk.tsx",
                  lineNumber: 1299,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1297,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1295,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center", disabled: navigation.state === "submitting", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-2", children: "\u{1F4BE}" }, void 0, false, {
                fileName: "app/routes/assignments.bulk.tsx",
                lineNumber: 1304,
                columnNumber: 19
              }, this),
              navigation.state === "submitting" ? "Asignando..." : "Realizar Asignaci\xF3n Masiva"
            ] }, void 0, true, {
              fileName: "app/routes/assignments.bulk.tsx",
              lineNumber: 1303,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1293,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1202,
          columnNumber: 13
        }, this),
        actionData?.success && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 bg-green-100 p-4 rounded", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "font-medium mb-2", children: "Resultado de la asignaci\xF3n:" }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1311,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-green-700 mb-2", children: [
            "\u2705 ",
            actionData.totalSuccess,
            " asignaciones creadas correctamente"
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1312,
            columnNumber: 17
          }, this),
          actionData.totalError && actionData.totalError > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-red-700 mb-2", children: [
            "\u274C ",
            actionData.totalError,
            " asignaciones no pudieron ser creadas"
          ] }, void 0, true, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1315,
            columnNumber: 72
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
            setActiveTab("filtrado");
            setSelectedLeadIds([]);
          }, className: "mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "\u{1F504} Volver al Filtrado y Limpiar Selecci\xF3n" }, void 0, false, {
            fileName: "app/routes/assignments.bulk.tsx",
            lineNumber: 1318,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.bulk.tsx",
          lineNumber: 1310,
          columnNumber: 37
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 1199,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1161,
      columnNumber: 18
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => setActiveTab("filtrado"), className: "w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700", children: "\u2B05\uFE0F Volver a Filtrado" }, void 0, false, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1328,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.bulk.tsx",
    lineNumber: 1149,
    columnNumber: 37
  }, this);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold mb-6", children: "Asignaci\xF3n Masiva de Leads" }, void 0, false, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1333,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex border-b mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-4 py-2 font-medium ${activeTab === "filtrado" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`, onClick: () => setActiveTab("filtrado"), children: "1\uFE0F\u20E3 Filtrado y Selecci\xF3n" }, void 0, false, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 1337,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `px-4 py-2 font-medium ${activeTab === "asignacion" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`, onClick: () => setActiveTab("asignacion"), disabled: selectedLeadIds.length === 0, children: "2\uFE0F\u20E3 Asignaci\xF3n a Agentes" }, void 0, false, {
        fileName: "app/routes/assignments.bulk.tsx",
        lineNumber: 1340,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.bulk.tsx",
      lineNumber: 1336,
      columnNumber: 7
    }, this),
    activeTab === "filtrado" ? renderFilterTab() : renderAssignmentTab()
  ] }, void 0, true, {
    fileName: "app/routes/assignments.bulk.tsx",
    lineNumber: 1332,
    columnNumber: 10
  }, this);
}
_s(BulkAssignmentPage, "2nK5zT3xeHE9fRi4B8smGZxaOdo=", false, function() {
  return [useLoaderData, useActionData, useSubmit, useNavigation, useSearchParams];
});
_c = BulkAssignmentPage;
var _c;
$RefreshReg$(_c, "BulkAssignmentPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  BulkAssignmentPage as default
};
//# sourceMappingURL=/build/routes/assignments.bulk-X3EFH6UZ.js.map
