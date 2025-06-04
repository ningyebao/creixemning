import {
  require_client
} from "/build/_shared/chunk-4ZNTBH4S.js";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  index,
  plugin_legend,
  plugin_title,
  plugin_tooltip
} from "/build/_shared/chunk-O67I5K5H.js";
import {
  RemixBrowser
} from "/build/_shared/chunk-QWJ64ZKI.js";
import "/build/_shared/chunk-OPGM6WIO.js";
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

// app/entry.client.tsx
var import_react2 = __toESM(require_react());
var import_client = __toESM(require_client());

// app/lib/chartjs-setup.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\chartjs-setup.ts"
  );
  import.meta.hot.lastModified = "1748255548657.0798";
}
function setupCharts() {
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    plugin_title,
    plugin_tooltip,
    plugin_legend,
    index
  );
}

// app/entry.client.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\entry.client.tsx"
  );
  import.meta.hot.lastModified = "1748260694878.8696";
}
setupCharts();
(0, import_react2.startTransition)(() => {
  (0, import_client.hydrateRoot)(
    document,
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixBrowser, {}, void 0, false, {
      fileName: "app/entry.client.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this) }, void 0, false, {
      fileName: "app/entry.client.tsx",
      lineNumber: 23,
      columnNumber: 5
    }, this)
  );
});
//# sourceMappingURL=/build/entry.client-GUYBKKEI.js.map
