import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import type { GeoJsonObject, Feature } from "geojson";
import type { PathOptions, GeoJSON as LeafletGeoJSON } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Loader2 } from "lucide-react";
import { useRiskStore } from "@/store/useRiskStore";
import { useAlcaldias } from "@/hooks/useAlcaldias";
import cdmxGeoJson from "@/assets/geo/cdmx.json";
import { useNavigate } from "react-router-dom";

type IrsaEntry = { irsa: number; nivel: string };

function nivelToColor(nivel: string | undefined): string {
<<<<<<< HEAD
  switch (nivel?.trim().toLowerCase()) {
    case "seguro":
      return "#22c55e";
    case "moderado":
      return "#eab308";
    case "alto":
    case "critico":
      return "#ef4444";
    default:
      return "#6b7280";
=======
  switch (nivel) {
    case "seguro":   return "#22c55e";  // verde  — IRSA 0-40
    case "moderado": return "#eab308";  // amarillo — IRSA 41-70
    case "alto":     return "#ef4444";  // rojo   — IRSA 71-100
    default:         return "#6b7280";
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  }
}

function nivelToLabel(nivel: string | undefined): string {
<<<<<<< HEAD
  switch (nivel?.trim().toLowerCase()) {
    case "seguro":
      return "IRSA Bajo";
    case "moderado":
      return "IRSA Regular";
    case "alto":
    case "critico":
      return "IRSA Alto";
    default:
      return "Sin datos";
=======
  switch (nivel) {
    case "seguro":   return "Bajo";
    case "moderado": return "Regular";
    case "alto":     return "Alto";
    default:         return "Sin datos";
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
  }
}

function withoutAccents(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeAlcaldiaName(value: string): string {
  return withoutAccents(value).trim().replace(/\s+/g, " ").toLowerCase();
}

function getIrsaEntry(name: string | undefined, irsaMap: Record<string, IrsaEntry>) {
  if (!name) return undefined;
  return irsaMap[name] ?? irsaMap[normalizeAlcaldiaName(name)];
}

const FLY_TO: Record<string, [number, number]> = {
  "Alvaro Obregon": [19.378, -99.223],
  "Azcapotzalco": [19.485, -99.185],
  "Benito Juarez": [19.378, -99.155],
  "Coyoacan": [19.335, -99.155],
  "Cuajimalpa de Morelos": [19.39, -99.315],
  "Cuauhtemoc": [19.434, -99.15],
  "Gustavo A. Madero": [19.52, -99.11],
  "Iztacalco": [19.375, -99.1],
  "Iztapalapa": [19.34, -99.055],
  "La Magdalena Contreras": [19.32, -99.255],
  "Miguel Hidalgo": [19.43, -99.22],
  "Milpa Alta": [19.155, -99.015],
  "Tlahuac": [19.255, -99.02],
  "Tlalpan": [19.24, -99.175],
  "Venustiano Carranza": [19.43, -99.095],
  "Xochimilco": [19.265, -99.105],
};

function flyToPoint(name: string | null): [number, number] | undefined {
  if (!name) return undefined;
  return FLY_TO[name] ?? FLY_TO[withoutAccents(name)];
}

function buildStyle(
  feature: Feature | undefined,
  selected: string | null,
  irsaMap: Record<string, IrsaEntry>
): PathOptions {
  const name = feature?.properties?.NOMGEO as string | undefined;
  const isActive = name === selected;
  const entry = getIrsaEntry(name, irsaMap);
  const color = isActive ? "#3b82f6" : nivelToColor(entry?.nivel);

  return {
    fillColor: color,
    fillOpacity: isActive ? 0.55 : 0.3,
    color: isActive ? "#1d4ed8" : color,
    weight: isActive ? 3 : 1.5,
    opacity: 0.9,
  };
}

function FlyToAlcaldia() {
  const map = useMap();
  const { selectedAlcaldia } = useRiskStore();

  useEffect(() => {
    const point = flyToPoint(selectedAlcaldia);
    if (point) {
      map.flyTo(point, 13, { duration: 0.7 });
    } else if (!selectedAlcaldia) {
      map.flyTo([19.36, -99.14], 11, { duration: 0.7 });
    }
  }, [map, selectedAlcaldia]);

  return null;
}

declare global {
  interface Window {
    __lfNav?: (name: string) => void;
  }
}

export function CdmxLeafletMap() {
  const navigate = useNavigate();
  const { selectedAlcaldia, setSelectedAlcaldia } = useRiskStore();
  const { zonas, loading } = useAlcaldias();
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null);

  useEffect(() => {
    window.__lfNav = (name: string) => {
      setSelectedAlcaldia(name);
      navigate("/detalle");
    };
    return () => {
      delete window.__lfNav;
    };
  }, [navigate, setSelectedAlcaldia]);

  const irsaByAlcaldia = useMemo(() => {
    const map: Record<string, IrsaEntry> = {};
    for (const z of zonas) {
      const name = z.alcaldia || z.nombre;
      const entry = { irsa: z.calidadAire, nivel: z.riskLevel };
      map[name] = entry;
      map[normalizeAlcaldiaName(name)] = entry;
    }
    return map;
  }, [zonas]);

  const selectedRef = useRef(selectedAlcaldia);
  const irsaRef = useRef(irsaByAlcaldia);

  useEffect(() => {
    selectedRef.current = selectedAlcaldia;
  }, [selectedAlcaldia]);

  useEffect(() => {
    irsaRef.current = irsaByAlcaldia;
  }, [irsaByAlcaldia]);

  useEffect(() => {
    if (!geoJsonRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geoJsonRef.current.eachLayer((layer: any) => {
      if (layer.feature) {
        layer.setStyle(buildStyle(layer.feature as Feature, selectedAlcaldia, irsaByAlcaldia));
      }
    });
  }, [selectedAlcaldia, irsaByAlcaldia]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEachFeature = (feature: Feature, layer: any) => {
    const name = feature.properties?.NOMGEO as string | undefined;
    if (!name) return;

    layer.bindPopup(
      () => {
<<<<<<< HEAD
        const entry = getIrsaEntry(name, irsaRef.current);
        const color = nivelToColor(entry?.nivel);
        const label = nivelToLabel(entry?.nivel);

=======
        const entry     = irsaRef.current[name];
        const color     = nivelToColor(entry?.nivel);
        const label     = nivelToLabel(entry?.nivel);
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
        return `
          <div style="min-width:155px;font-family:system-ui,sans-serif;padding:2px">
            <p style="font-weight:700;font-size:13px;margin:0 0 4px">${name}</p>
            <p style="font-size:11px;margin:0 0 10px;color:#666">
              <strong style="color:${color}">${label}</strong>
            </p>
            <button
              data-alcaldia="${name}"
              onclick="window.__lfNav(this.getAttribute('data-alcaldia'))"
              onmouseover="this.style.background='#2563eb'"
              onmouseout="this.style.background='#3b82f6'"
              style="width:100%;padding:6px 0;background:#3b82f6;color:#fff;border:none;
                border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">
              Ver informacion
            </button>
          </div>`;
      },
      { closeButton: false, maxWidth: 210 }
    );

    layer.on({
      click() {
        const isSelected = name === selectedRef.current;
        setSelectedAlcaldia(isSelected ? null : name);
        if (!isSelected) layer.openPopup();
      },
      mouseover() {
        if (name !== selectedRef.current) {
          layer.setStyle({ fillOpacity: 0.5, weight: 2.5 });
        }
        layer.bringToFront();
      },
      mouseout() {
        if (name !== selectedRef.current) {
          layer.setStyle(buildStyle(feature, selectedRef.current, irsaRef.current));
        }
      },
    });
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[19.36, -99.14]}
        zoom={11}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <GeoJSON
          ref={geoJsonRef}
          data={cdmxGeoJson as GeoJsonObject}
          style={(f) => buildStyle(f, selectedAlcaldia, irsaByAlcaldia)}
          onEachFeature={onEachFeature}
        />
        <FlyToAlcaldia />
      </MapContainer>

<<<<<<< HEAD
=======
      {/* Overlay mientras se calculan los diagnósticos de todas las alcaldías */}
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
      {loading && (
        <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center bg-background/75 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-3 text-sm font-medium text-muted-foreground">
<<<<<<< HEAD
            Calculando indices IRSA...
=======
            Calculando índices IRSA…
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
          </p>
        </div>
      )}
    </div>
  );
}
