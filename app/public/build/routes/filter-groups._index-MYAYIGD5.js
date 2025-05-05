import {
  formatMidaLead
} from "/build/_shared/chunk-YUYTHXOG.js";
import {
  FilterGroupService
} from "/build/_shared/chunk-SUXX2XDJ.js";
import {
  LeadService
} from "/build/_shared/chunk-URVRSERQ.js";
import {
  AssignacioService
} from "/build/_shared/chunk-CLWOU23L.js";
import "/build/_shared/chunk-MDGFDLOQ.js";
import "/build/_shared/chunk-ZYFQMSET.js";
import "/build/_shared/chunk-52EIYT2B.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  Link,
  useLoaderData,
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

// app/routes/filter-groups._index.tsx
var import_node = __toESM(require_node());
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\filter-groups._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\filter-groups._index.tsx"
  );
  import.meta.hot.lastModified = "1745912041971.8188";
}
function combineFilters(groups) {
  const combinedFilters = {};
  groups.forEach((group) => {
    Object.entries(group.filters).forEach(([key, value]) => {
      if (combinedFilters.hasOwnProperty(key)) {
        if (typeof value === "string" && typeof combinedFilters[key] === "string") {
          if (value !== combinedFilters[key]) {
            if (key === "provincia_lead" || key === "poblacio_lead" || key === "comarca_lead" || key === "cnae_lead") {
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
  return combinedFilters;
}
function FilterGroupsIndex() {
  _s();
  const {
    agents,
    campanyas
  } = useLoaderData();
  const submit = useSubmit();
  const [filterGroups, setFilterGroups] = (0, import_react.useState)([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = (0, import_react.useState)(null);
  const [selectedFilterGroups, setSelectedFilterGroups] = (0, import_react.useState)([]);
  const [selectedAgents, setSelectedAgents] = (0, import_react.useState)([]);
  const [selectedCampanyas, setSelectedCampanyas] = (0, import_react.useState)([]);
  const [previewLeads, setPreviewLeads] = (0, import_react.useState)([]);
  const [showPreviewLeads, setShowPreviewLeads] = (0, import_react.useState)(false);
  const [previewLoading, setPreviewLoading] = (0, import_react.useState)(false);
  const [previewError, setPreviewError] = (0, import_react.useState)(null);
  const [previewMessage, setPreviewMessage] = (0, import_react.useState)(null);
  const [showConfirmDialog, setShowConfirmDialog] = (0, import_react.useState)(false);
  const [assignmentResult, setAssignmentResult] = (0, import_react.useState)(null);
  const formatFilterValue = (key, value) => {
    if (key === "mida_lead") {
      const sizes = ["", "Microempresa", "Peque\xF1a", "Mediana", "Grande"];
      return sizes[parseInt(value)] || value;
    }
    if (key === "actiu_lead" || key === "cotitza_borsa_lead" || key === "nomes_temporada_lead" || key === "conciencia_ecologica_lead" || key === "solidaria_social_lead") {
      return value === true || value === "true" ? "S\xED" : "No";
    }
    return value.toString();
  };
  const renderGroupFilters = (filters) => {
    const filterLabels = {
      "provincia_lead": "Provincia",
      "poblacio_lead": "Poblaci\xF3n",
      "comarca_lead": "Comarca",
      "adreca_lead": "Direcci\xF3n",
      "codi_postal_lead": "C\xF3digo postal",
      "cnae_lead": "CNAE",
      "mida_lead": "Tama\xF1o",
      "actiu_lead": "Activo",
      "any_creacio_lead": "A\xF1o creaci\xF3n",
      "nombre_treballadors_lead_min": "Trabajadores (m\xEDn)",
      "nombre_treballadors_lead_max": "Trabajadores (m\xE1x)",
      "capital_social_lead_min": "Capital social (m\xEDn)",
      "capital_social_lead_max": "Capital social (m\xE1x)",
      "idioma_preferent_lead": "Idioma",
      "cotitza_borsa_lead": "Cotiza en bolsa",
      "nomes_temporada_lead": "Temporada",
      "conciencia_ecologica_lead": "Ecol\xF3gica",
      "solidaria_social_lead": "Solidaria",
      "importa_exporta_lead": "Importa/Exporta",
      "email_lead": "Email",
      "NIF_lead": "NIF",
      "nom_basic_lead": "Nombre b\xE1sico",
      "nom_empresarial_lead": "Nombre empresarial",
      "nom_fiscal_lead": "Nombre fiscal",
      "xarxe_social_lead": "Redes sociales",
      "link_web_lead": "Web"
    };
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-xs text-gray-600 mt-1", children: Object.entries(filters).map(([key, value], index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-2", children: [
      filterLabels[key] || key.replace("_lead", ""),
      ": ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: formatFilterValue(key, value) }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 188,
        columnNumber: 62
      }, this),
      index < Object.entries(filters).length - 1 ? " \u2022 " : ""
    ] }, key, true, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 187,
      columnNumber: 63
    }, this)) }, void 0, false, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 186,
      columnNumber: 12
    }, this);
  };
  (0, import_react.useEffect)(() => {
    if (typeof window !== "undefined") {
      setFilterGroups(FilterGroupService.getAll());
    }
  }, []);
  (0, import_react.useEffect)(() => {
    if (selectedFilterGroups.length > 0) {
      previewLeadsForSelectedGroups();
    } else {
      setPreviewLeads([]);
      setShowPreviewLeads(false);
    }
  }, [selectedFilterGroups]);
  const previewLeadsForSelectedGroups = async () => {
    if (selectedFilterGroups.length === 0) {
      setPreviewError("Selecciona al menos un grupo de filtros para previsualizar");
      return;
    }
    console.log("\u{1F50D} Iniciando previsualizaci\xF3n de leads para grupos:", selectedFilterGroups);
    setPreviewLoading(true);
    setPreviewError(null);
    setPreviewMessage(null);
    try {
      const groups = selectedFilterGroups.map((id) => {
        const group = FilterGroupService.getById(id);
        console.log(`Grupo de filtros ${id}:`, group);
        return group;
      }).filter(Boolean);
      console.log("Grupos encontrados:", groups.length);
      const combinedFilters = combineFilters(groups);
      console.log("Filtros combinados:", combinedFilters);
      console.log("\u{1F310} Llamando a LeadService.getUnassigned con filtros:", combinedFilters);
      console.log("M\xE9todo LeadService.getUnassigned:", typeof LeadService.getUnassigned);
      try {
        const leads = await LeadService.getUnassigned(0, 50, combinedFilters);
        console.log("\u2705 Leads recibidos:", leads ? leads.length : 0);
        setPreviewLeads(leads || []);
        setPreviewMessage(leads.length > 0 ? `Se encontraron ${leads.length} leads que cumplen con los filtros.` : "No se encontraron leads que cumplan con los filtros seleccionados.");
        setShowPreviewLeads(leads.length > 0);
        setPreviewLoading(false);
      } catch (apiError) {
        console.error("\u274C Error espec\xEDfico en la llamada a getUnassigned:", apiError);
        if (apiError instanceof Error) {
          console.error("Mensaje:", apiError.message);
          console.error("Nombre:", apiError.name);
          console.error("Stack:", apiError.stack);
        }
        throw apiError;
      }
    } catch (error) {
      console.error("\u274C Error al previsualizar leads:", error);
      if (error instanceof Error) {
        console.error("Tipo de error:", error.constructor.name);
        console.error("Mensaje:", error.message);
        console.error("Stack:", error.stack);
      } else {
        console.error("Error no es instancia de Error:", typeof error);
      }
      if (error && typeof error === "object") {
        console.error("Propiedades del objeto error:", Object.keys(error));
        if ("response" in error) {
          const response = error.response;
          console.error("Response status:", response?.status);
          console.error("Response data:", response?.data);
        }
      }
      setPreviewError("Error al cargar los leads. Comprueba la consola para m\xE1s detalles.");
      setPreviewLoading(false);
    }
  };
  const handleDelete = (id) => {
    FilterGroupService.delete(id);
    setFilterGroups(FilterGroupService.getAll());
    setShowDeleteConfirm(null);
    setSelectedFilterGroups((prev) => prev.filter((groupId) => groupId !== id));
  };
  const handleFilterGroupSelection = (id, isSelected) => {
    if (isSelected) {
      setSelectedFilterGroups([...selectedFilterGroups, id]);
    } else {
      setSelectedFilterGroups(selectedFilterGroups.filter((groupId) => groupId !== id));
    }
  };
  const handleStartAssignment = () => {
    if (selectedFilterGroups.length === 0) {
      setPreviewError("Selecciona al menos un grupo de filtros");
      return;
    }
    if (selectedAgents.length === 0) {
      setPreviewError("Selecciona al menos un agente");
      return;
    }
    if (selectedCampanyas.length === 0) {
      setPreviewError("Selecciona al menos una campa\xF1a");
      return;
    }
    setShowConfirmDialog(true);
  };
  const handleConfirmAssignment = async () => {
    try {
      setPreviewLoading(true);
      setAssignmentResult(null);
      const groups = selectedFilterGroups.map((id) => FilterGroupService.getById(id)).filter(Boolean);
      const combinedFilters = combineFilters(groups);
      const leads = await LeadService.getUnassigned(0, 500, combinedFilters);
      if (leads.length === 0) {
        setAssignmentResult({
          success: false,
          message: "No se encontraron leads que cumplan con los filtros seleccionados"
        });
        setPreviewLoading(false);
        setShowConfirmDialog(false);
        return;
      }
      const leadIds = leads.map((lead) => lead.id_lead);
      let totalSuccess = 0;
      let totalError = 0;
      for (const campanyaId of selectedCampanyas) {
        const result = await AssignacioService.bulkAssignAll(
          selectedAgents,
          leadIds,
          3,
          // prioridad media por defecto
          3,
          // potencial medio por defecto
          "Asignaci\xF3n autom\xE1tica desde grupos de filtros",
          campanyaId
        );
        totalSuccess += result.success;
        totalError += result.error;
      }
      setAssignmentResult({
        success: true,
        message: `Se complet\xF3 la asignaci\xF3n autom\xE1tica de leads.`,
        totalSuccess,
        totalError
      });
      setPreviewLoading(false);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Error al realizar la asignaci\xF3n:", error);
      setAssignmentResult({
        success: false,
        message: "Error al procesar la asignaci\xF3n: " + (error instanceof Error ? error.message : String(error))
      });
      setPreviewLoading(false);
      setShowConfirmDialog(false);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Grupos de Filtros" }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 379,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/filter-groups/new", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "+ Nuevo Grupo de Filtros" }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 381,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 380,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 378,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-blue-50 p-4 rounded border border-blue-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium text-blue-800 mb-2", children: "\xBFC\xF3mo funciona?" }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 389,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", { className: "list-decimal pl-5 text-blue-700 space-y-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Selecciona uno o m\xE1s grupos de filtros (puedes combinarlos)" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 391,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Los leads que cumplen con los filtros se mostrar\xE1n autom\xE1ticamente" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 392,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Selecciona agentes y campa\xF1as" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 393,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: 'Haz clic en "Asignar Leads Autom\xE1ticamente" para completar el proceso' }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 394,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 390,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 388,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium", children: "Seleccione Grupos de Filtros para Asignar" }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 401,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 400,
        columnNumber: 9
      }, this),
      filterGroups.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-2 font-medium", children: [
            selectedFilterGroups.length,
            " grupos seleccionados"
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 407,
            columnNumber: 17
          }, this),
          selectedFilterGroups.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setSelectedFilterGroups([]), className: "text-sm text-red-600 hover:text-red-800", children: "Limpiar selecci\xF3n" }, void 0, false, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 410,
            columnNumber: 53
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 406,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 405,
          columnNumber: 13
        }, this),
        previewError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 bg-red-100 text-red-700 p-3 rounded", children: previewError }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 417,
          columnNumber: 30
        }, this),
        previewMessage && !previewError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 bg-green-100 text-green-700 p-3 rounded", children: previewMessage }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 420,
          columnNumber: 49
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filterGroups.map((group) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `border rounded-lg p-4 transition-colors ${selectedFilterGroups.includes(group.id) ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-400"}`, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-start mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", id: `group-${group.id}`, checked: selectedFilterGroups.includes(group.id), onChange: (e) => handleFilterGroupSelection(group.id, e.target.checked), className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2" }, void 0, false, {
                fileName: "app/routes/filter-groups._index.tsx",
                lineNumber: 428,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: `group-${group.id}`, className: "font-medium cursor-pointer", children: group.name }, void 0, false, {
                fileName: "app/routes/filter-groups._index.tsx",
                lineNumber: 429,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 427,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/filter-groups/${group.id}`, className: "text-blue-600 hover:text-blue-900 text-sm", children: "Editar" }, void 0, false, {
                fileName: "app/routes/filter-groups._index.tsx",
                lineNumber: 432,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowDeleteConfirm(group.id), className: "text-red-600 hover:text-red-900 text-sm", children: "Eliminar" }, void 0, false, {
                fileName: "app/routes/filter-groups._index.tsx",
                lineNumber: 435,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 431,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 426,
            columnNumber: 19
          }, this),
          group.description && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600 mb-2", children: group.description }, void 0, false, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 440,
            columnNumber: 41
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border-t border-gray-100 pt-2 mt-2", children: renderGroupFilters(group.filters) }, void 0, false, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 441,
            columnNumber: 19
          }, this)
        ] }, group.id, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 425,
          columnNumber: 42
        }, this)) }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 424,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 404,
        columnNumber: 36
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 mb-4", children: "No hay grupos de filtros guardados." }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 447,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/filter-groups/new", className: "inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Crear primer grupo de filtros" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 448,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 446,
        columnNumber: 20
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 399,
      columnNumber: 7
    }, this),
    showPreviewLeads && previewLeads.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200 flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium", children: [
          "Leads encontrados (",
          previewLeads.length,
          ")"
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 457,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-blue-600 hover:text-blue-800 text-sm", onClick: () => setShowPreviewLeads(!showPreviewLeads), children: showPreviewLeads ? "Ocultar leads" : "Mostrar leads" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 458,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 456,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ID" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 468,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 469,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Empresa" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 470,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Email" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 471,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "CNAE" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 472,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Provincia" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 473,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Poblaci\xF3n" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 474,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tama\xF1o" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 475,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 467,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 466,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: previewLeads.slice(0, 10).map((lead) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.id_lead }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 480,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.nom_lead }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 481,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.nom_empresarial_lead }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 482,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.email_lead }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 483,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.cnae_lead }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 484,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.provincia_lead }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 485,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: lead.poblacio_lead }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 486,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: formatMidaLead(lead.mida_lead) }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 487,
              columnNumber: 23
            }, this)
          ] }, lead.id_lead, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 479,
            columnNumber: 58
          }, this)) }, void 0, false, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 478,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 465,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 464,
          columnNumber: 13
        }, this),
        previewLeads.length > 10 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 text-sm text-gray-500 text-center", children: [
          "Mostrando 10 de ",
          previewLeads.length,
          " leads encontrados."
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 493,
          columnNumber: 42
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 463,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 455,
      columnNumber: 55
    }, this),
    selectedFilterGroups.length > 0 && previewLeads.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium", children: "Asignar a Campa\xF1as y Agentes" }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 502,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 501,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-green-50 p-3 rounded border border-green-200 mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-green-800", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Listos para asignar:" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 508,
              columnNumber: 17
            }, this),
            " ",
            previewLeads.length,
            " leads que cumplen con los filtros"
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 507,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-green-700 mt-1", children: "Selecciona los agentes y campa\xF1as a los que quieres asignar estos leads." }, void 0, false, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 510,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 506,
          columnNumber: 13
        }, this),
        assignmentResult && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `p-4 rounded mb-4 ${assignmentResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-medium", children: assignmentResult.message }, void 0, false, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 517,
            columnNumber: 17
          }, this),
          assignmentResult.success && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm mt-1", children: [
            "Se crearon ",
            assignmentResult.totalSuccess,
            " asignaciones con \xE9xito.",
            assignmentResult.totalError && assignmentResult.totalError > 0 && ` Hubo ${assignmentResult.totalError} errores.`
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 518,
            columnNumber: 46
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 516,
          columnNumber: 34
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium mb-3", children: "Seleccionar Agentes" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 527,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border p-3 rounded max-h-60 overflow-y-auto", children: agents.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: agents.map((agent) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-2 hover:bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "agentIds", value: agent.id_agent, onChange: (e) => {
                const id = parseInt(e.target.value);
                setSelectedAgents((prev) => e.target.checked ? [...prev, id] : prev.filter((agentId) => agentId !== id));
              }, checked: selectedAgents.includes(agent.id_agent) }, void 0, false, {
                fileName: "app/routes/filter-groups._index.tsx",
                lineNumber: 532,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: agent.nom_agent }, void 0, false, {
                fileName: "app/routes/filter-groups._index.tsx",
                lineNumber: 536,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 531,
              columnNumber: 27
            }, this) }, agent.id_agent, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 530,
              columnNumber: 44
            }, this)) }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 529,
              columnNumber: 40
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 text-center py-2", children: "Cargando agentes..." }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 539,
              columnNumber: 30
            }, this) }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 528,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 526,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium mb-3", children: "Seleccionar Campa\xF1as" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 545,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border p-3 rounded max-h-60 overflow-y-auto", children: campanyas.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: campanyas.map((campanya) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-2 hover:bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "campanyaIds", value: campanya.id_campanya, onChange: (e) => {
                const id = parseInt(e.target.value);
                setSelectedCampanyas((prev) => e.target.checked ? [...prev, id] : prev.filter((campanyaId) => campanyaId !== id));
              }, checked: selectedCampanyas.includes(campanya.id_campanya) }, void 0, false, {
                fileName: "app/routes/filter-groups._index.tsx",
                lineNumber: 550,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
                campanya.id_campanya,
                " - ",
                campanya.campanya_nom
              ] }, void 0, true, {
                fileName: "app/routes/filter-groups._index.tsx",
                lineNumber: 554,
                columnNumber: 29
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 549,
              columnNumber: 27
            }, this) }, campanya.id_campanya, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 548,
              columnNumber: 50
            }, this)) }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 547,
              columnNumber: 43
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 text-center py-2", children: "Cargando campa\xF1as..." }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 557,
              columnNumber: 30
            }, this) }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 546,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 544,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 524,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: handleStartAssignment, disabled: previewLoading || selectedFilterGroups.length === 0 || selectedAgents.length === 0 || selectedCampanyas.length === 0, className: `w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 flex justify-center items-center ${previewLoading || selectedFilterGroups.length === 0 || selectedAgents.length === 0 || selectedCampanyas.length === 0 ? "bg-green-300 cursor-not-allowed" : ""}`, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 567,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 566,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/filter-groups._index.tsx",
              lineNumber: 565,
              columnNumber: 17
            }, this),
            "Asignar Leads Autom\xE1ticamente"
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 564,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500 mt-2 text-center", children: [
            "Esta acci\xF3n asignar\xE1 los ",
            previewLeads.length,
            " leads seleccionados a los agentes y campa\xF1as elegidos."
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 572,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 563,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 505,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 500,
      columnNumber: 70
    }, this),
    showConfirmDialog && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-md w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold mb-4", children: "Confirmar asignaci\xF3n" }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 582,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-2", children: "\xBFEst\xE1 seguro de que desea asignar los leads a los agentes y campa\xF1as seleccionados?" }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 583,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-6 text-sm text-gray-600", children: "Esta acci\xF3n asignar\xE1 todos los leads que cumplan con los filtros seleccionados." }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 586,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-yellow-50 p-3 rounded border border-yellow-200 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-yellow-800", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Resumen:" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 592,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 591,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "mt-1 text-sm text-yellow-700 list-disc pl-5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
            "Grupos de filtros: ",
            selectedFilterGroups.length
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 595,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
            "Agentes seleccionados: ",
            selectedAgents.length
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 596,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
            "Campa\xF1as seleccionadas: ",
            selectedCampanyas.length
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 597,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
            "Leads afectados: ",
            previewLeads.length,
            previewLeads.length === 50 ? "+" : ""
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups._index.tsx",
            lineNumber: 598,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 594,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 590,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end space-x-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowConfirmDialog(false), className: "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300", children: "Cancelar" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 603,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleConfirmAssignment, disabled: previewLoading, className: `px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${previewLoading ? "opacity-50 cursor-not-allowed" : ""}`, children: previewLoading ? "Procesando..." : "Confirmar" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 606,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 602,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 581,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 580,
      columnNumber: 29
    }, this),
    showDeleteConfirm && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-md w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold mb-4", children: "Confirmar eliminaci\xF3n" }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 616,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-6", children: "\xBFEst\xE1 seguro de que desea eliminar este grupo de filtros? Esta acci\xF3n no se puede deshacer." }, void 0, false, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 617,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end space-x-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowDeleteConfirm(null), className: "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300", children: "Cancelar" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 621,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleDelete(showDeleteConfirm), className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700", children: "Eliminar" }, void 0, false, {
          fileName: "app/routes/filter-groups._index.tsx",
          lineNumber: 624,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups._index.tsx",
        lineNumber: 620,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 615,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/filter-groups._index.tsx",
      lineNumber: 614,
      columnNumber: 29
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/filter-groups._index.tsx",
    lineNumber: 377,
    columnNumber: 10
  }, this);
}
_s(FilterGroupsIndex, "3+fjw7r4tHfTVkEDbNF8mcROm7A=", false, function() {
  return [useLoaderData, useSubmit];
});
_c = FilterGroupsIndex;
var _c;
$RefreshReg$(_c, "FilterGroupsIndex");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  FilterGroupsIndex as default
};
//# sourceMappingURL=/build/routes/filter-groups._index-MYAYIGD5.js.map
