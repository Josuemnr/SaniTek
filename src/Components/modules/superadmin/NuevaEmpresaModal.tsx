import { useState } from 'react';
import { X, Building2, Eye, EyeOff } from 'lucide-react';
import type { Empresa } from './EmpresaRow';
import { STRENGTH_CONFIG, usePasswordStrength } from '@/hooks/usePasswordStrength';

export interface NuevaEmpresaFormData extends Omit<Empresa, 'id' | 'suscrita'> {
  password: string;
}

interface NuevaEmpresaModalProps {
  onClose: () => void;
  onSave: (data: NuevaEmpresaFormData) => Promise<void> | void;
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
  const [isSaving,      setIsSaving]      = useState(false);
  const [submitError,   setSubmitError]   = useState('');
  const { results, level, isValid } = usePasswordStrength(password);
  const strength = STRENGTH_CONFIG[level];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!nombreEmpresa.trim()) e.nombreEmpresa = 'Requerido';
    if (!nombreAdmin.trim())   e.nombreAdmin   = 'Requerido';
    if (!correoAdmin.trim() || !correoAdmin.includes('@')) e.correoAdmin = 'Correo invalido';
    if (!isValid)              e.password      = 'La contrasena no cumple los requisitos';
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setSubmitError('');
      return;
    }

    setIsSaving(true);
    setSubmitError('');
    try {
      await onSave({
        nombre: nombreEmpresa.trim(),
        nombreAdmin: nombreAdmin.trim(),
        correoAdmin: correoAdmin.trim(),
        password,
      });
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No se pudo crear la empresa.';
      setSubmitError(message);
    } finally {
      setIsSaving(false);
    }
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
          <button onClick={onClose} disabled={isSaving} style={{ border: 'none', background: '#f3f4f6', borderRadius: 8, padding: 6, cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex' }}>
            <X size={16} color="#6b7280" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Empresa</p>
          {field('Nombre de la empresa', 'nombreEmpresa', nombreEmpresa, setNombreEmpresa, { placeholder: 'Ej. Grupo Industrial S.A.' })}

          <p style={{ margin: '4px 0 4px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Administrador</p>
          {field('Nombre completo', 'nombreAdmin', nombreAdmin, setNombreAdmin, { placeholder: 'Ej. Maria Garcia Lopez' })}
          {field('Correo electronico', 'correoAdmin', correoAdmin, setCorreoAdmin, { placeholder: 'admin@empresa.com', type: 'email' })}

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Contrasena temporal</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: '' }));
                }}
                placeholder="Min. 8 caracteres"
                style={{ ...inputStyle, paddingRight: 40, borderColor: errors.password ? '#ef4444' : '#e5e7eb' }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}
              >
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.password}</p>}
            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', gap: 4, height: 4, marginBottom: 10 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} style={{ flex: 1, borderRadius: 2, background: s <= strength.segments ? strength.color : '#f3f4f6', transition: '0.3s' }} />
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {results.map(rule => (
                  <div key={rule.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 10, lineHeight: 1.35, color: rule.passed ? '#16a34a' : '#9ca3af' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: rule.passed ? '#16a34a' : '#cbd5e1', marginTop: 4, flexShrink: 0 }} />
                    {rule.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {submitError && <p style={{ margin: 0, fontSize: 12, color: '#ef4444' }}>{submitError}</p>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 28 }}>
          <button
            onClick={onClose}
            disabled={isSaving}
            style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e5e7eb', background: 'white', color: '#374151', fontSize: 13, fontWeight: 500, cursor: isSaving ? 'not-allowed' : 'pointer' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#6fa8f7', color: 'white', fontSize: 13, fontWeight: 600, cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1, boxShadow: '0 2px 8px rgba(99,162,247,0.4)' }}
          >
            {isSaving ? 'Creando...' : 'Crear empresa'}
          </button>
        </div>
      </div>
    </div>
  );
}
