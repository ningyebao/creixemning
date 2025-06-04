import {
  CampanyaService
} from "/build/_shared/chunk-RHBRPB6O.js";
import {
  useLoaderData,
  useRevalidator
} from "/build/_shared/chunk-QWJ64ZKI.js";
import "/build/_shared/chunk-OPGM6WIO.js";
import "/build/_shared/chunk-WCLFPUDL.js";
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
  import.meta.hot.lastModified = "1747411707493.024";
}
function CampaignsPage() {
  _s();
  const {
    campaigns: initialCampaigns,
    error
  } = useLoaderData();
  const [campaigns, setCampaigns] = (0, import_react.useState)(initialCampaigns);
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
  const revalidator = useRevalidator();
  (0, import_react.useEffect)(() => {
    setCampaigns(initialCampaigns);
  }, [initialCampaigns]);
  const filteredCampaigns = campaigns.filter((campaign) => {
    if (!searchTerm)
      return true;
    const searchTermLower = searchTerm.toLowerCase();
    return campaign.id_campanya.toString().includes(searchTermLower) || campaign.campanya_nom.toLowerCase().includes(searchTermLower) || campaign.id_client.toString().includes(searchTermLower);
  });
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
    setMessage({
      type: null,
      text: null
    });
    try {
      const newCampaignData = {
        ...formData,
        data_creacio_campanya: (/* @__PURE__ */ new Date()).toISOString()
      };
      const result = await CampanyaService.create(newCampaignData);
      setMessage({
        type: "success",
        text: `Campa\xF1a '${formData.campanya_nom}' creada exitosamente con ID: ${result.id_campanya}`
      });
      setActiveTab("list");
      resetForm();
      revalidator.revalidate();
    } catch (error2) {
      console.error("Error creating campaign:", error2);
      const errorMessage = error2 instanceof Error ? error2.message : "Error desconocido al crear la campa\xF1a.";
      setMessage({
        type: "error",
        text: `Error al crear la campa\xF1a: ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteCampaign = async (id_campanya, campanya_nom) => {
    if (!window.confirm(`\xBFEst\xE1s seguro de que deseas eliminar la campa\xF1a "${campanya_nom}" (ID: ${id_campanya})? Esta acci\xF3n no se puede deshacer.`)) {
      return;
    }
    setLoading(true);
    setMessage({
      type: null,
      text: null
    });
    try {
      await CampanyaService.delete(id_campanya);
      setMessage({
        type: "success",
        text: `Campa\xF1a "${campanya_nom}" eliminada exitosamente.`
      });
      if (selectedCampaign && selectedCampaign.id_campanya === id_campanya) {
        setSelectedCampaign(null);
        if (activeTab === "edit") {
          setActiveTab("list");
        }
      }
      revalidator.revalidate();
    } catch (error2) {
      console.error(`Error deleting campaign ${id_campanya}:`, error2);
      const errorMessage = error2 instanceof Error ? error2.message : "Error desconocido al eliminar la campa\xF1a.";
      setMessage({
        type: "error",
        text: `Error al eliminar la campa\xF1a: ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
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
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "campaigns-container p-4 md:p-6 max-w-screen-2xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-semibold text-gray-800", children: "Gesti\xF3n de Campa\xF1as" }, void 0, false, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 215,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex border border-gray-300 rounded-lg bg-white shadow-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium rounded-l-lg ${activeTab === "list" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`, onClick: () => setActiveTab("list"), disabled: loading, children: "Lista" }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 218,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium border-l border-gray-300 ${activeTab === "new" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`, onClick: () => {
          setActiveTab("new");
          setSelectedCampaign(null);
          resetForm();
        }, disabled: loading, children: "Nueva" }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 221,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium rounded-r-lg border-l border-gray-300 ${activeTab === "edit" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"} disabled:opacity-50 disabled:cursor-not-allowed`, onClick: () => {
          if (selectedCampaign)
            setActiveTab("edit");
        }, disabled: !selectedCampaign || loading, children: "Editar" }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 228,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 217,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.campanya.tsx",
      lineNumber: 214,
      columnNumber: 7
    }, this),
    message.type && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mb-4 p-4 rounded-lg shadow-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`, children: message.text }, void 0, false, {
      fileName: "app/routes/formularis.campanya.tsx",
      lineNumber: 237,
      columnNumber: 24
    }, this),
    error && !message.text && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-4 rounded-lg shadow-sm bg-red-50 text-red-700 border border-red-200", children: error }, void 0, false, {
      fileName: "app/routes/formularis.campanya.tsx",
      lineNumber: 241,
      columnNumber: 34
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
      activeTab === "list" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col lg:flex-row gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:w-3/5 space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center bg-white rounded-lg shadow-sm p-2 border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Buscar campa\xF1a por ID, nombre o cliente...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-4 py-2 border-0 focus:outline-none focus:ring-0", disabled: loading }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 253,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 255,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 254,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 252,
            columnNumber: 17
          }, this),
          loading && campaigns.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "Cargando campa\xF1as..." }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 259,
            columnNumber: 55
          }, this),
          !loading && filteredCampaigns.length === 0 && campaigns.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "No se encontraron campa\xF1as con los criterios de b\xFAsqueda." }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 263,
            columnNumber: 88
          }, this),
          !loading && campaigns.length === 0 && !error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "A\xFAn no hay campa\xF1as registradas. \xA1Crea una nueva!" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 267,
            columnNumber: 66
          }, this),
          filteredCampaigns.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "ID" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 275,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Nombre" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 276,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Fecha" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 277,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Estado" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 278,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Acciones" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 279,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 274,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 273,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "divide-y divide-gray-200", children: filteredCampaigns.map((campaign) => {
              const fechaInicio = campaign.data_inici_campanya ? new Date(campaign.data_inici_campanya).toLocaleDateString() : "-";
              const fechaFin = campaign.data_fi_campanya ? new Date(campaign.data_fi_campanya).toLocaleDateString() : "-";
              return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: `${selectedCampaign?.id_campanya === campaign.id_campanya ? "bg-primary-50" : "hover:bg-gray-50"} cursor-pointer transition-colors`, onClick: () => setSelectedCampaign(campaign), children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: campaign.id_campanya }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 287,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900", children: campaign.campanya_nom }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 288,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm text-gray-600", children: [
                  fechaInicio,
                  " - ",
                  fechaFin
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 289,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-2.5 w-2.5 rounded-full ${campaign.activa_campanya ? "bg-green-500" : "bg-red-500"}` }, void 0, false, {
                    fileName: "app/routes/formularis.campanya.tsx",
                    lineNumber: 292,
                    columnNumber: 35
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: campaign.activa_campanya ? "Activa" : "Inactiva" }, void 0, false, {
                    fileName: "app/routes/formularis.campanya.tsx",
                    lineNumber: 293,
                    columnNumber: 35
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 291,
                  columnNumber: 33
                }, this) }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 290,
                  columnNumber: 31
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-3", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-primary-600 hover:text-primary-800 font-medium disabled:opacity-50", onClick: (e) => {
                    e.stopPropagation();
                    setSelectedCampaign(campaign);
                    const dataForForm = {
                      id_client: campaign.id_client,
                      campanya_nom: campaign.campanya_nom,
                      campanya_num_altes_acordades: campaign.campanya_num_altes_acordades,
                      data_inici_campanya: campaign.data_inici_campanya ? campaign.data_inici_campanya.split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                      data_fi_campanya: campaign.data_fi_campanya ? campaign.data_fi_campanya.split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                      activa_campanya: campaign.activa_campanya,
                      objectiu_campanya: campaign.objectiu_campanya ?? "",
                      objectiu_assolit_campanya: campaign.objectiu_assolit_campanya,
                      observacions_campanya: campaign.observacions_campanya ?? ""
                    };
                    setFormData(dataForForm);
                    setActiveTab("edit");
                  }, disabled: loading, children: "Editar" }, void 0, false, {
                    fileName: "app/routes/formularis.campanya.tsx",
                    lineNumber: 298,
                    columnNumber: 35
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-red-600 hover:text-red-800 font-medium disabled:opacity-50", onClick: (e) => {
                    e.stopPropagation();
                    handleDeleteCampaign(campaign.id_campanya, campaign.campanya_nom);
                  }, disabled: loading, children: "Eliminar" }, void 0, false, {
                    fileName: "app/routes/formularis.campanya.tsx",
                    lineNumber: 317,
                    columnNumber: 35
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 297,
                  columnNumber: 33
                }, this) }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 296,
                  columnNumber: 31
                }, this)
              ] }, campaign.id_campanya, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 286,
                columnNumber: 28
              }, this);
            }) }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 282,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 272,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 271,
            columnNumber: 50
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 251,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:w-2/5", children: selectedCampaign ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-semibold text-gray-700", children: "Detalles de la Campa\xF1a" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 336,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium", children: [
              "ID: ",
              selectedCampaign.id_campanya
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 339,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 335,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Nombre" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 346,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium", children: selectedCampaign.campanya_nom }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 347,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 345,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "ID Cliente" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 350,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedCampaign.id_client }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 351,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 349,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Altas Acordadas" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 354,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedCampaign.campanya_num_altes_acordades }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 355,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 353,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Estado" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 358,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-2.5 w-2.5 rounded-full ${selectedCampaign.activa_campanya ? "bg-green-500" : "bg-red-500"}` }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 360,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: selectedCampaign.activa_campanya ? "Activa" : "Inactiva" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 361,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 359,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 357,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 344,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Fecha Inicio" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 368,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedCampaign.data_inici_campanya ? new Date(selectedCampaign.data_inici_campanya).toLocaleDateString() : "-" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 369,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 367,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Fecha Fin" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 372,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedCampaign.data_fi_campanya ? new Date(selectedCampaign.data_fi_campanya).toLocaleDateString() : "-" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 373,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 371,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Objetivo Alcanzado" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 376,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `h-2.5 w-2.5 rounded-full ${selectedCampaign.objectiu_assolit_campanya ? "bg-green-500" : "bg-yellow-500"}` }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 378,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm", children: selectedCampaign.objectiu_assolit_campanya ? "Alcanzado" : "Pendiente" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 379,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 377,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 375,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Fecha Creaci\xF3n" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 383,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedCampaign.data_creacio_campanya ? new Date(selectedCampaign.data_creacio_campanya).toLocaleString() : "-" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 384,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 382,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 366,
            columnNumber: 21
          }, this),
          selectedCampaign.objectiu_campanya && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Objetivo" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 389,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm bg-gray-50 p-3 rounded border border-gray-100", children: selectedCampaign.objectiu_campanya }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 390,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 388,
            columnNumber: 60
          }, this),
          selectedCampaign.observacions_campanya && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Observaciones" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 394,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm bg-gray-50 p-3 rounded border border-gray-100", children: selectedCampaign.observacions_campanya }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 395,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 393,
            columnNumber: 64
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 flex justify-end space-x-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "px-4 py-2 bg-primary-50 text-primary-700 rounded border border-primary-200 hover:bg-primary-100 transition-colors", onClick: () => {
            const dataForForm = {
              id_client: selectedCampaign.id_client,
              campanya_nom: selectedCampaign.campanya_nom,
              campanya_num_altes_acordades: selectedCampaign.campanya_num_altes_acordades,
              data_inici_campanya: selectedCampaign.data_inici_campanya ? selectedCampaign.data_inici_campanya.split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              data_fi_campanya: selectedCampaign.data_fi_campanya ? selectedCampaign.data_fi_campanya.split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              activa_campanya: selectedCampaign.activa_campanya,
              objectiu_campanya: selectedCampaign.objectiu_campanya ?? "",
              objectiu_assolit_campanya: selectedCampaign.objectiu_assolit_campanya,
              observacions_campanya: selectedCampaign.observacions_campanya ?? ""
            };
            setFormData(dataForForm);
            setActiveTab("edit");
          }, children: "Editar Campa\xF1a" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 399,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 398,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 334,
          columnNumber: 37
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-12 h-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 420,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 419,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 418,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium text-gray-700 mb-2", children: "Ninguna campa\xF1a seleccionada" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 423,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 text-sm", children: "Selecciona una campa\xF1a de la lista para ver sus detalles" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 424,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 417,
          columnNumber: 28
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 333,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 249,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 247,
        columnNumber: 34
      }, this),
      activeTab === "new" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold mb-6 text-gray-700 border-b border-gray-200 pb-3", children: "Crear Nueva Campa\xF1a" }, void 0, false, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 431,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleCreateCampaign, className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 435,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "id_client_new", className: "block text-sm font-medium text-gray-700 mb-1", children: "ID del Cliente *" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 438,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "id_client", id: "id_client_new", value: formData.id_client, onChange: handleNumberChange, min: "1", step: "1", required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 441,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 437,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "campanya_nom_new", className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre de la Campa\xF1a *" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 444,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "campanya_nom", id: "campanya_nom_new", value: formData.campanya_nom, onChange: handleInputChange, required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 447,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 443,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 436,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 434,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Detalles de la Campa\xF1a" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 454,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "campanya_num_altes_acordades_new", className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero de Altas Acordadas" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 457,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "campanya_num_altes_acordades", id: "campanya_num_altes_acordades_new", value: formData.campanya_num_altes_acordades, onChange: handleNumberChange, min: "0", step: "1", className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 460,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 456,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "data_inici_campanya_new", className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Inicio" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 463,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "data_inici_campanya", id: "data_inici_campanya_new", value: formData.data_inici_campanya, onChange: handleDateChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 466,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 462,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "data_fi_campanya_new", className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Fin" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 469,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "data_fi_campanya", id: "data_fi_campanya_new", value: formData.data_fi_campanya, onChange: handleDateChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 472,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 468,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 455,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col justify-center space-y-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "activa_campanya", id: "activa_campanya_new", checked: formData.activa_campanya, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm" }, void 0, false, {
                    fileName: "app/routes/formularis.campanya.tsx",
                    lineNumber: 479,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Campa\xF1a Activa" }, void 0, false, {
                    fileName: "app/routes/formularis.campanya.tsx",
                    lineNumber: 480,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 478,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer mt-4", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "objectiu_assolit_campanya", id: "objectiu_assolit_campanya_new", checked: formData.objectiu_assolit_campanya, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm" }, void 0, false, {
                    fileName: "app/routes/formularis.campanya.tsx",
                    lineNumber: 483,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Objetivo Alcanzado" }, void 0, false, {
                    fileName: "app/routes/formularis.campanya.tsx",
                    lineNumber: 484,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 482,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 477,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "objectiu_campanya_new", className: "block text-sm font-medium text-gray-700 mb-1", children: "Objetivo de la Campa\xF1a" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 488,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "objectiu_campanya", id: "objectiu_campanya_new", value: formData.objectiu_campanya, onChange: handleInputChange, rows: 3, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 491,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 487,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 476,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 453,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Observaciones" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 498,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_campanya", id: "observacions_campanya_new", value: formData.observacions_campanya, onChange: handleInputChange, rows: 3, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 499,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 497,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-4 pt-4 border-t border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
              resetForm();
              setActiveTab("list");
            }, disabled: loading, className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50", children: "Cancelar" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 503,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: resetForm, disabled: loading, className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50", children: "Limpiar" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 509,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50", children: loading ? "Guardando..." : "Guardar Campa\xF1a" }, void 0, false, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 512,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 502,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 432,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 430,
        columnNumber: 33
      }, this),
      activeTab === "edit" && selectedCampaign && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-6 border-b border-gray-200 pb-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold text-gray-700", children: "Editar Campa\xF1a" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 521,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium", children: [
            "ID: ",
            selectedCampaign.id_campanya
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 522,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 520,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Datos de la Campa\xF1a" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 529,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "ID del Cliente *" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 532,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "id_client", value: formData.id_client, onChange: handleNumberChange, min: "1", step: "1", required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 535,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 531,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre de la Campa\xF1a *" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 538,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "campanya_nom", value: formData.campanya_nom, onChange: handleInputChange, required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 541,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 537,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 530,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 528,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Fechas y Detalles" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 547,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero de Altas Acordadas" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 550,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "number", name: "campanya_num_altes_acordades", value: formData.campanya_num_altes_acordades, onChange: handleNumberChange, min: "0", step: "1", className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 553,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 549,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Inicio" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 556,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "data_inici_campanya", value: formData.data_inici_campanya, onChange: handleDateChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 559,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 555,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Fin" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 562,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "data_fi_campanya", value: formData.data_fi_campanya, onChange: handleDateChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 565,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 561,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 548,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 546,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Estado y Objetivos" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 571,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "activa_campanya", checked: formData.activa_campanya, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 576,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Campa\xF1a Activa" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 577,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 575,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 574,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "flex items-center cursor-pointer", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", name: "objectiu_assolit_campanya", checked: formData.objectiu_assolit_campanya, onChange: handleCheckboxChange, className: "rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4 shadow-sm" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 582,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2 text-sm text-gray-700", children: "Objetivo Alcanzado" }, void 0, false, {
                  fileName: "app/routes/formularis.campanya.tsx",
                  lineNumber: 583,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 581,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 580,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 573,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Objetivo de la Campa\xF1a" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 588,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "objectiu_campanya", value: formData.objectiu_campanya, onChange: handleInputChange, rows: 3, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.campanya.tsx",
                lineNumber: 591,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.campanya.tsx",
              lineNumber: 587,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 572,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 570,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium mb-4 text-gray-600", children: "Observaciones" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 597,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_campanya", value: formData.observacions_campanya, onChange: handleInputChange, rows: 3, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 598,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 596,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 flex justify-end gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
            setActiveTab("list");
          }, disabled: loading, className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50", children: "Cancelar" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 602,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50", children: loading ? "Actualizando..." : "Actualizar Campa\xF1a" }, void 0, false, {
            fileName: "app/routes/formularis.campanya.tsx",
            lineNumber: 607,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.campanya.tsx",
          lineNumber: 601,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.campanya.tsx",
        lineNumber: 519,
        columnNumber: 54
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.campanya.tsx",
      lineNumber: 246,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/formularis.campanya.tsx",
    lineNumber: 212,
    columnNumber: 10
  }, this);
}
_s(CampaignsPage, "xuk9X7fNx2kS/MXtK+fvgi23ZWM=", false, function() {
  return [useLoaderData, useRevalidator];
});
_c = CampaignsPage;
var _c;
$RefreshReg$(_c, "CampaignsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CampaignsPage as default
};
//# sourceMappingURL=/build/routes/formularis.campanya-YU7NTIHK.js.map
