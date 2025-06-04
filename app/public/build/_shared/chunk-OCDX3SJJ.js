import {
  createHotContext
} from "/build/_shared/chunk-WWESKXYW.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WWEL7QKW.js";
import {
  require_react
} from "/build/_shared/chunk-2AFRYLX2.js";
import {
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// app/routes/assignments.auto-filter.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.auto-filter.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.auto-filter.tsx"
  );
  import.meta.hot.lastModified = "1748618999726.36";
}
function AutoFilter({
  selectedFilters,
  agents,
  campanyas
}) {
  _s();
  const [isActive, setIsActive] = (0, import_react.useState)(false);
  const [selectedAgentIds, setSelectedAgentIds] = (0, import_react.useState)([]);
  const [selectedCampanyaIds, setSelectedCampanyaIds] = (0, import_react.useState)([]);
  const [distribucion, setDistribucion] = (0, import_react.useState)("equitativo");
  const [prioritat, setPrioritat] = (0, import_react.useState)(2);
  const [potencial, setPotencial] = (0, import_react.useState)(3);
  const [observaciones, setObservaciones] = (0, import_react.useState)("");
  const [frequency, setFrequency] = (0, import_react.useState)("daily");
  const [dayOfWeek, setDayOfWeek] = (0, import_react.useState)(1);
  const [dayOfMonth, setDayOfMonth] = (0, import_react.useState)(1);
  const [time, setTime] = (0, import_react.useState)("09:00");
  const toggleAgentSelection = (agentId) => {
    if (selectedAgentIds.includes(agentId)) {
      setSelectedAgentIds(selectedAgentIds.filter((id) => id !== agentId));
    } else {
      setSelectedAgentIds([...selectedAgentIds, agentId]);
    }
  };
  const toggleCampanyaSelection = (campanyaId) => {
    if (selectedCampanyaIds.includes(campanyaId)) {
      setSelectedCampanyaIds(selectedCampanyaIds.filter((id) => id !== campanyaId));
    } else {
      setSelectedCampanyaIds([...selectedCampanyaIds, campanyaId]);
    }
  };
  const saveAutoFilterConfig = () => {
    const config = {
      isActive,
      agentIds: selectedAgentIds,
      campanyaIds: selectedCampanyaIds,
      distribucion,
      prioritat,
      potencial,
      observaciones,
      schedule: {
        frequency,
        ...frequency === "weekly" && {
          dayOfWeek
        },
        ...frequency === "monthly" && {
          dayOfMonth
        },
        time,
        lastRun: null,
        nextRun: null
      },
      filters: selectedFilters
    };
    console.log("Configuraci\xF3n de automatizaci\xF3n guardada:", config);
    alert("Configuraci\xF3n de automatizaci\xF3n guardada correctamente");
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-900", children: "Automatizaci\xF3n de asignaciones" }, void 0, false, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 94,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Configura la asignaci\xF3n autom\xE1tica de leads que coincidan con estos filtros" }, void 0, false, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 95,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm font-medium text-gray-700", children: "Activar automatizaci\xF3n" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 101,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "relative inline-flex items-center cursor-pointer", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", checked: isActive, onChange: () => setIsActive(!isActive), className: "sr-only peer" }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 105,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 106,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 100,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Agentes para asignaci\xF3n autom\xE1tica" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 112,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border border-gray-300 rounded-md overflow-hidden max-h-40 overflow-y-auto", children: agents.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 text-center text-gray-500", children: "No hay agentes disponibles" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 116,
        columnNumber: 34
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "divide-y divide-gray-200", children: agents.map((agent) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `px-4 py-2 hover:bg-gray-50 cursor-pointer ${selectedAgentIds.includes(agent.id_agent) ? "bg-blue-50" : ""}`, onClick: () => toggleAgentSelection(agent.id_agent), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500", checked: selectedAgentIds.includes(agent.id_agent), onChange: () => {
        }, onClick: (e) => e.stopPropagation() }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 121,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium text-gray-900", children: [
          agent.nom_agent,
          " ",
          agent.cognom1_agent,
          " ",
          agent.cognom2_agent || ""
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 123,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 122,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 120,
        columnNumber: 19
      }, this) }, agent.id_agent, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 119,
        columnNumber: 36
      }, this)) }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 118,
        columnNumber: 22
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 115,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 111,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Campa\xF1as para asignaci\xF3n autom\xE1tica" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border border-gray-300 rounded-md overflow-hidden max-h-40 overflow-y-auto", children: campanyas.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 text-center text-gray-500", children: "No hay campa\xF1as disponibles" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 139,
        columnNumber: 37
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "divide-y divide-gray-200", children: campanyas.map((campanya) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `px-4 py-2 hover:bg-gray-50 cursor-pointer ${selectedCampanyaIds.includes(campanya.id_campanya) ? "bg-blue-50" : ""}`, onClick: () => toggleCampanyaSelection(campanya.id_campanya), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500", checked: selectedCampanyaIds.includes(campanya.id_campanya), onChange: () => {
        }, onClick: (e) => e.stopPropagation() }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 144,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium text-gray-900", children: campanya.campanya_nom }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 146,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 145,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 143,
        columnNumber: 19
      }, this) }, campanya.id_campanya, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 142,
        columnNumber: 42
      }, this)) }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 141,
        columnNumber: 22
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 134,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Tipo de distribuci\xF3n" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 158,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", id: "equitativo", name: "distribucion", className: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500", checked: distribucion === "equitativo", onChange: () => setDistribucion("equitativo") }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "equitativo", className: "ml-2 block text-sm text-gray-700", children: "Distribuci\xF3n equitativa (round-robin)" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 164,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 162,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", id: "todos", name: "distribucion", className: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500", checked: distribucion === "todos", onChange: () => setDistribucion("todos") }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 169,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "todos", className: "ml-2 block text-sm text-gray-700", children: "Asignar a todos los agentes" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 170,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 168,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 161,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 157,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "prioritat-auto", className: "block text-sm font-medium text-gray-700 mb-1", children: "Prioridad" }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 180,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "prioritat-auto", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: prioritat, onChange: (e) => setPrioritat(Number(e.target.value)), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "Baja" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 184,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "Media" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 185,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "Alta" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 186,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 183,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 179,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "potencial-auto", className: "block text-sm font-medium text-gray-700 mb-1", children: "Potencial" }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 190,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "potencial-auto", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: potencial, onChange: (e) => setPotencial(Number(e.target.value)), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "Bajo" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 194,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "Medio-bajo" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 195,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "Medio" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 196,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "Medio-alto" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 197,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "Alto" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 198,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 193,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 189,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "observaciones-auto", className: "block text-sm font-medium text-gray-700 mb-1", children: "Observaciones" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 205,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "observaciones-auto", rows: 2, className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: observaciones, onChange: (e) => setObservaciones(e.target.value), placeholder: "A\xF1ade notas o instrucciones para los agentes..." }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 204,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-sm font-medium text-gray-900 mb-2", children: "Programaci\xF3n" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "frequency", className: "block text-sm font-medium text-gray-700 mb-1", children: "Frecuencia" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 218,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "frequency", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: frequency, onChange: (e) => setFrequency(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "daily", children: "Diaria" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 222,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "weekly", children: "Semanal" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 223,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "monthly", children: "Mensual" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 224,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 221,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 217,
          columnNumber: 11
        }, this),
        frequency === "weekly" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "dayOfWeek", className: "block text-sm font-medium text-gray-700 mb-1", children: "D\xEDa de la semana" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 230,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "dayOfWeek", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: dayOfWeek, onChange: (e) => setDayOfWeek(Number(e.target.value)), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "Lunes" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 234,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "Martes" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 235,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "Mi\xE9rcoles" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 236,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "Jueves" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 237,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "Viernes" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 238,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "6", children: "S\xE1bado" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 239,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "0", children: "Domingo" }, void 0, false, {
              fileName: "app/routes/assignments.auto-filter.tsx",
              lineNumber: 240,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 233,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 229,
          columnNumber: 38
        }, this),
        frequency === "monthly" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "dayOfMonth", className: "block text-sm font-medium text-gray-700 mb-1", children: "D\xEDa del mes" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 246,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "dayOfMonth", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: dayOfMonth, onChange: (e) => setDayOfMonth(Number(e.target.value)), children: Array.from({
            length: 31
          }, (_, i) => i + 1).map((day) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: day, children: day }, day, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 252,
            columnNumber: 44
          }, this)) }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 249,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 245,
          columnNumber: 39
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "time", className: "block text-sm font-medium text-gray-700 mb-1", children: "Hora" }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 260,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "time", id: "time", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: time, onChange: (e) => setTime(e.target.value) }, void 0, false, {
            fileName: "app/routes/assignments.auto-filter.tsx",
            lineNumber: 263,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 259,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 215,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 212,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-sm font-medium text-gray-900 mb-2", children: "Filtros seleccionados" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 270,
        columnNumber: 9
      }, this),
      Object.keys(selectedFilters).length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "No hay filtros seleccionados" }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 272,
        columnNumber: 54
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-3 rounded-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "text-sm text-gray-600 space-y-1", children: Object.entries(selectedFilters).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: [
          key.replace(/_/g, " "),
          ":"
        ] }, void 0, true, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 275,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2", children: String(value) }, void 0, false, {
          fileName: "app/routes/assignments.auto-filter.tsx",
          lineNumber: 276,
          columnNumber: 19
        }, this)
      ] }, key, true, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 274,
        columnNumber: 70
      }, this)) }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 273,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.auto-filter.tsx",
        lineNumber: 272,
        columnNumber: 126
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 269,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", onClick: saveAutoFilterConfig, disabled: selectedAgentIds.length === 0 || selectedCampanyaIds.length === 0, children: "Guardar configuraci\xF3n de automatizaci\xF3n" }, void 0, false, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 284,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.auto-filter.tsx",
      lineNumber: 283,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.auto-filter.tsx",
    lineNumber: 93,
    columnNumber: 10
  }, this);
}
_s(AutoFilter, "H0rIGCxgaJujt1fhHq5Mq5RoiqU=");
_c = AutoFilter;
var _c;
$RefreshReg$(_c, "AutoFilter");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  AutoFilter
};
//# sourceMappingURL=/build/_shared/chunk-OCDX3SJJ.js.map
