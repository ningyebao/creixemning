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
  useLoaderData,
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

// app/routes/assignments.dashboard.tsx
var import_node = __toESM(require_node());
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.dashboard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.dashboard.tsx"
  );
  import.meta.hot.lastModified = "1745591945417.9143";
}
function AssignmentsDashboard() {
  _s();
  const data = useLoaderData();
  const {
    assignments = [],
    statusCounts = {},
    totalAssignments = 0,
    agentOptions = [],
    campaignOptions = [],
    currentPage = 1,
    totalPages = 1,
    itemsPerPage = 10,
    filterParams = {}
  } = data || {};
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = (0, import_react2.useState)(false);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente":
        return "bg-blue-100 text-blue-800";
      case "En progreso":
        return "bg-yellow-100 text-yellow-800";
      case "Completada":
        return "bg-green-100 text-green-800";
      case "Cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return "Muy baja";
      case 2:
        return "Baja";
      case 3:
        return "Media";
      case 4:
        return "Alta";
      case 5:
        return "Muy alta";
      default:
        return `${priority}`;
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const handleResetFilters = () => {
    const newParams = new URLSearchParams();
    newParams.set("page", "1");
    newParams.set("itemsPerPage", itemsPerPage.toString());
    setSearchParams(newParams);
  };
  const goToPage = (page) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  const safeStatusCounts = statusCounts || {};
  const totalStatusCount = Object.values(safeStatusCounts).reduce((sum, count) => sum + count, 0);
  const statusPercentages = Object.entries(safeStatusCounts).map(([status, count]) => ({
    status,
    count,
    percentage: totalStatusCount > 0 ? Math.round(count / totalStatusCount * 100) : 0
  }));
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Dashboard de Asignaciones" }, void 0, false, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 242,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/assignments/new", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-2", children: "+" }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 244,
          columnNumber: 11
        }, this),
        " Nueva Asignaci\xF3n"
      ] }, void 0, true, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 243,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.dashboard.tsx",
      lineNumber: 241,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-gray-500 text-sm font-medium", children: "TOTAL ASIGNACIONES" }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 251,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 text-3xl font-bold", children: totalAssignments }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 252,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 250,
        columnNumber: 9
      }, this),
      Object.entries(safeStatusCounts).length > 0 ? (
        // If we have status data, show it
        Object.entries(safeStatusCounts).map(([status, count]) => {
          const percentage = statusPercentages.find((sp) => sp.status === status)?.percentage || 0;
          const statusColorClass = getStatusColor(status).replace("bg-blue-100", "bg-blue-500").replace("bg-yellow-100", "bg-yellow-500").replace("bg-green-100", "bg-green-500").replace("bg-red-100", "bg-red-500").replace("text-blue-800", "").replace("text-yellow-800", "").replace("text-green-800", "").replace("text-red-800", "");
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow p-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-gray-500 text-sm font-medium", children: status.toUpperCase() }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 262,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 text-3xl font-bold", children: count }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 263,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-2.5 rounded-full ${statusColorClass}`, style: {
              width: `${percentage}%`
            } }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 265,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 264,
              columnNumber: 17
            }, this)
          ] }, status, true, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 261,
            columnNumber: 16
          }, this);
        })
      ) : (
        // Fallback cards if no status data yet
        ["Pendiente", "En progreso", "Completada"].map((status) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow p-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-gray-500 text-sm font-medium", children: status.toUpperCase() }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 273,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 text-3xl font-bold", children: "0" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 274,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 w-full bg-gray-200 rounded-full h-2.5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-2.5 rounded-full", style: {
            width: "0%"
          } }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 276,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 275,
            columnNumber: 15
          }, this)
        ] }, status, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 272,
          columnNumber: 64
        }, this))
      )
    ] }, void 0, true, {
      fileName: "app/routes/assignments.dashboard.tsx",
      lineNumber: 249,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200 flex justify-between items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium", children: "Filtros" }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 286,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => setShowFilters(!showFilters), className: "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm", children: showFilters ? "Ocultar filtros" : "Mostrar filtros" }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 287,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 285,
        columnNumber: 9
      }, this),
      showFilters && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "get", className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Estado:" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 295,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "status", className: "w-full border rounded p-2", defaultValue: filterParams.status || "", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todos" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 297,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Pendiente", children: "Pendiente" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 298,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "En progreso", children: "En progreso" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 299,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Completada", children: "Completada" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 300,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Cancelada", children: "Cancelada" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 301,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 296,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 294,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Agente:" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 306,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "agentId", className: "w-full border rounded p-2", defaultValue: filterParams.agentId || "", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todos" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 308,
              columnNumber: 19
            }, this),
            agentOptions.map((agent) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: agent.id, children: agent.name }, agent.id, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 309,
              columnNumber: 46
            }, this))
          ] }, void 0, true, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 307,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 305,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Campa\xF1a:" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 314,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "campaignId", className: "w-full border rounded p-2", defaultValue: filterParams.campaignId || "", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todas" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 316,
              columnNumber: 19
            }, this),
            campaignOptions.map((campaign) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: campaign.id, children: campaign.name }, campaign.id, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 317,
              columnNumber: 52
            }, this))
          ] }, void 0, true, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 315,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 313,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Prioridad:" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 322,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "priority", className: "w-full border rounded p-2", defaultValue: filterParams.priority || "", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todas" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 324,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "1 - Muy baja" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 325,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "2 - Baja" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 326,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "3 - Media" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 327,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "4 - Alta" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 328,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "5 - Muy alta" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 329,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 323,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 321,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Fecha Inicio:" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 334,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "startDate", className: "w-full border rounded p-2", defaultValue: filterParams.startDate }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 335,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 333,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", children: "Fecha Fin:" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 339,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "endDate", className: "w-full border rounded p-2", defaultValue: filterParams.endDate }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 340,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 338,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-3 flex space-x-4 mt-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Aplicar Filtros" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 344,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: handleResetFilters, className: "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300", children: "Limpiar Filtros" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 347,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 343,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 293,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 292,
        columnNumber: 25
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.dashboard.tsx",
      lineNumber: 284,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium", children: "Listado de Asignaciones" }, void 0, false, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 358,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 357,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ID" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 365,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Lead" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 366,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Agente" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 367,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Campa\xF1a" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 368,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Estado" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 369,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Prioridad" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 370,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fecha" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 371,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 372,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 364,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 363,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: assignments.length > 0 ? assignments.map(({
          assignment,
          leadName,
          agentName,
          campaignName
        }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: assignment.id_fitxes_asignacions }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 382,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm font-medium text-gray-900", children: leadName }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 384,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 383,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-900", children: agentName }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 387,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 386,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-900", children: campaignName }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 390,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 389,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(assignment.estat_fitxes_assignacions)}`, children: assignment.estat_fitxes_assignacions }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 393,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 392,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-2.5 w-${assignment.prioritat_fitxes_assignacions * 2} rounded bg-blue-600 mr-2` }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 399,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-gray-900", children: getPriorityLabel(assignment.prioritat_fitxes_assignacions) }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 400,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 398,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 397,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-500", children: formatDate(assignment.data_creacio_fitxes_assignacions) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 404,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 403,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/assignments/${assignment.id_fitxes_asignacions}`, className: "text-blue-600 hover:text-blue-900", children: "Ver" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 408,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/assignments/${assignment.id_fitxes_asignacions}/edit`, className: "text-green-600 hover:text-green-900", children: "Editar" }, void 0, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 411,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 407,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 406,
            columnNumber: 21
          }, this)
        ] }, assignment.id_fitxes_asignacions, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 381,
          columnNumber: 19
        }, this)) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { colSpan: 8, className: "px-6 py-4 text-center text-gray-500", children: "No se encontraron asignaciones con los filtros seleccionados" }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 417,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 416,
          columnNumber: 28
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 375,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 362,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 361,
        columnNumber: 9
      }, this),
      totalPages > 1 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between px-6 py-3 border-t border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-gray-700", children: [
          "Mostrando ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: (currentPage - 1) * itemsPerPage + 1 }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 429,
            columnNumber: 27
          }, this),
          " a ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: Math.min(currentPage * itemsPerPage, totalAssignments) }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 429,
            columnNumber: 105
          }, this),
          " de ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: totalAssignments }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 429,
            columnNumber: 202
          }, this),
          " resultados"
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 428,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 427,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => goToPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, className: `px-3 py-1 rounded text-sm ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`, children: "Anterior" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 434,
            columnNumber: 15
          }, this),
          Array.from({
            length: Math.min(5, totalPages)
          }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => goToPage(pageNum), className: `px-3 py-1 rounded text-sm ${currentPage === pageNum ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`, children: pageNum }, pageNum, false, {
              fileName: "app/routes/assignments.dashboard.tsx",
              lineNumber: 452,
              columnNumber: 20
            }, this);
          }),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => goToPage(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages, className: `px-3 py-1 rounded text-sm ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`, children: "Siguiente" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 457,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 433,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { value: itemsPerPage, onChange: (e) => {
          searchParams.set("itemsPerPage", e.target.value);
          searchParams.set("page", "1");
          setSearchParams(searchParams);
        }, className: "px-2 py-1 border rounded text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "5", children: "5 por p\xE1gina" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 468,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "10", children: "10 por p\xE1gina" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 469,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "25", children: "25 por p\xE1gina" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 470,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "50", children: "50 por p\xE1gina" }, void 0, false, {
            fileName: "app/routes/assignments.dashboard.tsx",
            lineNumber: 471,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 463,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.dashboard.tsx",
          lineNumber: 462,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.dashboard.tsx",
        lineNumber: 426,
        columnNumber: 28
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.dashboard.tsx",
      lineNumber: 356,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.dashboard.tsx",
    lineNumber: 240,
    columnNumber: 10
  }, this);
}
_s(AssignmentsDashboard, "BbXMKurMZKqp5mVg7bCrYUpIKIo=", false, function() {
  return [useLoaderData, useSearchParams];
});
_c = AssignmentsDashboard;
var _c;
$RefreshReg$(_c, "AssignmentsDashboard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AssignmentsDashboard as default
};
//# sourceMappingURL=/build/routes/assignments.dashboard-X262WTJ7.js.map
