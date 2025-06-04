// app/routes/dashboard.tsx
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import {
  UsersIcon,
  ClipboardDocumentListIcon,
  BriefcaseIcon,
  ChartPieIcon, // Cambiado para asignaciones totales
} from "@heroicons/react/24/outline";

// Importa tus servicios y tipos
import { LeadService } from "~/services/leads.service";
import { AgentsService } from "~/services/agents.service";
import { CampanyaService } from "~/services/campanya.service";
import { AssignacioService } from "~/services/assignacio.service";
import type { Lead, Agent, Campanya, Assignacio } from "~/lib/types";
import { ASSIGNMENT_STATUSES } from "~/lib/types";

// Importa componentes del dashboard
import { SummaryCard } from "~/components/dashboard/SummaryCard";
import { AssignmentsStatusChart } from "~/components/dashboard/AssignmentsStatusChart";
import { LeadsOverTimeChart } from "~/components/dashboard/LeadsOverTimeChart";
import { AgentPerformanceChart } from "~/components/dashboard/AgentPerformanceChart";
import { ChartLoading } from "~/components/dashboard/ChartLoading";
import { ChartError } from "~/components/dashboard/ChartError"; // Necesitarías usar esto si un gráfico falla individualmente

// Tipos para los datos de los gráficos
import type { ChartData } from 'chart.js';

interface DashboardLoaderData {
  summaryStats: {
    totalLeads: number;
    totalAgentes: number;
    campanasActivas: number;
    totalAsignaciones: number;
  };
  assignmentsStatusData: ChartData<'bar'>;
  leadsOverTimeData: ChartData<'line'>;
  agentPerformanceData: ChartData<'doughnut'>;
  // Podrías incluir los datos crudos si los necesitas en el cliente para otras cosas
  // rawData: { leads: Lead[]; agentes: Agent[]; campanas: Campanya[]; asignaciones: Assignacio[] };
}

export const meta: MetaFunction = () => {
  return [{ title: "Panel de Control Avanzado | Mi App" }];
};

export async function loader({ request }: LoaderFunctionArgs): Promise<Response> {
  try {
    const [leads, agentes, campanas, asignaciones] = await Promise.all([
      LeadService.getAll(0, 50000), // Aumenta el límite si es necesario
      AgentsService.getAll(),
      CampanyaService.getAll(),
      AssignacioService.getAll(0, 50000),
    ]);

    // 1. Estadísticas de Resumen
    const summaryStats = {
      totalLeads: leads.length,
      totalAgentes: agentes.length,
      campanasActivas: campanas.filter(c => c.activa_campanya).length,
      totalAsignaciones: asignaciones.length,
    };

    // 2. Datos para Gráfico de Estado de Asignaciones (Barra)
    const statusCounts: { [key: string]: number } = {};
    ASSIGNMENT_STATUSES.forEach(status => statusCounts[status] = 0);
    asignaciones.forEach(asig => {
      statusCounts[asig.estat_fitxes_assignacions] = (statusCounts[asig.estat_fitxes_assignacions] || 0) + 1;
    });
    const assignmentsStatusData: ChartData<'bar'> = {
      labels: Object.keys(statusCounts),
      datasets: [{
        label: 'Cantidad de Asignaciones',
        data: Object.values(statusCounts),
        // Los colores se aplicarán en el componente del gráfico
      }],
    };

    // 3. Datos para Gráfico de Prospectos (Leads) Creados por Mes (Línea)
    const leadsByMonth: { [key: string]: number } = {};
    leads.forEach(lead => {
      if (lead.fecha_registro) {
        try {
          const date = new Date(lead.fecha_registro);
          const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // Formato YYYY-MM
          leadsByMonth[monthYear] = (leadsByMonth[monthYear] || 0) + 1;
        } catch (e) {
          console.warn(`Fecha de registro inválida para lead ${lead.id_lead}: ${lead.fecha_registro}`);
        }
      }
    });
    const sortedMonths = Object.keys(leadsByMonth).sort();
    const leadsOverTimeData: ChartData<'line'> = {
      labels: sortedMonths.map(monthYear => { // Formatear para visualización si es necesario
          const [year, month] = monthYear.split('-');
          return `${new Date(Number(year), Number(month)-1).toLocaleString('es-ES', { month: 'short' })} ${year.slice(-2)}`;
      }),
      datasets: [{
        label: 'Prospectos Creados',
        data: sortedMonths.map(month => leadsByMonth[month]),
      }],
    };

    // 4. Datos para Gráfico de Rendimiento de Agentes (Dona)
    const assignmentsPerAgent: { [key: number]: number } = {};
    asignaciones.forEach(asig => {
      assignmentsPerAgent[asig.id_agents] = (assignmentsPerAgent[asig.id_agents] || 0) + 1;
    });
    const agentLabels = [];
    const agentDataValues = [];
    const agentMap = new Map(agentes.map(agent => [agent.id_agent, agent.nom_agent]));

    for (const agentId in assignmentsPerAgent) {
      agentLabels.push(agentMap.get(Number(agentId)) || `Agente ID: ${agentId}`);
      agentDataValues.push(assignmentsPerAgent[agentId]);
    }
    const agentPerformanceData: ChartData<'doughnut'> = {
      labels: agentLabels,
      datasets: [{
        label: 'Asignaciones',
        data: agentDataValues,
      }],
    };

    return json<DashboardLoaderData>({
      summaryStats,
      assignmentsStatusData,
      leadsOverTimeData,
      agentPerformanceData,
      // rawData: { leads, agentes, campanas, asignaciones } // Descomentar si es necesario
    });

  } catch (error) {
    console.error("Error en el loader del Dashboard Avanzado:", error);
    // En un caso real, podrías devolver datos parciales o un estado de error más específico.
    // Este throw hará que se active el ErrorBoundary de la ruta.
    throw new Response("No se pudieron cargar los datos del panel de control. Inténtelo más tarde.", { status: 500 });
  }
}

