import { PlanFeatureItem } from './PlanFeatureItem';

const FEATURES = [
  'Acceso ilimitado a todas las funciones',
  'Soporte  24/7',
];

interface Props {
  onCancelPlan: () => void;
}

export const PlanCard: React.FC<Props> = ({ onCancelPlan }) => (
  <div style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)', borderRadius: 16, padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>

    <div>
      <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#1e3a5f' }}>Sanitek Premium</h2>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: '#64748b' }}>Activo desde Enero 2025</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FEATURES.map(f => <PlanFeatureItem key={f} text={f} />)}
      </div>
    </div>


    <div style={{ background: 'white', borderRadius: 12, padding: '20px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0, minWidth: 210, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Próximo pago</p>
      <p style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 700, color: '#1e293b' }}>10 Abril 2026</p>
      <p style={{ margin: '2px 0 16px', fontSize: 13, color: '#64748b' }}>
        $17000.00 <span style={{ fontSize: 11 }}>/mes</span>
      </p>
      <button
        onClick={onCancelPlan}
        style={{ width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid #fca5a5', background: 'white', color: '#dc2626', fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        Cancelar Plan
      </button>
    </div>

  </div>
);
