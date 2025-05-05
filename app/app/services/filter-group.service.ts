// ~/services/filter-group.service.ts

export interface FilterGroup {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    filters: Record<string, any>;
  }
  
  export class FilterGroupService {
    private static STORAGE_KEY = 'filter-groups';
    
    // Generate a simple ID based on timestamp + random
    private static generateId(): string {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    static getAll(): FilterGroup[] {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') return [];
      
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    
    static save(group: Omit<FilterGroup, 'id' | 'createdAt'> & { id?: string }): FilterGroup {
      const groups = this.getAll();
      
      // Create a new filter group or update existing one
      const newGroup: FilterGroup = {
        ...group,
        id: group.id || this.generateId(),
        createdAt: group.id 
          ? (groups.find(g => g.id === group.id)?.createdAt || new Date().toISOString())
          : new Date().toISOString()
      };
      
      const existingIndex = groups.findIndex(g => g.id === newGroup.id);
      
      if (existingIndex >= 0) {
        groups[existingIndex] = newGroup;
      } else {
        groups.push(newGroup);
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(groups));
      return newGroup;
    }
    
    static delete(id: string): void {
      const groups = this.getAll();
      const filtered = groups.filter(g => g.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    }
    
    static getById(id: string): FilterGroup | undefined {
      const groups = this.getAll();
      return groups.find(g => g.id === id);
    }
  }