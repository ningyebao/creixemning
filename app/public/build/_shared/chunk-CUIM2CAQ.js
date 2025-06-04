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

// app/routes/assignments.agent-selection.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.agent-selection.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.agent-selection.tsx"
  );
  import.meta.hot.lastModified = "1748452010311.549";
}
function AgentSelection({
  agents,
  campanyas,
  selectedAgents,
  onSelectAgents,
  selectedCampanya,
  onSelectCampanya,
  assignmentType,
  onChangeAssignmentType,
  prioritat,
  onChangePrioritat,
  potencial,
  onChangePotencial,
  observaciones,
  onChangeObservaciones
}) {
  _s();
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const toggleAgentSelection = (agent) => {
    const isSelected = selectedAgents.some((selectedAgent) => selectedAgent.id_agent === agent.id_agent);
    if (isSelected) {
      onSelectAgents(selectedAgents.filter((selectedAgent) => selectedAgent.id_agent !== agent.id_agent));
    } else {
      onSelectAgents([...selectedAgents, agent]);
    }
  };
  const filteredAgents = agents.filter((agent) => {
    const searchTermLower = searchTerm.toLowerCase();
    return agent.nom_agent.toLowerCase().includes(searchTermLower) || agent.cognom1_agent.toLowerCase().includes(searchTermLower) || agent.cognom2_agent && agent.cognom2_agent.toLowerCase().includes(searchTermLower) || agent.telefon_agent && agent.telefon_agent.toLowerCase().includes(searchTermLower) || agent.NIF_agent && agent.NIF_agent.toLowerCase().includes(searchTermLower);
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "campanya", className: "block text-sm font-medium text-gray-700 mb-1", children: [
        "Seleccionar campa\xF1a ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-red-500", children: "*" }, void 0, false, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 62,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "campanya", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: selectedCampanya || "", onChange: (e) => onSelectCampanya(e.target.value ? Number(e.target.value) : null), required: true, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Seleccionar campa\xF1a" }, void 0, false, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 65,
          columnNumber: 11
        }, this),
        campanyas.map((campanya) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: campanya.id_campanya, children: campanya.campanya_nom }, campanya.id_campanya, false, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 66,
          columnNumber: 38
        }, this))
      ] }, void 0, true, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.agent-selection.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tipo de asignaci\xF3n" }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", id: "roundRobin", name: "assignmentType", className: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500", checked: assignmentType === "roundRobin", onChange: () => onChangeAssignmentType("roundRobin") }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 79,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "roundRobin", className: "ml-2 block text-sm text-gray-700", children: "Distribuci\xF3n equitativa (un lead por agente)" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 80,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", id: "all", name: "assignmentType", className: "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500", checked: assignmentType === "all", onChange: () => onChangeAssignmentType("all") }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 85,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "all", className: "ml-2 block text-sm text-gray-700", children: "Asignar todos los leads a todos los agentes" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 86,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.agent-selection.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "prioritat", className: "block text-sm font-medium text-gray-700 mb-1", children: "Prioridad" }, void 0, false, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 96,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "prioritat", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: prioritat, onChange: (e) => onChangePrioritat(Number(e.target.value)), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "Baja" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 100,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "Media" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 101,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "Alta" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 102,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 99,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "potencial", className: "block text-sm font-medium text-gray-700 mb-1", children: "Potencial" }, void 0, false, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 106,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "potencial", className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: potencial, onChange: (e) => onChangePotencial(Number(e.target.value)), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "Bajo" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 110,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "Medio-bajo" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 111,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "Medio" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 112,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "Medio-alto" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 113,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "Alto" }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 114,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 109,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 105,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.agent-selection.tsx",
      lineNumber: 94,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "observaciones", className: "block text-sm font-medium text-gray-700 mb-1", children: "Observaciones" }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 121,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "observaciones", rows: 3, className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", value: observaciones, onChange: (e) => onChangeObservaciones(e.target.value), placeholder: "A\xF1ade notas o instrucciones para los agentes..." }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 124,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.agent-selection.tsx",
      lineNumber: 120,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [
        "Seleccionar agentes ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-red-500", children: "*" }, void 0, false, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 130,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 129,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Buscar agentes...", className: "w-full p-2 border border-gray-300 rounded-md", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 135,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 134,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border border-gray-300 rounded-md overflow-hidden max-h-60 overflow-y-auto", children: filteredAgents.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 text-center text-gray-500", children: "No se encontraron agentes" }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 140,
        columnNumber: 42
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "divide-y divide-gray-200", children: filteredAgents.map((agent) => {
        const isSelected = selectedAgents.some((selectedAgent) => selectedAgent.id_agent === agent.id_agent);
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: `px-4 py-3 hover:bg-gray-50 cursor-pointer ${isSelected ? "bg-blue-50" : ""}`, onClick: () => toggleAgentSelection(agent), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500", checked: isSelected, onChange: () => {
          }, onClick: (e) => e.stopPropagation() }, void 0, false, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 147,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium text-gray-900", children: [
              agent.nom_agent,
              " ",
              agent.cognom1_agent,
              " ",
              agent.cognom2_agent || ""
            ] }, void 0, true, {
              fileName: "app/routes/assignments.agent-selection.tsx",
              lineNumber: 149,
              columnNumber: 25
            }, this),
            agent.telefon_agent && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500", children: [
              "Tel: ",
              agent.telefon_agent
            ] }, void 0, true, {
              fileName: "app/routes/assignments.agent-selection.tsx",
              lineNumber: 152,
              columnNumber: 49
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.agent-selection.tsx",
            lineNumber: 148,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 146,
          columnNumber: 21
        }, this) }, agent.id_agent, false, {
          fileName: "app/routes/assignments.agent-selection.tsx",
          lineNumber: 145,
          columnNumber: 20
        }, this);
      }) }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 142,
        columnNumber: 22
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 139,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 text-sm text-gray-500", children: selectedAgents.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "No hay agentes seleccionados" }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 164,
        columnNumber: 42
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
        selectedAgents.length,
        " agente",
        selectedAgents.length !== 1 ? "s" : "",
        " seleccionado",
        selectedAgents.length !== 1 ? "s" : ""
      ] }, void 0, true, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 164,
        columnNumber: 80
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.agent-selection.tsx",
        lineNumber: 163,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.agent-selection.tsx",
      lineNumber: 128,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.agent-selection.tsx",
    lineNumber: 58,
    columnNumber: 10
  }, this);
}
_s(AgentSelection, "a1cMJ8t0eYFnsCEdGcHtaGJdbCM=");
_c = AgentSelection;
var _c;
$RefreshReg$(_c, "AgentSelection");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  AgentSelection
};
//# sourceMappingURL=/build/_shared/chunk-CUIM2CAQ.js.map
