import {
  apiClient
} from "/build/_shared/chunk-52EIYT2B.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
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
import {
  require_react
} from "/build/_shared/chunk-2AFRYLX2.js";
import {
  __publicField,
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// app/routes/formularis.productes.tsx
var import_react = __toESM(require_react());
var import_node = __toESM(require_node());

// app/services/productes.services.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\productes.services.ts"
  );
  import.meta.hot.lastModified = "1746439106851.0356";
}
var ProductesService = class {
  static async getAll() {
    console.log("ProductesService: Llamando a getAll()");
    try {
      const productes = await apiClient.get(this.BASE_ENDPOINT);
      console.log("ProductesService: Respuesta de getAll()", productes);
      return productes;
    } catch (error) {
      console.error("ProductesService: Error en getAll()", error);
      throw error;
    }
  }
  static async getById(id) {
    return apiClient.get(`${this.BASE_ENDPOINT}${id}`);
  }
  static async create(producteData) {
    const cleanedData = Object.fromEntries(
      Object.entries(producteData).map(([k, v]) => [k, v === null ? void 0 : v])
    );
    return apiClient.post(this.BASE_ENDPOINT, cleanedData);
  }
  static async update(id, producteData) {
    const cleanedData = Object.fromEntries(
      Object.entries(producteData).map(([k, v]) => [k, v === null ? void 0 : v])
    );
    return apiClient.post(`${this.BASE_ENDPOINT}${id}`, cleanedData);
  }
  static async delete(id) {
    return apiClient.get(`${this.BASE_ENDPOINT}${id}/delete`);
  }
};
// Usamos la ruta exacta que está en el backend
__publicField(ProductesService, "BASE_ENDPOINT", "/productes/");

