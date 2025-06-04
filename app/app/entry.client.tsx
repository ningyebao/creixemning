// app/entry.client.tsx
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { setupCharts } from "~/lib/chartjs-setup"; // Asegúrate que la ruta sea correcta

setupCharts(); // Llama a la configuración aquí

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});