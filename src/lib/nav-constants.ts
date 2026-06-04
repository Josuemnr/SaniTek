import { type LucideIcon, Map, History, Car } from "lucide-react";

export interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  pageTitle: string;
  subtitle: string;
}

export const SCREEN_CONFIGS: Record<string, { pageTitle: string; subtitle: string }> = {
  "/filtrar": {
    pageTitle: "Alcaldias y municipios",
    subtitle: "Informe detallado",
  },
  "/detalle": {
    pageTitle: "Detalle por Alcaldia",
    subtitle: "Variables criticas y riesgo sanitario",
  },
  "/superadmin": {
    pageTitle: "Panel SaniTek",
    subtitle: "Gestion de empresas clientes",
  },
};

export const NAV_LINKS: NavLink[] = [
  {
    title: "Mapa de Riesgo",
    href: "/",
    icon: Map,
    pageTitle: "Mapa de Riesgo",
    subtitle: "Visualizacion de riesgos en tiempo real",
  },
  {
    title: "Historial de riesgos",
    href: "/historial",
    icon: History,
    pageTitle: "Historial de Riesgos",
    subtitle: "Consulta el historial de riesgos registrados",
  },
  {
    title: "Hoy no Circula CDMX",
    href: "/hoy-no-circula",
    icon: Car,
    pageTitle: "Predicciones Hoy No Circula",
    subtitle: "Consulta las restricciones vehiculares del mes",
  },
];
