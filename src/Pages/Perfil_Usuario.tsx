import { useState } from 'react';
import { User, Shield, Check, Bell } from 'lucide-react';
import { ProfileCard } from '../Components/modules/perfil_usuario/ProfileCard';
import { PasswordInput } from '../Components/modules/perfil_usuario/PasswordInput';
import { UserAvatar } from '../Components/UserAvatar';
import { validatePasswordStrict } from '@/hooks/usePasswordStrength';
import { useAuth } from '@/Context/AuthContext';

const sectionCard: React.CSSProperties = {
  background: 'white', borderRadius: 16,
  border: '1px solid #e5e7eb',
  padding: '24px 28px',
  display: 'flex', flexDirection: 'column', gap: 20,
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  border: 'none', background: '#eff6ff',
  fontSize: 14, color: '#374151', outline: 'none', boxSizing: 'border-box',
};

export default function PerfilUsuario() {
  const { user } = useAuth();
  // info personal
  const [name,  setName]  = useState(user?.displayName ?? 'Usuario SaniTek');
  const [email, setEmail] = useState(user?.email ?? '');

  // Password
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd,      setNewPwd]     = useState('');
  const [confirmPwd,  setConfirmPwd] = useState('');
  const [pwdErrors,   setPwdErrors]  = useState<Record<string, string>>({});
  const [pwdSuccess,  setPwdSuccess] = useState(false);

  const validatePassword = () => {
    const e: Record<string, string> = {};
    if (!currentPwd) e.current = 'Ingresa tu contraseña actual';
    const ruleError = validatePasswordStrict(newPwd);
    if (ruleError) e.new = ruleError;
    if (newPwd !== confirmPwd) e.confirm = 'Las contraseñas no coinciden';
    return e;
  };

  const handleUpdatePassword = () => {
    const e = validatePassword();
    if (Object.keys(e).length > 0) { setPwdErrors(e); return; }
    setPwdErrors({});
    setPwdSuccess(true);
    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
    setTimeout(() => setPwdSuccess(false), 3000);
  };

  const handleSave = () => {
    // conectar despues al back
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f8fafc]">
      {/* Content */}
      <div className="max-w-[720px] mx-auto py-8 px-6 flex flex-col gap-5">

        {/* Profile card */}
        <ProfileCard
          name={name}
          email={email}
        />

        {/* Datos Personales */}
        <div style={sectionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={18} color="#3b82f6" />
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Datos Personales</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Seguridad */}
        <div style={sectionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Shield size={18} color="#3b82f6" />
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Seguridad</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <PasswordInput
              label="Contraseña Actual"
              placeholder="Ingresa tu contraseña actual"
              value={currentPwd}
              onChange={setCurrentPwd}
              error={pwdErrors.current}
            />
            <PasswordInput
              label="Nueva Contraseña"
              placeholder="Ingresa tu nueva contraseña"
              value={newPwd}
              onChange={setNewPwd}
              error={pwdErrors.new}
              showStrength
            />
            <PasswordInput
              label="Confirmar Nueva Contraseña"
              placeholder="Confirma tu nueva contraseña"
              value={confirmPwd}
              onChange={setConfirmPwd}
              error={pwdErrors.confirm}
            />
          </div>

          {/* button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {pwdSuccess && (
              <span style={{ fontSize: 13, color: '#16a34a', marginRight: 16, alignSelf: 'center' }}>
                ✓ Contraseña actualizada
              </span>
            )}
            <button
              onClick={handleUpdatePassword}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#3b82f6', color: 'white', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              <Check size={15} strokeWidth={2.5} />
              Actualizar
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingBottom: 16 }}>
          <button
            style={{ padding: '10px 24px', borderRadius: 10, border: '1px solid #e5e7eb', background: 'white', color: '#374151', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: '#3b82f6', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            Guardar Cambios
          </button>
        </div>

      </div>
    </div>
  );
}
