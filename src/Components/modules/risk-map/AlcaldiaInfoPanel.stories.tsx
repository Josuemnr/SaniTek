import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "@storybook/test"
import { AlcaldiaInfoPanelView, type AlcaldiaInfoPanelViewProps } from "./AlcaldiaInfoPanel"
import type { AlcaldiaPanelData } from "@/hooks/useAlcaldiaPanel"

// ─── Datos de ejemplo ─────────────────────────────────────────────────────────

const DATA_MODERADO: AlcaldiaPanelData = {
  id: 68,
  nombre: "Cuauhtémoc",
  nivelRiesgo: "MODERATE",
  valorIrsa: 54.3,
  puntajeAire: 0.42,      // calidad aire = 100 - 42 = 58 → amarillo
  puntajeClima: 0.38,
  temperatura: 22.1,
  humedad: null,           // el backend no mide humedad → null
  promediosPorContaminante: {
    NO2:     12.4,
    O3:      78.1,
    "PM2.5": 8.9,
  },
  tieneDataClima: true,
}

const DATA_ALTO: AlcaldiaPanelData = {
  id: 80,
  nombre: "Iztapalapa",
  nivelRiesgo: "HIGH",
  valorIrsa: 82.7,
  puntajeAire: 0.81,      // calidad aire = 100 - 81 = 19 → rojo
  puntajeClima: 0.65,
  temperatura: 28.4,
  humedad: null,
  promediosPorContaminante: {
    NO2:     21.3,
    O3:      95.6,
    "PM2.5": 13.2,
  },
  tieneDataClima: true,
}

const DATA_BAJO: AlcaldiaPanelData = {
  id: 62,
  nombre: "Coyoacán",
  nivelRiesgo: "LOW",
  valorIrsa: 22.0,
  puntajeAire: 0.15,      // calidad aire = 100 - 15 = 85 → verde
  puntajeClima: 0.20,
  temperatura: 19.3,
  humedad: 65,
  promediosPorContaminante: {
    NO2:     4.1,
    O3:      32.0,
    "PM2.5": 3.5,
  },
  tieneDataClima: false,   // sin datos climáticos recientes
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<AlcaldiaInfoPanelViewProps> = {
  title: "Módulos/Risk Map/AlcaldiaInfoPanel",
  component: AlcaldiaInfoPanelView,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Panel lateral del mapa de riesgos que muestra el IRSA y variables ambientales
de la alcaldía seleccionada.

Conectado al backend vía \`useAlcaldiaPanel\` → \`GET /api/irsa/diagnostic/:id\`.

## Estados posibles

| Estado | Condición |
|--------|-----------|
| **Loading** | \`loading = true\` — fetch en curso |
| **Error** | \`error != null && loading = false\` — fetch falló |
| **Success LOW** | \`data.nivelRiesgo = "LOW"\` — IRSA 0–40, verde |
| **Success MODERATE** | \`data.nivelRiesgo = "MODERATE"\` — IRSA 41–70, amarillo |
| **Success HIGH** | \`data.nivelRiesgo = "HIGH"\` — IRSA 71–100, rojo |
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    alcaldiaName: {
      description: "Nombre de la alcaldía que se muestra en el header",
      control: "text",
    },
    loading: {
      description: "true mientras el fetch de `/api/irsa/diagnostic/:id` está en curso",
      control: "boolean",
    },
    error: {
      description: "Mensaje de error si el fetch falló; null en cualquier otro caso",
      control: "text",
    },
    data: {
      description: "Datos mapeados desde `IrsaDiagnosticApiResponse`; null durante loading o error",
    },
    onClose: { action: "cerrar panel" },
    onVerDetalles: { action: "navegar a /detalle" },
  },
  args: {
    onClose: fn(),
    onVerDetalles: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 288 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<AlcaldiaInfoPanelViewProps>

// ─── Estado LOADING ───────────────────────────────────────────────────────────

export const Loading: Story = {
  name: "⏳ Loading — fetch en curso",
  parameters: {
    docs: {
      description: {
        story:
          "Se muestra mientras `GET /api/irsa/diagnostic/:id` está en vuelo. " +
          "El badge del header hace pulso (skeleton) y el cuerpo muestra el spinner.",
      },
    },
  },
  args: {
    alcaldiaName: "Cuauhtémoc",
    data: null,
    loading: true,
    error: null,
  },
}

// ─── Estado ERROR ─────────────────────────────────────────────────────────────

export const Error: Story = {
  name: "❌ Error — el backend no respondió",
  parameters: {
    docs: {
      description: {
        story:
          "Se activa cuando el fetch lanza una excepción (red caída, 500, timeout). " +
          "El hook setea `error = 'No se pudo cargar…'` y `data = null`.",
      },
    },
  },
  args: {
    alcaldiaName: "Cuauhtémoc",
    data: null,
    loading: false,
    error: "No se pudo cargar la información de esta alcaldía",
  },
}

// ─── Estado SUCCESS — IRSA Moderado ──────────────────────────────────────────

export const SuccessModerado: Story = {
  name: "✅ Success — IRSA Moderado (41–70)",
  parameters: {
    docs: {
      description: {
        story:
          "Respuesta exitosa de `IrsaDiagnosticApiResponse` con `riskLevel = MODERATE`. " +
          "Badge amarillo, barra de aire ámbar, temperatura y contaminantes visibles.",
      },
    },
  },
  args: {
    alcaldiaName: "Cuauhtémoc",
    data: DATA_MODERADO,
    loading: false,
    error: null,
  },
}

// ─── Estado SUCCESS — IRSA Alto ───────────────────────────────────────────────

export const SuccessAlto: Story = {
  name: "🔴 Success — IRSA Alto (71–100)",
  parameters: {
    docs: {
      description: {
        story:
          "Respuesta exitosa con `riskLevel = HIGH`. " +
          "Badge rojo (variant destructive), barra de aire roja, IRSA 82.7.",
      },
    },
  },
  args: {
    alcaldiaName: "Iztapalapa",
    data: DATA_ALTO,
    loading: false,
    error: null,
  },
}

// ─── Estado SUCCESS — IRSA Bajo ───────────────────────────────────────────────

export const SuccessBajo: Story = {
  name: "🟢 Success — IRSA Bajo (0–40)",
  parameters: {
    docs: {
      description: {
        story:
          "Respuesta exitosa con `riskLevel = LOW`. Badge verde, barra de aire verde. " +
          "También muestra el aviso *'Sin datos climáticos recientes'* cuando `tieneDataClima = false`.",
      },
    },
  },
  args: {
    alcaldiaName: "Coyoacán",
    data: DATA_BAJO,
    loading: false,
    error: null,
  },
}

// ─── Playground (controles libres) ────────────────────────────────────────────

export const Playground: Story = {
  name: "🎛️ Playground — controles libres",
  parameters: {
    docs: {
      description: {
        story:
          "Usa los controles del panel inferior para cambiar `loading`, `error`, y los campos de `data` en tiempo real.",
      },
    },
  },
  args: {
    alcaldiaName: "Tlalpan",
    data: DATA_MODERADO,
    loading: false,
    error: null,
  },
}
