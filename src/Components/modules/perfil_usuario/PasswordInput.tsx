import { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import {
  usePasswordStrength,
  STRENGTH_CONFIG,
  PASSWORD_RULES,
} from '@/hooks/usePasswordStrength';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  /** Muestra el medidor de fortaleza y el checklist de reglas */
  showStrength?: boolean;
}

export const PasswordInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  showStrength = false,
}) => {
  const [show, setShow] = useState(false);
  const { results, level } = usePasswordStrength(value);
  const cfg = STRENGTH_CONFIG[level];

  const showMeter = showStrength;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

      {/* Label */}
      <label style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>
        {label}
      </label>

      {/* Input */}
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '11px 42px 11px 14px',
            borderRadius: 10,
            border: error
              ? '1.5px solid #ef4444'
              : showMeter && level === 'fuerte'
                ? '1.5px solid #22c55e'
                : 'none',
            background: '#eff6ff',
            fontSize: 14,
            color: '#374151',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          style={{
            position: 'absolute', right: 12, top: '50%',
            transform: 'translateY(-50%)',
            border: 'none', background: 'none',
            cursor: 'pointer', color: '#9ca3af',
            display: 'flex', alignItems: 'center',
          }}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p style={{ margin: 0, fontSize: 11, color: '#ef4444' }}>{error}</p>
      )}

      {/* ── Medidor de fortaleza ──────────────────────── */}
      {showStrength && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>

          {/* Barra de segmentos */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 3, flex: 1 }}>
              {PASSWORD_RULES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 99,
                    background: i < cfg.segments ? cfg.color : '#e5e7eb',
                    transition: 'background 0.3s ease',
                  }}
                />
              ))}
            </div>
            {cfg.label && (
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: cfg.color,
                whiteSpace: 'nowrap',
                minWidth: 72,
                textAlign: 'right',
              }}>
                {cfg.label}
              </span>
            )}
          </div>

          {/* Checklist de reglas */}
          <div style={{
            background: '#f8fafc',
            borderRadius: 10,
            border: '1px solid #e5e7eb',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}>
            {results.map(rule => (
              <div
                key={rule.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: 12,
                  color: rule.passed ? '#16a34a' : '#6b7280',
                  transition: 'color 0.2s',
                }}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: rule.passed ? '#dcfce7' : '#f3f4f6',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}>
                  {rule.passed
                    ? <Check size={10} strokeWidth={3} color="#16a34a" />
                    : <X size={10}     strokeWidth={3} color="#9ca3af" />
                  }
                </span>
                {rule.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
