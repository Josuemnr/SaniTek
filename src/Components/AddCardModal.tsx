import { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import type { CardData } from './PaymentCard';

interface Props {
  onClose: () => void;
  onSave: (card: Omit<CardData, 'id'>) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1px solid #e5e7eb', borderRadius: 10,
  padding: '10px 12px', fontSize: 13, color: '#1f2937',
  background: 'white', outline: 'none', boxSizing: 'border-box',
};

const formatCardNumber = (v: string) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

const formatExpiry = (v: string) => {
  const digits = v.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

export const AddCardModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [number, setNumber] = useState('');
  const [holder, setHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    const digits = number.replace(/\s/g, '');
    if (digits.length < 16) e.number = 'Número de tarjeta inválido';
    if (!holder.trim()) e.holder = 'El titular es requerido';
    if (!/^\d{2}\/\d{2}$/.test(expiry)) e.expiry = 'Formato MM/AA';
    if (cvv.length < 3) e.cvv = 'CVV inválido';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const digits = number.replace(/\s/g, '');
    onSave({ last4: digits.slice(-4), holder: holder.trim(), expiry, isDefault });
    onClose();
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}
      onClick={onClose}
    >
      <div
        style={{ background: 'white', borderRadius: 16, padding: 28, width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: 20 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, background: '#eff6ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={17} color="#3b82f6" />
            </div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Nueva Tarjeta</h2>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Número de tarjeta</label>
            <input
              placeholder="1234 5678 9012 3456"
              value={number}
              onChange={e => { setNumber(formatCardNumber(e.target.value)); setErrors(p => ({ ...p, number: '' })); }}
              style={{ ...inputStyle, borderColor: errors.number ? '#ef4444' : '#e5e7eb' }}
            />
            {errors.number && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.number}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Titular de la tarjeta</label>
            <input
              placeholder="Nombre como aparece en la tarjeta"
              value={holder}
              onChange={e => { setHolder(e.target.value); setErrors(p => ({ ...p, holder: '' })); }}
              style={{ ...inputStyle, borderColor: errors.holder ? '#ef4444' : '#e5e7eb' }}
            />
            {errors.holder && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.holder}</p>}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Vencimiento</label>
              <input
                placeholder="MM/AA"
                value={expiry}
                onChange={e => { setExpiry(formatExpiry(e.target.value)); setErrors(p => ({ ...p, expiry: '' })); }}
                style={{ ...inputStyle, borderColor: errors.expiry ? '#ef4444' : '#e5e7eb' }}
              />
              {errors.expiry && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.expiry}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>CVV</label>
              <input
                placeholder="123"
                maxLength={4}
                value={cvv}
                onChange={e => { setCvv(e.target.value.replace(/\D/g, '')); setErrors(p => ({ ...p, cvv: '' })); }}
                style={{ ...inputStyle, borderColor: errors.cvv ? '#ef4444' : '#e5e7eb' }}
              />
              {errors.cvv && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.cvv}</p>}
            </div>
          </div>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: 13, color: '#374151' }}>
            <input type="checkbox" checked={isDefault} onChange={e => setIsDefault(e.target.checked)} style={{ width: 15, height: 15 }} />
            Establecer como método de pago predeterminado
          </label>

        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', background: 'white', color: '#374151', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button onClick={handleSave} style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer' }}>
            Guardar tarjeta
          </button>
        </div>
      </div>
    </div>
  );
};
