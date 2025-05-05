import "/build/_shared/chunk-MDGFDLOQ.js";
import "/build/_shared/chunk-52EIYT2B.js";
import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  Form,
  useLoaderData,
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
  import.meta.hot.lastModified = "1746438714839.428";
}
function AgentsPage() {
  _s();
  const {
    agents,
    error
  } = useLoaderData();
  const submit = useSubmit();
  const [activeTab, setActiveTab] = (0, import_react.useState)("list");
  const [selectedAgent, setSelectedAgent] = (0, import_react.useState)(null);
  const [showDeleteModal, setShowDeleteModal] = (0, import_react.useState)(false);
  const [agentToDelete, setAgentToDelete] = (0, import_react.useState)(null);
  const [formData, setFormData] = (0, import_react.useState)({
    nom_agent: "",
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
    data_alta_agent: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    data_baixa_agent: null,
    observacions_agent: ""
  });
  const [message, setMessage] = (0, import_react.useState)({
    type: null,
    text: null
  });
  const [loading, setLoading] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (activeTab === "new") {
      resetForm();
    } else if (activeTab === "edit" && selectedAgent) {
      populateEditForm(selectedAgent);
    }
  }, [activeTab, selectedAgent]);
  const populateEditForm = (agent) => {
    setFormData({
      nom_agent: agent.nom_agent || "",
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
      data_alta_agent: agent.data_alta_agent ? new Date(agent.data_alta_agent).toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      data_baixa_agent: agent.data_baixa_agent ? new Date(agent.data_baixa_agent).toISOString().split("T")[0] : null,
      observacions_agent: agent.observacions_agent || ""
    });
  };
  const handleDeleteClick = (agent) => {
    setAgentToDelete(agent);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    if (!agentToDelete)
      return;
    const formData2 = new FormData();
    formData2.append("_action", "delete");
    formData2.append("agentId", agentToDelete.id_agent.toString());
    submit(formData2, {
      method: "post"
    });
    setShowDeleteModal(false);
    setAgentToDelete(null);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const submitData = new FormData(e.target);
    if (activeTab === "edit" && selectedAgent) {
      submitData.append("_action", "edit");
      submitData.append("agentId", selectedAgent.id_agent.toString());
    } else {
      submitData.append("_action", "create");
    }
    submit(submitData, {
      method: "post"
    });
  };
  const resetForm = () => {
    setFormData({
      nom_agent: "",
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
      data_alta_agent: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      data_baixa_agent: null,
      observacions_agent: ""
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
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "agents-container", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-xl font-semibold mb-4", children: "Gesti\xF3n de Agentes" }, void 0, false, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 228,
      columnNumber: 7
    }, this),
    message.type && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `mb-4 p-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: message.text }, void 0, false, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 230,
      columnNumber: 24
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-4 p-4 rounded bg-red-100 text-red-700", children: error }, void 0, false, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 234,
      columnNumber: 17
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex border-b border-gray-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "list" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("list"), children: "Lista de Agentes" }, void 0, false, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 237,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "new" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => setActiveTab("new"), children: "Nuevo Agente" }, void 0, false, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 240,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: `py-2 px-4 ${activeTab === "edit" ? "border-b-2 border-primary-500 text-primary-600" : "text-gray-600 hover:text-gray-800"}`, onClick: () => activeTab !== "edit" && selectedAgent && setActiveTab("edit"), disabled: !selectedAgent, children: "Editar Agente" }, void 0, false, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 243,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 236,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: [
      activeTab === "list" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-2", children: "Lista de Agentes" }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 250,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "min-w-full bg-white border border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "ID" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 255,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Nombre" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 258,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Tel\xE9fono" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 261,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "M\xF3vil" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 264,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "NIF" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 267,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Activo" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 270,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { className: "py-2 px-4 border-b border-gray-200 bg-gray-50 text-left", children: "Acciones" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 273,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 254,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 253,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: agents.map((agent) => {
            const nombreCompleto = `${agent.nom_agent || ""} ${agent.cognom1_agent || ""} ${agent.cognom2_agent || ""}`.trim();
            const activo = !agent.data_baixa_agent;
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "hover:bg-gray-50", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: agent.id_agent }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 283,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: nombreCompleto }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 286,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: agent.telefon_agent }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 289,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: agent.mobil_agent }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 292,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: agent.NIF_agent }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 295,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: activo ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800", children: "Activo" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 299,
                columnNumber: 37
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800", children: "Inactivo" }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 301,
                columnNumber: 39
              }, this) }, void 0, false, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 298,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "py-2 px-4 border-b border-gray-200", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-primary-600 hover:text-primary-800 mr-2", onClick: () => {
                  setSelectedAgent(agent);
                  setActiveTab("edit");
                }, children: "Editar" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 306,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-red-600 hover:text-red-800", onClick: () => handleDeleteClick(agent), children: "Eliminar" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 312,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 305,
                columnNumber: 25
              }, this)
            ] }, agent.id_agent, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 282,
              columnNumber: 24
            }, this);
          }) }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 278,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 252,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 251,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 249,
        columnNumber: 34
      }, this),
      (activeTab === "new" || activeTab === "edit") && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium mb-4", children: activeTab === "new" ? "Crear Nuevo Agente" : `Editar Agente: ${selectedAgent?.nom_agent} ${selectedAgent?.cognom1_agent}` }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 324,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", onSubmit: handleFormSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Datos Personales" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 330,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre *" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 333,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "nom_agent", value: formData.nom_agent, onChange: handleInputChange, required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 336,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 332,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Primer Apellido *" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 339,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "cognom1_agent", value: formData.cognom1_agent, onChange: handleInputChange, required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 342,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 338,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Segundo Apellido" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 345,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "cognom2_agent", value: formData.cognom2_agent, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 348,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 344,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 331,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 329,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Informaci\xF3n de Contacto" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 354,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Direcci\xF3n" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 357,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "adre\xE7a_agent", value: formData.adre\u00E7a_agent, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 360,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 356,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "C\xF3digo Postal" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 363,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "codi_postal_agent", value: formData.codi_postal_agent, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 366,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 362,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 355,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Poblaci\xF3n" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 371,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "poblacio_agent", value: formData.poblacio_agent, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 374,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 370,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tel\xE9fono Fijo" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 377,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "telefon_agent", value: formData.telefon_agent, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 380,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 376,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tel\xE9fono M\xF3vil *" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 383,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "mobil_agent", value: formData.mobil_agent, onChange: handleInputChange, required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 386,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 382,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 369,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 353,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Informaci\xF3n Administrativa" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 392,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "NIF/NIE *" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 395,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "NIF_agent", value: formData.NIF_agent, onChange: handleInputChange, required: true, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 398,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 394,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Seguridad Social" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 401,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "seguretat_social_agent", value: formData.seguretat_social_agent, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 404,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 400,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Cuenta Corriente" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 407,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "compte_corrent_agent", value: formData.compte_corrent_agent, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 410,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 406,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 393,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Nombre de Firma" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 415,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", name: "Agents_nom_firma", value: formData.Agents_nom_firma, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 418,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 414,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fecha de Alta" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 421,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", name: "data_alta_agent", value: formData.data_alta_agent, onChange: handleInputChange, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
                  fileName: "app/routes/formularis.agents.tsx",
                  lineNumber: 424,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/formularis.agents.tsx",
                lineNumber: 420,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 413,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 391,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 p-4 rounded border border-gray-200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "text-md font-medium mb-3", children: "Observaciones" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 430,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "observacions_agent", value: formData.observacions_agent, onChange: handleInputChange, rows: 3, className: "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 431,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 429,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex justify-end gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: () => setActiveTab("list"), className: "px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50", children: "Cancelar" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 435,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", onClick: resetForm, className: "px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50", children: "Limpiar" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 438,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: loading, className: "px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50", children: loading ? "Guardando..." : activeTab === "new" ? "Crear Agente" : "Actualizar Agente" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 441,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 434,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 328,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 323,
        columnNumber: 59
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 248,
      columnNumber: 7
    }, this),
    showDeleteModal && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 z-10 overflow-y-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed inset-0 transition-opacity", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gray-500 opacity-75" }, void 0, false, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 453,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 452,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "hidden sm:inline-block sm:align-middle sm:h-screen", "aria-hidden": "true", children: "\u200B" }, void 0, false, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 456,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "sm:flex sm:items-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "h-6 w-6 text-red-600", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 463,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 462,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 461,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "Confirmar eliminaci\xF3n" }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 467,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: [
              "\xBFEst\xE1s seguro de que deseas eliminar al agente ",
              agentToDelete?.nom_agent,
              " ",
              agentToDelete?.cognom1_agent,
              "? Esta acci\xF3n no se puede deshacer."
            ] }, void 0, true, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 469,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/routes/formularis.agents.tsx",
              lineNumber: 468,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 466,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 460,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 459,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm", onClick: confirmDelete, children: "Eliminar" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 477,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm", onClick: () => setShowDeleteModal(false), children: "Cancelar" }, void 0, false, {
            fileName: "app/routes/formularis.agents.tsx",
            lineNumber: 480,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/formularis.agents.tsx",
          lineNumber: 476,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/formularis.agents.tsx",
        lineNumber: 458,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 451,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/formularis.agents.tsx",
      lineNumber: 450,
      columnNumber: 27
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/formularis.agents.tsx",
    lineNumber: 227,
    columnNumber: 10
  }, this);
}
_s(AgentsPage, "+f2H/NfJ5sO8R7rgWos6gB+pOVI=", false, function() {
  return [useLoaderData, useSubmit];
});
_c = AgentsPage;
var _c;
$RefreshReg$(_c, "AgentsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AgentsPage as default
};
//# sourceMappingURL=/build/routes/formularis.agents-7TOKLQTX.js.map
