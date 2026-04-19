"use client";

import { useEffect, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
import { DeckProps } from "@deck.gl/core";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { GeoJsonLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { SidebarAlcaldias } from "./SidebarAlcaldias";
import { QuickStatsCard } from "./QuickStatsCard";
import { TemporalControl } from "./TemporalControl";
import { useRiskStore } from "@/store/useRiskStore";
import { BackgroundBeams } from "@/components/ui/background-beams";
import cdmxGeoJson from "@/assets/geo/cdmx.json";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const ALCALDIA_COORDINATES: Record<string, { lat: number; lng: number }> = {
  "Álvaro Obregón": { lat: 19.3585, lng: -99.2033 },
  "Azcapotzalco": { lat: 19.4853, lng: -99.1821 },
  "Benito Juárez": { lat: 19.3806, lng: -99.1611 },
  "Coyoacán": { lat: 19.3497, lng: -99.1614 },
  "Cuajimalpa de Morelos": { lat: 19.3567, lng: -99.2869 },
  "Cuauhtémoc": { lat: 19.4407, lng: -99.1536 },
  "Gustavo A. Madero": { lat: 19.4931, lng: -99.1107 },
  "Iztacalco": { lat: 19.3951, lng: -99.0976 },
  "Iztapalapa": { lat: 19.3551, lng: -99.0747 },
  "La Magdalena Contreras": { lat: 19.3032, lng: -99.2374 },
  "Miguel Hidalgo": { lat: 19.4282, lng: -99.1901 },
  "Milpa Alta": { lat: 19.1914, lng: -99.0234 },
  "Tláhuac": { lat: 19.2736, lng: -99.0045 },
  "Tlalpan": { lat: 19.2319, lng: -99.1732 },
  "Venustiano Carranza": { lat: 19.4344, lng: -99.0988 },
  "Xochimilco": { lat: 19.2547, lng: -99.1026 },
};

function DeckGLOverlay(props: DeckProps) {
  const map = useMap();
  const overlay = useMemo(() => new GoogleMapsOverlay(props), []);

  useEffect(() => {
    overlay.setMap(map);
    return () => overlay.setMap(null);
  }, [map, overlay]);

  overlay.setProps(props);
  return null;
}

function MapCenterHandler({ selectedAlcaldia }: { selectedAlcaldia: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (map && selectedAlcaldia && ALCALDIA_COORDINATES[selectedAlcaldia]) {
      const coords = ALCALDIA_COORDINATES[selectedAlcaldia];
      map.panTo(coords);
      map.setZoom(13);
    } else if (map && !selectedAlcaldia) {
      map.panTo({ lat: 19.4326, lng: -99.1332 });
      map.setZoom(11);
    }
  }, [map, selectedAlcaldia]);

  return null;
}

interface RiskMapContainerProps {
  onNavigate?: (screen: string) => void;
}

export function RiskMapContainer({ onNavigate }: RiskMapContainerProps) {
  const { riskPoints, currentTime, selectedAlcaldia } = useRiskStore();

  // Filter points by time (within 1 hour of currentTime for visibility in this mock)
  const filteredPoints = useMemo(() => {
    if (riskPoints.length === 0) {
      // Mock some points if none exist for demonstration
      return [
        { lat: 19.4326, lng: -99.1332, intensity: 1 },
        { lat: 19.4026, lng: -99.1764, intensity: 0.8 },
        { lat: 19.3567, lng: -99.1911, intensity: 0.6 },
        { lat: 19.4426, lng: -99.1232, intensity: 0.9 },
        { lat: 19.4226, lng: -99.1432, intensity: 0.7 },
      ];
    }
    return riskPoints.filter(p => Math.abs(p.timestamp - currentTime) < 3600000);
  }, [riskPoints, currentTime]);

  const layers = [
    new GeoJsonLayer({
      id: "cdmx-alcaldias",
      data: cdmxGeoJson as GeoJSON.FeatureCollection,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [100, 100, 100, 20],
      getLineColor: [150, 150, 150, 100],
      getLineWidth: 1,
    }),
    new HeatmapLayer({
      id: "risk-heatmap",
      data: filteredPoints,
      getPosition: (d: { lat: number; lng: number }) => [d.lng, d.lat],
      getWeight: (d: { intensity: number }) => d.intensity,
      radiusPixels: 60,
      intensity: 1,
      threshold: 0.05,
      colorRange: [
        [0, 176, 80, 100],   // Bajo (Green)
        [255, 255, 0, 150],  // Moderado (Yellow)
        [255, 192, 0, 200],  // Alto (Orange)
        [255, 0, 0, 250]     // Crítico (Red)
      ]
    })
  ];

  return (
    <div className="flex h-full w-full gap-4 p-4 overflow-hidden bg-background relative">
      <BackgroundBeams className="opacity-40" />
      
      {/* Sidebar */}
      <div className="relative z-10">
        <SidebarAlcaldias onNavigate={onNavigate} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-4 relative">
        {/* Quick Stats Overlay */}
        <div className="z-20 absolute top-4 left-4 pointer-events-auto">
          <QuickStatsCard />
        </div>

        {/* Map Container */}
        <div className="flex-1 rounded-xl border border-border bg-muted/5 overflow-hidden relative shadow-2xl">
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
              defaultCenter={{ lat: 19.4326, lng: -99.1332 }}
              defaultZoom={11}
              mapId="bf50473b272648" // Placeholder or personal Map ID
              disableDefaultUI={true}
              gestureHandling={'greedy'}
            >
              <DeckGLOverlay layers={layers} />
              <MapCenterHandler selectedAlcaldia={selectedAlcaldia} />
            </Map>
          </APIProvider>
        </div>

        {/* Temporal Control + Filtros */}
        <div className="z-20 absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-auto">
          <div className="w-xl">
            <TemporalControl />
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="h-9 gap-2 shadow-md shrink-0"
            onClick={() => onNavigate?.("Filtrar Alcaldías")}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