// app/routes/formularis.productes.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\formularis.productes.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\formularis.productes.tsx"
  );
  import.meta.hot.lastModified = "1745317186753.38";
}
function ProductsPage() {
  _s();
  const {
    products,
    error
  } = useLoaderData();
  const [activeTab, setActiveTab] = (0, import_react.useState)("list");
  const [selectedProduct, setSelectedProduct] = (0, import_react.useState)(null);
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [formData, setFormData] = (0, import_react.useState)({
    id_client: 1,
    nom_producte: "",
    preu_producte: 0,
    descripcio_producte: "",
    sector_producte: "",
    significatiu_producte: "",
    enquesta_producte: "",
    actiu_producte: true,
    databaixa_producte: null
  });
  const [message, setMessage] = (0, import_react.useState)({
    type: null,
    text: null
  });
  const [loading, setLoading] = (0, import_react.useState)(false);
  const filteredProducts = products.filter((product) => {
    if (!searchTerm)
      return true;
    const term = searchTerm.toLowerCase();
    return product.id_producte.toString().includes(term) || product.nom_producte.toLowerCase().includes(term) || product.id_client.toString().includes(term) || product.sector_producte && product.sector_producte.toLowerCase().includes(term);
  });
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!formData.id_client || !formData.nom_producte || formData.preu_producte < 0) {
      setMessage({
        type: "error",
        text: "Complete los campos obligatorios marcados con *"
      });
      return;
    }
    setLoading(true);
    try {
      const newProduct = {
        ...formData,
        data_creacio_producte: (/* @__PURE__ */ new Date()).toISOString(),
        // Si formData.databaixa_producte es null, se transforma a undefined
        databaixa_producte: formData.databaixa_producte ?? void 0
      };
      console.log("Creando nuevo producto:", newProduct);
      const result = await ProductesService.create(newProduct);
      setMessage({
        type: "success",
        text: `Producto '${formData.nom_producte}' creado exitosamente con ID: ${result.id_producte}`
      });
      setActiveTab("list");
      resetForm();
      window.location.reload();
    } catch (error2) {
      console.error("Error creating product:", error2);
      setMessage({
        type: "error",
        text: "Error al crear el producto"
      });
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setFormData({
      id_client: 1,
      nom_producte: "",
      preu_producte: 0,
      descripcio_producte: "",
      sector_producte: "",
      significatiu_producte: "",
      enquesta_producte: "",
      actiu_producte: true,
      databaixa_producte: null
    });
  };
  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleNumberChange = (e) => {
    const {
      name,
      value
    } = e.target;
    if (name === "preu_producte") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    }
  };
  const handleCheckboxChange = (e) => {
    const {
      name,
      checked
    } = e.target;
    if (name === "marcar_baja") {
      setFormData((prev) => ({
        ...prev,
        databaixa_producte: checked ? (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : null
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
      }));
    }
  };
  const handleDateChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  (0, import_react.useEffect)(() => {
    if (message.type) {
      const timer = setTimeout(() => setMessage({
        type: null,
        text: null
      }), 5e3);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "products-container", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4", children: "Gesti\xF3n de Productos" }, void 0, false, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 197,
      columnNumber: 7
    }, this),
    message.type && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mb-4 p-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: message.text }, void 0, false, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 199,
      columnNumber: 24
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-4 rounded bg-red-100 text-red-700", children: error }, void 0, false, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 203,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex border-b border-gray-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "list" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("list"), children: "Lista de Productos" }, void 0, false, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "new" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("new"), children: "Nuevo Producto" }, void 0, false, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 211,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "edit" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("edit"), disabled: !selectedProduct, children: "Editar Producto" }, void 0, false, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 207,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: [
      activeTab === "list" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-2", children: "Cat\xE1logo de Productos" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 221,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Buscar producto por ID, nombre o sector...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 224,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 223,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full bg-white border border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "ID" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 231,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "ID Cliente" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 232,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 233,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Precio" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 234,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Sector" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 235,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Activo" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 236,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Acciones" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 237,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 230,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 229,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: product.id_producte }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 242,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: product.id_client }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 243,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: product.nom_producte }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 244,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: [
              product.preu_producte.toFixed(2),
              "\u20AC"
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 245,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: product.sector_producte }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 246,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: product.actiu_producte ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: "Activo" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 248,
              columnNumber: 51
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800", children: "Inactivo" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 250,
              columnNumber: 37
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 247,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-primary-600 hover:text-primary-800 mr-2", onClick: () => {
                setSelectedProduct(product);
                setActiveTab("edit");
              }, children: "Editar" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 255,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-red-600 hover:text-red-800", onClick: () => {
              }, children: "Eliminar" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 261,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 254,
              columnNumber: 23
            }, this)
          ] }, product.id_producte, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 241,
            columnNumber: 52
          }, this)) }, void 0, false, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 240,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 228,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 227,
          columnNumber: 13
        }, this),
        filteredProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-4 text-gray-500", children: "No se encontraron productos con los criterios de b\xFAsqueda." }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 272,
          columnNumber: 47
        }, this),
        selectedProduct && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 p-4 border rounded bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-2", children: "Detalles del Producto" }, void 0, false, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 277,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", { className: "bg-white p-4 rounded overflow-auto", children: JSON.stringify(selectedProduct, null, 2) }, void 0, false, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 278,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 276,
          columnNumber: 33
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 220,
        columnNumber: 34
      }, this),
      activeTab === "new" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Crear Nuevo Producto" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 285,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleCreateProduct, className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 289,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "ID del Cliente *" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 292,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "id_client", value: formData.id_client, onChange: handleNumberChange, min: "1", step: "1", required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 293,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 291,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre del Producto *" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 296,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_producte", value: formData.nom_producte, onChange: handleInputChange, required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 297,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Nombre identificativo del producto" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 298,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 295,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 290,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 288,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Detalles del Producto" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 304,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Precio (\u20AC) *" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 307,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "preu_producte", value: formData.preu_producte, onChange: handleNumberChange, min: "0", step: "0.01", required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 308,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Precio de venta" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 309,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 306,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sector" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 312,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "sector_producte", value: formData.sector_producte, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 313,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Sector del producto" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 314,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 311,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 305,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Descripci\xF3n" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 319,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "descripcio_producte", value: formData.descripcio_producte, onChange: handleInputChange, rows: 3, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 320,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Informaci\xF3n detallada sobre el producto" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 321,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 318,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Significativo" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 325,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "significatiu_producte", value: formData.significatiu_producte, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 326,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Informaci\xF3n relevante o distintiva" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 327,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 324,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Enquesta" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 331,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "enquesta_producte", value: formData.enquesta_producte, onChange: handleInputChange, rows: 3, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 332,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Resultados o datos de enquesta" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 333,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 330,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 303,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Estado" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 338,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "actiu_producte", checked: formData.actiu_producte, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 341,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Producto Activo" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 342,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 340,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Indica si el producto est\xE1 activo" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 344,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 339,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "marcar_baja", checked: !!formData.databaixa_producte, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 349,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Marcar como dado de baja" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 350,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 348,
                columnNumber: 19
              }, this),
              formData.databaixa_producte && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Baja" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 353,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "databaixa_producte", value: formData.databaixa_producte, onChange: handleDateChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 354,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 352,
                columnNumber: 51
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 347,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 337,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: resetForm, className: "px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50", children: "Limpiar" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 360,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50", children: loading ? "Guardando..." : "Guardar Producto" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 363,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 359,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 287,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 284,
        columnNumber: 33
      }, this),
      activeTab === "edit" && selectedProduct && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Editar Producto" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 371,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: [
          "Implementaci\xF3n pendiente para editar el producto con ID: ",
          selectedProduct.id_producte
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 372,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 370,
        columnNumber: 53
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 219,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/formularis.productes.tsx",
    lineNumber: 196,
    columnNumber: 10
  }, this);
}
_s(ProductsPage, "WRtVtDYszUZ6f7iZ/GY3/9XkxM0=", false, function() {
  return [useLoaderData];
});
_c = ProductsPage;
var _c;
$RefreshReg$(_c, "ProductsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ProductsPage as default
};
//# sourceMappingURL=/build/routes/formularis.productes-EFQFQYVI.js.map
