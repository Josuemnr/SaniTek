import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import type { Marker } from 'cobe';

const MARKERS: Marker[] = [
  { location: [40.7128,  -74.006],   size: 0.06 }, // New York
  { location: [51.5074,  -0.1278],   size: 0.06 }, // London
  { location: [35.6762,  139.6503],  size: 0.06 }, // Tokyo
  { location: [-33.8688, 151.2093],  size: 0.05 }, // Sydney
  { location: [48.8566,  2.3522],    size: 0.05 }, // Paris
  { location: [28.6139,  77.209],    size: 0.05 }, // New Delhi
  { location: [55.7558,  37.6173],   size: 0.05 }, // Moscow
  { location: [-22.9068, -43.1729],  size: 0.05 }, // Río de Janeiro
  { location: [31.2304,  121.4737],  size: 0.06 }, // Shanghai
  { location: [25.2048,  55.2708],   size: 0.05 }, // Dubai
  { location: [-34.6037, -58.3816],  size: 0.05 }, // Buenos Aires
  { location: [1.3521,   103.8198],  size: 0.05 }, // Singapore
  { location: [37.5665,  126.978],   size: 0.05 }, // Seoul
];

export const Globe3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phi = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Cabe en pantalla y se ve la esfera completa
    const size = Math.min(window.innerWidth, window.innerHeight) * 1.76;

    canvas.style.width  = `${size}px`;
    canvas.style.height = `${size}px`;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width:  Math.round(size * dpr),
      height: Math.round(size * dpr),
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.8,
      mapSamples: 24000,
      mapBrightness: 6,
      baseColor:   [0.08, 0.18, 0.45],
      markerColor: [0.35, 0.72, 1],
      glowColor:   [0.18, 0.38, 0.85],
      markers: MARKERS,
    });

    // Loop de animación usando la API correcta: globe.update()
    let rafId: number;
    const animate = () => {
      phi.current += 0.0025;
      globe.update({ phi: phi.current });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '54%',
        left: '38%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.9,
        pointerEvents: 'none',
      }}
    />
  );
};
