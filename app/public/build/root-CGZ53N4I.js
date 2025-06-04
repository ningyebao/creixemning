import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useRouteError
} from "/build/_shared/chunk-QWJ64ZKI.js";
import "/build/_shared/chunk-OPGM6WIO.js";
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

// app/root.tsx
var import_node = __toESM(require_node());
var import_react6 = __toESM(require_react());

// app/components/AppLayout.tsx
var import_react4 = __toESM(require_react());

// app/components/Sidebar.tsx
var import_react2 = __toESM(require_react());

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// node_modules/@heroicons/react/24/solid/esm/ArrowLeftIcon.js
var React = __toESM(require_react(), 1);
function ArrowLeftIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React.createElement("path", {
    fillRule: "evenodd",
    d: "M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z",
    clipRule: "evenodd"
  }));
}
var ForwardRef = /* @__PURE__ */ React.forwardRef(ArrowLeftIcon);
var ArrowLeftIcon_default = ForwardRef;

// node_modules/@heroicons/react/24/solid/esm/ArrowRightIcon.js
var React2 = __toESM(require_react(), 1);
function ArrowRightIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React2.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React2.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React2.createElement("path", {
    fillRule: "evenodd",
    d: "M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z",
    clipRule: "evenodd"
  }));
}
var ForwardRef2 = /* @__PURE__ */ React2.forwardRef(ArrowRightIcon);
var ArrowRightIcon_default = ForwardRef2;

// node_modules/@heroicons/react/24/solid/esm/ChevronDownIcon.js
var React3 = __toESM(require_react(), 1);
function ChevronDownIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React3.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React3.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React3.createElement("path", {
    fillRule: "evenodd",
    d: "M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z",
    clipRule: "evenodd"
  }));
}
var ForwardRef3 = /* @__PURE__ */ React3.forwardRef(ChevronDownIcon);
var ChevronDownIcon_default = ForwardRef3;

// node_modules/@heroicons/react/24/solid/esm/ChevronUpIcon.js
var React4 = __toESM(require_react(), 1);
function ChevronUpIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React4.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React4.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React4.createElement("path", {
    fillRule: "evenodd",
    d: "M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z",
    clipRule: "evenodd"
  }));
}
var ForwardRef4 = /* @__PURE__ */ React4.forwardRef(ChevronUpIcon);
var ChevronUpIcon_default = ForwardRef4;

// node_modules/@heroicons/react/24/solid/esm/DocumentTextIcon.js
var React5 = __toESM(require_react(), 1);
function DocumentTextIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React5.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React5.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React5.createElement("path", {
    fillRule: "evenodd",
    d: "M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z",
    clipRule: "evenodd"
  }), /* @__PURE__ */ React5.createElement("path", {
    d: "M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"
  }));
}
var ForwardRef5 = /* @__PURE__ */ React5.forwardRef(DocumentTextIcon);
var DocumentTextIcon_default = ForwardRef5;

// node_modules/@heroicons/react/24/solid/esm/HomeIcon.js
var React6 = __toESM(require_react(), 1);
function HomeIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React6.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React6.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React6.createElement("path", {
    d: "M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
  }), /* @__PURE__ */ React6.createElement("path", {
    d: "m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
  }));
}
var ForwardRef6 = /* @__PURE__ */ React6.forwardRef(HomeIcon);
var HomeIcon_default = ForwardRef6;

// node_modules/@heroicons/react/24/solid/esm/UserCircleIcon.js
var React7 = __toESM(require_react(), 1);
function UserCircleIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React7.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React7.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React7.createElement("path", {
    fillRule: "evenodd",
    d: "M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z",
    clipRule: "evenodd"
  }));
}
var ForwardRef7 = /* @__PURE__ */ React7.forwardRef(UserCircleIcon);
var UserCircleIcon_default = ForwardRef7;

// node_modules/@heroicons/react/24/solid/esm/UserGroupIcon.js
var React8 = __toESM(require_react(), 1);
function UserGroupIcon({
  title,
  titleId,
  ...props
}, svgRef) {
  return /* @__PURE__ */ React8.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: svgRef,
    "aria-labelledby": titleId
  }, props), title ? /* @__PURE__ */ React8.createElement("title", {
    id: titleId
  }, title) : null, /* @__PURE__ */ React8.createElement("path", {
    fillRule: "evenodd",
    d: "M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z",
    clipRule: "evenodd"
  }), /* @__PURE__ */ React8.createElement("path", {
    d: "M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z"
  }));
}
var ForwardRef8 = /* @__PURE__ */ React8.forwardRef(UserGroupIcon);
var UserGroupIcon_default = ForwardRef8;

