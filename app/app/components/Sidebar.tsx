import { NavLink, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";

// Interface for menu items
interface MenuItem {
  label: string;
  to: string;
  icon?: string;
  children?: MenuItem[];
}

// Main navigation structure
const MENU: MenuItem[] = [
  { 
    label: "Dashboard", 
    to: "/", 
  },
  {
    label: "Asignaciones",
    to: "/assignments",
    
    children: [
      { label: "Dashboard", to: "/assignments/dashboard" },
      { label: "Asignación Masiva", to: "/assignments/bulk" },
      { label: "Grupos de Filtros", to: "/filter-groups" },
    ],
  },
  {
    label: "Formularios",
    to: "/formularis",
    
    children: [
      { label: "Productos", to: "/formularis/productes" },
      { label: "Campaña", to: "/formularis/campanya" },
      { label: "Clientes", to: "/formularis/clients" },
      { label: "Agentes", to: "/formularis/agents" },
    ],
  },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);

  // Expand parent menu when a child route is active
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {};
    
    MENU.forEach(item => {
      if (item.children) {
        // Check if current path is in any of the children paths
        const isActive = item.children.some(child => 
          pathname === child.to || pathname.startsWith(child.to + "/")
        );
        
        // Also handle special cases
        const isSpecialCase = 
          (item.label === "Asignaciones" && pathname.startsWith("/filter-groups")) ||
          (item.label === "Formularios" && pathname.startsWith("/formularis"));
        
        if (isActive || isSpecialCase) {
          newOpenMenus[item.label] = true;
        }
      }
    });
    
    setOpenMenus(newOpenMenus);
  }, [pathname]);

  // Toggle menu expansion
  const toggleMenu = (key: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toggle sidebar collapse (for responsive design)
  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  // Check if route is active
  const isRouteActive = (path: string): boolean => {
    // Root path
    if (path === "/" && pathname === "/") return true;
    
    // Special cases
    if (path === "/assignments" && (
      pathname.startsWith("/assignments") || 
      pathname.startsWith("/filter-groups")
    )) return true;
    
    if (path === "/formularis" && pathname.startsWith("/formularis")) return true;
    
    // Normal case - path is a prefix of current pathname
    return path !== "/" && pathname.startsWith(path);
  };

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col h-full`}>
      {/* Header with logo and collapse button */}
      <div className="px-4 py-5 flex items-center justify-between border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-bold">CRM Creixem</h1>}
        {collapsed && <div className="mx-auto text-xl font-bold">CRM</div>}
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-md hover:bg-gray-700 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {MENU.map((item) =>
            !item.children ? (
              // Simple menu item
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"} // Only root path needs 'end'
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded mx-2 hover:bg-gray-700 transition-colors ${
                      isActive ? "bg-blue-700" : ""
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ) : (
              // Dropdown menu
              <li key={item.to}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`flex items-center w-full px-4 py-2 rounded mx-2 hover:bg-gray-700 transition-colors ${
                    isRouteActive(item.to) ? "bg-gray-700" : ""
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      <span className="ml-2">{openMenus[item.label] ? "▲" : "▼"}</span>
                    </>
                  )}
                </button>
                {openMenus[item.label] && !collapsed && (
                  <ul className="ml-10 space-y-1 mt-1">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
                              (isActive || 
                              (child.to === "/filter-groups" && pathname.startsWith("/filter-groups")))
                                ? "bg-blue-600 text-white" 
                                : "text-gray-300"
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          )}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <span className="font-semibold">AC</span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">Admin Creixem</p>
              <p className="text-xs text-gray-400">Administrador</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}