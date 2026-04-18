import { useState } from 'react';
import { X, Check } from 'lucide-react';

interface Props {
  currentPlan: string;
  onClose: () => void;
}

const PLANS = [
  { id: 'basico',     name: 'Básico',     price: 9.99,  features: ['Hasta 5 usuarios', 'Soporte estándar', '10 GB almacenamiento'] },
  { id: 'premium',   name: 'Premium',    price: 29.99, features: ['Usuarios ilimitados', 'Soporte 24/7', 'Almacenamiento ilimitado'] },
  { id: 'enterprise',name: 'Enterprise', price: 99.99, features: ['Todo lo de Premium', 'SLA garantizado', 'Gerente de cuenta dedicado'] },
];

export const ChangePlanModal: React.FC<Props> = ({ currentPlan, onClose }) => {
  const [selected, setSelected] = useState(currentPlan);

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}
      onClick={onClose}
    >
      <div
        style={{ background: 'white', borderRadius: 16, padding: 28, width: '100%', maxWidth: 640, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: 24 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#111827' }}>Cambiar Plan</h2>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>Selecciona el plan que mejor se adapte a tus necesidades</p>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>

        {/* Plan cards */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {PLANS.map(plan => {
            const isSelected = selected === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                style={{ flex: '1 1 160px', border: isSelected ? '2px solid #3b82f6' : '2px solid #e5e7eb', borderRadius: 12, padding: '18px 16px', background: isSelected ? '#eff6ff' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
              >
                <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#111827' }}>{plan.name}</p>
                <p style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700, color: isSelected ? '#2563eb' : '#374151' }}>
                  ${plan.price}<span style={{ fontSize: 11, fontWeight: 400, color: '#9ca3af' }}>/mes</span>
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: '#6b7280' }}>
                      <Check size={11} color={isSelected ? '#2563eb' : '#9ca3af'} strokeWidth={2.5} />
                      {f}
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={onClose}
            style={{ fontSize: 13, color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
          >
            Cancelar suscripción
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', background: 'white', color: '#374151', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button
              onClick={onClose}
              style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer' }}
            >
              Confirmar cambio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
