import { NavLink, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  FolderIcon,
  DocumentTextIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  UsersIcon,
  IdentificationIcon
} from "@heroicons/react/24/solid";

// Interface for menu items
interface MenuItem {
  label: string;
  to: string;
  icon?: React.ElementType;
  children?: MenuItem[];
}

// Updated navigation structure with assignment routes and verificar-agente
const MENU: MenuItem[] = [
  { label: "Dashboard", to: "/", icon: HomeIcon },
  {
    label: "Asignaciones",
    to: "/assignments",
    icon: UserGroupIcon,
    children: [
      { label: "Panel de Asignación", to: "/assignments/index" },
    ],
  },
  {
    label: "Formularios",
    to: "/formularis",
    icon: DocumentTextIcon,
    children: [
      { label: "Productos", to: "/formularis/productes" },
      { label: "Campaña", to: "/formularis/campanya" },
      { label: "Clientes", to: "/formularis/clients" },
      { label: "Agentes", to: "/formularis/agents" },
    
      { label: "Leads", to: "/leads" },
    ],
  },
];  

const isPathActive = (pathname: string, itemPath: string, children?: MenuItem[]): boolean => {
  if (pathname === itemPath) return true;
  
  if (itemPath !== '/' && pathname.startsWith(itemPath + '/')) return true;

  if (children) {
    if (children.some(child => isPathActive(pathname, child.to))) {
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

export function Sidebar() {
  const { pathname } = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const initiallyOpen: Record<string, boolean> = {};
    MENU.forEach((item) => {
      if (item.children && isPathActive(pathname, item.to, item.children)) {
        initiallyOpen[item.label] = true;
      }
    });
    setOpenMenus(initiallyOpen);
  }, [pathname]);

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  // --- Colors ---
  const sidebarBgColor = "bg-[var(--color-bg-dark)]";
  const sidebarTextColor = "text-[var(--color-text-dark)]";
  const sidebarBorderColor = "border-[var(--color-text-dark)]/20";
  const hoverBgColor = "hover:bg-[var(--color-text-dark)]/10";
  const parentActiveBgColor = "bg-[var(--color-text-dark)]/10";
  const activeBgColor = "bg-primary-600";
  const activeTextColor = "text-white";

  return (
    <aside className={clsx( 
      "flex flex-col h-full transition-all duration-300",
      sidebarBgColor,
      sidebarTextColor,
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className={clsx("px-4 py-5 flex items-center justify-between border-b", sidebarBorderColor)}>
        {!collapsed ? (
          <h1 className="text-xl font-bold truncate">CRM Creixem</h1>
        ) : (
          <div className="mx-auto text-xl font-bold">CRM</div>
        )}
        <button
          onClick={toggleSidebar}
          className={clsx("p-1 rounded-md", hoverBgColor)}
          aria-label={collapsed ? "Expandir barra lateral" : "Contraer barra lateral"}
        >
          {collapsed ? <ArrowRightIcon className="h-5 w-5" /> : <ArrowLeftIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {MENU.map((item) => {
            const isParentActive = item.children && isPathActive(pathname, item.to, item.children);
            const IconComponent = item.icon;

            return item.children ? (
              <li key={item.to}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  aria-expanded={!!openMenus[item.label]}
                  className={clsx(
                    "flex items-center w-full px-3 py-2 rounded text-left",
                    hoverBgColor,
                    isParentActive && !openMenus[item.label] ? parentActiveBgColor : "",
                    collapsed ? "justify-center" : ""
                  )}
                >
                  {IconComponent && <IconComponent className={clsx("h-5 w-5 flex-shrink-0", !collapsed ? "mr-3" : "")} />}
                  {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {!collapsed && (
                    <span>
                      {openMenus[item.label] ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </button>
                {openMenus[item.label] && !collapsed && (
                  <ul className="pl-8 pr-2 py-1 space-y-1">
                    {item.children.map((child) => {
                      const ChildIconComponent = child.icon;
                      
                      return (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            className={({ isActive }) =>
                              clsx(
                                "flex items-center px-3 py-1.5 rounded text-sm truncate",
                                hoverBgColor,
                                isActive
                                  ? `${activeBgColor} ${activeTextColor}`
                                  : "text-gray-300 hover:text-white"
                              )
                            }
                          >
                            {ChildIconComponent && (
                              <ChildIconComponent className="h-4 w-4 mr-2 flex-shrink-0" />
                            )}
                            <span>{child.label}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center px-3 py-2 rounded",
                      hoverBgColor,
                      isActive ? `${activeBgColor} ${activeTextColor}` : "",
                      collapsed ? "justify-center" : ""
                    )
                  }
                >
                  {IconComponent && <IconComponent className={clsx("h-5 w-5 flex-shrink-0", !collapsed ? "mr-3" : "")} />}
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className={clsx("p-4 border-t", sidebarBorderColor)}>
        <div className={clsx("flex items-center", collapsed ? "justify-center" : "")}>
          <div className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0",
            activeBgColor
          )}>
            <UserCircleIcon className="h-6 w-6" />
          </div>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">Admin Creixem</p>
              <p className="text-xs text-gray-400 truncate">Ning</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}