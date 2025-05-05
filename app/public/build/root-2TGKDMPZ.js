import {
  require_node
} from "/build/_shared/chunk-TMJLOEVS.js";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation
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

// app/root.tsx
var import_node = __toESM(require_node());
var import_react6 = __toESM(require_react());

// app/components/AppLayout.tsx
var import_react4 = __toESM(require_react());

// app/components/Sidebar.tsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Sidebar.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Sidebar.tsx"
  );
  import.meta.hot.lastModified = "1745591970484.4294";
}
var MENU = [{
  label: "Dashboard",
  to: "/"
}, {
  label: "Asignaciones",
  to: "/assignments",
  children: [{
    label: "Dashboard",
    to: "/assignments/dashboard"
  }, {
    label: "Asignaci\xF3n Masiva",
    to: "/assignments/bulk"
  }, {
    label: "Grupos de Filtros",
    to: "/filter-groups"
  }]
}, {
  label: "Formularios",
  to: "/formularis",
  children: [{
    label: "Productos",
    to: "/formularis/productes"
  }, {
    label: "Campa\xF1a",
    to: "/formularis/campanya"
  }, {
    label: "Clientes",
    to: "/formularis/clients"
  }, {
    label: "Agentes",
    to: "/formularis/agents"
  }]
}];
function Sidebar() {
  _s();
  const {
    pathname
  } = useLocation();
  const [openMenus, setOpenMenus] = (0, import_react2.useState)({});
  const [collapsed, setCollapsed] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    const newOpenMenus = {};
    MENU.forEach((item) => {
      if (item.children) {
        const isActive = item.children.some((child) => pathname === child.to || pathname.startsWith(child.to + "/"));
        const isSpecialCase = item.label === "Asignaciones" && pathname.startsWith("/filter-groups") || item.label === "Formularios" && pathname.startsWith("/formularis");
        if (isActive || isSpecialCase) {
          newOpenMenus[item.label] = true;
        }
      }
    });
    setOpenMenus(newOpenMenus);
  }, [pathname]);
  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };
  const isRouteActive = (path) => {
    if (path === "/" && pathname === "/")
      return true;
    if (path === "/assignments" && (pathname.startsWith("/assignments") || pathname.startsWith("/filter-groups")))
      return true;
    if (path === "/formularis" && pathname.startsWith("/formularis"))
      return true;
    return path !== "/" && pathname.startsWith(path);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", { className: `bg-gray-800 text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"} flex flex-col h-full`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "px-4 py-5 flex items-center justify-between border-b border-gray-700", children: [
      !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-xl font-bold", children: "CRM Creixem" }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 115,
        columnNumber: 24
      }, this),
      collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto text-xl font-bold", children: "CRM" }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 116,
        columnNumber: 23
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: toggleSidebar, className: "p-1 rounded-md hover:bg-gray-700 transition-colors", "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar", children: collapsed ? "\u2192" : "\u2190" }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "flex-1 overflow-y-auto py-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "space-y-1", children: MENU.map((item) => !item.children ? (
      // Simple menu item
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        NavLink,
        {
          to: item.to,
          end: item.to === "/",
          className: ({
            isActive
          }) => `flex items-center px-4 py-2 rounded mx-2 hover:bg-gray-700 transition-colors ${isActive ? "bg-blue-700" : ""}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-3", children: item.icon }, void 0, false, {
              fileName: "app/components/Sidebar.tsx",
              lineNumber: 132,
              columnNumber: 19
            }, this),
            !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.label }, void 0, false, {
              fileName: "app/components/Sidebar.tsx",
              lineNumber: 133,
              columnNumber: 34
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 128,
          columnNumber: 17
        },
        this
      ) }, item.to, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 127,
        columnNumber: 9
      }, this)
    ) : (
      // Dropdown menu
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => toggleMenu(item.label), className: `flex items-center w-full px-4 py-2 rounded mx-2 hover:bg-gray-700 transition-colors ${isRouteActive(item.to) ? "bg-gray-700" : ""}`, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "mr-3", children: item.icon }, void 0, false, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 139,
            columnNumber: 19
          }, this),
          !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "flex-1 text-left", children: item.label }, void 0, false, {
              fileName: "app/components/Sidebar.tsx",
              lineNumber: 141,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "ml-2", children: openMenus[item.label] ? "\u25B2" : "\u25BC" }, void 0, false, {
              fileName: "app/components/Sidebar.tsx",
              lineNumber: 142,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 140,
            columnNumber: 34
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 138,
          columnNumber: 17
        }, this),
        openMenus[item.label] && !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "ml-10 space-y-1 mt-1", children: item.children.map((child) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavLink, { to: child.to, className: ({
          isActive
        }) => `block px-4 py-2 rounded hover:bg-gray-700 transition-colors ${isActive || child.to === "/filter-groups" && pathname.startsWith("/filter-groups") ? "bg-blue-600 text-white" : "text-gray-300"}`, children: child.label }, void 0, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 147,
          columnNumber: 25
        }, this) }, child.to, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 146,
          columnNumber: 49
        }, this)) }, void 0, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 145,
          columnNumber: 57
        }, this)
      ] }, item.to, true, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this)
    )) }, void 0, false, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 124,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 123,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 border-t border-gray-700", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "font-semibold", children: "AC" }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 162,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 161,
        columnNumber: 11
      }, this),
      !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium", children: "Admin Creixem" }, void 0, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 165,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-400", children: "Administrador" }, void 0, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 166,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 164,
        columnNumber: 26
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 160,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 159,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Sidebar.tsx",
    lineNumber: 112,
    columnNumber: 10
  }, this);
}
_s(Sidebar, "8EGpmvkG0tbkeCmFz/tBctprvNI=", false, function() {
  return [useLocation];
});
_c = Sidebar;
var _c;
$RefreshReg$(_c, "Sidebar");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/AppLayout.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\AppLayout.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\AppLayout.tsx"
  );
  import.meta.hot.lastModified = "1745591686051.0356";
}
function AppLayout() {
  _s2();
  const [sidebarOpen, setSidebarOpen] = (0, import_react4.useState)(true);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex h-screen bg-gray-100", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: `${sidebarOpen ? "block" : "hidden"} md:block`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Sidebar, {}, void 0, false, {
      fileName: "app/components/AppLayout.tsx",
      lineNumber: 31,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/AppLayout.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col flex-1 overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("header", { className: "bg-white shadow", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "px-4 py-3 flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "md:hidden text-gray-600 focus:outline-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" }, void 0, false, {
          fileName: "app/components/AppLayout.tsx",
          lineNumber: 42,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/components/AppLayout.tsx",
          lineNumber: 41,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/components/AppLayout.tsx",
          lineNumber: 40,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "relative flex-1 max-w-xs ml-4 md:ml-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "text", placeholder: "Buscar...", className: "pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full" }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 48,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "h-5 w-5 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 51,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 50,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 49,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/AppLayout.tsx",
          lineNumber: 47,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "text-gray-600 hover:text-gray-800 focus:outline-none relative", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }, void 0, false, {
              fileName: "app/components/AppLayout.tsx",
              lineNumber: 61,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/components/AppLayout.tsx",
              lineNumber: 60,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" }, void 0, false, {
              fileName: "app/components/AppLayout.tsx",
              lineNumber: 63,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 59,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "text-gray-600 hover:text-gray-800 focus:outline-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }, void 0, false, {
              fileName: "app/components/AppLayout.tsx",
              lineNumber: 69,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }, void 0, false, {
              fileName: "app/components/AppLayout.tsx",
              lineNumber: 70,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 68,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 67,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "text-gray-600 hover:text-gray-800 focus:outline-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 77,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 76,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 75,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/AppLayout.tsx",
          lineNumber: 57,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 38,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("main", { className: "flex-1 overflow-y-auto bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 87,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 86,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AppLayout.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/AppLayout.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
}
_s2(AppLayout, "fX/xBG9dqPCXDXt8dvZeCgFoxdw=");
_c2 = AppLayout;
var _c2;
$RefreshReg$(_c2, "AppLayout");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-VAP4VWZD.css";

// app/root.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\root.tsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: tailwind_default
}, {
  rel: "icon",
  href: "/favicon.ico"
}];
function App() {
  _s3();
  const loaderData = useLoaderData();
  const [isAppLoaded, setIsAppLoaded] = (0, import_react6.useState)(false);
  (0, import_react6.useEffect)(() => {
    const timer = setTimeout(() => {
      setIsAppLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("html", { lang: "es", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 63,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("body", { className: "bg-gray-100 text-gray-900 antialiased", children: [
      !isAppLoaded ? (
        // Loading screen
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "h-screen flex items-center justify-center bg-gray-800", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "text-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto" }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 71,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h2", { className: "mt-4 text-xl font-semibold text-white", children: [
            "Cargando ",
            loaderData.appName,
            "..."
          ] }, void 0, true, {
            fileName: "app/root.tsx",
            lineNumber: 72,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/root.tsx",
          lineNumber: 70,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 69,
          columnNumber: 7
        }, this)
      ) : (
        // Main app layout
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(AppLayout, {}, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 76,
          columnNumber: 7
        }, this)
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 59,
    columnNumber: 10
  }, this);
}
_s3(App, "+CMLcJstXg6sClFUeYy63TPvYso=", false, function() {
  return [useLoaderData];
});
_c3 = App;
var _c3;
$RefreshReg$(_c3, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  App as default,
  links
};
//# sourceMappingURL=/build/root-2TGKDMPZ.js.map
