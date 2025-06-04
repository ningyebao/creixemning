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

// app/routes/assignments.lead-list.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.lead-list.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.lead-list.tsx"
  );
  import.meta.hot.lastModified = "1748849104783.7495";
}
function LeadList({
  leads,
  selectedLeads,
  onSelectLeads,
  isLoading
}) {
  _s();
  const [selectAll, setSelectAll] = (0, import_react.useState)(false);
  const [sortField, setSortField] = (0, import_react.useState)(null);
  const [sortDirection, setSortDirection] = (0, import_react.useState)("asc");
  const [displayedLeads, setDisplayedLeads] = (0, import_react.useState)(leads);
  const [lastSelectedIndex, setLastSelectedIndex] = (0, import_react.useState)(null);
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [searchField, setSearchField] = (0, import_react.useState)("nom_lead");
  const tableRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (searchTerm.trim() === "") {
      setDisplayedLeads(leads);
    } else {
      const filtered = leads.filter((lead) => {
        const value = lead[searchField];
        if (value === void 0 || value === null)
          return false;
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
      setDisplayedLeads(filtered);
    }
  }, [leads, searchTerm, searchField]);
  const isLeadSelected = (leadId) => {
    return selectedLeads.some((lead) => lead.id_lead === leadId);
  };
  const handleLeadSelection = (lead, index, shiftKey = false) => {
    if (shiftKey && lastSelectedIndex !== null) {
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      const rangeLeads = displayedLeads.slice(start, end + 1);
      if (isLeadSelected(displayedLeads[lastSelectedIndex].id_lead)) {
        const leadsToAdd = rangeLeads.filter((l) => !isLeadSelected(l.id_lead));
        onSelectLeads([...selectedLeads, ...leadsToAdd]);
      } else {
        const leadIdsToRemove = new Set(rangeLeads.map((l) => l.id_lead));
        onSelectLeads(selectedLeads.filter((l) => !leadIdsToRemove.has(l.id_lead)));
      }
    } else {
      if (isLeadSelected(lead.id_lead)) {
        onSelectLeads(selectedLeads.filter((item) => item.id_lead !== lead.id_lead));
      } else {
        onSelectLeads([...selectedLeads, lead]);
      }
      setLastSelectedIndex(index);
    }
  };
  const handleSelectAll = () => {
    if (selectAll) {
      onSelectLeads([]);
    } else {
      onSelectLeads([...displayedLeads]);
    }
    setSelectAll(!selectAll);
  };
  const handleSelectPage = () => {
    onSelectLeads([...displayedLeads]);
    setSelectAll(true);
  };
  const handleSelectByType = (field, value) => {
    const leadsToSelect = displayedLeads.filter((lead) => lead[field] === value);
    const allSelected = leadsToSelect.every((lead) => isLeadSelected(lead.id_lead));
    if (allSelected) {
      onSelectLeads(selectedLeads.filter((lead) => lead[field] !== value));
    } else {
      const currentSelectedIds = new Set(selectedLeads.map((lead) => lead.id_lead));
      const newLeadsToAdd = leadsToSelect.filter((lead) => !currentSelectedIds.has(lead.id_lead));
      onSelectLeads([...selectedLeads, ...newLeadsToAdd]);
    }
  };
  (0, import_react.useEffect)(() => {
    setSelectAll(displayedLeads.length > 0 && displayedLeads.length === selectedLeads.length);
  }, [displayedLeads, selectedLeads]);
  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
    const sortedLeads = [...displayedLeads].sort((a, b) => {
      const valueA = a[field] === void 0 ? "" : a[field];
      const valueB = b[field] === void 0 ? "" : b[field];
      if (typeof valueA === "string" && typeof valueB === "string") {
        return newDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      if (valueA === valueB)
        return 0;
      if (newDirection === "asc") {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setDisplayedLeads(sortedLeads);
  };
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col items-center justify-center py-16", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-3" }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: "Cargando leads..." }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 153,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 151,
      columnNumber: 12
    }, this);
  }
  if (leads.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-12 px-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 mx-4 my-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "mx-auto h-12 w-12 text-gray-400 mb-3", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1, d: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 161,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 160,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 font-medium mb-1", children: "No se encontraron leads" }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 163,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Prueba a modificar los filtros para obtener resultados." }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 164,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 159,
      columnNumber: 12
    }, this);
  }
  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-3 h-3 opacity-0 group-hover:opacity-40", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 172,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 171,
        columnNumber: 14
      }, this);
    }
    return sortDirection === "asc" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z", clipRule: "evenodd" }, void 0, false, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 176,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 175,
      columnNumber: 38
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }, void 0, false, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 178,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 177,
      columnNumber: 16
    }, this);
  };
  const leadsCountByProvince = {};
  displayedLeads.forEach((lead) => {
    const provincia = lead.provincia_lead || "Sin provincia";
    leadsCountByProvince[provincia] = (leadsCountByProvince[provincia] || 0) + 1;
  });
  const leadsCountByActivity = {};
  displayedLeads.forEach((lead) => {
    const actividad = lead.activitat_lead || "Sin actividad";
    leadsCountByActivity[actividad] = (leadsCountByActivity[actividad] || 0) + 1;
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-3 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-3 justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-1 min-w-0 sm:max-w-xs", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative rounded-md shadow-sm flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: `Buscar por ${searchField === "nom_lead" ? "nombre" : searchField === "nom_empresarial_lead" ? "empresa" : "provincia"}...`, className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 201,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-y-0 right-0 flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm focus:border-blue-500 focus:ring-blue-500", value: searchField, onChange: (e) => setSearchField(e.target.value), children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "nom_lead", children: "Nombre" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 204,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "nom_empresarial_lead", children: "Empresa" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 205,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "provincia_lead", children: "Provincia" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 206,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 203,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 202,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 200,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 199,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative inline-block text-left", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", id: "select-options-menu", "aria-expanded": "true", "aria-haspopup": "true", onClick: () => {
            const menu = document.getElementById("select-options-dropdown");
            if (menu) {
              menu.classList.toggle("hidden");
            }
          }, children: [
            "Seleccionar",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "ml-2 -mr-0.5 h-4 w-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }, void 0, false, {
              fileName: "app/routes/assignments.lead-list.tsx",
              lineNumber: 223,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/routes/assignments.lead-list.tsx",
              lineNumber: 222,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 215,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "select-options-dropdown", className: "hidden origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "select-options-menu", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-1", role: "none", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", onClick: handleSelectAll, role: "menuitem", children: [
              selectAll ? "Deseleccionar todos" : "Seleccionar todos",
              " (",
              displayedLeads.length,
              ")"
            ] }, void 0, true, {
              fileName: "app/routes/assignments.lead-list.tsx",
              lineNumber: 229,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", onClick: handleSelectPage, role: "menuitem", children: [
              "Seleccionar esta p\xE1gina (",
              displayedLeads.length,
              ")"
            ] }, void 0, true, {
              fileName: "app/routes/assignments.lead-list.tsx",
              lineNumber: 232,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border-t border-gray-100 mt-1 pt-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Por provincia" }, void 0, false, {
                fileName: "app/routes/assignments.lead-list.tsx",
                lineNumber: 238,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-h-40 overflow-y-auto", children: Object.entries(leadsCountByProvince).sort((a, b) => a[0].localeCompare(b[0])).map(([provincia, count]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "block w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100", onClick: () => handleSelectByType("provincia_lead", provincia === "Sin provincia" ? null : provincia), role: "menuitem", children: [
                provincia,
                " (",
                count,
                ")"
              ] }, provincia, true, {
                fileName: "app/routes/assignments.lead-list.tsx",
                lineNumber: 242,
                columnNumber: 128
              }, this)) }, void 0, false, {
                fileName: "app/routes/assignments.lead-list.tsx",
                lineNumber: 241,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.lead-list.tsx",
              lineNumber: 237,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border-t border-gray-100 mt-1 pt-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Por actividad" }, void 0, false, {
                fileName: "app/routes/assignments.lead-list.tsx",
                lineNumber: 250,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-h-40 overflow-y-auto", children: Object.entries(leadsCountByActivity).sort((a, b) => a[0].localeCompare(b[0])).map(([actividad, count]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "block w-full text-left px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100", onClick: () => handleSelectByType("activitat_lead", actividad === "Sin actividad" ? null : actividad), role: "menuitem", children: [
                actividad,
                " (",
                count,
                ")"
              ] }, actividad, true, {
                fileName: "app/routes/assignments.lead-list.tsx",
                lineNumber: 254,
                columnNumber: 128
              }, this)) }, void 0, false, {
                fileName: "app/routes/assignments.lead-list.tsx",
                lineNumber: 253,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/assignments.lead-list.tsx",
              lineNumber: 249,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 228,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 227,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 214,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", onClick: () => {
          const leadsToSelect = displayedLeads.filter((lead) => !isLeadSelected(lead.id_lead));
          const leadsToKeep = selectedLeads.filter((lead) => !displayedLeads.some((l) => l.id_lead === lead.id_lead));
          onSelectLeads([...leadsToKeep, ...leadsToSelect]);
        }, children: "Invertir selecci\xF3n" }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 264,
          columnNumber: 11
        }, this),
        selectedLeads.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", onClick: () => onSelectLeads([]), children: "Limpiar selecci\xF3n" }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 273,
          columnNumber: 40
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 197,
      columnNumber: 7
    }, this),
    selectedLeads.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-2 bg-blue-50 border-b border-blue-200 text-sm text-blue-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: selectedLeads.length }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 281,
        columnNumber: 11
      }, this),
      " leads seleccionados",
      selectedLeads.length !== displayedLeads.length && ` de ${displayedLeads.length} mostrados`
    ] }, void 0, true, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 280,
      columnNumber: 36
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", ref: tableRef, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-3 py-3 text-left", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", className: "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500", checked: selectAll, onChange: handleSelectAll }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 292,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Todos" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 293,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 291,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 290,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group", onClick: () => handleSort("id_lead"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "ID" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 300,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1", children: renderSortIcon("id_lead") }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 301,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 299,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 298,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group", onClick: () => handleSort("nom_lead"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Nombre" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 306,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1", children: renderSortIcon("nom_lead") }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 307,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 305,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 304,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group", onClick: () => handleSort("nom_empresarial_lead"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Empresa" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 312,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1", children: renderSortIcon("nom_empresarial_lead") }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 313,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 311,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 310,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group", onClick: () => handleSort("provincia_lead"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Provincia" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 318,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1", children: renderSortIcon("provincia_lead") }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 319,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 317,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 316,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group", onClick: () => handleSort("poblacio_lead"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Poblaci\xF3n" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 324,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1", children: renderSortIcon("poblacio_lead") }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 325,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 323,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 322,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group", onClick: () => handleSort("activitat_lead"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Actividad" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 330,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1", children: renderSortIcon("activitat_lead") }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 331,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 329,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 328,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group", onClick: () => handleSort("actiu_lead"), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Estado" }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 336,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1", children: renderSortIcon("actiu_lead") }, void 0, false, {
            fileName: "app/routes/assignments.lead-list.tsx",
            lineNumber: 337,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 335,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 334,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 289,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 288,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: displayedLeads.map((lead, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { onClick: (e) => handleLeadSelection(lead, index, e.shiftKey), className: `hover:bg-gray-50 cursor-pointer transition-colors ${isLeadSelected(lead.id_lead) ? "bg-blue-50" : ""}`, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-3 py-2.5 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", className: "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500", checked: isLeadSelected(lead.id_lead), onChange: (e) => {
          e.stopPropagation();
          handleLeadSelection(lead, index);
        } }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 345,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 344,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-3 py-2.5 whitespace-nowrap text-xs text-gray-500", children: lead.id_lead }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 350,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-3 py-2.5 whitespace-nowrap text-sm font-medium text-gray-900", children: lead.nom_lead || "N/A" }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 353,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-3 py-2.5 whitespace-nowrap text-sm text-gray-800", children: lead.nom_empresarial_lead || lead.nom_fiscal_lead || "N/A" }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 356,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-3 py-2.5 whitespace-nowrap text-sm text-gray-600", children: lead.provincia_lead || "N/A" }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 359,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-3 py-2.5 whitespace-nowrap text-sm text-gray-600", children: lead.poblacio_lead || "N/A" }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 362,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-3 py-2.5 whitespace-nowrap text-sm text-gray-600", children: lead.activitat_lead || "N/A" }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 365,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-3 py-2.5 whitespace-nowrap text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `px-2 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${lead.actiu_lead ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: lead.actiu_lead ? "Activo" : "Inactivo" }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 369,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.lead-list.tsx",
          lineNumber: 368,
          columnNumber: 17
        }, this)
      ] }, lead.id_lead, true, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 343,
        columnNumber: 50
      }, this)) }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 342,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 287,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 286,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        "Mostrando ",
        displayedLeads.length,
        " de ",
        leads.length,
        " leads"
      ] }, void 0, true, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 381,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: searchTerm && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "text-blue-600 hover:text-blue-800", onClick: () => setSearchTerm(""), children: "Limpiar b\xFAsqueda" }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 385,
        columnNumber: 28
      }, this) }, void 0, false, {
        fileName: "app/routes/assignments.lead-list.tsx",
        lineNumber: 384,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 380,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.lead-list.tsx",
      lineNumber: 379,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/assignments.lead-list.tsx",
    lineNumber: 195,
    columnNumber: 10
  }, this);
}
_s(LeadList, "C8wirdbMEZKQbkKyD4LoE0KYX8M=");
_c = LeadList;
var _c;
$RefreshReg$(_c, "LeadList");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  LeadList
};
//# sourceMappingURL=/build/_shared/chunk-7UMRVVBV.js.map
