import { useState } from 'react';
import { X, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { usePasswordStrength, STRENGTH_CONFIG } from '@/hooks/usePasswordStrength';

interface Props {
  onClose: () => void;
  onSave: (user: NewUserFormData) => Promise<void> | void;
}

export interface NewUserFormData {
  name: string;
  email: string;
  password: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #e5e7eb',
  borderRadius: 10,
  padding: '10px 12px',
  fontSize: 13,
  color: '#1f2937',
  background: 'white',
  outline: 'none',
  boxSizing: 'border-box',
};

export const NewUserModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitError, setSubmitError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { results, level, isValid } = usePasswordStrength(password);
  const strength = STRENGTH_CONFIG[level];

  const validate = () => {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = 'El nombre es requerido';
    if (!email.trim()) e.email = 'El correo es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Correo invalido';
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length > 0 || !isValid) {
      setErrors(e);
      return;
    }

    setIsSaving(true);
    setSubmitError('');
    try {
      await onSave({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      onClose();
    } catch (error) {
      console.error('[NewUserModal] error al crear usuario:', error);
      setSubmitError(error instanceof Error ? error.message : 'No se pudo crear el usuario');
    } finally {
      setIsSaving(false);
    }
  };

  const canSubmit = isValid && Boolean(name.trim()) && Boolean(email.trim()) && !isSaving;

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
      onClick={() => {
        if (!isSaving) onClose();
      }}
    >
      <div
        style={{ background: 'white', borderRadius: 16, padding: 28, width: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: 20 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ padding: 8, background: '#eff6ff', borderRadius: 10 }}>
              <ShieldCheck size={20} color="#3b82f6" />
            </div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Crear Nuevo Usuario</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            style={{ border: 'none', background: 'none', cursor: isSaving ? 'not-allowed' : 'pointer', color: '#6b7280', display: 'flex', opacity: isSaving ? 0.7 : 1 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Nombre completo</label>
            <input
              type="text"
              placeholder="Ej. Juan Perez Garcia"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
              style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : '#e5e7eb' }}
            />
            {errors.name && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.name}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Correo electronico</label>
            <input
              type="email"
              placeholder="usuario@empresa.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
              style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : '#e5e7eb' }}
            />
            {errors.email && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.email}</p>}
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Contrasena temporal</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 caracteres"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingRight: 40 }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {password.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', gap: 4, height: 4, marginBottom: 6 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} style={{ flex: 1, borderRadius: 2, background: s <= strength.segments ? strength.color : '#f3f4f6', transition: '0.3s' }} />
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {results.map(rule => (
                    <div key={rule.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: rule.passed ? '#16a34a' : '#9ca3af' }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: rule.passed ? '#16a34a' : '#cbd5e1' }} />
                      {rule.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {submitError && <p style={{ margin: 0, fontSize: 12, color: '#ef4444' }}>{submitError}</p>}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
          <button
            onClick={onClose}
            disabled={isSaving}
            style={{ padding: '10px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', background: 'white', color: '#374151', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!canSubmit}
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              border: 'none',
              background: canSubmit ? '#3b82f6' : '#cbd5e1',
              color: 'white',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: '0.3s',
            }}
          >
            {isSaving ? 'Creando...' : 'Crear Usuario'}
          </button>
        </div>
      </div>
    </div>
  );
};
