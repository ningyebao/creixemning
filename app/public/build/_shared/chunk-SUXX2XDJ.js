import {
  createHotContext
} from "/build/_shared/chunk-XR3XMPCQ.js";
import {
  __publicField
} from "/build/_shared/chunk-RODUX5XG.js";

// app/services/filter-group.service.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\services\\filter-group.service.ts"
  );
  import.meta.hot.lastModified = "1745418565784.733";
}
var FilterGroupService = class {
  // Generate a simple ID based on timestamp + random
  static generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  static getAll() {
    if (typeof window === "undefined")
      return [];
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  static save(group) {
    const groups = this.getAll();
    const newGroup = {
      ...group,
      id: group.id || this.generateId(),
      createdAt: group.id ? groups.find((g) => g.id === group.id)?.createdAt || (/* @__PURE__ */ new Date()).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
    };
    const existingIndex = groups.findIndex((g) => g.id === newGroup.id);
    if (existingIndex >= 0) {
      groups[existingIndex] = newGroup;
    } else {
      groups.push(newGroup);
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groups));
    return newGroup;
  }
  static delete(id) {
    const groups = this.getAll();
    const filtered = groups.filter((g) => g.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }
  static getById(id) {
    const groups = this.getAll();
    return groups.find((g) => g.id === id);
  }
};
__publicField(FilterGroupService, "STORAGE_KEY", "filter-groups");

export {
  FilterGroupService
};
//# sourceMappingURL=/build/_shared/chunk-SUXX2XDJ.js.map
