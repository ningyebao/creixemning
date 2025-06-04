import {
  useLoaderData,
  useNavigation
} from "/build/_shared/chunk-QWJ64ZKI.js";
import "/build/_shared/chunk-OPGM6WIO.js";
import {
  apiClient
} from "/build/_shared/chunk-WCLFPUDL.js";
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
  import.meta.hot.lastModified = "1746812762736.1838";
}
var ProductesService = class {
  // Coincide con el prefix del router en FastAPI
  /**
   * Obtiene todos los productos.
   * Corresponde a: GET /productes/
   */
  static async getAll() {
    console.log(`ProductesService: Llamando a getAll() en ${this.BASE_ENDPOINT}`);
    try {
      const productes = await apiClient.get(this.BASE_ENDPOINT);
      console.log("ProductesService: Respuesta de getAll()", productes);
      return productes;
    } catch (error) {
      console.error("ProductesService: Error en getAll()", error);
      throw error;
    }
  }
  /**
   * Obtiene un producto específico por su ID.
   * Corresponde a: GET /productes/{producte_id}
   */
  static async getById(id) {
    const endpoint = `${this.BASE_ENDPOINT}${id}`;
    console.log(`ProductesService: Llamando a getById(${id}) en ${endpoint}`);
    try {
      const producte = await apiClient.get(endpoint);
      console.log(`ProductesService: Respuesta de getById(${id})`, producte);
      if (!producte) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      return producte;
    } catch (error) {
      console.error(`ProductesService: Error en getById(${id})`, error);
      throw error;
    }
  }
  /**
   * Crea un nuevo producto.
   * Corresponde a: POST /productes/
   * El backend espera un objeto ProducteCreate.
   */
  static async create(producteData) {
    console.log(`ProductesService: Llamando a create() en ${this.BASE_ENDPOINT} con datos:`, producteData);
    try {
      const nouProducte = await apiClient.post(this.BASE_ENDPOINT, producteData);
      console.log("ProductesService: Respuesta de create()", nouProducte);
      return nouProducte;
    } catch (error) {
      console.error("ProductesService: Error en create()", error);
      throw error;
    }
  }
  /**
   * Actualiza un producto existente.
   * Corresponde a: PUT /productes/{producte_id}
   * El backend espera un objeto ProducteCreate para los datos de actualización.
   */
  static async update(id, producteUpdateData) {
    const endpoint = `${this.BASE_ENDPOINT}${id}`;
    console.log(`ProductesService: Llamando a update(${id}) en ${endpoint} con datos:`, producteUpdateData);
    try {
      const producteActualitzat = await apiClient.put(endpoint, producteUpdateData);
      console.log(`ProductesService: Respuesta de update(${id})`, producteActualitzat);
      return producteActualitzat;
    } catch (error) {
      console.error(`ProductesService: Error en update(${id})`, error);
      throw error;
    }
  }
  /**
   * Elimina un producto por su ID.
   * Corresponde a: DELETE /productes/{producte_id}
   */
  static async delete(id) {
    const endpoint = `${this.BASE_ENDPOINT}${id}`;
    console.log(`ProductesService: Llamando a delete(${id}) en ${endpoint}`);
    try {
      await apiClient.delete(endpoint);
      console.log(`ProductesService: Petici\xF3n de eliminaci\xF3n enviada para el producto con ID: ${id}.`);
    } catch (error) {
      console.error(`ProductesService: Error en delete(${id})`, error);
      throw error;
    }
  }
  /**
   * Limpia los valores nulos de un objeto, convirtiéndolos a undefined
   * para que no se envíen en el payload si no es necesario (especialmente útil para Pydantic).
   * Nota: Tu backend parece manejar esto con `producte_in.dict(exclude_unset=True)`,
   * por lo que este paso en el frontend podría ser redundante si los campos opcionales
   * ya son `undefined` cuando no se proporcionan.
   * Sin embargo, si el formulario puede enviar `null` explícitamente, esto es útil.
   */
  static cleanData(data) {
    const cleanedData = { ...data };
    for (const key in cleanedData) {
      if (cleanedData[key] === null) {
        delete cleanedData[key];
      }
    }
    return cleanedData;
  }
};
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
  import.meta.hot.lastModified = "1747036618293.2468";
}
var initialFormData = {
  id_client: 1,
  nom_producte: "",
  preu_producte: 0,
  descripcio_producte: "",
  sector_producte: "",
  significatiu_producte: "",
  enquesta_producte: "",
  actiu_producte: true,
  databaixa_producte: void 0,
  databaixa_producte_checkbox: false
};
function ProductsPage() {
  _s();
  const {
    products: initialProducts,
    error: loaderError
  } = useLoaderData();
  const navigation = useNavigation();
  const [products, setProducts] = (0, import_react.useState)(initialProducts);
  const [activeTab, setActiveTab] = (0, import_react.useState)("list");
  const [selectedProduct, setSelectedProduct] = (0, import_react.useState)(null);
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [formData, setFormData] = (0, import_react.useState)(initialFormData);
  const [message, setMessage] = (0, import_react.useState)({
    type: null,
    text: null
  });
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    setProducts(initialProducts);
  }, [initialProducts]);
  (0, import_react.useEffect)(() => {
    if (message.type) {
      const timer = setTimeout(() => setMessage({
        type: null,
        text: null
      }), 5e3);
      return () => clearTimeout(timer);
    }
  }, [message]);
  const filteredProducts = (0, import_react.useMemo)(() => {
    return products.filter((product) => {
      if (!searchTerm)
        return true;
      const term = searchTerm.toLowerCase();
      return product.id_producte.toString().includes(term) || product.nom_producte.toLowerCase().includes(term) || product.id_client.toString().includes(term) || product.sector_producte && product.sector_producte.toLowerCase().includes(term);
    });
  }, [products, searchTerm]);
  const resetFormAndState = () => {
    setFormData(initialFormData);
    setSelectedProduct(null);
    setMessage({
      type: null,
      text: null
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
    const numValue = name === "preu_producte" ? parseFloat(value) : parseInt(value, 10);
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(numValue) ? "" : numValue
    }));
  };
  const handleCheckboxChange = (e) => {
    const {
      name,
      checked
    } = e.target;
    if (name === "databaixa_producte_checkbox") {
      setFormData((prev) => ({
        ...prev,
        databaixa_producte_checkbox: checked,
        databaixa_producte: checked ? prev.databaixa_producte || (/* @__PURE__ */ new Date()).toISOString().split("T")[0] : void 0
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
      [name]: value || void 0
    }));
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.nom_producte || formData.preu_producte < 0) {
      setMessage({
        type: "error",
        text: "Nombre del producto y precio (>=0) son obligatorios."
      });
      return;
    }
    setIsLoading(true);
    setMessage({
      type: null,
      text: null
    });
    const {
      id_producte,
      databaixa_producte_checkbox,
      ...dataToSubmit
    } = formData;
    const finalDataToSubmit = {
      ...dataToSubmit,
      databaixa_producte: databaixa_producte_checkbox && dataToSubmit.databaixa_producte ? dataToSubmit.databaixa_producte : void 0
    };
    try {
      if (activeTab === "edit" && id_producte) {
        const updatedProduct = await ProductesService.update(id_producte, finalDataToSubmit);
        setProducts((prev) => prev.map((p) => p.id_producte === id_producte ? {
          ...p,
          ...updatedProduct
        } : p));
        setMessage({
          type: "success",
          text: `Producto "${updatedProduct.nom_producte}" actualizado.`
        });
      } else {
        const newProduct = await ProductesService.create(finalDataToSubmit);
        setProducts((prev) => [...prev, newProduct]);
        setMessage({
          type: "success",
          text: `Producto "${newProduct.nom_producte}" creado.`
        });
      }
      setActiveTab("list");
      resetFormAndState();
    } catch (err) {
      console.error("Error guardando producto:", err);
      setMessage({
        type: "error",
        text: `Error al guardar: ${err.message || "Error desconocido"}`
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteProduct = async (productId, productName) => {
    if (window.confirm(`\xBFEst\xE1 seguro de que desea eliminar "${productName}" (ID: ${productId})? Esta acci\xF3n no se puede deshacer.`)) {
      setIsLoading(true);
      setMessage({
        type: null,
        text: null
      });
      try {
        await ProductesService.delete(productId);
        setProducts((prev) => prev.filter((p) => p.id_producte !== productId));
        setMessage({
          type: "success",
          text: `Producto "${productName}" eliminado.`
        });
        if (selectedProduct?.id_producte === productId) {
          setSelectedProduct(null);
          if (activeTab === "edit") {
            setActiveTab("list");
          }
        }
      } catch (err) {
        console.error("Error eliminando producto:", err);
        setMessage({
          type: "error",
          text: `Error al eliminar: ${err.message || "Error desconocido"}`
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      id_producte: product.id_producte,
      id_client: product.id_client,
      nom_producte: product.nom_producte,
      preu_producte: product.preu_producte,
      descripcio_producte: product.descripcio_producte || "",
      sector_producte: product.sector_producte || "",
      significatiu_producte: product.significatiu_producte || "",
      enquesta_producte: product.enquesta_producte || "",
      actiu_producte: product.actiu_producte,
      databaixa_producte: product.databaixa_producte ? product.databaixa_producte.split("T")[0] : void 0,
      databaixa_producte_checkbox: !!product.databaixa_producte
    });
    setActiveTab("edit");
    setMessage({
      type: null,
      text: null
    });
  };
  const handleNewClick = () => {
    resetFormAndState();
    setActiveTab("new");
  };
  const isSubmitting = navigation.state === "submitting" || isLoading;
  const renderProductForm = () => (
    // Using campaign form section styling
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmitForm, className: "space-y-6", children: [
      activeTab === "edit" && formData.id_producte && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "id", value: formData.id_producte }, void 0, false, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 270,
        columnNumber: 56
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 274,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "id_client", className: "block text-sm font-medium text-gray-700 mb-1", children: "ID del Cliente *" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 277,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "id_client", id: "id_client", value: formData.id_client, onChange: handleNumberChange, min: "1", step: "1", required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 278,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 276,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "nom_producte", className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre del Producto *" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 281,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_producte", id: "nom_producte", value: formData.nom_producte, onChange: handleInputChange, required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 282,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 280,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 275,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 273,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Detalles del Producto" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 289,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "preu_producte", className: "block text-sm font-medium text-gray-700 mb-1", children: "Precio (\u20AC) *" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 292,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative mt-1", children: [
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-gray-500 sm:text-sm", children: "\u20AC" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 295,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 294,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "preu_producte", id: "preu_producte", value: formData.preu_producte, onChange: handleNumberChange, min: "0", step: "0.01", required: true, className: "w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 297,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 293,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 291,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "sector_producte", className: "block text-sm font-medium text-gray-700 mb-1", children: "Sector" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 301,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "sector_producte", id: "sector_producte", value: formData.sector_producte, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 302,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 300,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 290,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-1 gap-6", children: [
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "descripcio_producte", className: "block text-sm font-medium text-gray-700 mb-1", children: "Descripci\xF3n" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 308,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "descripcio_producte", id: "descripcio_producte", value: formData.descripcio_producte, onChange: handleInputChange, rows: 3, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500", placeholder: "Descripci\xF3n detallada del producto..." }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 309,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 307,
            columnNumber: 12
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "significatiu_producte", className: "block text-sm font-medium text-gray-700 mb-1", children: "Significativo" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 312,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "textarea",
              {
                name: "significatiu_producte",
                id: "significatiu_producte",
                value: formData.significatiu_producte,
                onChange: handleInputChange,
                rows: 2,
                className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                placeholder: "Aspectos significativos..."
              },
              void 0,
              false,
              {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 313,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 311,
            columnNumber: 12
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "enquesta_producte", className: "block text-sm font-medium text-gray-700 mb-1", children: "Encuesta" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 317,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "enquesta_producte", id: "enquesta_producte", value: formData.enquesta_producte, onChange: handleInputChange, rows: 3, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500", placeholder: "Preguntas o resultados de encuestas..." }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 318,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 316,
            columnNumber: 12
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 306,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 288,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Estado y Programaci\xF3n" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 325,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "actiu_producte", name: "actiu_producte", type: "checkbox", checked: formData.actiu_producte, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 329,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Producto Activo" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 330,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 328,
              columnNumber: 18
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "databaixa_producte_checkbox", name: "databaixa_producte_checkbox", type: "checkbox", checked: formData.databaixa_producte_checkbox, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 333,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Configurar Fecha de Baja" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 334,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 332,
              columnNumber: 18
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 327,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: formData.databaixa_producte_checkbox && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "databaixa_producte", className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Baja" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 339,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "databaixa_producte", id: "databaixa_producte", value: formData.databaixa_producte || "", onChange: handleDateChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 342,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 338,
            columnNumber: 58
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 337,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 326,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 324,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-4 pt-4 border-t border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
          setActiveTab("list");
          resetFormAndState();
        }, disabled: isSubmitting, className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50", children: "Cancelar" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 356,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isSubmitting, className: "px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50", children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 375,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 376,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 374,
            columnNumber: 15
          }, this),
          "Guardando..."
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 373,
          columnNumber: 27
        }, this) : activeTab === "edit" ? "Actualizar Producto" : "Guardar Producto" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 372,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 355,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 269,
      columnNumber: 3
    }, this)
  );
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "products-container p-4 md:p-6 max-w-screen-2xl mx-auto", children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-semibold text-gray-800", children: "Gesti\xF3n de Productos" }, void 0, false, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 386,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex border border-gray-300 rounded-lg bg-white shadow-sm", children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "button",
          {
            className: `py-2 px-4 font-medium rounded-l-lg ${activeTab === "list" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`,
            onClick: () => {
              setActiveTab("list");
              resetFormAndState();
            },
            disabled: isSubmitting,
            children: "Lista"
          },
          void 0,
          false,
          {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 389,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium border-l border-gray-300 ${activeTab === "new" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`, onClick: () => {
          handleNewClick();
        }, disabled: isSubmitting, children: "Nuevo" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 396,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium rounded-r-lg border-l border-gray-300 ${activeTab === "edit" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"} disabled:opacity-50 disabled:cursor-not-allowed`, onClick: () => {
          if (selectedProduct)
            setActiveTab("edit");
        }, disabled: !selectedProduct || isSubmitting, children: "Editar" }, void 0, false, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 401,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.productes.tsx",
        lineNumber: 388,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 385,
      columnNumber: 7
    }, this),
    message.text && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mb-4 p-4 rounded-lg shadow-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`, children: message.text }, void 0, false, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 410,
      columnNumber: 24
    }, this),
    loaderError && !message.text && // Ensure loader error is displayed if no other message
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-4 rounded-lg shadow-sm bg-red-50 text-red-700 border border-red-200", children: loaderError }, void 0, false, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 416,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
      " ",
      activeTab === "list" ? (
        // Two-column layout like Campaigns
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col lg:flex-row gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:w-3/5 space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center bg-white rounded-lg shadow-sm p-2 border border-gray-200", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  type: "text",
                  placeholder: "Buscar por ID, nombre, cliente o sector...",
                  value: searchTerm,
                  onChange: (e) => setSearchTerm(e.target.value),
                  className: "w-full px-4 py-2 border-0 focus:outline-none focus:ring-0",
                  disabled: isSubmitting
                },
                void 0,
                false,
                {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 428,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 431,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 430,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 427,
              columnNumber: 15
            }, this),
            isSubmitting && products.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "Cargando productos..." }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 435,
              columnNumber: 57
            }, this),
            !isSubmitting && filteredProducts.length === 0 && products.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "No se encontraron productos con los criterios de b\xFAsqueda." }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 439,
              columnNumber: 89
            }, this),
            !isSubmitting && products.length === 0 && !loaderError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "A\xFAn no hay productos registrados. \xA1Crea uno nuevo!" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 443,
              columnNumber: 74
            }, this),
            filteredProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "ID" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 451,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Nombre" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 452,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Precio" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 453,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Estado" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 454,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Acciones" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 455,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 450,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 449,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "divide-y divide-gray-200", children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: `${selectedProduct?.id_producte === product.id_producte ? "bg-primary-50" : "hover:bg-gray-50"} cursor-pointer transition-colors`, onClick: () => setSelectedProduct(product), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: product.id_producte }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 460,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900", children: product.nom_producte }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 461,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm text-gray-600", children: [
                  product.preu_producte?.toFixed(2),
                  " \u20AC"
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 462,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                  " ",
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-2.5 w-2.5 rounded-full ${product.actiu_producte ? "bg-green-500" : "bg-red-500"}` }, void 0, false, {
                    fileName: "app/routes/formularis.productes.tsx",
                    lineNumber: 465,
                    columnNumber: 33
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: product.actiu_producte ? "Activo" : "Inactivo" }, void 0, false, {
                    fileName: "app/routes/formularis.productes.tsx",
                    lineNumber: 466,
                    columnNumber: 33
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 464,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 463,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-3", children: [
                  " ",
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-primary-600 hover:text-primary-800 font-medium disabled:opacity-50", onClick: (e) => {
                    e.stopPropagation();
                    handleEditClick(product);
                  }, disabled: isSubmitting, children: "Editar" }, void 0, false, {
                    fileName: "app/routes/formularis.productes.tsx",
                    lineNumber: 471,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-red-600 hover:text-red-800 font-medium disabled:opacity-50", onClick: (e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product.id_producte, product.nom_producte);
                  }, disabled: isSubmitting, children: "Eliminar" }, void 0, false, {
                    fileName: "app/routes/formularis.productes.tsx",
                    lineNumber: 477,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 470,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 469,
                  columnNumber: 27
                }, this)
              ] }, product.id_producte, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 459,
                columnNumber: 56
              }, this)) }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 458,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 448,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 447,
              columnNumber: 47
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 426,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:w-2/5", children: selectedProduct ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-semibold text-gray-700", children: "Detalles del Producto" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 495,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium", children: [
                "ID: ",
                selectedProduct.id_producte
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 498,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 494,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Nombre" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 506,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium", children: selectedProduct.nom_producte }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 507,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 505,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "ID Cliente" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 510,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedProduct.id_client }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 511,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 509,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Precio" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 514,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: [
                  selectedProduct.preu_producte?.toFixed(2),
                  " \u20AC"
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 515,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 513,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Estado" }, void 0, false, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 518,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-2.5 w-2.5 rounded-full ${selectedProduct.actiu_producte ? "bg-green-500" : "bg-red-500"}` }, void 0, false, {
                    fileName: "app/routes/formularis.productes.tsx",
                    lineNumber: 520,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: selectedProduct.actiu_producte ? "Activo" : "Inactivo" }, void 0, false, {
                    fileName: "app/routes/formularis.productes.tsx",
                    lineNumber: 521,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.productes.tsx",
                  lineNumber: 519,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 517,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 504,
              columnNumber: 19
            }, this),
            selectedProduct.sector_producte && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Sector" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 527,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm bg-gray-50 p-3 rounded border border-gray-100", children: selectedProduct.sector_producte }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 528,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 526,
              columnNumber: 55
            }, this),
            selectedProduct.descripcio_producte && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Descripci\xF3n" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 531,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm bg-gray-50 p-3 rounded border border-gray-100 break-words", children: selectedProduct.descripcio_producte }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 532,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 530,
              columnNumber: 59
            }, this),
            selectedProduct.significatiu_producte && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Significativo" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 535,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm bg-gray-50 p-3 rounded border border-gray-100 break-words", children: selectedProduct.significatiu_producte }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 536,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 534,
              columnNumber: 62
            }, this),
            selectedProduct.enquesta_producte && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Encuesta" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 539,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm bg-gray-50 p-3 rounded border border-gray-100 break-words", children: selectedProduct.enquesta_producte }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 540,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 538,
              columnNumber: 58
            }, this),
            selectedProduct.databaixa_producte && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Fecha de Baja" }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 543,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: new Date(selectedProduct.databaixa_producte).toLocaleDateString() }, void 0, false, {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 544,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 542,
              columnNumber: 58
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 flex justify-end space-x-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "button",
              {
                className: "px-4 py-2 bg-primary-50 text-primary-700 rounded border border-primary-200 hover:bg-primary-100 transition-colors",
                onClick: () => handleEditClick(selectedProduct),
                disabled: isSubmitting,
                children: "Editar Producto"
              },
              void 0,
              false,
              {
                fileName: "app/routes/formularis.productes.tsx",
                lineNumber: 548,
                columnNumber: 21
              },
              this
            ) }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 547,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 493,
            columnNumber: 34
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center", children: [
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-12 h-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 556,
              columnNumber: 151
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 556,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 554,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium text-gray-700 mb-2", children: "Ning\xFAn producto seleccionado" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 558,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 text-sm", children: "Selecciona un producto de la lista para ver sus detalles" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 559,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 553,
            columnNumber: 26
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 492,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 424,
          columnNumber: 7
        }, this)
      ) : (
        // Form view (New or Edit)
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-6 border-b border-gray-200 pb-3", children: [
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold text-gray-700", children: activeTab === "new" ? "Crear Nuevo Producto" : "Editar Producto" }, void 0, false, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 566,
              columnNumber: 15
            }, this),
            activeTab === "edit" && selectedProduct && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium", children: [
              "ID: ",
              selectedProduct.id_producte
            ] }, void 0, true, {
              fileName: "app/routes/formularis.productes.tsx",
              lineNumber: 569,
              columnNumber: 59
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.productes.tsx",
            lineNumber: 565,
            columnNumber: 13
          }, this),
          renderProductForm()
        ] }, void 0, true, {
          fileName: "app/routes/formularis.productes.tsx",
          lineNumber: 564,
          columnNumber: 7
        }, this)
      )
    ] }, void 0, true, {
      fileName: "app/routes/formularis.productes.tsx",
      lineNumber: 421,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/formularis.productes.tsx",
    lineNumber: 383,
    columnNumber: 10
  }, this);
}
_s(ProductsPage, "MgdzEOAg89ckfKJn6fyaE5Ck0B4=", false, function() {
  return [useLoaderData, useNavigation];
});
_c = ProductsPage;
var _c;
$RefreshReg$(_c, "ProductsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ProductsPage as default
};
//# sourceMappingURL=/build/routes/formularis.productes-ACRHZ47X.js.map
