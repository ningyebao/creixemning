import {
  apiClient
} from "/build/_shared/chunk-WCLFPUDL.js";
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
  __publicField,
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// app/routes/assignments.saved-filters.tsx
var import_react = __toESM(require_react());

// app/services/filter-group.services.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\filter-group.services.ts"
  );
  import.meta.hot.lastModified = "1748853616639.1611";
}
var FilterGroupService = class {
  /**
   * Obtiene todos los grupos de filtros
   * @returns Lista de grupos de filtros
   */
  static async getAll() {
    try {
      return await apiClient.get(this.BASE_URL);
    } catch (error) {
      console.error("Error fetching filter groups:", error);
      throw this.handleError(error);
    }
  }
  /**
   * Obtiene un grupo de filtros por su ID
   * @param id ID del grupo de filtros
   * @returns Grupo de filtros encontrado
   */
  static async getById(id) {
    try {
      return await apiClient.get(`${this.BASE_URL}${id}`);
    } catch (error) {
      console.error(`Error fetching filter group with ID ${id}:`, error);
      throw this.handleError(error);
    }
  }
  /**
   * Crea un nuevo grupo de filtros
   * @param name Nombre del grupo
   * @param description Descripción del grupo
   * @param filters Filtros guardados
   * @returns Grupo de filtros creado
   */
  static async create(name, description, filters) {
    try {
      return await apiClient.post(this.BASE_URL, {
        name,
        description,
        filters
      });
    } catch (error) {
      console.error("Error creating filter group:", error);
      throw this.handleError(error);
    }
  }
  /**
   * Actualiza un grupo de filtros existente
   * @param id ID del grupo
   * @param data Datos a actualizar
   * @returns Grupo de filtros actualizado
   */
  static async update(id, data) {
    try {
      return await apiClient.put(`${this.BASE_URL}${id}`, data);
    } catch (error) {
      console.error(`Error updating filter group ${id}:`, error);
      throw this.handleError(error);
    }
  }
  /**
   * Elimina un grupo de filtros
   * @param id ID del grupo
   * @returns Resultado de la operación
   */
  static async delete(id) {
    try {
      return await apiClient.delete(`${this.BASE_URL}${id}`);
    } catch (error) {
      console.error(`Error deleting filter group ${id}:`, error);
      throw this.handleError(error);
    }
  }
  /**
   * Maneja errores de la API y los transforma en mensajes de error amigables
   * @param error Error original
   * @returns Error procesado
   */
  static handleError(error) {
    if (error.name === "ApiError" && typeof error.status === "number") {
      console.error(`ApiError: Status ${error.status}, Message: ${error.message}, Details: ${error.details}`);
      return new Error(error.toUserFriendlyMessage() || `Error API: ${error.message}`);
    }
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.detail || "Error desconocido";
      switch (statusCode) {
        case 400:
          return new Error(`Error en la solicitud: ${errorMessage}`);
        case 401:
          return new Error("No autorizado. Por favor, inicie sesi\xF3n nuevamente.");
        case 403:
          return new Error("No tiene permisos para realizar esta acci\xF3n.");
        case 404:
          return new Error("El recurso solicitado no existe.");
        case 500:
          return new Error("Error del servidor. Por favor, intente m\xE1s tarde.");
        default:
          return new Error(errorMessage);
      }
    }
    if (error.request) {
      return new Error("No se pudo conectar con el servidor. Compruebe su conexi\xF3n a internet.");
    }
    return error instanceof Error ? error : new Error("Error desconocido");
  }
};
__publicField(FilterGroupService, "BASE_URL", "/filter-groups/");

