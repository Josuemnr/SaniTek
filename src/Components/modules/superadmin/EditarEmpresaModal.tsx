import { useState } from 'react';
import { X, Building2 } from 'lucide-react';
import type { Empresa } from './EmpresaRow';

interface EditarEmpresaModalProps {
  empresa: Empresa;
  onClose: () => void;
  onSave: (updated: Empresa) => Promise<void> | void;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 10,
  border: '1px solid #e5e7eb', background: '#f9fafb',
  fontSize: 13, color: '#374151', outline: 'none', boxSizing: 'border-box',
};

export function EditarEmpresaModal({ empresa, onClose, onSave }: EditarEmpresaModalProps) {
  const [nombre]                     = useState(empresa.nombre);
  const [nombreAdmin, setNombreAdmin] = useState(empresa.nombreAdmin);
  const [correoAdmin, setCorreoAdmin] = useState(empresa.correoAdmin);
  const [errors,      setErrors]      = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSaving,    setIsSaving]    = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!nombre.trim())      e.nombre      = 'Requerido';
    if (!nombreAdmin.trim()) e.nombreAdmin = 'Requerido';
    if (!correoAdmin.trim() || !correoAdmin.includes('@')) e.correoAdmin = 'Correo invalido';
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setIsSaving(true);
    setSubmitError('');
    try {
      await onSave({ ...empresa, nombre: nombre.trim(), nombreAdmin: nombreAdmin.trim(), correoAdmin: correoAdmin.trim() });
      onClose();
    } catch (error) {
      console.error('[EditarEmpresaModal] error al guardar administrador:', error);
      setSubmitError(error instanceof Error ? error.message : 'No se pudieron guardar los cambios');
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#DEEBFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={18} color="#1d4ed8" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Editar Empresa</h2>
              <p style={{ margin: 0, fontSize: 11, color: '#6b7280' }}>{empresa.nombre}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            style={{ border: 'none', background: '#f3f4f6', borderRadius: 8, padding: 6, cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex', opacity: isSaving ? 0.7 : 1 }}
          >
            <X size={16} color="#6b7280" />
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: '4px 0 4px', fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Administrador</p>
          {field('Nombre completo', 'nombreAdmin', nombreAdmin, setNombreAdmin)}
          {field('Correo electronico', 'correoAdmin', correoAdmin, setCorreoAdmin, { type: 'email' })}
          {submitError && <p style={{ margin: 0, fontSize: 12, color: '#ef4444' }}>{submitError}</p>}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 28 }}>
          <button
            onClick={onClose}
            disabled={isSaving}
            style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid #e5e7eb', background: 'white', color: '#374151', fontSize: 13, fontWeight: 500, cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: '#6fa8f7', color: 'white', fontSize: 13, fontWeight: 600, cursor: isSaving ? 'not-allowed' : 'pointer', boxShadow: '0 2px 8px rgba(99,162,247,0.4)', opacity: isSaving ? 0.8 : 1 }}
          >
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}