// app/components/Sidebar.tsx
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
  import.meta.hot.lastModified = "1748622343094.429";
}
var MENU = [{
  label: "Dashboard",
  to: "/",
  icon: HomeIcon_default
}, {
  label: "Asignaciones",
  to: "/assignments",
  icon: UserGroupIcon_default,
  children: [{
    label: "Panel de Asignaci\xF3n",
    to: "/assignments/index"
  }]
}, {
  label: "Formularios",
  to: "/formularis",
  icon: DocumentTextIcon_default,
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
  }, {
    label: "Leads",
    to: "/leads"
  }]
}];
var isPathActive = (pathname, itemPath, children) => {
  if (pathname === itemPath)
    return true;
  if (itemPath !== "/" && pathname.startsWith(itemPath + "/"))
    return true;
  if (children) {
    if (children.some((child) => isPathActive(pathname, child.to))) {
      return true;
    }
  }
  if (itemPath === "/assignments" && pathname.startsWith("/filter-groups")) {
    return true;
  }
  if (itemPath === "/formularis" && pathname.startsWith("/leads")) {
    return true;
  }
  return false;
};
function Sidebar() {
  _s();
  const {
    pathname
  } = useLocation();
  const [openMenus, setOpenMenus] = (0, import_react2.useState)({});
  const [collapsed, setCollapsed] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    const initiallyOpen = {};
    MENU.forEach((item) => {
      if (item.children && isPathActive(pathname, item.to, item.children)) {
        initiallyOpen[item.label] = true;
      }
    });
    setOpenMenus(initiallyOpen);
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
  const sidebarBgColor = "bg-[var(--color-bg-dark)]";
  const sidebarTextColor = "text-[var(--color-text-dark)]";
  const sidebarBorderColor = "border-[var(--color-text-dark)]/20";
  const hoverBgColor = "hover:bg-[var(--color-text-dark)]/10";
  const parentActiveBgColor = "bg-[var(--color-text-dark)]/10";
  const activeBgColor = "bg-primary-600";
  const activeTextColor = "text-white";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", { className: clsx_default("flex flex-col h-full transition-all duration-300", sidebarBgColor, sidebarTextColor, collapsed ? "w-20" : "w-64"), children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: clsx_default("px-4 py-5 flex items-center justify-between border-b", sidebarBorderColor), children: [
      !collapsed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-xl font-bold truncate", children: "CRM Creixem" }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 116,
        columnNumber: 23
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto text-xl font-bold", children: "CRM" }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 116,
        columnNumber: 85
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: toggleSidebar, className: clsx_default("p-1 rounded-md", hoverBgColor), "aria-label": collapsed ? "Expandir barra lateral" : "Contraer barra lateral", children: collapsed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRightIcon_default, { className: "h-5 w-5" }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 118,
        columnNumber: 24
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeftIcon_default, { className: "h-5 w-5" }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 118,
        columnNumber: 65
      }, this) }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "flex-1 overflow-y-auto py-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "space-y-1 px-2", children: MENU.map((item) => {
      const isParentActive = item.children && isPathActive(pathname, item.to, item.children);
      const IconComponent = item.icon;
      return item.children ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => toggleMenu(item.label), "aria-expanded": !!openMenus[item.label], className: clsx_default("flex items-center w-full px-3 py-2 rounded text-left", hoverBgColor, isParentActive && !openMenus[item.label] ? parentActiveBgColor : "", collapsed ? "justify-center" : ""), children: [
          IconComponent && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconComponent, { className: clsx_default("h-5 w-5 flex-shrink-0", !collapsed ? "mr-3" : "") }, void 0, false, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 130,
            columnNumber: 37
          }, this),
          !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "flex-1 truncate", children: item.label }, void 0, false, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 131,
            columnNumber: 34
          }, this),
          !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: openMenus[item.label] ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUpIcon_default, { className: "h-4 w-4" }, void 0, false, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 133,
            columnNumber: 48
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDownIcon_default, { className: "h-4 w-4" }, void 0, false, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 133,
            columnNumber: 88
          }, this) }, void 0, false, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 132,
            columnNumber: 34
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 129,
          columnNumber: 17
        }, this),
        openMenus[item.label] && !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "pl-8 pr-2 py-1 space-y-1", children: item.children.map((child) => {
          const ChildIconComponent = child.icon;
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavLink, { to: child.to, className: ({
            isActive
          }) => clsx_default("flex items-center px-3 py-1.5 rounded text-sm truncate", hoverBgColor, isActive ? `${activeBgColor} ${activeTextColor}` : "text-gray-300 hover:text-white"), children: [
            ChildIconComponent && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChildIconComponent, { className: "h-4 w-4 mr-2 flex-shrink-0" }, void 0, false, {
              fileName: "app/components/Sidebar.tsx",
              lineNumber: 143,
              columnNumber: 52
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: child.label }, void 0, false, {
              fileName: "app/components/Sidebar.tsx",
              lineNumber: 144,
              columnNumber: 29
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 140,
            columnNumber: 27
          }, this) }, child.to, false, {
            fileName: "app/components/Sidebar.tsx",
            lineNumber: 139,
            columnNumber: 24
          }, this);
        }) }, void 0, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 136,
          columnNumber: 57
        }, this)
      ] }, item.to, true, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 128,
        columnNumber: 34
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavLink, { to: item.to, end: item.to === "/", className: ({
        isActive
      }) => clsx_default("flex items-center px-3 py-2 rounded", hoverBgColor, isActive ? `${activeBgColor} ${activeTextColor}` : "", collapsed ? "justify-center" : ""), children: [
        IconComponent && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(IconComponent, { className: clsx_default("h-5 w-5 flex-shrink-0", !collapsed ? "mr-3" : "") }, void 0, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 153,
          columnNumber: 37
        }, this),
        !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "truncate", children: item.label }, void 0, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 154,
          columnNumber: 34
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 150,
        columnNumber: 17
      }, this) }, item.to, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 149,
        columnNumber: 23
      }, this);
    }) }, void 0, false, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 124,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 123,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: clsx_default("p-4 border-t", sidebarBorderColor), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: clsx_default("flex items-center", collapsed ? "justify-center" : ""), children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: clsx_default("w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0", activeBgColor), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCircleIcon_default, { className: "h-6 w-6" }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 165,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 164,
        columnNumber: 11
      }, this),
      !collapsed && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "ml-3 overflow-hidden", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm font-medium truncate", children: "Admin Creixem" }, void 0, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 168,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xs text-gray-400 truncate", children: "Ning" }, void 0, false, {
          fileName: "app/components/Sidebar.tsx",
          lineNumber: 169,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 167,
        columnNumber: 26
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 163,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 162,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Sidebar.tsx",
    lineNumber: 113,
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
  import.meta.hot.lastModified = "1748616828729.692";
}
function AppLayout() {
  _s2();
  const [sidebarOpen, setSidebarOpen] = (0, import_react4.useState)(true);
  const {
    pathname
  } = useLocation();
  const [windowWidth, setWindowWidth] = (0, import_react4.useState)(typeof window !== "undefined" ? window.innerWidth : 0);
  (0, import_react4.useEffect)(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const sidebarWidth = windowWidth >= 1920 ? "300px" : "250px";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex h-screen bg-slate-50", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("aside", { className: `${sidebarOpen ? "block" : "hidden"} md:block border-r border-slate-200`, style: {
      width: sidebarWidth,
      flexShrink: 0
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Sidebar, {}, void 0, false, {
      fileName: "app/components/AppLayout.tsx",
      lineNumber: 53,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/AppLayout.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col flex-1 overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("header", { className: "bg-white shadow-sm border-b border-slate-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "px-6 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "md:hidden text-slate-600 hover:text-slate-900 focus:outline-none transition-colors", "aria-label": sidebarOpen ? "Cerrar men\xFA" : "Abrir men\xFA", children: sidebarOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 64,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 63,
            columnNumber: 32
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 66,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 65,
            columnNumber: 28
          }, this) }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 61,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-xl font-medium text-slate-800", children: "Mi Aplicaci\xF3n" }, void 0, false, {
            fileName: "app/components/AppLayout.tsx",
            lineNumber: 69,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/AppLayout.tsx",
          lineNumber: 60,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center space-x-3" }, void 0, false, {
          fileName: "app/components/AppLayout.tsx",
          lineNumber: 73,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 59,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("main", { className: "flex-1 overflow-y-auto bg-slate-50 relative", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "py-8 px-6 md:px-8 lg:px-10 mx-auto h-full", style: {
        maxWidth: windowWidth >= 1920 ? "1600px" : "1400px",
        width: "100%"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 85,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/components/AppLayout.tsx",
        lineNumber: 79,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/AppLayout.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/AppLayout.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
}
_s2(AppLayout, "BipO6Xa+VvO7Hk6iMRrfIrdo/zk=", false, function() {
  return [useLocation];
});
_c2 = AppLayout;
var _c2;
$RefreshReg$(_c2, "AppLayout");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-YLOJ7PR6.css";

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
var _s22 = $RefreshSig$();
var _s32 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\root.tsx"
  );
}
var meta = () => [{
  charset: "utf-8"
}, {
  title: "Mi Aplicaci\xF3n"
}, {
  name: "viewport",
  content: "width=device-width,initial-scale=1"
}];
var links = () => [{
  rel: "stylesheet",
  href: tailwind_default
}, {
  rel: "icon",
  href: "/favicon.ico"
}];
function Document({
  children,
  appName = "Mi Aplicaci\xF3n"
  // Valor predeterminado
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("html", { lang: "es", className: "h-full bg-gray-100 text-gray-900 antialiased", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("body", { className: "flex flex-col min-h-screen", children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 70,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 71,
        columnNumber: 52
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 62,
    columnNumber: 10
  }, this);
}
_c3 = Document;
function App() {
  _s3();
  const {
    appName
  } = useLoaderData() || {
    appName: "Mi Aplicaci\xF3n"
  };
  const [isHydrated, setIsHydrated] = (0, import_react6.useState)(false);
  (0, import_react6.useEffect)(() => {
    setIsHydrated(true);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Document, { appName, children: isHydrated ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(AppLayout, {}, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 90,
    columnNumber: 21
  }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(LoadingScreen, {}, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 90,
    columnNumber: 37
  }, this) }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 89,
    columnNumber: 10
  }, this);
}
_s3(App, "wc13IZqTXZZ/FcAySDIcNxL6hYQ=", false, function() {
  return [useLoaderData];
});
_c22 = App;
function LoadingScreen() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex items-center justify-center flex-1 h-screen", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "animate-spin h-12 w-12 border-4 border-primary-500 rounded-full" }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 101,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 100,
    columnNumber: 10
  }, this);
}
_c32 = LoadingScreen;
function ErrorBoundary() {
  _s22();
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Document, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "text-2xl font-bold", children: [
        error.status,
        " ",
        error.statusText
      ] }, void 0, true, {
        fileName: "app/root.tsx",
        lineNumber: 113,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: error.data?.message ?? "Ha ocurrido un error." }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 116,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 112,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 111,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Document, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "p-8 text-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Error" }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 122,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: error.message }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 123,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 121,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 120,
    columnNumber: 10
  }, this);
}
_s22(ErrorBoundary, "oAgjgbJzsRXlB89+MoVumxMQqKM=", false, function() {
  return [useRouteError];
});
_c4 = ErrorBoundary;
function CatchBoundary() {
  _s32();
  const caught = useRouteError();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Document, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "p-8 text-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "text-2xl font-bold", children: "Algo sali\xF3 mal" }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 136,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("pre", { children: JSON.stringify(caught, null, 2) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 137,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 135,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 134,
    columnNumber: 10
  }, this);
}
_s32(CatchBoundary, "vZO8vFHs0cvyOVpRsTvS9J3R7pg=", false, function() {
  return [useRouteError];
});
_c5 = CatchBoundary;
var _c3;
var _c22;
var _c32;
var _c4;
var _c5;
$RefreshReg$(_c3, "Document");
$RefreshReg$(_c22, "App");
$RefreshReg$(_c32, "LoadingScreen");
$RefreshReg$(_c4, "ErrorBoundary");
$RefreshReg$(_c5, "CatchBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  App as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-CGZ53N4I.js.map
