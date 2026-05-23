import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import type { GeoJsonObject, Feature } from "geojson";
import type { PathOptions, GeoJSON as LeafletGeoJSON } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRiskStore } from "@/store/useRiskStore";
import { useAlcaldias } from "@/hooks/useAlcaldias";
import cdmxGeoJson from "@/assets/geo/cdmx.json";
import { useNavigate } from "react-router-dom";

type IrsaEntry = { irsa: number; nivel: string };

function nivelToColor(nivel: string | undefined): string {
  switch (nivel) {
    case "seguro":   return "#22c55e";
    case "moderado": return "#eab308";
    case "alto":     return "#f97316";
    case "critico":  return "#ef4444";
    default:         return "#6b7280";
  }
}

function nivelToLabel(nivel: string | undefined): string {
  switch (nivel) {
    case "seguro":   return "Bajo";
    case "moderado": return "Moderado";
    case "alto":     return "Alto";
    case "critico":  return "Crítico";
    default:         return "Sin datos";
  }
}

const FLY_TO: Record<string, [number, number]> = {
  "Álvaro Obregón":         [19.378, -99.223],
  "Azcapotzalco":           [19.485, -99.185],
  "Benito Juárez":          [19.378, -99.155],
  "Coyoacán":               [19.335, -99.155],
  "Cuajimalpa de Morelos":  [19.390, -99.315],
  "Cuauhtémoc":             [19.434, -99.150],
  "Gustavo A. Madero":      [19.520, -99.110],
  "Iztacalco":              [19.375, -99.100],
  "Iztapalapa":             [19.340, -99.055],
  "La Magdalena Contreras": [19.320, -99.255],
  "Miguel Hidalgo":         [19.430, -99.220],
  "Milpa Alta":             [19.155, -99.015],
  "Tláhuac":                [19.255, -99.020],
  "Tlalpan":                [19.240, -99.175],
  "Venustiano Carranza":    [19.430, -99.095],
  "Xochimilco":             [19.265, -99.105],
};

function buildStyle(
  feature: Feature | undefined,
  selected: string | null,
  irsaMap: Record<string, IrsaEntry>
): PathOptions {
  const name     = feature?.properties?.NOMGEO as string | undefined;
  const isActive = name === selected;
  const color    = isActive ? "#3b82f6" : nivelToColor(name ? irsaMap[name]?.nivel : undefined);
  return {
    fillColor:   color,
    fillOpacity: isActive ? 0.55 : 0.30,
    color:       isActive ? "#1d4ed8" : color,
    weight:      isActive ? 3 : 1.5,
    opacity:     0.9,
  };
}

function FlyToAlcaldia() {
  const map = useMap();
  const { selectedAlcaldia } = useRiskStore();
  useEffect(() => {
    if (selectedAlcaldia && FLY_TO[selectedAlcaldia]) {
      map.flyTo(FLY_TO[selectedAlcaldia], 13, { duration: 0.7 });
    } else if (!selectedAlcaldia) {
      map.flyTo([19.36, -99.14], 11, { duration: 0.7 });
    }
  }, [map, selectedAlcaldia]);
  return null;
}

declare global { interface Window { __lfNav?: (name: string) => void; } }

export function CdmxLeafletMap() {
  const navigate = useNavigate();
  const { selectedAlcaldia, setSelectedAlcaldia } = useRiskStore();
  const { zonas } = useAlcaldias();
  const geoJsonRef = useRef<LeafletGeoJSON | null>(null);

  // Expose nav callback globally so Leaflet popup inline onclick can call it
  useEffect(() => {
    window.__lfNav = (name: string) => { setSelectedAlcaldia(name); navigate("/detalle"); };
    return () => { delete window.__lfNav; };
  }, [navigate, setSelectedAlcaldia]);

  const irsaByAlcaldia = useMemo(() => {
    const map: Record<string, IrsaEntry> = {};
    for (const z of zonas) map[z.alcaldia || z.nombre] = { irsa: z.calidadAire, nivel: z.riskLevel };
    return map;
  }, [zonas]);

  // Refs so that event handlers (bound once at mount) always read current values
  const selectedRef = useRef(selectedAlcaldia);
  const irsaRef     = useRef(irsaByAlcaldia);
  useEffect(() => { selectedRef.current = selectedAlcaldia;  }, [selectedAlcaldia]);
  useEffect(() => { irsaRef.current     = irsaByAlcaldia;    }, [irsaByAlcaldia]);

  // Re-style all layers when selection or data changes
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
        const entry     = irsaRef.current[name];
        const color     = nivelToColor(entry?.nivel);
        const label     = nivelToLabel(entry?.nivel);
        const irsaText  = entry ? `IRSA ${entry.irsa}/100` : "Sin datos";
        return `
          <div style="min-width:155px;font-family:system-ui,sans-serif;padding:2px">
            <p style="font-weight:700;font-size:13px;margin:0 0 4px">${name}</p>
            <p style="font-size:11px;margin:0 0 10px;color:#666">
              <strong style="color:${color}">${label}</strong>
              <span style="color:#999;margin-left:6px">${irsaText}</span>
            </p>
            <button
              data-alcaldia="${name}"
              onclick="window.__lfNav(this.getAttribute('data-alcaldia'))"
              onmouseover="this.style.background='#2563eb'"
              onmouseout="this.style.background='#3b82f6'"
              style="width:100%;padding:6px 0;background:#3b82f6;color:#fff;border:none;
                border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">
              Ver información →
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
          layer.setStyle({ fillOpacity: 0.50, weight: 2.5 });
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
  );
}
