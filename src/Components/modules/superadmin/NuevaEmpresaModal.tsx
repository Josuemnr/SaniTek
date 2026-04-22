import { useState } from 'react';
import { X, Building2, Eye, EyeOff } from 'lucide-react';
import type { Empresa } from './EmpresaRow';

interface NuevaEmpresaModalProps {
  onClose: () => void;
  onSave: (data: Omit<Empresa, 'id' | 'suscrita'>) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 10,
  border: '1px solid #e5e7eb', background: '#f9fafb',
  fontSize: 13, color: '#374151', outline: 'none', boxSizing: 'border-box',
};

export function NuevaEmpresaModal({ onClose, onSave }: NuevaEmpresaModalProps) {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nombreAdmin,   setNombreAdmin]   = useState('');
  const [correoAdmin,   setCorreoAdmin]   = useState('');
  const [password,      setPassword]      = useState('');
  const [showPwd,       setShowPwd]       = useState(false);
  const [errors,        setErrors]        = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!nombreEmpresa.trim()) e.nombreEmpresa = 'Requerido';
    if (!nombreAdmin.trim())   e.nombreAdmin   = 'Requerido';
    if (!correoAdmin.trim() || !correoAdmin.includes('@')) e.correoAdmin = 'Correo inválido';
    if (password.length < 6)   e.password      = 'Mínimo 6 caracteres';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSave({ nombre: nombreEmpresa.trim(), nombreAdmin: nombreAdmin.trim(), correoAdmin: correoAdmin.trim() });
    onClose();
  };

  const field = (label: string, key: string, value: string, onChange: (v: string) => void, extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 6 }}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} style={{ ...inputStyle, borderColor: errors[key] ? '#ef4444' : '#e5e7eb' }} {...extra} />
      {errors[key] && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors[key]}</p>}
    </div>
  );

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ background: 'white', borderRadius: 16, padding: '28px 32px', width: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#DEEBFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={18} color="#1d4ed8" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Nueva Empresa</h2>
              <p style={{ margin: 0, fontSize: 11, color: '#6b7280' }}>Registrar empresa y crear admin</p>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: '#f3f4f6', borderRadius: 8, padding: 6, cursor: 'pointer', display: 'flex' }}>
            <X size={16} color="#6b7280" />
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Empresa</p>
          {field('Nombre de la empresa', 'nombreEmpresa', nombreEmpresa, setNombreEmpresa, { placeholder: 'Ej. Grupo Industrial S.A.' })}

          <p style={{ margin: '4px 0 4px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Administrador</p>
          {field('Nombre completo', 'nombreAdmin', nombreAdmin, setNombreAdmin, { placeholder: 'Ej. María García López' })}
          {field('Correo electrónico', 'correoAdmin', correoAdmin, setCorreoAdmin, { placeholder: 'admin@empresa.com', type: 'email' })}

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Contraseña temporal</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                style={{ ...inputStyle, paddingRight: 40, borderColor: errors.password ? '#ef4444' : '#e5e7eb' }}
              />
              <button
                onClick={() => setShowPwd(v => !v)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}
              >
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.password}</p>}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 28 }}>
          <button
            onClick={onClose}
            style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e5e7eb', background: 'white', color: '#374151', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#6fa8f7', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,162,247,0.4)' }}
          >
            Crear empresa
          </button>
        </div>
      </div>
    </div>
  );
}
