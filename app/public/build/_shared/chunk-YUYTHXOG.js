import {
  createHotContext
} from "/build/_shared/chunk-XR3XMPCQ.js";

// app/lib/types/index.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\types\\index.ts"
  );
  import.meta.hot.lastModified = "1745911663829.9346";
}
var formatMidaLead = (mida) => {
  switch (mida) {
    case 1:
      return "Microempresa";
    case 2:
      return "Peque\xF1a";
    case 3:
      return "Mediana";
    case 4:
      return "Grande";
    default:
      return "Sin definir";
  }
};

export {
  formatMidaLead
};
//# sourceMappingURL=/build/_shared/chunk-YUYTHXOG.js.map
