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
  __toESM
} from "/build/_shared/chunk-RODUX5XG.js";

// app/routes/formularis.clients.tsx
var import_react = __toESM(require_react());
var import_node = __toESM(require_node());

// app/services/clients.service.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\clients.service.ts"
  );
  import.meta.hot.lastModified = "1746439637538.5652";
}
var ClientsService = class {
  static async getAll() {
    return await apiClient.get("/clients/");
  }
  static async getById(id) {
    return await apiClient.get(`/clients/${id}`);
  }
  static async create(client) {
    return await apiClient.post("/clients/", client);
  }
};

// app/routes/formularis.clients.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\formularis.clients.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\formularis.clients.tsx"
  );
  import.meta.hot.lastModified = "1745307884644.8994";
}
function ClientsPage() {
  _s();
  const {
    clients,
    error
  } = useLoaderData();
  const [activeTab, setActiveTab] = (0, import_react.useState)("list");
  const [selectedClient, setSelectedClient] = (0, import_react.useState)(null);
  const [formData, setFormData] = (0, import_react.useState)({
    nom_client: "",
    telefon1_client: {
      numero: "",
      tipo: "m\xF3vil"
    },
    telefon2_client: {
      numero: "",
      tipo: "m\xF3vil"
    },
    actiu_client: true,
    especial_client: false,
    observacions_client: "",
    prioridad: "Media"
  });
  const [message, setMessage] = (0, import_react.useState)({
    type: null,
    text: null
  });
  const [loading, setLoading] = (0, import_react.useState)(false);
  const handleCreateClient = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!formData.nom_client) {
      errors.push("El nombre es obligatorio");
    }
    if (!formData.telefon1_client.numero) {
      errors.push("El tel\xE9fono principal es obligatorio");
    }
    const telefon1 = formData.telefon1_client.numero.replace("+", "").replace(" ", "");
    if (telefon1 && !/^\d+$/.test(telefon1)) {
      errors.push("El tel\xE9fono principal debe ser num\xE9rico");
    }
    const telefon2 = formData.telefon2_client.numero.replace("+", "").replace(" ", "");
    if (telefon2 && !/^\d+$/.test(telefon2)) {
      errors.push("El tel\xE9fono secundario debe ser num\xE9rico");
    }
    if (errors.length > 0) {
      setMessage({
        type: "error",
        text: "Error de validaci\xF3n: " + errors.join(", ")
      });
      return;
    }
    setLoading(true);
    try {
      const newClient = {
        ...formData,
        telefon2_client: formData.telefon2_client.numero ? formData.telefon2_client : void 0,
        data_creacio_client: (/* @__PURE__ */ new Date()).toISOString()
      };
      const result = await ClientsService.create(newClient);
      setMessage({
        type: "success",
        text: `Cliente ${formData.nom_client} creado con ID: ${result.id_client}`
      });
      setActiveTab("list");
      resetForm();
      window.location.reload();
    } catch (error2) {
      console.error("Error creating client:", error2);
      setMessage({
        type: "error",
        text: "Error al crear el cliente"
      });
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setFormData({
      nom_client: "",
      telefon1_client: {
        numero: "",
        tipo: "m\xF3vil"
      },
      telefon2_client: {
        numero: "",
        tipo: "m\xF3vil"
      },
      actiu_client: true,
      especial_client: false,
      observacions_client: "",
      prioridad: "Media"
    });
  };
  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      if (parent === "telefon1_client" || parent === "telefon2_client") {
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleCheckboxChange = (e) => {
    const {
      name,
      checked
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  (0, import_react.useEffect)(() => {
    if (message.type) {
      const timer = setTimeout(() => {
        setMessage({
          type: null,
          text: null
        });
      }, 5e3);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "clients-container", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4", children: "Gesti\xF3n de Clientes" }, void 0, false, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 200,
      columnNumber: 7
    }, this),
    message.type && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mb-4 p-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: message.text }, void 0, false, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 202,
      columnNumber: 24
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-4 rounded bg-red-100 text-red-700", children: error }, void 0, false, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 206,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex border-b border-gray-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "list" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("list"), children: "Lista de Clientes" }, void 0, false, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 211,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "new" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("new"), children: "Nuevo Cliente" }, void 0, false, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 214,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "edit" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("edit"), disabled: !selectedClient, children: "Editar Cliente" }, void 0, false, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 217,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 210,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: [
      activeTab === "list" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-2", children: "Lista de Clientes" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 224,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full bg-white border border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "ID" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 229,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 230,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Tel\xE9fono" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 231,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Activo" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 232,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Especial" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 233,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Prioridad" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 234,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b bg-gray-50 text-left", children: "Acciones" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 235,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 228,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 227,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: clients.map((client) => {
            const telefono = client.telefon1_client?.numero || "";
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: client.id_client }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 242,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: client.nom_client }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 243,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: telefono }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 244,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: client.actiu_client ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: "Activo" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 246,
                columnNumber: 50
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800", children: "Inactivo" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 248,
                columnNumber: 39
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 245,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: client.especial_client ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800", children: "Especial" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 253,
                columnNumber: 53
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: "Normal" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 255,
                columnNumber: 39
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 252,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${client.prioridad === "Alta" ? "bg-red-100 text-red-800" : client.prioridad === "Media" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`, children: client.prioridad }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 260,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 259,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-primary-600 hover:text-primary-800 mr-2", onClick: () => {
                  setSelectedClient(client);
                  setActiveTab("edit");
                }, children: "Editar" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 265,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-red-600 hover:text-red-800", onClick: () => {
                }, children: "Eliminar" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 271,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 264,
                columnNumber: 25
              }, this)
            ] }, client.id_client, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 241,
              columnNumber: 24
            }, this);
          }) }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 238,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 226,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 225,
          columnNumber: 13
        }, this),
        selectedClient && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 p-4 border rounded bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-2", children: "Detalles del Cliente" }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 283,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", { className: "bg-white p-4 rounded overflow-auto", children: JSON.stringify(selectedClient, null, 2) }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 284,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 282,
          columnNumber: 32
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 223,
        columnNumber: 34
      }, this),
      activeTab === "new" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Crear Nuevo Cliente" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 291,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleCreateClient, className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Datos B\xE1sicos" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 294,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre del Cliente *" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 297,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_client", value: formData.nom_client, onChange: handleInputChange, required: true, maxLength: 100, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 300,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "M\xE1ximo 100 caracteres" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 301,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 296,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "actiu_client", checked: formData.actiu_client, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 306,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Cliente Activo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 307,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 305,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Marcar si est\xE1 activo" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 309,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 304,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 303,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 295,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 293,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Informaci\xF3n de Contacto" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 316,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tel\xE9fono Principal *" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 319,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "telefon1_client.numero", value: formData.telefon1_client.numero, onChange: handleInputChange, required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 322,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 318,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tipo de Tel\xE9fono" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 325,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "telefon1_client.tipo", value: formData.telefon1_client.tipo, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "m\xF3vil", children: "M\xF3vil" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 329,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "fijo", children: "Fijo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 330,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "trabajo", children: "Trabajo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 331,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "otro", children: "Otro" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 332,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 328,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 324,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 317,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tel\xE9fono Secundario" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 339,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "telefon2_client.numero", value: formData.telefon2_client.numero, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 342,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 338,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tipo de Tel\xE9fono Secundario" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 345,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "telefon2_client.tipo", value: formData.telefon2_client.tipo, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "m\xF3vil", children: "M\xF3vil" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 349,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "fijo", children: "Fijo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 350,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "trabajo", children: "Trabajo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 351,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "otro", children: "Otro" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 352,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 348,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 344,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 337,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 315,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Informaci\xF3n Adicional" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 359,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "especial_client", checked: formData.especial_client, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 363,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Cliente Especial" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 364,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 362,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Marcar si requiere tratamiento especial" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 366,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 361,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Prioridad" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 371,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "prioridad", value: formData.prioridad, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Baja", children: "Baja" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 375,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Media", children: "Media" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 376,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Alta", children: "Alta" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 377,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 374,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "Nivel de prioridad para el cliente" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 379,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 370,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 360,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Observaciones" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 384,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_client", value: formData.observacions_client, onChange: handleInputChange, rows: 3, maxLength: 500, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 387,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "M\xE1ximo 500 caracteres" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 388,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 383,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 358,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: resetForm, className: "px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50", children: "Limpiar" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 393,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50", children: loading ? "Guardando..." : "\u{1F4BE} Guardar Cliente" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 396,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 392,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 292,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 290,
        columnNumber: 33
      }, this),
      activeTab === "edit" && selectedClient && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Editar Cliente" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 404,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: [
          "Implementaci\xF3n pendiente para editar el cliente con ID: ",
          selectedClient.id_client
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 406,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 403,
        columnNumber: 52
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 222,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/formularis.clients.tsx",
    lineNumber: 199,
    columnNumber: 10
  }, this);
}
_s(ClientsPage, "pE1jqlLns7Grjh0Cjie7Vq8cdFI=", false, function() {
  return [useLoaderData];
});
_c = ClientsPage;
var _c;
$RefreshReg$(_c, "ClientsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ClientsPage as default
};
//# sourceMappingURL=/build/routes/formularis.clients-QTNP2M7O.js.map
