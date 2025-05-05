import {
  CampanyaService
} from "/build/_shared/chunk-ZYFQMSET.js";
import "/build/_shared/chunk-52EIYT2B.js";
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

// app/routes/formularis.campanya.tsx
var import_react = __toESM(require_react());
var import_node = __toESM(require_node());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\formularis.campanya.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\formularis.campanya.tsx"
  );
  import.meta.hot.lastModified = "1744714160730.271";
}
function CampaignsPage() {
  _s();
  const {
    campaigns,
    error
  } = useLoaderData();
  const [activeTab, setActiveTab] = (0, import_react.useState)("list");
  const [selectedCampaign, setSelectedCampaign] = (0, import_react.useState)(null);
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [formData, setFormData] = (0, import_react.useState)({
    id_client: 1,
    campanya_nom: "",
    campanya_num_altes_acordades: 0,
    data_inici_campanya: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    data_fi_campanya: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    activa_campanya: true,
    objectiu_campanya: "",
    objectiu_assolit_campanya: false,
    observacions_campanya: ""
  });
  const [message, setMessage] = (0, import_react.useState)({
    type: null,
    text: null
  });
  const [loading, setLoading] = (0, import_react.useState)(false);
  const filteredCampaigns = campaigns.filter((campaign) => {
    if (!searchTerm)
      return true;
    const searchTermLower = searchTerm.toLowerCase();
    return campaign.id_campanya.toString().includes(searchTermLower) || campaign.campanya_nom.toLowerCase().includes(searchTermLower) || campaign.id_client.toString().includes(searchTermLower);
  });
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!formData.id_client || !formData.campanya_nom) {
      setMessage({
        type: "error",
        text: "Complete los campos obligatorios marcados con *"
      });
      return;
    }
    setLoading(true);
    try {
      const newCampaign = {
        ...formData,
        data_creacio_campanya: (/* @__PURE__ */ new Date()).toISOString()
      };
      const result = await CampanyaService.create(newCampaign);
      setMessage({
        type: "success",
        text: `Campa\xF1a '${formData.campanya_nom}' creada exitosamente con ID: ${result.id_campanya}`
      });
      setActiveTab("list");
      resetForm();
      window.location.reload();
    } catch (error2) {
      console.error("Error creating campaign:", error2);
      setMessage({
        type: "error",
        text: "Error al crear la campa\xF1a"
      });
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setFormData({
      id_client: 1,
      campanya_nom: "",
      campanya_num_altes_acordades: 0,
      data_inici_campanya: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      data_fi_campanya: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      activa_campanya: true,
      objectiu_campanya: "",
      objectiu_assolit_campanya: false,
      observacions_campanya: ""
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
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
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
      const timer = setTimeout(() => {
        setMessage({
          type: null,
          text: null
        });
      }, 5e3);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "campaigns-container", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4", children: "Gesti\xF3n de Campa\xF1as" }, void 0, false, {
      fileName: "app/routes/formularis.campanya.tsx",
      lineNumber: 183,
      columnNumber: 7
    }, this),
    message.type && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mb-4 p-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: message.text }, void 0, false, {
      fileName: "app/routes/formularis.campanya.tsx",
      lineNumber: 185,
      columnNumber: 24
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-4 rounded bg-red-100 text-red-700", children: error }, void 0, false, {
      fileName: "app/routes/formularis.campanya.tsx",
      lineNumber: 189,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex border-b border-gray-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "list" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("list"), children: "Lista de Campa\xF1as" }, void 0, false, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 194,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "new" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("new"), children: "Nueva Campa\xF1a" }, void 0, false, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 197,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "edit" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("edit"), disabled: !selectedCampaign, children: "Editar Campa\xF1a" }, void 0, false, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.campanya.tsx",
      lineNumber: 193,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: [
      activeTab === "list" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-2", children: "Listado de Campa\xF1as" }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 207,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Buscar campa\xF1a por ID, nombre o cliente...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 210,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 209,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full bg-white border border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "ID" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 217,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "ID Cliente" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 218,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 219,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Altas Acordadas" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 220,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Inicio" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 221,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Fin" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 222,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Activa" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 223,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Objetivo Alcanzado" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 224,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Acciones" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 225,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 216,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 215,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: filteredCampaigns.map((campaign) => {
            const fechaInicio = campaign.data_inici_campanya ? campaign.data_inici_campanya.split("T")[0] : "";
            const fechaFin = campaign.data_fi_campanya ? campaign.data_fi_campanya.split("T")[0] : "";
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: campaign.id_campanya }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 233,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: campaign.id_client }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 234,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: campaign.campanya_nom }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 235,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: campaign.campanya_num_altes_acordades }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 236,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: fechaInicio }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 237,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: fechaFin }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 238,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: campaign.activa_campanya ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: "Activa" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 240,
                columnNumber: 55
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800", children: "Inactiva" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 242,
                columnNumber: 39
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 239,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: campaign.objectiu_assolit_campanya ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: "Alcanzado" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 247,
                columnNumber: 65
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: "Pendiente" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 249,
                columnNumber: 39
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 246,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-primary-600 hover:text-primary-800 mr-2", onClick: () => {
                  setSelectedCampaign(campaign);
                  setActiveTab("edit");
                }, children: "Editar" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 254,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-red-600 hover:text-red-800", onClick: () => {
                }, children: "Eliminar" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 260,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 253,
                columnNumber: 25
              }, this)
            ] }, campaign.id_campanya, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 232,
              columnNumber: 24
            }, this);
          }) }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 228,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 214,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 213,
          columnNumber: 13
        }, this),
        filteredCampaigns.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-4 text-gray-500", children: "No se encontraron campa\xF1as con los criterios de b\xFAsqueda." }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 272,
          columnNumber: 48
        }, this),
        selectedCampaign && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 p-4 border border-gray-200 rounded bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-2", children: "Detalles de la Campa\xF1a" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 277,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", { className: "bg-white p-4 rounded overflow-auto", children: JSON.stringify(selectedCampaign, null, 2) }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 278,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 276,
          columnNumber: 34
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 206,
        columnNumber: 34
      }, this),
      activeTab === "new" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Crear Nueva Campa\xF1a" }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 285,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleCreateCampaign, className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 289,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "ID del Cliente *" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 292,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "id_client", value: formData.id_client, onChange: handleNumberChange, min: "1", step: "1", required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 295,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 291,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre de la Campa\xF1a *" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 298,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "campanya_nom", value: formData.campanya_nom, onChange: handleInputChange, required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 301,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 297,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 290,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 288,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Detalles de la Campa\xF1a" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 307,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero de Altas Acordadas" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 310,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "campanya_num_altes_acordades", value: formData.campanya_num_altes_acordades, onChange: handleNumberChange, min: "0", step: "1", className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 313,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 309,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "activa_campanya", checked: formData.activa_campanya, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 317,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Campa\xF1a Activa" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 318,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 316,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 315,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 308,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Inicio" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 325,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "data_inici_campanya", value: formData.data_inici_campanya, onChange: handleDateChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 328,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 324,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Fin" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 331,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "data_fi_campanya", value: formData.data_fi_campanya, onChange: handleDateChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 334,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 330,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 323,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Objetivo de la Campa\xF1a" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 339,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "objectiu_campanya", value: formData.objectiu_campanya, onChange: handleInputChange, rows: 3, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 342,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 338,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "objectiu_assolit_campanya", checked: formData.objectiu_assolit_campanya, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 347,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Objetivo Alcanzado" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 348,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 346,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 345,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 306,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Observaciones" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 354,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_campanya", value: formData.observacions_campanya, onChange: handleInputChange, rows: 3, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 355,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 353,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: resetForm, className: "px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50", children: "Limpiar" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 359,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50", children: loading ? "Guardando..." : "Guardar Campa\xF1a" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 362,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 358,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 287,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 284,
        columnNumber: 33
      }, this),
      activeTab === "edit" && selectedCampaign && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: "Editar Campa\xF1a" }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 370,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: [
          "Implementaci\xF3n pendiente para editar la campa\xF1a con ID: ",
          selectedCampaign.id_campanya
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 372,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 369,
        columnNumber: 54
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.campanya.tsx",
      lineNumber: 205,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/formularis.campanya.tsx",
    lineNumber: 182,
    columnNumber: 10
  }, this);
}
_s(CampaignsPage, "ZSakYZ9prXp7uzdgEp7eusZkUHc=", false, function() {
  return [useLoaderData];
});
_c = CampaignsPage;
var _c;
$RefreshReg$(_c, "CampaignsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CampaignsPage as default
};
//# sourceMappingURL=/build/routes/formularis.campanya-5QDE3EN2.js.map
