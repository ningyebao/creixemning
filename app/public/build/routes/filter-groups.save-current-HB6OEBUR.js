import {
  FilterGroupService
} from "/build/_shared/chunk-SUXX2XDJ.js";
import "/build/_shared/chunk-MDGFDLOQ.js";
import "/build/_shared/chunk-ZYFQMSET.js";
import "/build/_shared/chunk-52EIYT2B.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  Form,
  Link,
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

// app/routes/filter-groups.save-current.tsx
var import_node = __toESM(require_node());
var import_react = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\filter-groups.save-current.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\filter-groups.save-current.tsx"
  );
  import.meta.hot.lastModified = "1745419739987.105";
}
function FilterGroupsIndex() {
  _s();
  const [filterGroups, setFilterGroups] = (0, import_react.useState)([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = (0, import_react.useState)(null);
  const [selectedFilterGroups, setSelectedFilterGroups] = (0, import_react.useState)([]);
  const [selectedAgents, setSelectedAgents] = (0, import_react.useState)([]);
  const [selectedCampanyas, setSelectedCampanyas] = (0, import_react.useState)([]);
  const submit = useSubmit();
  (0, import_react.useEffect)(() => {
    setFilterGroups(FilterGroupService.getAll());
  }, []);
  const handleDelete = (id) => {
    FilterGroupService.delete(id);
    setFilterGroups(FilterGroupService.getAll());
    setShowDeleteConfirm(null);
  };
  const handleFilterGroupSelection = (id, isSelected) => {
    if (isSelected) {
      setSelectedFilterGroups([...selectedFilterGroups, id]);
    } else {
      setSelectedFilterGroups(selectedFilterGroups.filter((groupId) => groupId !== id));
    }
  };
  const handleApplyFilterGroups = () => {
    const formData = new FormData();
    selectedFilterGroups.forEach((id) => {
      formData.append("filterGroupIds", id);
    });
    selectedAgents.forEach((id) => {
      formData.append("agentIds", id.toString());
    });
    selectedCampanyas.forEach((id) => {
      formData.append("campanyaIds", id.toString());
    });
    submit(formData, {
      method: "post"
    });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Grupos de Filtros" }, void 0, false, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/filter-groups/new", className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "+ Nuevo Grupo de Filtros" }, void 0, false, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 134,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/assignments/bulk", className: "px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700", children: "Volver a Asignaci\xF3n Masiva" }, void 0, false, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 137,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 133,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups.save-current.tsx",
      lineNumber: 131,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium", children: "Selecci\xF3n de Grupos de Filtros" }, void 0, false, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 146,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 145,
        columnNumber: 9
      }, this),
      filterGroups.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-4 text-gray-600", children: "Seleccione uno o m\xE1s grupos de filtros para aplicar. Luego puede asignarlos a campa\xF1as y agentes." }, void 0, false, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 150,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Selecci\xF3n" }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 157,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 158,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Descripci\xF3n" }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 159,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Fecha de creaci\xF3n" }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 160,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Acciones" }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 161,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups.save-current.tsx",
            lineNumber: 156,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/filter-groups.save-current.tsx",
            lineNumber: 155,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "bg-white divide-y divide-gray-200", children: filterGroups.map((group) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", checked: selectedFilterGroups.includes(group.id), onChange: (e) => handleFilterGroupSelection(group.id, e.target.checked), className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 167,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 166,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: group.name }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 169,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: group.description || "-" }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 170,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: new Date(group.createdAt).toLocaleDateString() }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 171,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/filter-groups/${group.id}`, className: "text-blue-600 hover:text-blue-900", children: "Editar" }, void 0, false, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 176,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowDeleteConfirm(group.id), className: "text-red-600 hover:text-red-900", children: "Eliminar" }, void 0, false, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 179,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/assignments/bulk?filterGroupId=${group.id}`, className: "text-green-600 hover:text-green-900", children: "Aplicar" }, void 0, false, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 182,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 175,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 174,
              columnNumber: 23
            }, this)
          ] }, group.id, true, {
            fileName: "app/routes/filter-groups.save-current.tsx",
            lineNumber: 165,
            columnNumber: 46
          }, this)) }, void 0, false, {
            fileName: "app/routes/filter-groups.save-current.tsx",
            lineNumber: 164,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 154,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 149,
        columnNumber: 36
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-6 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500", children: "No hay grupos de filtros guardados." }, void 0, false, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 192,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/filter-groups/new", className: "mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Crear primer grupo de filtros" }, void 0, false, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 193,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 191,
        columnNumber: 20
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups.save-current.tsx",
      lineNumber: 144,
      columnNumber: 7
    }, this),
    selectedFilterGroups.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-lg font-medium", children: "Asignar a Campa\xF1as y Agentes" }, void 0, false, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 202,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 201,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-4 text-blue-600", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-medium", children: "Grupos seleccionados:" }, void 0, false, {
            fileName: "app/routes/filter-groups.save-current.tsx",
            lineNumber: 207,
            columnNumber: 15
          }, this),
          " ",
          selectedFilterGroups.length
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 206,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium mb-3", children: "Seleccionar Agentes (opcional)" }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 213,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border p-3 rounded max-h-60 overflow-y-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-2 hover:bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "agentIds", value: "1", onChange: (e) => {
                  const id = parseInt(e.target.value);
                  setSelectedAgents((prev) => e.target.checked ? [...prev, id] : prev.filter((agentId) => agentId !== id));
                } }, void 0, false, {
                  fileName: "app/routes/filter-groups.save-current.tsx",
                  lineNumber: 221,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Agente 1" }, void 0, false, {
                  fileName: "app/routes/filter-groups.save-current.tsx",
                  lineNumber: 225,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 220,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 219,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-2 hover:bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "agentIds", value: "2", onChange: (e) => {
                  const id = parseInt(e.target.value);
                  setSelectedAgents((prev) => e.target.checked ? [...prev, id] : prev.filter((agentId) => agentId !== id));
                } }, void 0, false, {
                  fileName: "app/routes/filter-groups.save-current.tsx",
                  lineNumber: 230,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Agente 2" }, void 0, false, {
                  fileName: "app/routes/filter-groups.save-current.tsx",
                  lineNumber: 234,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 229,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 228,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 217,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 214,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups.save-current.tsx",
            lineNumber: 212,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-md font-medium mb-3", children: "Seleccionar Campa\xF1as (opcional)" }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 243,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border p-3 rounded max-h-60 overflow-y-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-2 hover:bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "campanyaIds", value: "1", onChange: (e) => {
                  const id = parseInt(e.target.value);
                  setSelectedCampanyas((prev) => e.target.checked ? [...prev, id] : prev.filter((campanyaId) => campanyaId !== id));
                } }, void 0, false, {
                  fileName: "app/routes/filter-groups.save-current.tsx",
                  lineNumber: 251,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Campa\xF1a 1" }, void 0, false, {
                  fileName: "app/routes/filter-groups.save-current.tsx",
                  lineNumber: 255,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 250,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 249,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-2 hover:bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "campanyaIds", value: "2", onChange: (e) => {
                  const id = parseInt(e.target.value);
                  setSelectedCampanyas((prev) => e.target.checked ? [...prev, id] : prev.filter((campanyaId) => campanyaId !== id));
                } }, void 0, false, {
                  fileName: "app/routes/filter-groups.save-current.tsx",
                  lineNumber: 260,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Campa\xF1a 2" }, void 0, false, {
                  fileName: "app/routes/filter-groups.save-current.tsx",
                  lineNumber: 264,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 259,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/filter-groups.save-current.tsx",
                lineNumber: 258,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 247,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/filter-groups.save-current.tsx",
              lineNumber: 244,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/filter-groups.save-current.tsx",
            lineNumber: 242,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-span-1 md:col-span-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: handleApplyFilterGroups, className: "w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "Aplicar Filtros y Continuar a Asignaci\xF3n" }, void 0, false, {
            fileName: "app/routes/filter-groups.save-current.tsx",
            lineNumber: 273,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/routes/filter-groups.save-current.tsx",
            lineNumber: 272,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 210,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 205,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups.save-current.tsx",
      lineNumber: 200,
      columnNumber: 43
    }, this),
    showDeleteConfirm && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-lg max-w-md w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold mb-4", children: "Confirmar eliminaci\xF3n" }, void 0, false, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 284,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-6", children: "\xBFEst\xE1 seguro de que desea eliminar este grupo de filtros? Esta acci\xF3n no se puede deshacer." }, void 0, false, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 285,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end space-x-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowDeleteConfirm(null), className: "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300", children: "Cancelar" }, void 0, false, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 289,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => handleDelete(showDeleteConfirm), className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700", children: "Eliminar" }, void 0, false, {
          fileName: "app/routes/filter-groups.save-current.tsx",
          lineNumber: 292,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/filter-groups.save-current.tsx",
        lineNumber: 288,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter-groups.save-current.tsx",
      lineNumber: 283,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/filter-groups.save-current.tsx",
      lineNumber: 282,
      columnNumber: 29
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/filter-groups.save-current.tsx",
    lineNumber: 130,
    columnNumber: 10
  }, this);
}
_s(FilterGroupsIndex, "BOj0rv52L9vgg+HCEyPxPu5oIy4=", false, function() {
  return [useSubmit];
});
_c = FilterGroupsIndex;
var _c;
$RefreshReg$(_c, "FilterGroupsIndex");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  FilterGroupsIndex as default
};
//# sourceMappingURL=/build/routes/filter-groups.save-current-HB6OEBUR.js.map
