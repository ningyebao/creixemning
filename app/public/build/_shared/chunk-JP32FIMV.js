import {
  createHotContext
} from "/build/_shared/chunk-WWESKXYW.js";

// app/lib/types/index.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\lib\\types\\index.ts"
  );
  import.meta.hot.lastModified = "1748855815564.0342";
}
var formatMidaLead = (mida) => {
  switch (mida) {
    case 1 /* MICROEMPRESA */:
      return "Microempresa";
    case 2 /* PEQUEÑA */:
      return "Peque\xF1a";
    case 3 /* MEDIANA */:
      return "Mediana";
    case 4 /* GRANDE */:
      return "Grande";
    default:
      return "Sin definir";
  }
};
var DEFAULT_LEAD_VALUES = {
  actiu_lead: true,
  mida_lead: 2 /* PEQUEÑA */,
  conciencia_ecologica_lead: false,
  solidaria_social_lead: false,
  cotitza_borsa_lead: false,
  nomes_temporada_lead: false
};

export {
  formatMidaLead,
  DEFAULT_LEAD_VALUES
};
//# sourceMappingURL=/build/_shared/chunk-JP32FIMV.js.map