export default function AdvancedDashboardPage() {
  const data = useLoaderData<typeof loader>(); // Obtiene los datos directamente
  const navigation = useNavigation();

  // Manejo de estado de carga global para toda la página (si es necesario)
  if (navigation.state === "loading" && navigation.location.pathname === "/dashboard") {
     // Podrías mostrar un esqueleto de página completa aquí
     return <div className="min-h-screen flex items-center justify-center"><ChartLoading /></div>;
  }

  // Si data no está definido (por un error que no lanzó una Response, aunque el loader actual sí lo hace)
  // O si necesitas manejar errores devueltos como parte del JSON normal (no es el caso aquí con el throw)
  if (!data) {
    return <ChartError message="Los datos del panel de control no están disponibles." />;
  }

  const { summaryStats, assignmentsStatusData, leadsOverTimeData, agentPerformanceData } = data;

  const summaryItems = [
    { title: "Total Prospectos", value: summaryStats.totalLeads, icon: ClipboardDocumentListIcon, bgColor: "bg-sky-500" },
    { title: "Total Agentes", value: summaryStats.totalAgentes, icon: UsersIcon, bgColor: "bg-emerald-500" },
    { title: "Campañas Activas", value: summaryStats.campanasActivas, icon: BriefcaseIcon, bgColor: "bg-amber-500" },
    { title: "Total Asignaciones", value: summaryStats.totalAsignaciones, icon: ChartPieIcon, bgColor: "bg-purple-500" },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen">
      <header className="pb-4 border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800">Creixem DashBoard</h1>
        <p className="text-sm text-slate-500">Resumen general</p>
      </header>

      {/* Sección de Tarjetas de Resumen */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryItems.map(item => (
          <SummaryCard key={item.title} {...item} />
        ))}
      </section>

      {/* Sección de Gráficos Principales (2 columnas) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-[450px] sm:h-[500px] flex flex-col">
          {assignmentsStatusData ? (
            <AssignmentsStatusChart data={assignmentsStatusData} />
          ) : (
            <ChartError message="No hay datos para el estado de asignaciones."/>
          )}
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-[450px] sm:h-[500px] flex flex-col">
          {leadsOverTimeData && leadsOverTimeData.labels && leadsOverTimeData.labels.length > 0 ? (
            <LeadsOverTimeChart data={leadsOverTimeData} />
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-gray-500 p-4">
                <p className="font-semibold">Prospectos (Leads) por Mes</p>
                <p>No hay suficientes datos de prospectos para mostrar la tendencia.</p>
            </div>
          )}
        </div>
      </section>

      {/* Sección de Gráficos Secundarios (ej. rendimiento de agentes) */}
      <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
         <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-[450px] sm:h-[500px] md:max-w-2xl lg:max-w-3xl mx-auto w-full flex flex-col">
          {agentPerformanceData && agentPerformanceData.labels && agentPerformanceData.labels.length > 0 ? (
            <AgentPerformanceChart data={agentPerformanceData} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-4">
                <p className="font-semibold">Asignaciones por Agente</p>
                <p>No hay datos de asignaciones por agente para mostrar.</p>
            </div>
          )}
        </div>
      </section>

      {/* Más secciones o tablas de datos podrían ir aquí */}

    </div>
  );
}

// ErrorBoundary para la ruta del dashboard
export function ErrorBoundary() {
  // Aquí podrías usar useRouteError para obtener más detalles del error si es necesario
  return (
    <div className="p-8 text-center bg-red-50 min-h-screen flex flex-col justify-center items-center">
      <BriefcaseIcon className="h-16 w-16 text-red-400 mb-4" /> {/* Un icono genérico */}
      <h1 className="text-2xl font-bold text-red-700">¡Ups! Algo salió mal.</h1>
      <p className="mt-2 text-red-600">
        No pudimos cargar el panel de control en este momento.
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Por favor, intenta refrescar la página o vuelve a intentarlo más tarde.
      </p>
      {/* Podrías añadir un botón para reintentar o ir a la página de inicio */}
    </div>
  );
}