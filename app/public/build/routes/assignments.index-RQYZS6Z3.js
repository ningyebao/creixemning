import "/build/_shared/chunk-KEZTCCJA.js";
import "/build/_shared/chunk-RHBRPB6O.js";
import "/build/_shared/chunk-HAPJVBBN.js";
import {
  AgentSelection
} from "/build/_shared/chunk-CUIM2CAQ.js";
import {
  FilterActions
} from "/build/_shared/chunk-DFTZ2CPD.js";
import {
  FilterGroupService,
  SavedFilters
} from "/build/_shared/chunk-AP4ZRCYL.js";
import {
  FilterPanel
} from "/build/_shared/chunk-DNVXOUNB.js";
import "/build/_shared/chunk-JP32FIMV.js";
import {
  LeadService
} from "/build/_shared/chunk-YDU6SJNY.js";
import {
  useFetcher,
  useLoaderData
} from "/build/_shared/chunk-QWJ64ZKI.js";
import "/build/_shared/chunk-OPGM6WIO.js";
import "/build/_shared/chunk-WCLFPUDL.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  AutoFilter
} from "/build/_shared/chunk-OCDX3SJJ.js";
import {
  LeadList
} from "/build/_shared/chunk-7UMRVVBV.js";
import {
  createHotContext
} from "/build/_shared/chunk-WWESKXYW.js";
import "/build/_shared/chunk-N4FG5RPV.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WWEL7QKW.js";
import {
  require_react
} from "/build/_shared/chunk-2AFRYLX2.js";
import {
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// app/routes/assignments.index.tsx
var import_react = __toESM(require_react());
var import_node = __toESM(require_node());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.index.tsx"
  );
  import.meta.hot.lastModified = "1748853862382.5044";
}
function Assignments() {
  _s();
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const [selectedLeads, setSelectedLeads] = (0, import_react.useState)([]);
  const [selectedAgents, setSelectedAgents] = (0, import_react.useState)([]);
  const [filteredLeads, setFilteredLeads] = (0, import_react.useState)(loaderData.initialLeads);
  const [activeFilters, setActiveFilters] = (0, import_react.useState)({});
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [selectedCampanya, setSelectedCampanya] = (0, import_react.useState)(null);
  const [assignmentType, setAssignmentType] = (0, import_react.useState)("roundRobin");
  const [prioritat, setPrioritat] = (0, import_react.useState)(2);
  const [potencial, setPotencial] = (0, import_react.useState)(3);
  const [observaciones, setObservaciones] = (0, import_react.useState)("");
  const [showAutoFilterConfig, setShowAutoFilterConfig] = (0, import_react.useState)(false);
  const [filterError, setFilterError] = (0, import_react.useState)(null);
  const [showSavedFilters, setShowSavedFilters] = (0, import_react.useState)(false);
  const applyFilters = async (filters) => {
    setIsLoading(true);
    setActiveFilters(filters);
    setFilterError(null);
    try {
      const apiFilters = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== void 0 && value !== "") {
          if (key === "any_creacio_lead") {
            apiFilters[key] = String(value);
          } else if (["actiu_lead", "cotitza_borsa_lead", "nomes_temporada_lead", "conciencia_ecologica_lead", "solidaria_social_lead"].includes(key)) {
            apiFilters[key] = typeof value === "string" ? value === "true" : Boolean(value);
          } else if (["mida_lead", "nombre_treballadors_lead_min", "nombre_treballadors_lead_max", "capital_social_lead_min", "capital_social_lead_max"].includes(key)) {
            apiFilters[key] = Number(value);
          } else {
            apiFilters[key] = value;
          }
        }
      });
      console.log("Aplicando filtros:", apiFilters);
      console.log("Active filters actualizados:", filters);
      const leads = await LeadService.getUnassigned(0, 100, apiFilters);
      setFilteredLeads(leads);
      if (leads.length === 0) {
        setFilterError("No se encontraron leads con los filtros aplicados.");
      }
      setSelectedLeads([]);
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
      setFilterError("Error al consultar los datos. Por favor, int\xE9ntalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleAssign = () => {
    if (selectedLeads.length === 0 || selectedAgents.length === 0 || !selectedCampanya) {
      return;
    }
    const formData = new FormData();
    formData.append("action", "assignLeads");
    formData.append("leadIds", JSON.stringify(selectedLeads.map((lead) => lead.id_lead)));
    formData.append("agentIds", JSON.stringify(selectedAgents.map((agent) => agent.id_agent)));
    formData.append("assignmentType", assignmentType);
    formData.append("prioritat", prioritat.toString());
    formData.append("potencial", potencial.toString());
    formData.append("observaciones", observaciones);
    formData.append("campanyaId", selectedCampanya.toString());
    fetcher.submit(formData, {
      method: "post"
    });
  };
  const handleSaveFilterGroup = (name, description) => {
    if (!name.trim())
      return;
    FilterGroupService.create(name, description, activeFilters).then((response) => {
      console.log("Grupo de filtros guardado:", response);
      const formData = new FormData();
      formData.append("action", "notification");
      formData.append("type", "success");
      formData.append("message", `Grupo de filtros "${name}" guardado correctamente.`);
      fetcher.submit(formData, {
        method: "post"
      });
    }).catch((error) => {
      console.error("Error al guardar grupo de filtros:", error);
      const formData = new FormData();
      formData.append("action", "notification");
      formData.append("type", "error");
      formData.append("message", "No se pudo guardar el grupo de filtros. Por favor, int\xE9ntelo de nuevo.");
      fetcher.submit(formData, {
        method: "post"
      });
    });
  };
  (0, import_react.useEffect)(() => {
    if (fetcher.data?.success && fetcher.data?.type !== "success") {
      applyFilters(activeFilters);
    }
  }, [fetcher.data]);
  const activeFilterCount = Object.keys(activeFilters).length;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white shadow-sm border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-5", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold text-gray-900", children: "Asignaci\xF3n de Leads" }, void 0, false, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 241,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-1 text-sm text-gray-500", children: "Busca, filtra y asigna leads a tus agentes comerciales" }, void 0, false, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 242,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.index.tsx",
      lineNumber: 240,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.index.tsx",
      lineNumber: 239,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.index.tsx",
      lineNumber: 238,
      columnNumber: 7
    }, this),
    (fetcher.data?.message || fetcher.data?.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4", children: [
      fetcher.data?.message && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md flex items-center mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 253,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 252,
          columnNumber: 15
        }, this),
        fetcher.data.message
      ] }, void 0, true, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 251,
        columnNumber: 37
      }, this),
      fetcher.data?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5 mr-2", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", clipRule: "evenodd" }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 259,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 258,
          columnNumber: 15
        }, this),
        fetcher.data.error
      ] }, void 0, true, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 257,
        columnNumber: 35
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.index.tsx",
      lineNumber: 250,
      columnNumber: 58
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:col-span-3 space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FilterPanel, { onApplyFilters: applyFilters, initialFilters: activeFilters, isLoading, activeFilterCount }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 271,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FilterActions, { activeFilters, onSaveFilters: handleSaveFilterGroup, onToggleAutoFilter: () => setShowAutoFilterConfig(!showAutoFilterConfig), onToggleSavedFilters: () => setShowSavedFilters(!showSavedFilters), showAutoFilter: showAutoFilterConfig, showSavedFilters }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 274,
          columnNumber: 13
        }, this),
        filterError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: filterError }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 278,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 277,
          columnNumber: 29
        }, this),
        showSavedFilters && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-indigo-50 px-4 py-3 border-b border-indigo-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-base font-medium text-indigo-800", children: "Filtros guardados" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 284,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 283,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SavedFilters, { onSelectFilter: applyFilters }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 287,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 286,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 282,
          columnNumber: 34
        }, this),
        showAutoFilterConfig && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-indigo-50 px-4 py-3 border-b border-indigo-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-base font-medium text-indigo-800", children: "Automatizaci\xF3n de filtros" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 294,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 293,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AutoFilter, { selectedFilters: activeFilters, agents: loaderData.agents, campanyas: loaderData.campanyas }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 297,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 296,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 292,
          columnNumber: 38
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 269,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:col-span-9 space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium text-gray-800", children: "Leads disponibles" }, void 0, false, {
                fileName: "app/routes/assignments.index.tsx",
                lineNumber: 308,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500 mt-0.5", children: [
                filteredLeads.length,
                " leads encontrados \u2022 ",
                selectedLeads.length,
                " seleccionados"
              ] }, void 0, true, {
                fileName: "app/routes/assignments.index.tsx",
                lineNumber: 311,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 307,
              columnNumber: 17
            }, this),
            isLoading && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center text-blue-600", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
                  fileName: "app/routes/assignments.index.tsx",
                  lineNumber: 317,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
                  fileName: "app/routes/assignments.index.tsx",
                  lineNumber: 318,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.index.tsx",
                lineNumber: 316,
                columnNumber: 21
              }, this),
              "Cargando..."
            ] }, void 0, true, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 315,
              columnNumber: 31
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 306,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LeadList, { leads: filteredLeads, selectedLeads, onSelectLeads: setSelectedLeads, isLoading }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 324,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 305,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 px-4 py-3 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium text-gray-800", children: "Configurar asignaci\xF3n" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 330,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 329,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AgentSelection, { agents: loaderData.agents, campanyas: loaderData.campanyas, selectedAgents, onSelectAgents: setSelectedAgents, selectedCampanya, onSelectCampanya: setSelectedCampanya, assignmentType, onChangeAssignmentType: setAssignmentType, prioritat, onChangePrioritat: setPrioritat, potencial, onChangePotencial: setPotencial, observaciones, onChangeObservaciones: setObservaciones }, void 0, false, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 336,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2", onClick: handleAssign, disabled: selectedLeads.length === 0 || selectedAgents.length === 0 || !selectedCampanya || fetcher.state !== "idle", children: fetcher.state !== "idle" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin h-5 w-5", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
                  fileName: "app/routes/assignments.index.tsx",
                  lineNumber: 342,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
                  fileName: "app/routes/assignments.index.tsx",
                  lineNumber: 343,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.index.tsx",
                lineNumber: 341,
                columnNumber: 25
              }, this),
              "Asignando..."
            ] }, void 0, true, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 340,
              columnNumber: 49
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }, void 0, false, {
                fileName: "app/routes/assignments.index.tsx",
                lineNumber: 348,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "app/routes/assignments.index.tsx",
                lineNumber: 347,
                columnNumber: 25
              }, this),
              "Asignar ",
              selectedLeads.length,
              " leads a ",
              selectedAgents.length,
              " agentes"
            ] }, void 0, true, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 346,
              columnNumber: 29
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 339,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 338,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 335,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 328,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 303,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.index.tsx",
      lineNumber: 267,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.index.tsx",
      lineNumber: 266,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.index.tsx",
    lineNumber: 236,
    columnNumber: 10
  }, this);
}
_s(Assignments, "wPwnu+a9v9HczXcYTsCeR2GCrHk=", false, function() {
  return [useLoaderData, useFetcher];
});
_c = Assignments;
var _c;
$RefreshReg$(_c, "Assignments");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Assignments as default
};
//# sourceMappingURL=/build/routes/assignments.index-RQYZS6Z3.js.map
