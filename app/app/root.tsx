import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useState, useEffect } from "react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import { AppLayout } from "~/components/AppLayout";
import styles from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "/favicon.ico" },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({
    // You can add any global app data here that needs to be available throughout the app
    appName: "CRM Creixem",
    appVersion: "1.0.0",
    userInfo: {
      name: "Admin Creixem",
      role: "Administrador",
      initials: "AC"
    }
  });
};

export default function App() {
  const loaderData = useLoaderData<typeof loader>();
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  // Simulate app loading - could be used for auth check or data preloading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100 text-gray-900 antialiased">
        {!isAppLoaded ? (
          // Loading screen
          <div className="h-screen flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <h2 className="mt-4 text-xl font-semibold text-white">Cargando {loaderData.appName}...</h2>
            </div>
          </div>
        ) : (
          // Main app layout
          <AppLayout />
        )}
        
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}