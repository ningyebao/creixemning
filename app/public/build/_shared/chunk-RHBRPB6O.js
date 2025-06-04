import {
  apiClient
} from "/build/_shared/chunk-WCLFPUDL.js";
import {
  createHotContext
} from "/build/_shared/chunk-WWESKXYW.js";

// app/services/campanya.service.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\campanya.service.ts"
  );
  import.meta.hot.lastModified = "1747409260234.9666";
}
var CampanyaService = class {
  static async getAll() {
    return await apiClient.get("/campanya/");
  }
  static async getById(id) {
    return await apiClient.get(`/campanya/${id}`);
  }
  static async create(campanya) {
    return await apiClient.post("/campanya/", campanya);
  }
  static async delete(id) {
    await apiClient.delete(`/campanya/${id}`);
  }
  static async update(id, campanya) {
    return await apiClient.put(`/campanya/${id}`, campanya);
  }
};

export {
  CampanyaService
};
//# sourceMappingURL=/build/_shared/chunk-RHBRPB6O.js.map
