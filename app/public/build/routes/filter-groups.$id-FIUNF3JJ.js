import {
  FilterGroupService
} from "/build/_shared/chunk-SUXX2XDJ.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  useNavigate,
  useParams
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

// app/routes/filter-groups.$id.tsx
var import_node = __toESM(require_node());
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\filter-groups.$id.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\filter-groups.$id.tsx"
  );
  import.meta.hot.lastModified = "1745911840253.4832";
}
function FilterGroupForm() {
  _s();
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [name, setName] = (0, import_react2.useState)("");
  const [description, setDescription] = (0, import_react2.useState)("");
  const [filters, setFilters] = (0, import_react2.useState)({});
  const [error, setError] = (0, import_react2.useState)("");
  const [showFilterDetails, setShowFilterDetails] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    if (!isNew && id) {
      const filterGroup = FilterGroupService.getById(id);
      if (filterGroup) {
        setName(filterGroup.name);
        setDescription(filterGroup.description || "");
        setFilters(filterGroup.filters);
      } else {
        setError("Grupo de filtros no encontrado");
      }
    }
  }, [id, isNew]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    try {
      FilterGroupService.save({
        id: isNew ? void 0 : id,
        name,
        description,
        filters
      });
      navigate("/filter-groups");
    } catch (err) {
      setError("Error al guardar el grupo de filtros");
      console.error(err);
    }
  };
  const formatFilterValue = (key, value) => {
    if (key === "mida_lead") {
      const sizeMap = {
        "1": "Microempresa",
        "2": "Peque\xF1a",
        "3": "Mediana",
        "4": "Grande"
      };
      return sizeMap[value] || value;
    }
    if (typeof value === "boolean") {
      return value ? "S\xED" : "No";
    }
    return value;
  };
  const groupFiltersByCategory = (filters2) => {
    const categories = {
      "Informaci\xF3n b\xE1sica": {},
      "Ubicaci\xF3n": {},
      "Caracter\xEDsticas": {},
      "Detalles financieros": {},
      "Contacto": {},
      "Otros": {}
    };
    Object.entries(filters2).forEach(([key, value]) => {
      if (["nom_lead", "nom_basic_lead", "nom_empresarial_lead", "nom_fiscal_lead", "activitat_lead", "cnae_lead", "mida_lead", "actiu_lead"].includes(key)) {
        categories["Informaci\xF3n b\xE1sica"][key] = value;
      } else if (["provincia_lead", "poblacio_lead", "comarca_lead", "adreca_lead", "codi_postal_lead"].includes(key)) {
        categories["Ubicaci\xF3n"][key] = value;
      } else if (["nomes_temporada_lead", "conciencia_ecologica_lead", "solidaria_social_lead", "importa_exporta_lead", "any_creacio_lead", "nombre_treballadors_lead_min", "nombre_treballadors_lead_max"].includes(key)) {
        categories["Caracter\xEDsticas"][key] = value;
      } else if (["capital_social_lead_min", "capital_social_lead_max", "cotitza_borsa_lead"].includes(key)) {
        categories["Detalles financieros"][key] = value;
      } else if (["email_lead", "NIF_lead", "xarxe_social_lead", "link_web_lead", "idioma_preferent_lead"].includes(key)) {
        categories["Contacto"][key] = value;
      } else {
        categories["Otros"][key] = value;
      }
    });
    for (const category in categories) {
      if (Object.keys(categories[category]).length === 0) {
        delete categories[category];
      }
    }
    return categories;
  };
  const getFilterLabel = (key) => {
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
      "activitat_lead": "Actividad",
      "capital_social_lead_min": "Capital social (m\xEDn)",
      "capital_social_lead_max": "Capital social (m\xE1x)",
      "xarxe_social_lead": "Redes sociales",
      "link_web_lead": "Sitio web"
    };
    return filterLabels[key] || key.replace("_lead", "");
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: isNew ? "Nuevo Grupo de Filtros" : "Editar Grupo de Filtros" }, void 0, false, {
      fileName: "app/routes/filter-groups.$id.tsx",
      lineNumber: 171,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/filter-groups.$id.tsx",
      lineNumber: 170,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
      error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-4 bg-red-100 text-red-700 rounded", children: error }, void 0, false, {
        fileName: "app/routes/filter-groups.$id.tsx",
        lineNumber: 177,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", htmlFor: "name", children: "Nombre:" }, void 0, false, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 184,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "name", type: "text", className: "w-full border rounded p-2", value: name, onChange: (e) => setName(e.target.value), required: true }, void 0, false, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 187,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups.$id.tsx",
          lineNumber: 183,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium mb-1", htmlFor: "description", children: "Descripci\xF3n (opcional):" }, void 0, false, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 191,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "description", className: "w-full border rounded p-2", rows: 3, value: description, onChange: (e) => setDescription(e.target.value) }, void 0, false, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 194,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups.$id.tsx",
          lineNumber: 190,
          columnNumber: 13
        }, this),
        !isNew && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium", children: "Filtros Guardados" }, void 0, false, {
              fileName: "app/routes/filter-groups.$id.tsx",
              lineNumber: 199,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "text-blue-600 hover:text-blue-900 text-sm", onClick: () => setShowFilterDetails(!showFilterDetails), children: showFilterDetails ? "Ocultar detalles" : "Mostrar detalles" }, void 0, false, {
              fileName: "app/routes/filter-groups.$id.tsx",
              lineNumber: 200,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 198,
            columnNumber: 17
          }, this),
          showFilterDetails && Object.keys(filters).length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border", children: Object.entries(groupFiltersByCategory(filters)).map(([category, categoryFilters]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-sm font-medium mb-2 text-gray-700", children: category }, void 0, false, {
              fileName: "app/routes/filter-groups.$id.tsx",
              lineNumber: 207,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "space-y-1", children: Object.entries(categoryFilters).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: [
                getFilterLabel(key),
                ":"
              ] }, void 0, true, {
                fileName: "app/routes/filter-groups.$id.tsx",
                lineNumber: 210,
                columnNumber: 31
              }, this),
              " ",
              formatFilterValue(key, value)
            ] }, key, true, {
              fileName: "app/routes/filter-groups.$id.tsx",
              lineNumber: 209,
              columnNumber: 82
            }, this)) }, void 0, false, {
              fileName: "app/routes/filter-groups.$id.tsx",
              lineNumber: 208,
              columnNumber: 25
            }, this)
          ] }, category, true, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 206,
            columnNumber: 107
          }, this)) }, void 0, false, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 205,
            columnNumber: 73
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border text-gray-500 text-sm", children: Object.keys(filters).length === 0 ? "No hay filtros configurados." : `Este grupo tiene ${Object.keys(filters).length} filtros configurados.` }, void 0, false, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 214,
            columnNumber: 28
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500 mt-2", children: "Para modificar los filtros, debes aplicar este grupo en la p\xE1gina de asignaci\xF3n masiva, hacer los cambios necesarios y guardar como un nuevo grupo de filtros." }, void 0, false, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 218,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups.$id.tsx",
          lineNumber: 197,
          columnNumber: 24
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end space-x-4 pt-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => navigate("/filter-groups"), className: "px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300", children: "Cancelar" }, void 0, false, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 225,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Guardar" }, void 0, false, {
            fileName: "app/routes/filter-groups.$id.tsx",
            lineNumber: 228,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups.$id.tsx",
          lineNumber: 224,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups.$id.tsx",
        lineNumber: 182,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/filter-groups.$id.tsx",
        lineNumber: 181,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups.$id.tsx",
      lineNumber: 176,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/filter-groups.$id.tsx",
    lineNumber: 169,
    columnNumber: 10
  }, this);
}
_s(FilterGroupForm, "Iu8CauZgoU9wQoUmx3Z7SUNA4BM=", false, function() {
  return [useParams, useNavigate];
});
_c = FilterGroupForm;
var _c;
$RefreshReg$(_c, "FilterGroupForm");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  FilterGroupForm as default
};
//# sourceMappingURL=/build/routes/filter-groups.$id-FIUNF3JJ.js.map
