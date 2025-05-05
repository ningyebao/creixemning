import "/build/_shared/chunk-URVRSERQ.js";
import "/build/_shared/chunk-CLWOU23L.js";
import "/build/_shared/chunk-MDGFDLOQ.js";
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

// app/routes/assignments.$id.tsx
var import_node = __toESM(require_node());
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.$id.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.$id.tsx"
  );
  import.meta.hot.lastModified = "1745591940636.8428";
}
function AssignmentView() {
  _s();
  const {
    assignacio,
    lead,
    agent
  } = useLoaderData();
  const [showDeleteConfirm, setShowDeleteConfirm] = (0, import_react2.useState)(false);
  const submit = useSubmit();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const handleStatusChange = (e) => {
    const formData = new FormData();
    formData.append("intent", "updateStatus");
    formData.append("status", e.target.value);
    submit(formData, {
      method: "post"
    });
  };
  const handleDelete = () => {
    const formData = new FormData();
    formData.append("intent", "delete");
    submit(formData, {
      method: "post"
    });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/assignments", className: "text-blue-600 hover:text-blue-800", children: "\u2190 Volver a asignaciones" }, void 0, false, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: [
          "Asignaci\xF3n #",
          assignacio.id_fitxes_asignacions
        ] }, void 0, true, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 136,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.$id.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/assignments/${assignacio.id_fitxes_asignacions}/edit`, className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Editar" }, void 0, false, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 141,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowDeleteConfirm(true), className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700", children: "Eliminar" }, void 0, false, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 144,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.$id.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.$id.tsx",
      lineNumber: 131,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow col-span-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4", children: "Detalles de la asignaci\xF3n" }, void 0, false, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 153,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-2", children: "Informaci\xF3n general" }, void 0, false, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 156,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "ID:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 159,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: assignacio.id_fitxes_asignacions }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 160,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 158,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "Campa\xF1a:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 163,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: assignacio.id_campanya_leads }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 164,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 162,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "Fecha de creaci\xF3n:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 167,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: formatDate(assignacio.data_creacio_fitxes_assignacions) }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 168,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 166,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "ID de autor:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 171,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: assignacio.id_autor }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 172,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 170,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 157,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.$id.tsx",
            lineNumber: 155,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-2", children: "Estado y prioridad" }, void 0, false, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 177,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "Estado:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 180,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { value: assignacio.estat_fitxes_assignacions, onChange: handleStatusChange, className: "border rounded px-2 py-1", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Pendiente", children: "Pendiente" }, void 0, false, {
                    fileName: "app/routes/assignments.$id.tsx",
                    lineNumber: 183,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "En progreso", children: "En progreso" }, void 0, false, {
                    fileName: "app/routes/assignments.$id.tsx",
                    lineNumber: 184,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Completada", children: "Completada" }, void 0, false, {
                    fileName: "app/routes/assignments.$id.tsx",
                    lineNumber: 185,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Cancelada", children: "Cancelada" }, void 0, false, {
                    fileName: "app/routes/assignments.$id.tsx",
                    lineNumber: 186,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 182,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 181,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 179,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "Prioridad:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 191,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800", children: assignacio.prioritat_fitxes_assignacions }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 192,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 190,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "Potencial:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 197,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: assignacio.potencial_fitxes_assignacions }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 198,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 196,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 178,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.$id.tsx",
            lineNumber: 176,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 154,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-2", children: "Observaciones" }, void 0, false, {
            fileName: "app/routes/assignments.$id.tsx",
            lineNumber: 206,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border", children: assignacio.obsevacions_fitxes_assignacions || "Sin observaciones" }, void 0, false, {
            fileName: "app/routes/assignments.$id.tsx",
            lineNumber: 207,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 205,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.$id.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4", children: "Lead" }, void 0, false, {
            fileName: "app/routes/assignments.$id.tsx",
            lineNumber: 215,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg font-medium", children: lead.nom_lead }, void 0, false, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 218,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500", children: lead.nom_empresarial_lead }, void 0, false, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 219,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 217,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "ID:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 223,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: lead.id_lead }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 224,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 222,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "CNAE:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 227,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: lead.cnae_lead }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 228,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 226,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "Provincia:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 231,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: lead.provincia_lead }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 232,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 230,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "Poblaci\xF3n:" }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 235,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: lead.poblacio_lead }, void 0, false, {
                  fileName: "app/routes/assignments.$id.tsx",
                  lineNumber: 236,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 234,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 221,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pt-4 border-t", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/leads/${lead.id_lead}`, className: "text-blue-600 hover:text-blue-900 flex items-center text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1", children: "\u2192" }, void 0, false, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 241,
                columnNumber: 19
              }, this),
              " Ver lead completo"
            ] }, void 0, true, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 240,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 239,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.$id.tsx",
            lineNumber: 216,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 214,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4", children: "Agente" }, void 0, false, {
            fileName: "app/routes/assignments.$id.tsx",
            lineNumber: 247,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg font-medium", children: agent.nom_agent }, void 0, false, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 250,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 249,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", { className: "space-y-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", { className: "text-gray-500", children: "ID:" }, void 0, false, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 254,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", { children: agent.id_agent }, void 0, false, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 255,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 253,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 252,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pt-4 border-t", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/agents/${agent.id_agent}`, className: "text-blue-600 hover:text-blue-900 flex items-center text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-1", children: "\u2192" }, void 0, false, {
                fileName: "app/routes/assignments.$id.tsx",
                lineNumber: 260,
                columnNumber: 19
              }, this),
              " Ver agente completo"
            ] }, void 0, true, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 259,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.$id.tsx",
              lineNumber: 258,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.$id.tsx",
            lineNumber: 248,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 246,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.$id.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.$id.tsx",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    showDeleteConfirm && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-md w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold mb-4", children: "Confirmar eliminaci\xF3n" }, void 0, false, {
        fileName: "app/routes/assignments.$id.tsx",
        lineNumber: 270,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-6", children: [
        "\xBFEst\xE1 seguro de que desea eliminar la asignaci\xF3n #",
        assignacio.id_fitxes_asignacions,
        "? Esta acci\xF3n no se puede deshacer."
      ] }, void 0, true, {
        fileName: "app/routes/assignments.$id.tsx",
        lineNumber: 271,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end space-x-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowDeleteConfirm(false), className: "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300", children: "Cancelar" }, void 0, false, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 275,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleDelete, className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700", children: "Eliminar" }, void 0, false, {
          fileName: "app/routes/assignments.$id.tsx",
          lineNumber: 278,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.$id.tsx",
        lineNumber: 274,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.$id.tsx",
      lineNumber: 269,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.$id.tsx",
      lineNumber: 268,
      columnNumber: 29
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.$id.tsx",
    lineNumber: 130,
    columnNumber: 10
  }, this);
}
_s(AssignmentView, "ZJNI5Ap72q5r9tmZ6AUmFLind6E=", false, function() {
  return [useLoaderData, useSubmit];
});
_c = AssignmentView;
var _c;
$RefreshReg$(_c, "AssignmentView");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AssignmentView as default
};
//# sourceMappingURL=/build/routes/assignments.$id-ZJO6BHYE.js.map
