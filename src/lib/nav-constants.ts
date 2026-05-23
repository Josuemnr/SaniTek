import { type LucideIcon, Map, History, Car, Bell } from "lucide-react";

export interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
  pageTitle: string;
  subtitle: string;
}

export const SCREEN_CONFIGS: Record<string, { pageTitle: string; subtitle: string }> = {
  "/filtrar": {
    pageTitle: "Alcaldías y municipios",
    subtitle: "Informe detallado",
  },
  "/detalle": {
    pageTitle: "Detalle por Alcaldía",
    subtitle: "Variables críticas y riesgo sanitario",
  },
   "/superadmin": {
    pageTitle: "Panel SaniTek",
    subtitle: "Gestión de empresas clientes",
  },
};

export const NAV_LINKS: NavLink[] = [
  {
    title: "Mapa de Riesgo",
    href: "/",
    icon: Map,
    pageTitle: "Mapa de Riesgo",
    subtitle: "Visualización de riesgos en tiempo real",
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
  {
    title: "Alertas sanitarias",
    href: "/alertas",
    icon: Bell,
    pageTitle: "Alertas Sanitarias",
    subtitle: "Suscríbete a las alcaldías y recibe notificaciones",
  },
];
