// app/components/domain/AssignmentsNav.tsx
import { NavLink } from "@remix-run/react";

export function AssignmentsNav() {
  return (
    <div className="mb-6">
      <nav className="flex border-b">
        <NavLink
          to="/assignments"
          end
          className={({ isActive }) =>
            `px-4 py-2 font-medium ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Listado de Asignaciones
        </NavLink>
        <NavLink
          to="/assignments/new"
          className={({ isActive }) =>
            `px-4 py-2 font-medium ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Asignación Individual
        </NavLink>
        <NavLink
          to="/assignments/bulk"
          className={({ isActive }) =>
            `px-4 py-2 font-medium ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`
          }
        >
          Asignación Masiva
        </NavLink>
      </nav>
    </div>
  );
}