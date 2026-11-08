import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@/app/styles/global.css";
import { App } from "./App";
import { APP_PATHS } from "@/app/routes/appPaths";

const navigationEntry = performance.getEntriesByType("navigation")[0] as
  PerformanceNavigationTiming | undefined;

if (window.location.pathname === APP_PATHS.DASHBOARD && navigationEntry?.type === "reload") {
  window.history.replaceState(null, "", APP_PATHS.HOME);
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("No se encontró el elemento raíz de Cassandra.");
}

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
