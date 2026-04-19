import { Edit2, Trash2, CreditCard } from 'lucide-react';

export interface CardData {
  id: number;
  last4: string;
  holder: string;
  expiry: string;
  isDefault: boolean;
}

interface Props {
  card: CardData;
  onEdit: (card: CardData) => void;
  onDelete: (card: CardData) => void;
}

export const PaymentCard: React.FC<Props> = ({ card, onEdit, onDelete }) => (
  <div style={{ borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(135deg, #1a2236 0%, #0d1424 100%)', position: 'relative' }}>

    {/* Decorative circles */}
    <div style={{ position: 'absolute', top: -45, right: -45, width: 170, height: 170, borderRadius: '50%', background: 'rgba(17, 45, 108, 0.65)', zIndex: 0 }} />
    <div style={{ position: 'absolute', bottom: 48, left: -40, width: 130, height: 130, borderRadius: '50%', background: 'rgba(88, 28, 135, 0.45)', zIndex: 0 }} />

    {/* Card body */}
    <div style={{ padding: '22px 24px 20px', position: 'relative', zIndex: 1, color: 'white' }}>

      {/* Top row: icon + badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div style={{ width: 46, height: 46, background: '#f59e0b', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CreditCard size={22} color="white" />
        </div>
        {card.isDefault && (
          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>Predeterminada</span>
        )}
      </div>

      {/* Card number */}
      <p style={{ margin: '0 0 3px', fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Número de Tarjeta</p>
      <p style={{ margin: '0 0 22px', fontSize: 20, fontWeight: 600, letterSpacing: '0.18em' }}>**** **** **** {card.last4}</p>

      {/* Holder + expiry */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: '0 0 3px', fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Titular</p>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{card.holder}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: '0 0 3px', fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vence</p>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{card.expiry}</p>
        </div>
      </div>
    </div>

    {/* Action buttons */}
    <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <button
        onClick={() => onEdit(card)}
        style={{ flex: 1, padding: '14px', background: 'white', border: 'none', color: '#1e293b', fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
      >
        <Edit2 size={13} /> Editar
      </button>
      <button
        onClick={() => onDelete(card)}
        style={{ flex: 1, padding: '14px', background: '#7f1d1d', border: 'none', color: 'white', fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
      >
        <Trash2 size={13} /> Eliminar
      </button>
    </div>

  </div>
);
