import { useEffect, useState } from 'react';
import { User, Shield, Check } from 'lucide-react';
import { ProfileCard } from '../Components/modules/perfil_usuario/ProfileCard';
import { PasswordInput } from '../Components/modules/perfil_usuario/PasswordInput';
import { validatePasswordStrict } from '@/hooks/usePasswordStrength';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/Services/backendApi';
import { changeCurrentUserPassword, updateStoredAuthUser } from '@/Services/authService';
import { toast } from 'sonner';

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

  const [name, setName] = useState(user?.displayName ?? 'Usuario SaniTek');
  const [email, setEmail] = useState(user?.email ?? '');
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [profileSaving, setProfileSaving] = useState(false);

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdErrors, setPwdErrors] = useState<Record<string, string>>({});
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [pwdSaving, setPwdSaving] = useState(false);

  useEffect(() => {
    setName(user?.displayName ?? 'Usuario SaniTek');
    setEmail(user?.email ?? '');
  }, [user]);

  const validatePassword = () => {
    const e: Record<string, string> = {};
    if (!currentPwd) e.current = 'Ingresa tu contrasena actual';
    const ruleError = validatePasswordStrict(newPwd);
    if (ruleError) e.new = ruleError;
    if (newPwd !== confirmPwd) e.confirm = 'Las contrasenas no coinciden';
    return e;
  };

  const handleUpdatePassword = async () => {
    const e = validatePassword();
    if (Object.keys(e).length > 0) { setPwdErrors(e); return; }
    if (!user?.email) {
      setPwdErrors({ current: 'No se encontro el correo del usuario' });
      return;
    }

    setPwdSaving(true);
    setPwdErrors({});
    setPwdSuccess(false);
    try {
      await changeCurrentUserPassword(user.email, currentPwd, newPwd);
      setPwdSuccess(true);
      setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
      toast.success('Contrasena actualizada');
      setTimeout(() => setPwdSuccess(false), 3000);
    } catch (error) {
      console.error('[PerfilUsuario] error al cambiar contrasena:', error);
      setPwdErrors({ current: passwordErrorMessage(error) });
    } finally {
      setPwdSaving(false);
    }
  };

  const validateProfile = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Ingresa tu nombre';
    if (!email.trim()) e.email = 'Ingresa tu correo';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Correo invalido';
    return e;
  };

  const handleSave = async () => {
    const e = validateProfile();
    if (Object.keys(e).length > 0) {
      setProfileErrors(e);
      return;
    }

    setProfileSaving(true);
    setProfileErrors({});
    try {
      const updated = await api.me.update({
        names: name.trim(),
        email: email.trim(),
      });

      updateStoredAuthUser(updated);
      setName(updated.names ?? updated.email);
      setEmail(updated.email);
      toast.success('Perfil actualizado');
    } catch (error) {
      console.error('[PerfilUsuario] error al actualizar perfil:', error);
      toast.error(error instanceof Error ? error.message : 'No se pudo actualizar el perfil');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleCancelProfile = () => {
    setName(user?.displayName ?? 'Usuario SaniTek');
    setEmail(user?.email ?? '');
    setProfileErrors({});
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f8fafc]">
      <div className="max-w-[720px] mx-auto py-8 px-6 flex flex-col gap-5">
        <ProfileCard
          name={name}
          email={email}
        />

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
                onChange={e => {
                  setName(e.target.value);
                  setProfileErrors(prev => ({ ...prev, name: '' }));
                }}
                style={{ ...inputStyle, border: profileErrors.name ? '1px solid #ef4444' : 'none' }}
              />
              {profileErrors.name && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{profileErrors.name}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Correo Electronico</label>
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setProfileErrors(prev => ({ ...prev, email: '' }));
                }}
                style={{ ...inputStyle, border: profileErrors.email ? '1px solid #ef4444' : 'none' }}
              />
              {profileErrors.email && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{profileErrors.email}</p>}
            </div>
          </div>
        </div>

        <div style={sectionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Shield size={18} color="#3b82f6" />
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Seguridad</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <PasswordInput
              label="Contrasena Actual"
              placeholder="Ingresa tu contrasena actual"
              value={currentPwd}
              onChange={setCurrentPwd}
              error={pwdErrors.current}
            />
            <PasswordInput
              label="Nueva Contrasena"
              placeholder="Ingresa tu nueva contrasena"
              value={newPwd}
              onChange={setNewPwd}
              error={pwdErrors.new}
              showStrength
            />
            <PasswordInput
              label="Confirmar Nueva Contrasena"
              placeholder="Confirma tu nueva contrasena"
              value={confirmPwd}
              onChange={setConfirmPwd}
              error={pwdErrors.confirm}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {pwdSuccess && (
              <span style={{ fontSize: 13, color: '#16a34a', marginRight: 16, alignSelf: 'center' }}>
                Contrasena actualizada
              </span>
            )}
            <button
              onClick={handleUpdatePassword}
              disabled={pwdSaving}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#3b82f6', color: 'white', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 13, fontWeight: 600, cursor: pwdSaving ? 'not-allowed' : 'pointer', opacity: pwdSaving ? 0.75 : 1 }}
            >
              <Check size={15} strokeWidth={2.5} />
              {pwdSaving ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingBottom: 16 }}>
          <button
            onClick={handleCancelProfile}
            disabled={profileSaving}
            style={{ padding: '10px 24px', borderRadius: 10, border: '1px solid #e5e7eb', background: 'white', color: '#374151', fontSize: 13, fontWeight: 500, cursor: profileSaving ? 'not-allowed' : 'pointer', opacity: profileSaving ? 0.7 : 1 }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={profileSaving}
            style={{ padding: '10px 24px', borderRadius: 10, border: 'none', background: '#3b82f6', color: 'white', fontSize: 13, fontWeight: 600, cursor: profileSaving ? 'not-allowed' : 'pointer', opacity: profileSaving ? 0.75 : 1 }}
          >
            {profileSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

function passwordErrorMessage(error: unknown) {
  const code = typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: string }).code)
    : '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'La contrasena actual no es correcta';
    case 'auth/weak-password':
      return 'La nueva contrasena es demasiado debil';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta mas tarde';
    case 'auth/network-request-failed':
      return 'No se pudo conectar con Firebase';
    default:
      return 'No se pudo actualizar la contrasena';
  }
}
