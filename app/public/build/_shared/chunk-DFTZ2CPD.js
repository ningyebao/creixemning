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

// app/routes/assignments.filter-actions.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.filter-actions.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.filter-actions.tsx"
  );
  import.meta.hot.lastModified = "1748855419924.1072";
}
function FilterActions({
  activeFilters,
  onSaveFilters,
  onToggleAutoFilter,
  onToggleSavedFilters,
  showAutoFilter,
  showSavedFilters
}) {
  _s();
  const [showSaveDialog, setShowSaveDialog] = (0, import_react.useState)(false);
  const [filterName, setFilterName] = (0, import_react.useState)("");
  const [filterDescription, setFilterDescription] = (0, import_react.useState)("");
  const [saveError, setSaveError] = (0, import_react.useState)("");
  const hasActiveFilters = Object.keys(activeFilters).length > 0;
  const handleSave = () => {
    setSaveError("");
    if (!filterName.trim()) {
      setSaveError("El nombre es obligatorio");
      return;
    }
    console.log("Guardando filtros:", {
      name: filterName,
      description: filterDescription,
      filters: activeFilters
    });
    onSaveFilters(filterName.trim(), filterDescription.trim());
    setFilterName("");
    setFilterDescription("");
    setShowSaveDialog(false);
  };
  const handleCancel = () => {
    setFilterName("");
    setFilterDescription("");
    setSaveError("");
    setShowSaveDialog(false);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 px-4 py-3 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-base font-medium text-gray-800", children: "Acciones de filtros" }, void 0, false, {
      fileName: "app/routes/assignments.filter-actions.tsx",
      lineNumber: 64,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.filter-actions.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", disabled: !hasActiveFilters, onClick: () => setShowSaveDialog(true), className: `w-full px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${hasActiveFilters ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" }, void 0, false, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 71,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 70,
          columnNumber: 11
        }, this),
        "Guardar filtros actuales"
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-actions.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: onToggleSavedFilters, className: `w-full px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${showSavedFilters ? "bg-indigo-100 text-indigo-700 border border-indigo-300" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" }, void 0, false, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 79,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        "Ver filtros guardados"
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-actions.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: onToggleAutoFilter, className: `w-full px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${showAutoFilter ? "bg-indigo-100 text-indigo-700 border border-indigo-300" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }, void 0, false, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 87,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 86,
          columnNumber: 11
        }, this),
        "Automatizar filtros"
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-actions.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.filter-actions.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    showSaveDialog && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full mx-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-900", children: "Guardar grupo de filtros" }, void 0, false, {
        fileName: "app/routes/assignments.filter-actions.tsx",
        lineNumber: 97,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.filter-actions.tsx",
        lineNumber: 96,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "filter-name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre del grupo *" }, void 0, false, {
            fileName: "app/routes/assignments.filter-actions.tsx",
            lineNumber: 102,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "filter-name", value: filterName, onChange: (e) => setFilterName(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500", placeholder: "Ej: Leads Barcelona Activos", autoFocus: true }, void 0, false, {
            fileName: "app/routes/assignments.filter-actions.tsx",
            lineNumber: 105,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 101,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "filter-description", className: "block text-sm font-medium text-gray-700 mb-1", children: "Descripci\xF3n (opcional)" }, void 0, false, {
            fileName: "app/routes/assignments.filter-actions.tsx",
            lineNumber: 109,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "filter-description", value: filterDescription, onChange: (e) => setFilterDescription(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500", rows: 3, placeholder: "Describe para qu\xE9 se usan estos filtros..." }, void 0, false, {
            fileName: "app/routes/assignments.filter-actions.tsx",
            lineNumber: 112,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 108,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 rounded-md p-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium text-gray-700 mb-2", children: [
            "Filtros a guardar (",
            Object.keys(activeFilters).length,
            "):"
          ] }, void 0, true, {
            fileName: "app/routes/assignments.filter-actions.tsx",
            lineNumber: 117,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-1.5", children: Object.entries(activeFilters).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800", children: [
            key.replace(/_/g, " "),
            ": ",
            String(value)
          ] }, key, true, {
            fileName: "app/routes/assignments.filter-actions.tsx",
            lineNumber: 121,
            columnNumber: 72
          }, this)) }, void 0, false, {
            fileName: "app/routes/assignments.filter-actions.tsx",
            lineNumber: 120,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 116,
          columnNumber: 15
        }, this),
        saveError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm", children: saveError }, void 0, false, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 127,
          columnNumber: 29
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-actions.tsx",
        lineNumber: 100,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: handleCancel, className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50", children: "Cancelar" }, void 0, false, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 133,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: handleSave, className: "px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700", children: "Guardar" }, void 0, false, {
          fileName: "app/routes/assignments.filter-actions.tsx",
          lineNumber: 136,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.filter-actions.tsx",
        lineNumber: 132,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.filter-actions.tsx",
      lineNumber: 95,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.filter-actions.tsx",
      lineNumber: 94,
      columnNumber: 26
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.filter-actions.tsx",
    lineNumber: 62,
    columnNumber: 10
  }, this);
}
_s(FilterActions, "vkX7oiNNeTxO7f7zudHa8r9AJ9c=");
_c = FilterActions;
var _c;
$RefreshReg$(_c, "FilterActions");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  FilterActions
};
//# sourceMappingURL=/build/_shared/chunk-DFTZ2CPD.js.map
