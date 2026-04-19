import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

export const PasswordInput: React.FC<Props> = ({ label, placeholder, value, onChange, error }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%', padding: '11px 42px 11px 14px',
            borderRadius: 10, border: error ? '1px solid #ef4444' : 'none',
            background: '#eff6ff', fontSize: 14, color: '#374151',
            outline: 'none', boxSizing: 'border-box',
          }}
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{error}</p>}
    </div>
  );
};
