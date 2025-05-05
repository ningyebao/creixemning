import {
  AssignacioService
} from "/build/_shared/chunk-CLWOU23L.js";
import "/build/_shared/chunk-MDGFDLOQ.js";
import "/build/_shared/chunk-52EIYT2B.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams
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

// app/routes/assignments._index.tsx
var import_node = __toESM(require_node());
var import_react3 = __toESM(require_react());

// app/components/domain/AssignmentsTable.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\domain\\\\AssignmentsTable.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\domain\\AssignmentsTable.tsx"
  );
  import.meta.hot.lastModified = "1744390624970.1648";
}
function AssignmentsTable({
  assignments,
  showActions = true,
  onStatusChange
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ID" }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 32,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Lead" }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 35,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Agente" }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 38,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Campa\xF1a" }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 41,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Estado" }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 44,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Prioridad" }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 47,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Potencial" }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 50,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fecha" }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 53,
        columnNumber: 13
      }, this),
      showActions && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 56,
        columnNumber: 29
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/domain/AssignmentsTable.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/domain/AssignmentsTable.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: assignments.map((assignment) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: assignment.id_fitxes_asignacions }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 63,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: assignment.id_leads }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 66,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: assignment.id_agents }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 69,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: assignment.id_campanya_leads }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 72,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: onStatusChange ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { value: assignment.estat_fitxes_assignacions, onChange: (e) => onStatusChange(assignment.id_fitxes_asignacions, e.target.value), className: "border rounded px-2 py-1 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Pendiente", children: "Pendiente" }, void 0, false, {
          fileName: "app/components/domain/AssignmentsTable.tsx",
          lineNumber: 77,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "En progreso", children: "En progreso" }, void 0, false, {
          fileName: "app/components/domain/AssignmentsTable.tsx",
          lineNumber: 78,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Completada", children: "Completada" }, void 0, false, {
          fileName: "app/components/domain/AssignmentsTable.tsx",
          lineNumber: 79,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Cancelada", children: "Cancelada" }, void 0, false, {
          fileName: "app/components/domain/AssignmentsTable.tsx",
          lineNumber: 80,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 76,
        columnNumber: 35
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${assignment.estat_fitxes_assignacions === "Pendiente" ? "bg-blue-100 text-blue-800" : assignment.estat_fitxes_assignacions === "En progreso" ? "bg-yellow-100 text-yellow-800" : assignment.estat_fitxes_assignacions === "Completada" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: assignment.estat_fitxes_assignacions }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 81,
        columnNumber: 31
      }, this) }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 75,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: assignment.prioritat_fitxes_assignacions }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 87,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 86,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: assignment.potencial_fitxes_assignacions }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 92,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 91,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(assignment.data_creacio_fitxes_assignacions).toLocaleDateString() }, void 0, false, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 96,
        columnNumber: 15
      }, this),
      showActions && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/assignments/${assignment.id_fitxes_asignacions}`, className: "text-blue-600 hover:text-blue-900 mr-3", children: "Ver" }, void 0, false, {
          fileName: "app/components/domain/AssignmentsTable.tsx",
          lineNumber: 100,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/assignments/${assignment.id_fitxes_asignacions}/edit`, className: "text-green-600 hover:text-green-900 mr-3", children: "Editar" }, void 0, false, {
          fileName: "app/components/domain/AssignmentsTable.tsx",
          lineNumber: 103,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/assignments/${assignment.id_fitxes_asignacions}/delete`, className: "text-red-600 hover:text-red-900", children: "Eliminar" }, void 0, false, {
          fileName: "app/components/domain/AssignmentsTable.tsx",
          lineNumber: 106,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/domain/AssignmentsTable.tsx",
        lineNumber: 99,
        columnNumber: 31
      }, this)
    ] }, assignment.id_fitxes_asignacions, true, {
      fileName: "app/components/domain/AssignmentsTable.tsx",
      lineNumber: 62,
      columnNumber: 42
    }, this)) }, void 0, false, {
      fileName: "app/components/domain/AssignmentsTable.tsx",
      lineNumber: 61,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/domain/AssignmentsTable.tsx",
    lineNumber: 29,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/domain/AssignmentsTable.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
}
_c = AssignmentsTable;
var _c;
$RefreshReg$(_c, "AssignmentsTable");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/assignments._index.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments._index.tsx"
  );
  import.meta.hot.lastModified = "1745592840167.5986";
}
function AssignmentsIndex() {
  _s();
  const loaderData = useLoaderData();
  const assignments = loaderData.assignments;
  const agents = loaderData.agents;
  const page = loaderData.page;
  const limit = loaderData.limit;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedAgentId, setSelectedAgentId] = (0, import_react3.useState)(searchParams.get("agent") || "");
  const [selectedStatus, setSelectedStatus] = (0, import_react3.useState)(searchParams.get("status") || "");
  const changePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedAgentId) {
      params.set("agent", selectedAgentId);
    }
    if (selectedStatus) {
      params.set("status", selectedStatus);
    }
    params.set("limit", limit.toString());
    params.set("page", "0");
    setSearchParams(params);
  };
  const clearFilters = () => {
    setSelectedAgentId("");
    setSelectedStatus("");
    setSearchParams(new URLSearchParams({
      page: "0",
      limit: limit.toString()
    }));
  };
  const handleStatusChange = async (assignmentId, newStatus) => {
    try {
      await AssignacioService.update(assignmentId, {
        estat_fitxes_assignacions: newStatus
      });
      navigate(".", {
        replace: true
      });
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      alert("Error al cambiar el estado de la asignaci\xF3n");
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Gesti\xF3n de Asignaciones" }, void 0, false, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { to: "/assignments/new", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "+ Nueva asignaci\xF3n" }, void 0, false, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 141,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments._index.tsx",
      lineNumber: 139,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-white p-4 rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Filtros" }, void 0, false, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Agente:" }, void 0, false, {
            fileName: "app/routes/assignments._index.tsx",
            lineNumber: 152,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { className: "w-full border rounded p-2", value: selectedAgentId, onChange: (e) => setSelectedAgentId(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Todos los agentes" }, void 0, false, {
              fileName: "app/routes/assignments._index.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, this),
            agents && agents.map((agent) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: agent.id_agent.toString(), children: agent.nom_agent }, agent.id_agent, false, {
              fileName: "app/routes/assignments._index.tsx",
              lineNumber: 155,
              columnNumber: 46
            }, this))
          ] }, void 0, true, {
            fileName: "app/routes/assignments._index.tsx",
            lineNumber: 153,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments._index.tsx",
          lineNumber: 151,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Estado:" }, void 0, false, {
            fileName: "app/routes/assignments._index.tsx",
            lineNumber: 162,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { className: "w-full border rounded p-2", value: selectedStatus, onChange: (e) => setSelectedStatus(e.target.value), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Todos los estados" }, void 0, false, {
              fileName: "app/routes/assignments._index.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Pendiente", children: "Pendiente" }, void 0, false, {
              fileName: "app/routes/assignments._index.tsx",
              lineNumber: 165,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "En progreso", children: "En progreso" }, void 0, false, {
              fileName: "app/routes/assignments._index.tsx",
              lineNumber: 166,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Completada", children: "Completada" }, void 0, false, {
              fileName: "app/routes/assignments._index.tsx",
              lineNumber: 167,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "Cancelada", children: "Cancelada" }, void 0, false, {
              fileName: "app/routes/assignments._index.tsx",
              lineNumber: 168,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments._index.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments._index.tsx",
          lineNumber: 161,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-end space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: applyFilters, className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Aplicar filtros" }, void 0, false, {
            fileName: "app/routes/assignments._index.tsx",
            lineNumber: 173,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: clearFilters, className: "px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300", children: "Limpiar filtros" }, void 0, false, {
            fileName: "app/routes/assignments._index.tsx",
            lineNumber: 176,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments._index.tsx",
          lineNumber: 172,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 150,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments._index.tsx",
      lineNumber: 147,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-lg font-medium", children: [
        "Asignaciones (",
        assignments ? assignments.length : 0,
        ")"
      ] }, void 0, true, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 186,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 185,
        columnNumber: 9
      }, this),
      assignments && assignments.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(AssignmentsTable, { assignments, onStatusChange: handleStatusChange }, void 0, false, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 189,
        columnNumber: 50
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "p-6 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-gray-500", children: "No se encontraron asignaciones" }, void 0, false, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 190,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 189,
        columnNumber: 135
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "px-6 py-4 border-t border-gray-200 flex justify-between items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: () => changePage(Math.max(0, page - 1)), disabled: page === 0, className: `px-4 py-2 rounded ${page === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`, children: "Anterior" }, void 0, false, {
          fileName: "app/routes/assignments._index.tsx",
          lineNumber: 195,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "text-sm text-gray-700", children: [
          "P\xE1gina ",
          page + 1,
          " \u2022 ",
          limit,
          " por p\xE1gina"
        ] }, void 0, true, {
          fileName: "app/routes/assignments._index.tsx",
          lineNumber: 199,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: () => changePage(page + 1), disabled: assignments && assignments.length < limit, className: `px-4 py-2 rounded ${assignments && assignments.length < limit ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`, children: "Siguiente" }, void 0, false, {
          fileName: "app/routes/assignments._index.tsx",
          lineNumber: 203,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments._index.tsx",
        lineNumber: 194,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments._index.tsx",
      lineNumber: 184,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments._index.tsx",
    lineNumber: 138,
    columnNumber: 10
  }, this);
}
_s(AssignmentsIndex, "tophMEmUQa6BZqdV/MvUbTZaTaQ=", false, function() {
  return [useLoaderData, useSearchParams, useNavigate];
});
_c2 = AssignmentsIndex;
var _c2;
$RefreshReg$(_c2, "AssignmentsIndex");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AssignmentsIndex as default
};
//# sourceMappingURL=/build/routes/assignments._index-MYWPNFPC.js.map
