import { AlertTriangle, X } from 'lucide-react';

interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal: React.FC<Props> = ({ title, message, confirmLabel = 'Eliminar', onConfirm, onClose }) => (
  <div
    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
    onClick={onClose}
  >
    <div
      style={{ background: 'white', borderRadius: 16, padding: 28, width: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: 20 }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={18} color="#dc2626" />
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#111827' }}>{title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{message}</p>
          </div>
        </div>
        <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', flexShrink: 0 }}>
          <X size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button
          onClick={onClose}
          style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', background: 'white', color: '#374151', cursor: 'pointer' }}
        >
          Cancelar
        </button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: 'none', background: '#dc2626', color: 'white', cursor: 'pointer' }}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);
