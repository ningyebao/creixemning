import {
  LeadService
} from "/build/_shared/chunk-YDU6SJNY.js";
import {
  Link,
  useLoaderData,
  useSearchParams
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

// app/routes/leads._index.tsx
var import_node = __toESM(require_node());
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\leads._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\leads._index.tsx"
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
function LeadsIndex() {
  _s();
  const {
    leads,
    page,
    limit,
    totalLeads,
    searchTerm,
    error
  } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = (0, import_react2.useState)(searchTerm);
  (0, import_react2.useEffect)(() => {
    console.log("Leads en estado del componente:", leads);
  }, [leads]);
  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      newParams.set("search", searchInput.trim());
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };
  const handleFilterChange = (name, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };
  const clearFilters = () => {
    setSearchInput("");
    setSearchParams({
      page: "1"
    });
  };
  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };
  const handleDelete = (lead) => {
    if (window.confirm("\xBFSegur@ de la eliminaci\xF3n?")) {
      try {
        LeadService.delete(lead.id_lead).then(() => {
          window.location.reload();
        }).catch((err) => {
          alert("Error al eliminar: " + (err instanceof Error ? err.message : "Error desconocido"));
        });
      } catch (err) {
        alert("Error al eliminar");
        console.error(err);
      }
    }
  };
  const hasMoreResults = leads.length === limit;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4 py-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Gesti\xF3n de Leads" }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 221,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/leads/new", className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded", children: "Nuevo Lead" }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 222,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads._index.tsx",
      lineNumber: 220,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-4 rounded-lg shadow-md mb-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSearch, className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", value: searchInput, onChange: (e) => setSearchInput(e.target.value), placeholder: "Buscar por nombre, email, NIF...", className: "flex-1 p-2 border rounded", "aria-label": "Buscar leads" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 231,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded", children: "Buscar" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 232,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: clearFilters, className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded", children: "Limpiar" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 235,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 230,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 229,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "provincia_lead", className: "block text-sm font-medium text-gray-700 mb-1", children: "Provincia" }, void 0, false, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 244,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "provincia_lead", value: searchParams.get("provincia_lead") || "", onChange: (e) => handleFilterChange("provincia_lead", e.target.value), className: "w-full p-2 border rounded", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todas las provincias" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 248,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Barcelona", children: "Barcelona" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 249,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Madrid", children: "Madrid" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 250,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Valencia", children: "Valencia" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 251,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Sevilla", children: "Sevilla" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 252,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Alicante", children: "Alicante" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 253,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 247,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 243,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "actiu_lead", className: "block text-sm font-medium text-gray-700 mb-1", children: "Estado" }, void 0, false, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 259,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "actiu_lead", value: searchParams.get("actiu_lead") || "", onChange: (e) => handleFilterChange("actiu_lead", e.target.value), className: "w-full p-2 border rounded", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todos" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 263,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "true", children: "Activos" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 264,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "false", children: "Inactivos" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 265,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 262,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 258,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "mida_lead", className: "block text-sm font-medium text-gray-700 mb-1", children: "Tama\xF1o" }, void 0, false, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 271,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "mida_lead", value: searchParams.get("mida_lead") || "", onChange: (e) => handleFilterChange("mida_lead", e.target.value), className: "w-full p-2 border rounded", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todos los tama\xF1os" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 275,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "1", children: "Microempresa" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 276,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "2", children: "Peque\xF1a" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 277,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "3", children: "Mediana" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 278,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "4", children: "Grande" }, void 0, false, {
              fileName: "app/routes/leads._index.tsx",
              lineNumber: 279,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 274,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 270,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 241,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads._index.tsx",
      lineNumber: 228,
      columnNumber: 7
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded", role: "alert", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-bold", children: "Error" }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 287,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: error }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 288,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads._index.tsx",
      lineNumber: 286,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md overflow-hidden mb-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 297,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Email" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 300,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Poblaci\xF3n" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 303,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Provincia" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 306,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Tama\xF1o" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 309,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Estado" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 312,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 315,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 296,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 295,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: leads.length > 0 ? leads.map((lead, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm font-medium text-gray-900", children: lead.nom_lead }, void 0, false, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 323,
            columnNumber: 23
          }, this),
          lead.nom_fiscal_lead && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-500", children: lead.nom_fiscal_lead }, void 0, false, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 324,
            columnNumber: 48
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 322,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: lead.email_lead || "-" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 326,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: lead.poblacio_lead || "-" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 329,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: lead.provincia_lead || "-" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 332,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: formatMidaLead(lead.mida_lead) }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 335,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${lead.actiu_lead ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: lead.actiu_lead ? "Activo" : "Inactivo" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 339,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 338,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/leads/${lead.id_lead}`, className: `text-blue-600 hover:text-blue-900 mr-3 ${!lead.id_lead ? "opacity-50 pointer-events-none" : ""}`, onClick: (e) => {
            if (!lead.id_lead) {
              e.preventDefault();
              alert("No se puede ver este lead porque no tiene un ID v\xE1lido.");
            }
          }, children: "Ver" }, void 0, false, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 345,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/leads/${lead.id_lead}/edit`, className: `text-indigo-600 hover:text-indigo-900 mr-3 ${!lead.id_lead ? "opacity-50 pointer-events-none" : ""}`, onClick: (e) => {
            if (!lead.id_lead) {
              e.preventDefault();
              alert("No se puede editar este lead porque no tiene un ID v\xE1lido.");
            }
          }, children: "Editar" }, void 0, false, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 353,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleDelete(lead), className: "text-red-600 hover:text-red-900", children: "Eliminar" }, void 0, false, {
            fileName: "app/routes/leads._index.tsx",
            lineNumber: 361,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 344,
          columnNumber: 21
        }, this)
      ] }, index, true, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 321,
        columnNumber: 62
      }, this)) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { colSpan: 7, className: "px-6 py-8 text-center text-gray-500", children: searchTerm ? "No se encontraron leads con los criterios de b\xFAsqueda especificados." : "No hay leads disponibles. Crea un nuevo lead para comenzar." }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 366,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 365,
        columnNumber: 28
      }, this) }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 320,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads._index.tsx",
      lineNumber: 294,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/leads._index.tsx",
      lineNumber: 293,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/leads._index.tsx",
      lineNumber: 292,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-sm text-gray-700", children: totalLeads > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
        "Mostrando ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: Math.min((page - 1) * limit + 1, totalLeads) }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 379,
          columnNumber: 25
        }, this),
        " - ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: Math.min(page * limit, totalLeads) }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 381,
          columnNumber: 15
        }, this),
        " de resultados"
      ] }, void 0, true, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 378,
        columnNumber: 30
      }, this) }, void 0, false, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 377,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handlePageChange(page - 1), disabled: page <= 1, className: `px-4 py-2 border rounded ${page <= 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-800 hover:bg-gray-50"}`, children: "Anterior" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 387,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-4 py-2 border rounded bg-blue-50 text-blue-600", children: [
          "P\xE1gina ",
          page
        ] }, void 0, true, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 391,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handlePageChange(page + 1), disabled: !hasMoreResults, className: `px-4 py-2 border rounded ${!hasMoreResults ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-800 hover:bg-gray-50"}`, children: "Siguiente" }, void 0, false, {
          fileName: "app/routes/leads._index.tsx",
          lineNumber: 395,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/leads._index.tsx",
        lineNumber: 386,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/leads._index.tsx",
      lineNumber: 376,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/leads._index.tsx",
    lineNumber: 219,
    columnNumber: 10
  }, this);
}
_s(LeadsIndex, "Szc2HHEwTfptc4jenqR9n5ayFCQ=", false, function() {
  return [useLoaderData, useSearchParams];
});
_c = LeadsIndex;
var _c;
$RefreshReg$(_c, "LeadsIndex");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LeadsIndex as default
};
//# sourceMappingURL=/build/routes/leads._index-BNWUCTLO.js.map
