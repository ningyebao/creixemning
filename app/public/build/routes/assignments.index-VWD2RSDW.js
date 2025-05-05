import "/build/_shared/chunk-URVRSERQ.js";
import "/build/_shared/chunk-CLWOU23L.js";
import "/build/_shared/chunk-MDGFDLOQ.js";
import "/build/_shared/chunk-52EIYT2B.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  Link,
  useLoaderData
} from "/build/_shared/chunk-627P7KH4.js";
import {
  createHotContext
} from "/build/_shared/chunk-XR3XMPCQ.js";
import "/build/_shared/chunk-N4FG5RPV.js";
import "/build/_shared/chunk-OPGM6WIO.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-WWEL7QKW.js";
import "/build/_shared/chunk-2AFRYLX2.js";
import {
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// app/routes/assignments.index.tsx
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
  import.meta.hot.lastModified = "1745309159618.5696";
}
function Index() {
  _s();
  const data = useLoaderData();
  const recentAssignments = data.recentAssignments || [];
  const metrics = data.metrics || {
    totalAssignments: 0,
    pendingAssignments: 0,
    inProgressAssignments: 0,
    completedAssignments: 0,
    totalLeads: 0,
    totalAgents: 0
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold mb-6", children: "Dashboard" }, void 0, false, {
      fileName: "app/routes/assignments.index.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-gray-500 text-sm font-medium", children: "ASIGNACIONES" }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center mt-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-3xl font-bold", children: metrics.totalAssignments }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-auto flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-green-500 flex items-center text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1", children: "\u2713" }, void 0, false, {
                fileName: "app/routes/assignments.index.tsx",
                lineNumber: 85,
                columnNumber: 17
              }, this),
              " ",
              metrics.completedAssignments,
              " completadas"
            ] }, void 0, true, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 84,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-yellow-500 flex items-center text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1", children: "\u27F3" }, void 0, false, {
                fileName: "app/routes/assignments.index.tsx",
                lineNumber: 88,
                columnNumber: 17
              }, this),
              " ",
              metrics.inProgressAssignments,
              " en progreso"
            ] }, void 0, true, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 87,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-blue-500 flex items-center text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1", children: "\u25EF" }, void 0, false, {
                fileName: "app/routes/assignments.index.tsx",
                lineNumber: 91,
                columnNumber: 17
              }, this),
              " ",
              metrics.pendingAssignments,
              " pendientes"
            ] }, void 0, true, {
              fileName: "app/routes/assignments.index.tsx",
              lineNumber: 90,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 83,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 81,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-gray-500 text-sm font-medium", children: "LEADS" }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 98,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center mt-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-3xl font-bold", children: metrics.totalLeads }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 100,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-auto" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 101,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 99,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-gray-500 text-sm font-medium", children: "AGENTES" }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 108,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center mt-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-3xl font-bold", children: metrics.totalAgents }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 110,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/agents", className: "bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700", children: "Ver agentes" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 112,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 111,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 109,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.index.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium", children: "Asignaciones recientes" }, void 0, false, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 123,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 122,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "ID" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 129,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Lead" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 130,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Agente" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 131,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Estado" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 132,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Prioridad" }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 133,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 128,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 127,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: recentAssignments.map((assignment) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: assignment.id_fitxes_asignacions }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 138,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: assignment.id_leads }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 139,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: assignment.id_agents }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 140,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${assignment.estat_fitxes_assignacions === "Pendiente" ? "bg-blue-100 text-blue-800" : assignment.estat_fitxes_assignacions === "En progreso" ? "bg-yellow-100 text-yellow-800" : assignment.estat_fitxes_assignacions === "Completada" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: assignment.estat_fitxes_assignacions }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 142,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 141,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: assignment.prioritat_fitxes_assignacions }, void 0, false, {
            fileName: "app/routes/assignments.index.tsx",
            lineNumber: 147,
            columnNumber: 19
          }, this)
        ] }, assignment.id_fitxes_asignacions, true, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 137,
          columnNumber: 52
        }, this)) }, void 0, false, {
          fileName: "app/routes/assignments.index.tsx",
          lineNumber: 136,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 126,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.index.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.index.tsx",
      lineNumber: 121,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.index.tsx",
    lineNumber: 75,
    columnNumber: 10
  }, this);
}
_s(Index, "5thj+e1edPyRpKif1JmVRC6KArE=", false, function() {
  return [useLoaderData];
});
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/assignments.index-VWD2RSDW.js.map