// app/routes/assignments.saved-filters.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\assignments.saved-filters.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\assignments.saved-filters.tsx"
  );
  import.meta.hot.lastModified = "1748853641867.237";
}
function SavedFilters({
  onSelectFilter
}) {
  _s();
  const [filterGroups, setFilterGroups] = (0, import_react.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    loadFilterGroups();
  }, []);
  const loadFilterGroups = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const groups = await FilterGroupService.getAll();
      setFilterGroups(groups);
    } catch (err) {
      console.error("Error al cargar los grupos de filtros:", err);
      setError("No se pudieron cargar los filtros guardados. Por favor, int\xE9ntelo de nuevo m\xE1s tarde.");
    } finally {
      setIsLoading(false);
    }
  };
  const applyFilter = (filters) => {
    onSelectFilter(filters);
  };
  const deleteFilter = async (id) => {
    setIsLoading(true);
    try {
      await FilterGroupService.delete(id);
      setFilterGroups(filterGroups.filter((group) => group.id !== id));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error("Error al eliminar el filtro:", err);
      setError("No se pudo eliminar el filtro. Por favor, int\xE9ntelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };
  const countActiveFilters = (filters) => {
    return Object.keys(filters).length;
  };
  if (isLoading && filterGroups.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 flex justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" }, void 0, false, {
      fileName: "app/routes/assignments.saved-filters.tsx",
      lineNumber: 81,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.saved-filters.tsx",
      lineNumber: 80,
      columnNumber: 12
    }, this);
  }
  if (error && filterGroups.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 text-red-600 text-sm", children: error }, void 0, false, {
      fileName: "app/routes/assignments.saved-filters.tsx",
      lineNumber: 85,
      columnNumber: 12
    }, this);
  }
  if (filterGroups.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 text-gray-500 text-sm text-center", children: "No hay filtros guardados" }, void 0, false, {
      fileName: "app/routes/assignments.saved-filters.tsx",
      lineNumber: 90,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: filterGroups.map((group) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "border border-gray-200 rounded-md overflow-hidden hover:border-blue-300 transition-colors", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 px-3 py-2 flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-sm font-medium text-gray-700", children: group.name }, void 0, false, {
          fileName: "app/routes/assignments.saved-filters.tsx",
          lineNumber: 98,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500", children: [
          countActiveFilters(group.filters),
          " filtros"
        ] }, void 0, true, {
          fileName: "app/routes/assignments.saved-filters.tsx",
          lineNumber: 99,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.saved-filters.tsx",
        lineNumber: 97,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => applyFilter(group.filters), className: "p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100", title: "Aplicar filtros", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }, void 0, false, {
          fileName: "app/routes/assignments.saved-filters.tsx",
          lineNumber: 106,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.saved-filters.tsx",
          lineNumber: 105,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.saved-filters.tsx",
          lineNumber: 104,
          columnNumber: 15
        }, this),
        showDeleteConfirm === group.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => deleteFilter(group.id), className: "p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100", title: "Confirmar eliminaci\xF3n", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }, void 0, false, {
            fileName: "app/routes/assignments.saved-filters.tsx",
            lineNumber: 113,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.saved-filters.tsx",
            lineNumber: 112,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.saved-filters.tsx",
            lineNumber: 111,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowDeleteConfirm(null), className: "p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200", title: "Cancelar", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
            fileName: "app/routes/assignments.saved-filters.tsx",
            lineNumber: 118,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.saved-filters.tsx",
            lineNumber: 117,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/assignments.saved-filters.tsx",
            lineNumber: 116,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/assignments.saved-filters.tsx",
          lineNumber: 110,
          columnNumber: 49
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setShowDeleteConfirm(group.id), className: "p-1.5 bg-gray-50 text-gray-500 rounded hover:bg-gray-100", title: "Eliminar filtro", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }, void 0, false, {
          fileName: "app/routes/assignments.saved-filters.tsx",
          lineNumber: 123,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.saved-filters.tsx",
          lineNumber: 122,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/assignments.saved-filters.tsx",
          lineNumber: 121,
          columnNumber: 26
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/assignments.saved-filters.tsx",
        lineNumber: 103,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.saved-filters.tsx",
      lineNumber: 96,
      columnNumber: 11
    }, this),
    group.description && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-3 py-2 text-xs text-gray-600 border-t border-gray-100", children: group.description }, void 0, false, {
      fileName: "app/routes/assignments.saved-filters.tsx",
      lineNumber: 129,
      columnNumber: 33
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-3 py-2 border-t border-gray-100 bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-1.5", children: [
      Object.entries(group.filters).slice(0, 5).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800", children: [
        key.replace(/_/g, " "),
        ": ",
        String(value).substring(0, 15),
        String(value).length > 15 && "..."
      ] }, key, true, {
        fileName: "app/routes/assignments.saved-filters.tsx",
        lineNumber: 135,
        columnNumber: 80
      }, this)),
      Object.keys(group.filters).length > 5 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700", children: [
        "+",
        Object.keys(group.filters).length - 5,
        " m\xE1s"
      ] }, void 0, true, {
        fileName: "app/routes/assignments.saved-filters.tsx",
        lineNumber: 139,
        columnNumber: 57
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/assignments.saved-filters.tsx",
      lineNumber: 134,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/routes/assignments.saved-filters.tsx",
      lineNumber: 133,
      columnNumber: 11
    }, this)
  ] }, group.id, true, {
    fileName: "app/routes/assignments.saved-filters.tsx",
    lineNumber: 95,
    columnNumber: 34
  }, this)) }, void 0, false, {
    fileName: "app/routes/assignments.saved-filters.tsx",
    lineNumber: 94,
    columnNumber: 10
  }, this);
}
_s(SavedFilters, "2Ba9FDIY/d/ba9A8m+Quc8di4Lw=");
_c = SavedFilters;
var _c;
$RefreshReg$(_c, "SavedFilters");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  FilterGroupService,
  SavedFilters
};
//# sourceMappingURL=/build/_shared/chunk-AP4ZRCYL.js.map
