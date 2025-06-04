import {
  DEFAULT_LEAD_VALUES
} from "/build/_shared/chunk-JP32FIMV.js";
import "/build/_shared/chunk-YDU6SJNY.js";
import {
  Form,
  Link,
  useLoaderData,
  useNavigate
} from "/build/_shared/chunk-QWJ64ZKI.js";
import "/build/_shared/chunk-OPGM6WIO.js";
import "/build/_shared/chunk-WCLFPUDL.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
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

// app/routes/leads.$leadId.tsx
var import_node = __toESM(require_node());
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\leads.$leadId.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\leads.$leadId.tsx"
  );
  import.meta.hot.lastModified = "1748619596465.02";
}
var formatMidaLead = (mida) => {
  switch (mida) {
    case 1:
      return "Microempresa";
    case 2:
      return "Peque\xF1a";
    case 3:
      return "Mediana";
    case 4:
      return "Grande";
    default:
      return "Sin definir";
  }
};
var formatDate = (dateStr) => {
  if (!dateStr)
    return "-";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  } catch (e) {
    return dateStr;
  }
};
function LeadDetails() {
  _s();
  const {
    lead,
    isNew
  } = useLoaderData();
  const navigate = useNavigate();
  if (isNew) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LeadForm, {}, void 0, false, {
      fileName: "app/routes/leads.$leadId.tsx",
      lineNumber: 191,
      columnNumber: 12
    }, this);
  }
  if (!lead) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-100 text-red-700 p-4 rounded", children: "Error: No se pudo cargar la informaci\xF3n del lead" }, void 0, false, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 197,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/leads", className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded", children: "Volver a la lista" }, void 0, false, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 201,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads.$leadId.tsx",
      lineNumber: 196,
      columnNumber: 12
    }, this);
  }
  const handleDelete = async () => {
    if (window.confirm("\xBFEst\xE1s seguro de que quieres eliminar este lead? Esta acci\xF3n no se puede deshacer.")) {
      const formData = new FormData();
      formData.append("action", "delete");
      try {
        const response = await fetch(`/leads/${lead.id_lead}`, {
          method: "DELETE",
          body: formData
        });
        if (response.ok) {
          navigate("/leads");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar el lead");
      }
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Detalles del Lead" }, void 0, false, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 229,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/leads", className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded", children: "Volver" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 232,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/leads/${lead.id_lead}/edit`, className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded", children: "Editar" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 236,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleDelete, className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded", children: "Eliminar" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 240,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 231,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads.$leadId.tsx",
      lineNumber: 228,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 bg-gray-50 border-b", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold", children: lead.nom_lead }, void 0, false, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 251,
            columnNumber: 15
          }, this),
          lead.nom_fiscal_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-600 mt-1", children: lead.nom_fiscal_lead }, void 0, false, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 252,
            columnNumber: 40
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 250,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${lead.actiu_lead ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: lead.actiu_lead ? "Activo" : "Inactivo" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 256,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 255,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 249,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 248,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-3 pb-2 border-b border-gray-200", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 269,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "ID" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 275,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.id_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 276,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 274,
                columnNumber: 17
              }, this),
              lead.NIF_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "NIF" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 280,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.NIF_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 281,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 279,
                columnNumber: 35
              }, this),
              lead.email_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Email" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 285,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.email_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 286,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 284,
                columnNumber: 37
              }, this),
              lead.fecha_registro && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Fecha de registro" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 290,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: formatDate(lead.fecha_registro) }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 291,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 289,
                columnNumber: 41
              }, this),
              lead.any_creacio_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "A\xF1o de creaci\xF3n" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 295,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.any_creacio_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 296,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 294,
                columnNumber: 43
              }, this),
              lead.mida_lead !== void 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Tama\xF1o" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 300,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: formatMidaLead(lead.mida_lead) }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 301,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 299,
                columnNumber: 50
              }, this),
              lead.nombre_treballadors_lead !== void 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "N\xBA Trabajadores" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 305,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.nombre_treballadors_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 306,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 304,
                columnNumber: 65
              }, this),
              lead.capital_social_lead !== void 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Capital Social" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 310,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
                  lead.capital_social_lead.toLocaleString("es-ES"),
                  " \u20AC"
                ] }, void 0, true, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 311,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 309,
                columnNumber: 60
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 273,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 268,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-3 pb-2 border-b border-gray-200", children: "Ubicaci\xF3n" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 318,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
              lead.adreca_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Direcci\xF3n" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 324,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.adreca_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 325,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 323,
                columnNumber: 38
              }, this),
              lead.codi_postal_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "C\xF3digo Postal" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 329,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.codi_postal_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 330,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 328,
                columnNumber: 43
              }, this),
              lead.poblacio_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Poblaci\xF3n" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 334,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.poblacio_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 335,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 333,
                columnNumber: 40
              }, this),
              lead.comarca_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Comarca" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 339,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.comarca_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 340,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 338,
                columnNumber: 39
              }, this),
              lead.provincia_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Provincia" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 344,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.provincia_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 345,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 343,
                columnNumber: 41
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 322,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 317,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-3 pb-2 border-b border-gray-200", children: "Caracter\xEDsticas" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 352,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
              lead.activitat_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Actividad" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 358,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.activitat_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 359,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 357,
                columnNumber: 41
              }, this),
              lead.cnae_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "CNAE" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 363,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.cnae_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 364,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 362,
                columnNumber: 36
              }, this),
              lead.idioma_preferent_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Idioma Preferente" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 368,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.idioma_preferent_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 369,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 367,
                columnNumber: 48
              }, this),
              lead.importa_exporta_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Importaci\xF3n/Exportaci\xF3n" }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 373,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.importa_exporta_lead }, void 0, false, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 374,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 372,
                columnNumber: 47
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 gap-y-2 mt-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `w-3 h-3 rounded-full mr-2 ${lead.cotitza_borsa_lead ? "bg-green-500" : "bg-gray-300"}` }, void 0, false, {
                    fileName: "app/routes/leads.$leadId.tsx",
                    lineNumber: 379,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: "Cotiza en bolsa" }, void 0, false, {
                    fileName: "app/routes/leads.$leadId.tsx",
                    lineNumber: 380,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 378,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `w-3 h-3 rounded-full mr-2 ${lead.nomes_temporada_lead ? "bg-green-500" : "bg-gray-300"}` }, void 0, false, {
                    fileName: "app/routes/leads.$leadId.tsx",
                    lineNumber: 384,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: "Solo temporada" }, void 0, false, {
                    fileName: "app/routes/leads.$leadId.tsx",
                    lineNumber: 385,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 383,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `w-3 h-3 rounded-full mr-2 ${lead.conciencia_ecologica_lead ? "bg-green-500" : "bg-gray-300"}` }, void 0, false, {
                    fileName: "app/routes/leads.$leadId.tsx",
                    lineNumber: 389,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: "Conciencia ecol\xF3gica" }, void 0, false, {
                    fileName: "app/routes/leads.$leadId.tsx",
                    lineNumber: 390,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 388,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `w-3 h-3 rounded-full mr-2 ${lead.solidaria_social_lead ? "bg-green-500" : "bg-gray-300"}` }, void 0, false, {
                    fileName: "app/routes/leads.$leadId.tsx",
                    lineNumber: 394,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: "Empresa solidaria" }, void 0, false, {
                    fileName: "app/routes/leads.$leadId.tsx",
                    lineNumber: 395,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/leads.$leadId.tsx",
                  lineNumber: 393,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 377,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 356,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 351,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 266,
          columnNumber: 11
        }, this),
        (lead.link_web_lead || lead.xarxe_social_lead) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 pt-4 border-t border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-3", children: "Enlaces Web" }, void 0, false, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 404,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            lead.link_web_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Sitio Web" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 410,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: lead.link_web_lead.startsWith("http") ? lead.link_web_lead : `https://${lead.link_web_lead}`, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline", children: lead.link_web_lead }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 411,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 409,
              columnNumber: 40
            }, this),
            lead.xarxe_social_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Redes Sociales" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 417,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: lead.xarxe_social_lead }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 418,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 416,
              columnNumber: 44
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 408,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 403,
          columnNumber: 62
        }, this),
        lead.observacions_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 pt-4 border-t border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-3", children: "Observaciones" }, void 0, false, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 425,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "whitespace-pre-line", children: lead.observacions_lead }, void 0, false, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 428,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 424,
          columnNumber: 38
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 265,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads.$leadId.tsx",
      lineNumber: 246,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/leads.$leadId.tsx",
    lineNumber: 227,
    columnNumber: 10
  }, this);
}
_s(LeadDetails, "nyp8TsWJGknrMEe2mEKW4mqwUX4=", false, function() {
  return [useLoaderData, useNavigate];
});
_c = LeadDetails;
function LeadForm() {
  _s2();
  const [formState, setFormState] = (0, import_react2.useState)({
    actiu_lead: true,
    cotitza_borsa_lead: DEFAULT_LEAD_VALUES.cotitza_borsa_lead || false,
    nomes_temporada_lead: DEFAULT_LEAD_VALUES.nomes_temporada_lead || false,
    conciencia_ecologica_lead: DEFAULT_LEAD_VALUES.conciencia_ecologica_lead || false,
    solidaria_social_lead: DEFAULT_LEAD_VALUES.solidaria_social_lead || false
  });
  const handleBooleanChange = (e) => {
    const {
      name,
      checked
    } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Crear Nuevo Lead" }, void 0, false, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 461,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/leads", className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded", children: "Cancelar" }, void 0, false, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 462,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads.$leadId.tsx",
      lineNumber: 460,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "space-y-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "action", value: "create" }, void 0, false, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 469,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4 pb-2 border-b", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 473,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre *" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 476,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_lead", required: true, className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 479,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 475,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre Fiscal" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 483,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_fiscal_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 486,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 482,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre B\xE1sico" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 490,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_basic_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 493,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 489,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre Empresarial" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 497,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_empresarial_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 500,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 496,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "NIF" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 504,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "NIF_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 507,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 503,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 511,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "email", name: "email_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 514,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 510,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tama\xF1o" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 518,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "mida_lead", defaultValue: DEFAULT_LEAD_VALUES.mida_lead || "", className: "w-full rounded border border-gray-300 px-3 py-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Seleccionar tama\xF1o" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 522,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: 1 /* MICROEMPRESA */, children: "Microempresa" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 523,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: 2 /* PEQUEÑA */, children: "Peque\xF1a" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 524,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: 3 /* MEDIANA */, children: "Mediana" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 525,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: 4 /* GRANDE */, children: "Grande" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 526,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 521,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 517,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero de Trabajadores" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 531,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "nombre_treballadors_lead", min: "0", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 534,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 530,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Capital Social (\u20AC)" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 538,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "capital_social_lead", min: "0", step: "0.01", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 541,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 537,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "A\xF1o de Creaci\xF3n" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 545,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "any_creacio_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 548,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 544,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-span-full flex items-center space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", id: "actiu_lead", name: "actiu_lead", checked: formState.actiu_lead, onChange: handleBooleanChange, value: "true", className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 552,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "actiu_lead", className: "font-medium text-gray-700", children: "Activo" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 553,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 551,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 474,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 472,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4 pb-2 border-b", children: "Ubicaci\xF3n" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 562,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Direcci\xF3n" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 565,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "adreca_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 568,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 564,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "C\xF3digo Postal" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 572,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "codi_postal_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 575,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 571,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Poblaci\xF3n" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 579,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "poblacio_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 582,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 578,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Comarca" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 586,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "comarca_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 589,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 585,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Provincia" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 593,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "provincia_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 596,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 592,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 563,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 561,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4 pb-2 border-b", children: "Caracter\xEDsticas" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 603,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Actividad" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 606,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "activitat_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 609,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 605,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "CNAE" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 613,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "cnae_lead", className: "w-full rounded border border-gray-300 px-3 py-2" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 616,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 612,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Idioma Preferente" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 620,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "idioma_preferent_lead", className: "w-full rounded border border-gray-300 px-3 py-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Seleccionar idioma" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 624,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Catal\xE1n", children: "Catal\xE1n" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 625,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Castellano", children: "Castellano" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 626,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Ingl\xE9s", children: "Ingl\xE9s" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 627,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Franc\xE9s", children: "Franc\xE9s" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 628,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Alem\xE1n", children: "Alem\xE1n" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 629,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 623,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 619,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Importaci\xF3n/Exportaci\xF3n" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 634,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "importa_exporta_lead", className: "w-full rounded border border-gray-300 px-3 py-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Seleccionar" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 638,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Importa", children: "Importa" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 639,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Exporta", children: "Exporta" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 640,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Ambos", children: "Ambos" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 641,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Ninguno", children: "Ninguno" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 642,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 637,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 633,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-span-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", id: "cotitza_borsa_lead", name: "cotitza_borsa_lead", checked: formState.cotitza_borsa_lead, onChange: handleBooleanChange, value: "true", className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 649,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "cotitza_borsa_lead", className: "font-medium text-gray-700", children: "Cotiza en bolsa" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 650,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 648,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", id: "nomes_temporada_lead", name: "nomes_temporada_lead", checked: formState.nomes_temporada_lead, onChange: handleBooleanChange, value: "true", className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 656,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "nomes_temporada_lead", className: "font-medium text-gray-700", children: "Solo temporada" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 657,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 655,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", id: "conciencia_ecologica_lead", name: "conciencia_ecologica_lead", checked: formState.conciencia_ecologica_lead, onChange: handleBooleanChange, value: "true", className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 663,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "conciencia_ecologica_lead", className: "font-medium text-gray-700", children: "Conciencia ecol\xF3gica" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 664,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 662,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", id: "solidaria_social_lead", name: "solidaria_social_lead", checked: formState.solidaria_social_lead, onChange: handleBooleanChange, value: "true", className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 670,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "solidaria_social_lead", className: "font-medium text-gray-700", children: "Empresa solidaria" }, void 0, false, {
                fileName: "app/routes/leads.$leadId.tsx",
                lineNumber: 671,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 669,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 647,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 604,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 602,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4 pb-2 border-b", children: "Enlaces Web" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 681,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sitio Web" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 684,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "link_web_lead", className: "w-full rounded border border-gray-300 px-3 py-2", placeholder: "https://example.com" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 687,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 683,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Redes Sociales" }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 691,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "xarxe_social_lead", className: "w-full rounded border border-gray-300 px-3 py-2", placeholder: "@usuario, facebook.com/pagina, etc." }, void 0, false, {
              fileName: "app/routes/leads.$leadId.tsx",
              lineNumber: 694,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads.$leadId.tsx",
            lineNumber: 690,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 682,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 680,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4 pb-2 border-b", children: "Observaciones" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 701,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_lead", rows: 4, className: "w-full rounded border border-gray-300 px-3 py-2", placeholder: "A\xF1adir observaciones..." }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 703,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 702,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 700,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end space-x-3 mt-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/leads", className: "px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50", children: "Cancelar" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 709,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700", children: "Crear Lead" }, void 0, false, {
          fileName: "app/routes/leads.$leadId.tsx",
          lineNumber: 713,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads.$leadId.tsx",
        lineNumber: 708,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads.$leadId.tsx",
      lineNumber: 468,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/leads.$leadId.tsx",
      lineNumber: 467,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/leads.$leadId.tsx",
    lineNumber: 459,
    columnNumber: 10
  }, this);
}
_s2(LeadForm, "yh8lqTxKMwE/D/9Ed0ldvew9ohM=");
_c2 = LeadForm;
var _c;
var _c2;
$RefreshReg$(_c, "LeadDetails");
$RefreshReg$(_c2, "LeadForm");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LeadDetails as default
};
//# sourceMappingURL=/build/routes/leads.$leadId-YOSZFQQV.js.map
