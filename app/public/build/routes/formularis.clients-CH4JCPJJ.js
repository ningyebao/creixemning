import {
  useLoaderData
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
  import.meta.hot.lastModified = "1747407204879.1685";
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
  static async update(id, client) {
    return await apiClient.put(`/clients/${id}`, client);
  }
  static async delete(id) {
    await apiClient.delete(`/clients/${id}`);
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
  import.meta.hot.lastModified = "1748452148707.148";
}
function ClientsPage() {
  _s();
  const {
    clients,
    error
  } = useLoaderData();
  const [clientsList, setClientsList] = (0, import_react.useState)(clients);
  const [deletingId, setDeletingId] = (0, import_react.useState)(null);
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
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const filteredClients = clientsList.filter((client) => {
    if (!searchTerm)
      return true;
    const searchTermLower = searchTerm.toLowerCase();
    return client.id_client.toString().includes(searchTermLower) || client.nom_client.toLowerCase().includes(searchTermLower) || client.telefon1_client?.numero && client.telefon1_client.numero.includes(searchTermLower);
  });
  const handleDeleteClient = (0, import_react.useCallback)(async (id) => {
    const cliente = clientsList.find((c) => c.id_client === id);
    if (!cliente)
      return;
    if (!window.confirm(`\xBFSeguro que deseas eliminar al cliente "${cliente.nom_client}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      await ClientsService.delete(id);
      setClientsList((prev) => prev.filter((c) => c.id_client !== id));
      setMessage({
        type: "success",
        text: "Cliente eliminado correctamente."
      });
    } catch (error2) {
      console.error("Error deleting client:", error2);
      setMessage({
        type: "error",
        text: "Error al eliminar el cliente. Int\xE9ntelo de nuevo."
      });
    } finally {
      setDeletingId(null);
    }
  }, [clientsList]);
  const handleCreateClient = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!formData.nom_client)
      errors.push("El nombre es obligatorio");
    if (!formData.telefon1_client.numero)
      errors.push("El tel\xE9fono principal es obligatorio");
    const telefon1 = formData.telefon1_client.numero.replace("+", "").replace(" ", "");
    if (telefon1 && !/^\d+$/.test(telefon1))
      errors.push("El tel\xE9fono principal debe ser num\xE9rico");
    const telefon2 = formData.telefon2_client.numero.replace("+", "").replace(" ", "");
    if (telefon2 && !/^\d+$/.test(telefon2))
      errors.push("El tel\xE9fono secundario debe ser num\xE9rico");
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
      resetForm();
      setClientsList((prev) => [...prev, {
        ...newClient,
        id_client: result.id_client
      }]);
      setActiveTab("list");
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
  const handleUpdateClient = async (e) => {
    e.preventDefault();
    if (!selectedClient) {
      setMessage({
        type: "error",
        text: "No hay cliente seleccionado para actualizar"
      });
      return;
    }
    const errors = [];
    if (!formData.nom_client)
      errors.push("El nombre es obligatorio");
    if (!formData.telefon1_client.numero)
      errors.push("El tel\xE9fono principal es obligatorio");
    const telefon1 = formData.telefon1_client.numero.replace("+", "").replace(" ", "");
    if (telefon1 && !/^\d+$/.test(telefon1))
      errors.push("El tel\xE9fono principal debe ser num\xE9rico");
    const telefon2 = formData.telefon2_client.numero.replace("+", "").replace(" ", "");
    if (telefon2 && !/^\d+$/.test(telefon2))
      errors.push("El tel\xE9fono secundario debe ser num\xE9rico");
    if (errors.length > 0) {
      setMessage({
        type: "error",
        text: "Error de validaci\xF3n: " + errors.join(", ")
      });
      return;
    }
    setLoading(true);
    try {
      const clienteActualizado = {
        nom_client: formData.nom_client,
        telefon1_client: {
          numero: formData.telefon1_client.numero,
          tipo: formData.telefon1_client.tipo
        },
        actiu_client: formData.actiu_client,
        especial_client: formData.especial_client,
        observacions_client: formData.observacions_client,
        prioridad: formData.prioridad
      };
      if (formData.telefon2_client.numero) {
        clienteActualizado.telefon2_client = {
          numero: formData.telefon2_client.numero,
          tipo: formData.telefon2_client.tipo
        };
      }
      const updatedClient = await ClientsService.update(selectedClient.id_client, clienteActualizado);
      setClientsList((prevList) => prevList.map((c) => c.id_client === selectedClient.id_client ? {
        ...c,
        ...updatedClient
      } : c));
      setMessage({
        type: "success",
        text: `Cliente ${formData.nom_client} actualizado correctamente.`
      });
      setActiveTab("list");
    } catch (error2) {
      console.error("Error updating client:", error2);
      setMessage({
        type: "error",
        text: "Error al actualizar el cliente"
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
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
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
    if (selectedClient && activeTab === "edit") {
      const telefon1 = {
        numero: selectedClient.telefon1_client?.numero || "",
        tipo: selectedClient.telefon1_client?.tipo || "m\xF3vil"
      };
      const telefon2 = {
        numero: selectedClient.telefon2_client?.numero || "",
        tipo: selectedClient.telefon2_client?.tipo || "m\xF3vil"
      };
      setFormData({
        nom_client: selectedClient.nom_client,
        telefon1_client: telefon1,
        telefon2_client: telefon2,
        actiu_client: selectedClient.actiu_client,
        especial_client: selectedClient.especial_client,
        observacions_client: selectedClient.observacions_client || "",
        prioridad: selectedClient.prioridad || "Media"
      });
    }
  }, [selectedClient, activeTab]);
  (0, import_react.useEffect)(() => {
    if (message.type) {
      const timer = setTimeout(() => setMessage({
        type: null,
        text: null
      }), 5e3);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "clients-container p-4 md:p-6 max-w-screen-2xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 400 300", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { id: "client-icon", transform: "translate(50, 50)", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "25", cy: "20", r: "20", fill: "#4f46e5", opacity: "0.2" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 325,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "25", cy: "15", r: "10", fill: "#4f46e5", opacity: "0.6" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 326,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M0 50 Q25 40 50 50 L50 70 Q25 65 0 70 Z", fill: "#4f46e5", opacity: "0.6" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 327,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 324,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { id: "phone-icon", transform: "translate(150, 50)", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", { x: "10", y: "0", width: "30", height: "60", rx: "5", fill: "#4f46e5", opacity: "0.3" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 332,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", { x: "15", y: "5", width: "20", height: "40", rx: "2", fill: "#fff" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 333,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "25", cy: "50", r: "5", fill: "#4f46e5", opacity: "0.6" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 334,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 331,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { id: "status-icon", transform: "translate(250, 50)", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "25", cy: "25", r: "25", fill: "#4f46e5", opacity: "0.1" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 339,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M15 25 L20 35 L35 15", stroke: "#4f46e5", "stroke-width": "4", fill: "none" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 340,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 338,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { id: "edit-icon", transform: "translate(50, 150)", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", { x: "5", y: "5", width: "40", height: "40", rx: "5", fill: "#4f46e5", opacity: "0.1" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 345,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M15 30 L35 30 M15 20 L35 20 M15 40 L25 40", stroke: "#4f46e5", "stroke-width": "2" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 346,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M40 10 L45 15 L35 25 L30 20 Z", fill: "#4f46e5" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 347,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 344,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { id: "delete-icon", transform: "translate(150, 150)", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", { x: "10", y: "10", width: "30", height: "40", rx: "2", fill: "#ef4444", opacity: "0.2" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 352,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", { x: "5", y: "5", width: "40", height: "10", rx: "2", fill: "#ef4444", opacity: "0.6" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 353,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M20 20 L20 45 M30 20 L30 45", stroke: "#ef4444", "stroke-width": "2" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 354,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 351,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { id: "notes-icon", transform: "translate(250, 150)", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", { x: "5", y: "5", width: "40", height: "50", rx: "3", fill: "#4f46e5", opacity: "0.1" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 359,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M15 15 L35 15 M15 25 L35 25 M15 35 L30 35 M15 45 L25 45", stroke: "#4f46e5", "stroke-width": "2" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 360,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 358,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { id: "search-icon", transform: "translate(50, 220)", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { cx: "20", cy: "20", r: "15", fill: "none", stroke: "#4f46e5", "stroke-width": "3" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 365,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M30 30 L40 40", stroke: "#4f46e5", "stroke-width": "3", "stroke-linecap": "round" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 366,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 364,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 322,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 321,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-semibold text-gray-800", children: "Gesti\xF3n de Clientes" }, void 0, false, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 373,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex border border-gray-300 rounded-lg bg-white shadow-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium rounded-l-lg ${activeTab === "list" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`, onClick: () => setActiveTab("list"), disabled: loading, children: "Lista" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 376,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium border-l border-gray-300 ${activeTab === "new" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`, onClick: () => {
          setActiveTab("new");
          setSelectedClient(null);
          resetForm();
        }, disabled: loading, children: "Nuevo" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 379,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium rounded-r-lg border-l border-gray-300 ${activeTab === "edit" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"} disabled:opacity-50 disabled:cursor-not-allowed`, onClick: () => {
          if (selectedClient)
            setActiveTab("edit");
        }, disabled: !selectedClient || loading, children: "Editar" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 386,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 375,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 372,
      columnNumber: 7
    }, this),
    message.type && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mb-4 p-4 rounded-lg shadow-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`, children: message.text }, void 0, false, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 395,
      columnNumber: 24
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-4 rounded-lg shadow-sm bg-red-50 text-red-700 border border-red-200", children: error }, void 0, false, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 399,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
      activeTab === "list" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col lg:flex-row gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:w-3/5 space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center bg-white rounded-lg shadow-sm p-2 border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Buscar cliente por ID, nombre o tel\xE9fono...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-4 py-2 border-0 focus:outline-none focus:ring-0", disabled: loading }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 410,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-5 h-5 text-gray-400 mr-2" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 411,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 409,
            columnNumber: 17
          }, this),
          loading && clientsList.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "Cargando clientes..." }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 416,
            columnNumber: 57
          }, this),
          !loading && filteredClients.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "No se encontraron clientes con los criterios de b\xFAsqueda." }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 420,
            columnNumber: 62
          }, this),
          filteredClients.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "ID" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 428,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Nombre" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 429,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1", children: "Tel\xE9fono" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 433,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 431,
                columnNumber: 29
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 430,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-1", children: "Estado" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 439,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 437,
                columnNumber: 29
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 436,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Acciones" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 442,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 427,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 426,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "divide-y divide-gray-200", children: filteredClients.map((client) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: `${selectedClient?.id_client === client.id_client ? "bg-primary-50" : "hover:bg-gray-50"} cursor-pointer transition-colors`, onClick: () => setSelectedClient(client), children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: client.id_client }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 447,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm font-medium", children: client.nom_client }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 448,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: client.telefon1_client?.numero }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 449,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:space-x-2 space-y-1 sm:space-y-0", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${client.actiu_client ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: client.actiu_client ? "Activo" : "Inactivo" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 452,
                  columnNumber: 33
                }, this),
                client.especial_client && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800", children: "Especial" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 455,
                  columnNumber: 60
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 451,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 450,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-primary-600 hover:text-primary-800 font-medium flex items-center", onClick: (e) => {
                  e.stopPropagation();
                  setSelectedClient(client);
                  setActiveTab("edit");
                }, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 mr-1" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 467,
                    columnNumber: 35
                  }, this),
                  "Editar"
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 462,
                  columnNumber: 33
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-red-600 hover:text-red-800 font-medium flex items-center disabled:opacity-50", onClick: (e) => {
                  e.stopPropagation();
                  handleDeleteClient(client.id_client);
                }, disabled: deletingId === client.id_client, children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 mr-1" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 476,
                    columnNumber: 35
                  }, this),
                  deletingId === client.id_client ? "Eliminando\u2026" : "Eliminar"
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 472,
                  columnNumber: 33
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 461,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 460,
                columnNumber: 29
              }, this)
            ] }, client.id_client, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 446,
              columnNumber: 56
            }, this)) }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 445,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 425,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 424,
            columnNumber: 48
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 408,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:w-2/5", children: selectedClient ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-semibold text-gray-700", children: "Detalle del Cliente" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 493,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium", children: [
              "ID: ",
              selectedClient.id_client
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 496,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 492,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pb-4 border-b border-gray-100", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-sm text-gray-500 font-medium mb-3", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 504,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h6", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Nombre" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 507,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium", children: selectedClient.nom_client }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 508,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 506,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h6", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Prioridad" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 511,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `mt-1 inline-flex px-2 py-1 text-xs leading-none font-medium rounded-full ${selectedClient.prioridad === "Alta" ? "bg-red-100 text-red-800" : selectedClient.prioridad === "Media" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`, children: selectedClient.prioridad }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 512,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 510,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 505,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 503,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pb-4 border-b border-gray-100", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-sm text-gray-500 font-medium mb-3", children: "Estado" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 521,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-2.5 w-2.5 rounded-full ${selectedClient.actiu_client ? "bg-green-500" : "bg-red-500"}` }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 524,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: selectedClient.actiu_client ? "Activo" : "Inactivo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 525,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 523,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-2.5 w-2.5 rounded-full ${selectedClient.especial_client ? "bg-yellow-500" : "bg-gray-300"}` }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 528,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: selectedClient.especial_client ? "Cliente Especial" : "Cliente Normal" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 529,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 527,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 522,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 520,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pb-4 border-b border-gray-100", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-sm text-gray-500 font-medium mb-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 mr-1" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 538,
                  columnNumber: 29
                }, this),
                "Informaci\xF3n de Contacto"
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 537,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 536,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-3", children: [
                selectedClient.telefon1_client?.numero && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h6", { className: "text-xs uppercase text-gray-500 font-semibold", children: [
                    "Tel\xE9fono Principal (",
                    selectedClient.telefon1_client.tipo,
                    ")"
                  ] }, void 0, true, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 546,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedClient.telefon1_client.numero }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 547,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 545,
                  columnNumber: 70
                }, this),
                selectedClient.telefon2_client?.numero && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h6", { className: "text-xs uppercase text-gray-500 font-semibold", children: [
                    "Tel\xE9fono Secundario (",
                    selectedClient.telefon2_client.tipo,
                    ")"
                  ] }, void 0, true, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 551,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedClient.telefon2_client.numero }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 552,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 550,
                  columnNumber: 70
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 544,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 535,
              columnNumber: 23
            }, this),
            selectedClient.observacions_client && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-sm text-gray-500 font-medium mb-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 mr-1" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 561,
                  columnNumber: 31
                }, this),
                "Observaciones"
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 560,
                columnNumber: 29
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 559,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm bg-gray-50 p-3 rounded border border-gray-100", children: selectedClient.observacions_client }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 567,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 558,
              columnNumber: 62
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 501,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 flex justify-end space-x-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "px-4 py-2 bg-primary-50 text-primary-700 rounded border border-primary-200 hover:bg-primary-100 transition-colors flex items-center", onClick: () => setActiveTab("edit"), children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 mr-1" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 573,
              columnNumber: 25
            }, this),
            "Editar Cliente"
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 572,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 571,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 491,
          columnNumber: 35
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-12 h-12 text-gray-400" }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 581,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 580,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium text-gray-700 mb-2", children: "Ning\xFAn cliente seleccionado" }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 585,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 text-sm", children: "Selecciona un cliente de la lista para ver sus detalles" }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 586,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 579,
          columnNumber: 28
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 490,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 406,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 405,
        columnNumber: 34
      }, this),
      activeTab === "new" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold mb-6 text-gray-700 border-b border-gray-200 pb-3", children: "Crear Nuevo Cliente" }, void 0, false, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 594,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleCreateClient, className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded border border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre del Cliente *" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 599,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_client", value: formData.nom_client, onChange: handleInputChange, required: true, maxLength: 100, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 602,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "M\xE1ximo 100 caracteres" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 603,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 598,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Prioridad" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 608,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "prioridad", value: formData.prioridad, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Baja", children: "Baja" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 612,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Media", children: "Media" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 613,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Alta", children: "Alta" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 614,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 611,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 607,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 606,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 597,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded border border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium text-gray-600", children: "Tel\xE9fono Principal" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 623,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero *" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 626,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "telefon1_client.numero", value: formData.telefon1_client.numero, onChange: handleInputChange, required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 629,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 625,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tipo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 632,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "telefon1_client.tipo", value: formData.telefon1_client.tipo, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "m\xF3vil", children: "M\xF3vil" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 636,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "fijo", children: "Fijo" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 637,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "trabajo", children: "Trabajo" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 638,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "otro", children: "Otro" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 639,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 635,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 631,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 624,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 622,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium text-gray-600", children: "Tel\xE9fono Secundario" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 646,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 649,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "telefon2_client.numero", value: formData.telefon2_client.numero, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 652,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 648,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tipo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 655,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "telefon2_client.tipo", value: formData.telefon2_client.tipo, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "m\xF3vil", children: "M\xF3vil" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 659,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "fijo", children: "Fijo" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 660,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "trabajo", children: "Trabajo" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 661,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "otro", children: "Otro" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 662,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 658,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 654,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 647,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 645,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 621,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded border border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium text-gray-600", children: "Estado" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 672,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col space-y-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "actiu_client", checked: formData.actiu_client, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 675,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Cliente Activo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 676,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 674,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "especial_client", checked: formData.especial_client, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 680,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Cliente Especial" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 681,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 679,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 673,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 671,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 mr-1" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 689,
                  columnNumber: 23
                }, this),
                "Observaciones"
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 688,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 687,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_client", value: formData.observacions_client, onChange: handleInputChange, rows: 4, maxLength: 500, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 695,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 686,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 670,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-3 pt-4 border-t border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
              resetForm();
              setActiveTab("list");
            }, disabled: loading, className: "px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50", children: "Cancelar" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 700,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: resetForm, className: "px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50", children: "Limpiar" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 706,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50", children: loading ? "Guardando..." : "Guardar Cliente" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 709,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 699,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 595,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 593,
        columnNumber: 33
      }, this),
      activeTab === "edit" && selectedClient && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-6 border-b border-gray-200 pb-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold text-gray-700", children: "Editar Cliente" }, void 0, false, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 719,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium", children: [
            "ID: ",
            selectedClient.id_client
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 720,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 718,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleUpdateClient, className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded border border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre del Cliente *" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 729,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_client", value: formData.nom_client, onChange: handleInputChange, required: true, maxLength: 100, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 732,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-500 mt-1", children: "M\xE1ximo 100 caracteres" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 733,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 728,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Prioridad" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 738,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "prioridad", value: formData.prioridad, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Baja", children: "Baja" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 742,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Media", children: "Media" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 743,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Alta", children: "Alta" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 744,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 741,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 737,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 736,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 727,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded border border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium text-gray-600", children: "Tel\xE9fono Principal" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 753,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero *" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 756,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "telefon1_client.numero", value: formData.telefon1_client.numero, onChange: handleInputChange, required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 759,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 755,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tipo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 762,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "telefon1_client.tipo", value: formData.telefon1_client.tipo, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "m\xF3vil", children: "M\xF3vil" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 766,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "fijo", children: "Fijo" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 767,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "trabajo", children: "Trabajo" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 768,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "otro", children: "Otro" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 769,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 765,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 761,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 754,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 752,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium text-gray-600", children: "Tel\xE9fono Secundario" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 776,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 779,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "telefon2_client.numero", value: formData.telefon2_client.numero, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 782,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 778,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tipo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 785,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "telefon2_client.tipo", value: formData.telefon2_client.tipo, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "m\xF3vil", children: "M\xF3vil" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 789,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "fijo", children: "Fijo" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 790,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "trabajo", children: "Trabajo" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 791,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "otro", children: "Otro" }, void 0, false, {
                      fileName: "app/routes/formularis.clients.tsx",
                      lineNumber: 792,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 788,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 784,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 777,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 775,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 751,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded border border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium text-gray-600", children: "Estado" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 802,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col space-y-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "actiu_client", checked: formData.actiu_client, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 805,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Cliente Activo" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 806,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 804,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "especial_client", checked: formData.especial_client, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 810,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Cliente Especial" }, void 0, false, {
                    fileName: "app/routes/formularis.clients.tsx",
                    lineNumber: 811,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 809,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 803,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 801,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-4 h-4 mr-1" }, void 0, false, {
                  fileName: "app/routes/formularis.clients.tsx",
                  lineNumber: 819,
                  columnNumber: 23
                }, this),
                "Observaciones"
              ] }, void 0, true, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 818,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 817,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_client", value: formData.observacions_client, onChange: handleInputChange, rows: 4, maxLength: 500, className: "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.clients.tsx",
                lineNumber: 825,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 816,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 800,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-3 pt-4 border-t border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
              setActiveTab("list");
            }, disabled: loading, className: "px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50", children: "Cancelar" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 830,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50", children: loading ? "Actualizando..." : "Actualizar Cliente" }, void 0, false, {
              fileName: "app/routes/formularis.clients.tsx",
              lineNumber: 835,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.clients.tsx",
            lineNumber: 829,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.clients.tsx",
          lineNumber: 725,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.clients.tsx",
        lineNumber: 717,
        columnNumber: 52
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.clients.tsx",
      lineNumber: 403,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/formularis.clients.tsx",
    lineNumber: 319,
    columnNumber: 10
  }, this);
}
_s(ClientsPage, "MKcUwvkVxvacTRuV52VwirfID9Q=", false, function() {
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
//# sourceMappingURL=/build/routes/formularis.clients-CH4JCPJJ.js.map
