import { Plus } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export const AddPaymentCard: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{ width: '100%', background: 'white', border: '2px dashed #e2e8f0', borderRadius: 16, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', boxSizing: 'border-box' }}
  >
    <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Plus size={18} color="#9ca3af" />
    </div>
    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#374151' }}>Añadir nuevo método de pago</p>
    <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>Tarjeta de crédito o débito</p>
  </button>
);
