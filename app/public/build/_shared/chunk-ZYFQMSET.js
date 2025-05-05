import {
  apiClient
} from "/build/_shared/chunk-52EIYT2B.js";
import {
  createHotContext
} from "/build/_shared/chunk-XR3XMPCQ.js";

// app/services/campanya.service.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\campanya.service.ts"
  );
  import.meta.hot.lastModified = "1746438531668.5361";
}
var CampanyaService = class {
  static async getAll() {
    return await apiClient.get("/campanya");
  }
  static async getById(id) {
    return await apiClient.get(`/campanya/${id}`);
  }
  static async create(campanya) {
    return await apiClient.post("/campanya", campanya);
  }
};

export {
  CampanyaService
};
//# sourceMappingURL=/build/_shared/chunk-ZYFQMSET.js.map
