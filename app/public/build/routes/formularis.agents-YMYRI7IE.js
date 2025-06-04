import {
  AgentsService
} from "/build/_shared/chunk-HAPJVBBN.js";
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

// app/routes/formularis.agents.tsx
var import_react = __toESM(require_react());
var import_node = __toESM(require_node());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\formularis.agents.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\formularis.agents.tsx"
  );
  import.meta.hot.lastModified = "1748619068192.7993";
}
function AgentsPage() {
  _s();
  const {
    agents: initialAgents,
    error
  } = useLoaderData();
  const [agents, setAgents] = (0, import_react.useState)(initialAgents || []);
  const [activeTab, setActiveTab] = (0, import_react.useState)("list");
  const [selectedAgent, setSelectedAgent] = (0, import_react.useState)(null);
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [message, setMessage] = (0, import_react.useState)({
    type: null,
    text: null
  });
  const [loading, setLoading] = (0, import_react.useState)(false);
  const revalidator = useRevalidator();
  const initialForm = {
    id_agent: 0,
    nom_agent: "",
    contrasenya_agent: "creixem123",
    // Valor por defecto
    data_alta_agent: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    data_baixa_agent: null,
    cognom1_agent: "",
    cognom2_agent: "",
    adre\u00E7a_agent: "",
    codi_postal_agent: "",
    poblacio_agent: "",
    telefon_agent: "",
    mobil_agent: "",
    NIF_agent: "",
    seguretat_social_agent: "",
    compte_corrent_agent: "",
    Agents_nom_firma: "",
    observacions_agent: ""
  };
  const [formData, setFormData] = (0, import_react.useState)(initialForm);
  (0, import_react.useEffect)(() => {
    setAgents(initialAgents || []);
  }, [initialAgents]);
  const filteredAgents = agents.filter((agent) => {
    if (!searchTerm)
      return true;
    const searchTermLower = searchTerm.toLowerCase();
    return agent.id_agent && agent.id_agent.toString().includes(searchTermLower) || agent.nom_agent && agent.nom_agent.toLowerCase().includes(searchTermLower) || agent.cognom1_agent && agent.cognom1_agent.toLowerCase().includes(searchTermLower) || agent.NIF_agent && agent.NIF_agent.toLowerCase().includes(searchTermLower);
  });
  const resetForm = () => {
    setFormData(initialForm);
    setSelectedAgent(null);
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
  const showMessage = (messageType, messageText) => {
    setMessage({
      type: messageType,
      text: messageText
    });
    setTimeout(() => {
      setMessage({
        type: null,
        text: null
      });
    }, 5e3);
  };
  const handleCreateAgent = async (e) => {
    e.preventDefault();
    if (!formData.nom_agent.trim()) {
      showMessage("error", "El nombre del agente es obligatorio");
      return;
    }
    setLoading(true);
    setMessage({
      type: null,
      text: null
    });
    try {
      const {
        id_agent,
        ...dataToSend
      } = formData;
      const result = await AgentsService.create(dataToSend);
      showMessage("success", `Agente '${formData.nom_agent}' creado exitosamente con ID: ${result.id_agent}`);
      resetForm();
      setActiveTab("list");
      revalidator.revalidate();
    } catch (error2) {
      console.error("Error creating agent:", error2);
      const errorMessage = error2 instanceof Error ? error2.message : "Error desconocido al crear el agente.";
      showMessage("error", `Error al crear el agente: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateAgent = async (e) => {
    e.preventDefault();
    if (!selectedAgent) {
      showMessage("error", "No hay ning\xFAn agente seleccionado para actualizar");
      return;
    }
    if (!formData.nom_agent.trim()) {
      showMessage("error", "El nombre del agente es obligatorio");
      return;
    }
    setLoading(true);
    setMessage({
      type: null,
      text: null
    });
    try {
      const agentId = Number(selectedAgent.id_agent);
      if (isNaN(agentId)) {
        throw new Error(`ID de agente inv\xE1lido: ${selectedAgent.id_agent}`);
      }
      const {
        id_agent,
        ...updateData
      } = formData;
      const result = await AgentsService.update(agentId, updateData);
      showMessage("success", `Agente '${formData.nom_agent}' actualizado exitosamente`);
      setSelectedAgent(result);
      setActiveTab("list");
      revalidator.revalidate();
    } catch (error2) {
      console.error("Error al actualizar el agente:", error2);
      const errorMessage = error2 instanceof Error ? error2.message : "Error desconocido al actualizar el agente.";
      showMessage("error", `Error al actualizar el agente: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteAgent = async (agent) => {
    if (!agent || !agent.id_agent) {
      showMessage("error", "Agente inv\xE1lido");
      return;
    }
    const agentId = Number(agent.id_agent);
    if (isNaN(agentId)) {
      showMessage("error", `ID de agente inv\xE1lido: ${agent.id_agent}`);
      return;
    }
    if (!window.confirm(`\xBFEst\xE1s seguro de que deseas eliminar el agente "${agent.nom_agent}" (ID: ${agentId})? Esta acci\xF3n no se puede deshacer.`)) {
      return;
    }
    setLoading(true);
    setMessage({
      type: null,
      text: null
    });
    try {
      await AgentsService.delete(agentId);
      showMessage("success", `Agente "${agent.nom_agent}" eliminado exitosamente.`);
      if (selectedAgent && selectedAgent.id_agent === agentId) {
        setSelectedAgent(null);
        resetForm();
        if (activeTab === "edit") {
          setActiveTab("list");
        }
      }
      revalidator.revalidate();
    } catch (error2) {
      console.error(`Error al eliminar agente ${agentId}:`, error2);
      const errorMessage = error2 instanceof Error ? error2.message : "Error desconocido al eliminar el agente.";
      showMessage("error", `Error al eliminar el agente: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  const loadAgentToForm = (agent) => {
    if (!agent)
      return;
    setFormData({
      id_agent: agent.id_agent || 0,
      nom_agent: agent.nom_agent || "",
      contrasenya_agent: agent.contrasenya_agent || "creixem123",
      data_alta_agent: agent.data_alta_agent ? new Date(agent.data_alta_agent).toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      data_baixa_agent: agent.data_baixa_agent ? new Date(agent.data_baixa_agent).toISOString().split("T")[0] : null,
      cognom1_agent: agent.cognom1_agent || "",
      cognom2_agent: agent.cognom2_agent || "",
      adre\u00E7a_agent: agent.adre\u00E7a_agent || "",
      codi_postal_agent: agent.codi_postal_agent || "",
      poblacio_agent: agent.poblacio_agent || "",
      telefon_agent: agent.telefon_agent || "",
      mobil_agent: agent.mobil_agent || "",
      NIF_agent: agent.NIF_agent || "",
      seguretat_social_agent: agent.seguretat_social_agent || "",
      compte_corrent_agent: agent.compte_corrent_agent || "",
      Agents_nom_firma: agent.Agents_nom_firma || "",
      observacions_agent: agent.observacions_agent || ""
    });
  };
  const handleSelectAgent = (agent) => {
    setSelectedAgent(agent);
    loadAgentToForm(agent);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "agents-container p-4 md:p-6 max-w-screen-2xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-semibold text-gray-800", children: "Gesti\xF3n de Agentes" }, void 0, false, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 287,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex border border-gray-300 rounded-lg bg-white shadow-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium rounded-l-lg transition-all ${activeTab === "list" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`, onClick: () => setActiveTab("list"), disabled: loading, "aria-pressed": activeTab === "list", children: "Lista" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 290,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium border-l border-gray-300 transition-all ${activeTab === "new" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`, onClick: () => {
          setActiveTab("new");
          setSelectedAgent(null);
          resetForm();
        }, disabled: loading, "aria-pressed": activeTab === "new", children: "Nuevo" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 293,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 font-medium rounded-r-lg border-l border-gray-300 transition-all ${activeTab === "edit" ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"} ${!selectedAgent ? "opacity-50 cursor-not-allowed" : ""}`, onClick: () => {
          if (selectedAgent) {
            loadAgentToForm(selectedAgent);
            setActiveTab("edit");
          }
        }, disabled: !selectedAgent || loading, "aria-pressed": activeTab === "edit", children: "Editar" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 300,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 289,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 286,
      columnNumber: 7
    }, this),
    message.type && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mb-4 p-4 rounded-lg shadow-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`, role: "alert", "aria-live": "polite", children: message.text }, void 0, false, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 312,
      columnNumber: 24
    }, this),
    error && !message.text && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-4 rounded-lg shadow-sm bg-red-50 text-red-700 border border-red-200", role: "alert", children: error }, void 0, false, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 316,
      columnNumber: 34
    }, this),
    activeTab === "list" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col lg:flex-row gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:w-3/5 space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center bg-white rounded-lg shadow-sm p-2 border border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", placeholder: "Buscar agente por ID, nombre, apellido o NIF...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-4 py-2 border-0 focus:outline-none focus:ring-0", disabled: loading, "aria-label": "Buscar agentes" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 326,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-5 h-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 328,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 327,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 325,
          columnNumber: 15
        }, this),
        loading && agents.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "Cargando agentes..." }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 332,
          columnNumber: 50
        }, this),
        !loading && filteredAgents.length === 0 && agents.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "No se encontraron agentes con los criterios de b\xFAsqueda." }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 336,
          columnNumber: 80
        }, this),
        !loading && agents.length === 0 && !error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200", children: "A\xFAn no hay agentes registrados. \xA1Crea uno nuevo!" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 340,
          columnNumber: 61
        }, this),
        filteredAgents.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "ID" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 348,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 349,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Apellidos" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 350,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Alta" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 351,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { scope: "col", className: "py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Acciones" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 352,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 347,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 346,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { className: "divide-y divide-gray-200", children: filteredAgents.map((agent) => {
            const fechaAlta = agent.data_alta_agent ? new Date(agent.data_alta_agent).toLocaleDateString() : "-";
            const apellidos = `${agent.cognom1_agent || ""} ${agent.cognom2_agent || ""}`.trim() || "-";
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: `${selectedAgent?.id_agent === agent.id_agent ? "bg-primary-50" : "hover:bg-gray-50"} cursor-pointer transition-colors`, onClick: () => handleSelectAgent(agent), children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: agent.id_agent }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 360,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900", children: agent.nom_agent }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 361,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm text-gray-600", children: apellidos }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 362,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm text-gray-600", children: fechaAlta }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 363,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-3 px-4 whitespace-nowrap text-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-3", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "text-primary-600 hover:text-primary-800 font-medium disabled:opacity-50 transition-colors", onClick: (e) => {
                  e.stopPropagation();
                  handleSelectAgent(agent);
                  setActiveTab("edit");
                }, disabled: loading, "aria-label": `Editar agente ${agent.nom_agent}`, children: "Editar" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 366,
                  columnNumber: 33
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "text-red-600 hover:text-red-800 font-medium disabled:opacity-50 transition-colors", onClick: (e) => {
                  e.stopPropagation();
                  handleDeleteAgent(agent);
                }, disabled: loading, "aria-label": `Eliminar agente ${agent.nom_agent}`, children: "Eliminar" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 373,
                  columnNumber: 33
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 365,
                columnNumber: 31
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 364,
                columnNumber: 29
              }, this)
            ] }, `agent-${agent.id_agent}`, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 359,
              columnNumber: 26
            }, this);
          }) }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 355,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 345,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 344,
          columnNumber: 45
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 324,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lg:w-2/5", children: selectedAgent ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-semibold text-gray-700", children: "Detalles del Agente" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 392,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium", children: [
            "ID: ",
            selectedAgent.id_agent
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 395,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 391,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 402,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium", children: selectedAgent.nom_agent }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 403,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 401,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Apellidos" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 406,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium", children: `${selectedAgent.cognom1_agent || ""} ${selectedAgent.cognom2_agent || ""}`.trim() || "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 407,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 405,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "NIF" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 412,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium", children: selectedAgent.NIF_agent || "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 413,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 411,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Fecha Alta" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 416,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium", children: selectedAgent.data_alta_agent ? new Date(selectedAgent.data_alta_agent).toLocaleDateString() : "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 417,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 415,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 400,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Direcci\xF3n" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 425,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedAgent.adre\u00E7a_agent || "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 426,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 424,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Poblaci\xF3n" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 429,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedAgent.poblacio_agent || "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 430,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 428,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "C\xF3digo Postal" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 433,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedAgent.codi_postal_agent || "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 434,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 432,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Fecha Creaci\xF3n" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 437,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedAgent.data_creacio_agent ? new Date(selectedAgent.data_creacio_agent).toLocaleString() : "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 438,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 436,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 423,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Tel\xE9fono" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 446,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedAgent.telefon_agent || "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 447,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 445,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "M\xF3vil" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 450,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedAgent.mobil_agent || "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 451,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 449,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Seg. Social" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 454,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedAgent.seguretat_social_agent || "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 455,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 453,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Cuenta Corriente" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 458,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: selectedAgent.compte_corrent_agent || "-" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 459,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 457,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 444,
          columnNumber: 19
        }, this),
        selectedAgent.observacions_agent && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xs uppercase text-gray-500 font-semibold", children: "Observaciones" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 464,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm bg-gray-50 p-3 rounded border border-gray-100", children: selectedAgent.observacions_agent }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 465,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 463,
          columnNumber: 56
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 flex justify-end space-x-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "px-4 py-2 bg-primary-50 text-primary-700 rounded border border-primary-200 hover:bg-primary-100 transition-colors", onClick: () => {
          loadAgentToForm(selectedAgent);
          setActiveTab("edit");
        }, disabled: loading, children: "Editar Agente" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 469,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 468,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 390,
        columnNumber: 32
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "w-12 h-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 479,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 478,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 477,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-lg font-medium text-gray-700 mb-2", children: "Ning\xFAn agente seleccionado" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 482,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500 text-sm", children: "Selecciona un agente de la lista para ver sus detalles" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 483,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 476,
        columnNumber: 26
      }, this) }, void 0, false, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 389,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 322,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 321,
      columnNumber: 32
    }, this),
    activeTab === "new" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold mb-6 text-gray-700 border-b border-gray-200 pb-3", children: "Crear Nuevo Agente" }, void 0, false, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 491,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleCreateAgent, className: "space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 495,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "nom_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Nombre ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 499,
                  columnNumber: 28
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 498,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_agent", id: "nom_agent", value: formData.nom_agent, onChange: handleInputChange, required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500", "aria-required": "true" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 501,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 497,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "cognom1_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Primer Apellido" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 504,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "cognom1_agent", id: "cognom1_agent", value: formData.cognom1_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 507,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 503,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "cognom2_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Segundo Apellido" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 510,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "cognom2_agent", id: "cognom2_agent", value: formData.cognom2_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 513,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 509,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 496,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 494,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Datos de Acceso" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 520,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "contrasenya_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Contrase\xF1a" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 523,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "password", name: "contrasenya_agent", id: "contrasenya_agent", value: formData.contrasenya_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 526,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 522,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "data_alta_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Alta" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 529,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "data_alta_agent", id: "data_alta_agent", value: formData.data_alta_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 532,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 528,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 521,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 519,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Datos de Contacto" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 539,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "adre\xE7a_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Direcci\xF3n" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 542,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "adre\xE7a_agent", id: "adre\xE7a_agent", value: formData.adre\u00E7a_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 545,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 541,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "poblacio_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Poblaci\xF3n" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 548,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "poblacio_agent", id: "poblacio_agent", value: formData.poblacio_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 551,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 547,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "codi_postal_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "C\xF3digo Postal" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 554,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "codi_postal_agent", id: "codi_postal_agent", value: formData.codi_postal_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 557,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 553,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 540,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "telefon_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Tel\xE9fono" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 563,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "tel", name: "telefon_agent", id: "telefon_agent", value: formData.telefon_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 566,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 562,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "mobil_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "M\xF3vil" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 569,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "tel", name: "mobil_agent", id: "mobil_agent", value: formData.mobil_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 572,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 568,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "NIF_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "NIF" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 575,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "NIF_agent", id: "NIF_agent", value: formData.NIF_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 578,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 574,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 561,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 538,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Datos Laborales" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 585,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "seguretat_social_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero Seguridad Social" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 588,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "seguretat_social_agent", id: "seguretat_social_agent", value: formData.seguretat_social_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 591,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 587,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "compte_corrent_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Cuenta Corriente" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 594,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "compte_corrent_agent", id: "compte_corrent_agent", value: formData.compte_corrent_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 597,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 593,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "Agents_nom_firma", className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre para Firma" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 600,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "Agents_nom_firma", id: "Agents_nom_firma", value: formData.Agents_nom_firma, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 603,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 599,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 586,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 584,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Observaciones" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 610,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_agent", id: "observacions_agent", value: formData.observacions_agent, onChange: handleInputChange, rows: 3, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 611,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 609,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-4 pt-4 border-t border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
            resetForm();
            setActiveTab("list");
          }, disabled: loading, className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors", children: "Cancelar" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 615,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: resetForm, disabled: loading, className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 transition-colors", children: "Limpiar" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 621,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors", children: loading ? "Guardando..." : "Guardar Agente" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 624,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 614,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 492,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 490,
      columnNumber: 31
    }, this),
    activeTab === "edit" && selectedAgent && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between mb-6 border-b border-gray-200 pb-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-semibold text-gray-700", children: "Editar Agente" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 634,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium", children: [
          "ID: ",
          selectedAgent.id_agent
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 635,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 633,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleUpdateAgent, className: "space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Informaci\xF3n B\xE1sica" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 643,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_nom_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: [
                "Nombre ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-red-500", children: "*" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 647,
                  columnNumber: 28
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 646,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_agent", id: "edit_nom_agent", value: formData.nom_agent, onChange: handleInputChange, required: true, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500", "aria-required": "true" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 649,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 645,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_cognom1_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Primer Apellido" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 652,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "cognom1_agent", id: "edit_cognom1_agent", value: formData.cognom1_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 655,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 651,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_cognom2_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Segundo Apellido" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 658,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "cognom2_agent", id: "edit_cognom2_agent", value: formData.cognom2_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 661,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 657,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 644,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 642,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Datos de Acceso" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 668,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_contrasenya_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Contrase\xF1a" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 671,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "password", name: "contrasenya_agent", id: "edit_contrasenya_agent", value: formData.contrasenya_agent, onChange: handleInputChange, placeholder: "Dejar en blanco para no cambiar", className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 674,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 670,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_data_alta_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Alta" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 677,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "data_alta_agent", id: "edit_data_alta_agent", value: formData.data_alta_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 680,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 676,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 669,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 667,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Datos de Contacto" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 687,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_adre\xE7a_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Direcci\xF3n" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 690,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "adre\xE7a_agent", id: "edit_adre\xE7a_agent", value: formData.adre\u00E7a_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 693,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 689,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_poblacio_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Poblaci\xF3n" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 696,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "poblacio_agent", id: "edit_poblacio_agent", value: formData.poblacio_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 699,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 695,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_codi_postal_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "C\xF3digo Postal" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 702,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "codi_postal_agent", id: "edit_codi_postal_agent", value: formData.codi_postal_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 705,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 701,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 688,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_telefon_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Tel\xE9fono" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 711,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "tel", name: "telefon_agent", id: "edit_telefon_agent", value: formData.telefon_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 714,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 710,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_mobil_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "M\xF3vil" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 717,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "tel", name: "mobil_agent", id: "edit_mobil_agent", value: formData.mobil_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 720,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 716,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_NIF_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "NIF" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 723,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "NIF_agent", id: "edit_NIF_agent", value: formData.NIF_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 726,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 722,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 709,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 686,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Datos Laborales" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 733,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_seguretat_social_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "N\xFAmero Seguridad Social" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 736,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "seguretat_social_agent", id: "edit_seguretat_social_agent", value: formData.seguretat_social_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 739,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 735,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_compte_corrent_agent", className: "block text-sm font-medium text-gray-700 mb-1", children: "Cuenta Corriente" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 742,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "compte_corrent_agent", id: "edit_compte_corrent_agent", value: formData.compte_corrent_agent, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 745,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 741,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "edit_Agents_nom_firma", className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre para Firma" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 748,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "Agents_nom_firma", id: "edit_Agents_nom_firma", value: formData.Agents_nom_firma, onChange: handleInputChange, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 751,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 747,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 734,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 732,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { className: "p-4 rounded border border-gray-100 bg-gray-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("legend", { className: "text-lg font-medium mb-4 text-gray-600", children: "Observaciones" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 758,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_agent", id: "edit_observacions_agent", value: formData.observacions_agent, onChange: handleInputChange, rows: 3, className: "w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 759,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 757,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 flex justify-end gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => {
            setActiveTab("list");
          }, disabled: loading, className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors", children: "Cancelar" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 763,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors", children: loading ? "Actualizando..." : "Actualizar Agente" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 768,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 762,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 640,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 632,
      columnNumber: 49
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/formularis.agents.tsx",
    lineNumber: 284,
    columnNumber: 10
  }, this);
}
_s(AgentsPage, "2Zti0DXZMZhqbito0qwn7mNYTpk=", false, function() {
  return [useLoaderData, useRevalidator];
});
_c = AgentsPage;
var _c;
$RefreshReg$(_c, "AgentsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AgentsPage as default
};
//# sourceMappingURL=/build/routes/formularis.agents-YMYRI7IE.js.map
