// app/root.tsx
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import React, { useState, useEffect } from "react";

import { AppLayout } from "~/components/AppLayout";
import tailwindStyles from "~/tailwind.css";

// 1. Metadata
export const meta: MetaFunction = () => [
  { charset: "utf-8" },
  { title: "Mi Aplicación" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
];

// 2. Global styles
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "icon", href: "/favicon.ico" },
];

// 3. Loader global
export const loader: LoaderFunction = async () => {
  const appName = process.env.APP_NAME ?? "Mi Aplicación";
  return json({ appName });
};
type LoaderData = { appName: string };

// 4. Estructura HTML general (modificada)
function Document({ 
  children, 
  appName = "Mi Aplicación" // Valor predeterminado
}: { 
  children: React.ReactNode; 
  appName?: string; 
}) {
  return (
    <html lang="es" className="h-full bg-gray-100 text-gray-900 antialiased">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

// 5. Componente principal
export default function App() {
  const { appName } = useLoaderData<LoaderData>() || { appName: "Mi Aplicación" };
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => { setIsHydrated(true); }, []);

  return (
    <Document appName={appName}>
      {isHydrated ? <AppLayout /> : <LoadingScreen />}
    </Document>
  );
}

// Pantalla de carga
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center flex-1 h-screen">
      <div className="animate-spin h-12 w-12 border-4 border-primary-500 rounded-full" />
    </div>
  );
}

// Error boundaries
export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold">
            {error.status} {error.statusText}
          </h1>
          <p>{error.data?.message ?? "Ha ocurrido un error."}</p>
        </div>
      </Document>
    );
  }
  return (
    <Document>
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>{(error as Error).message}</p>
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useRouteError();
  
  return (
    <Document>
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Algo salió mal</h1>
        <pre>{JSON.stringify(caught, null, 2)}</pre>
      </div>
    </Document>
  );
}