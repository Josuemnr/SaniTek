import { type LucideIcon, Map, History, Car, ShieldCheck } from "lucide-react";

export interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  pageTitle: string;
  subtitle: string;
}

// Pantallas que no aparecen en el sidebar pero necesitan título/subtítulo en el header
export const SCREEN_CONFIGS: Record<string, { pageTitle: string; subtitle: string }> = {
  "Filtrar Alcaldías": {
    pageTitle: "Alcaldías y municipios",
    subtitle: "Informe detallado",
  },
  "Detalle Alcaldía": {
    pageTitle: "Detalle por Alcaldía",
    subtitle: "Variables críticas y riesgo sanitario",
  },
};

export const NAV_LINKS: NavLink[] = [
  {
    title: "Mapa de Riesgo",
    href: "#",
    icon: Map,
    pageTitle: "Mapa de Riesgo",
    subtitle: "Visualización de riesgos en tiempo real",
  },
  {
    title: "Historial de riesgos",
    href: "#",
    icon: History,
    pageTitle: "Historial de Riesgos",
    subtitle: "Consulta el historial de riesgos registrados",
  },
  {
    title: "Hoy no Circula CDMX",
    href: "#",
    icon: Car,
    pageTitle: "Predicciones Hoy No Circula",
    subtitle: "Consulta las restricciones vehiculares del mes",
  },
  {
    title: "Administración",
    href: "#",
    icon: ShieldCheck,
    pageTitle: "Administración",
    subtitle: "Gestión del sistema",
  },
];
