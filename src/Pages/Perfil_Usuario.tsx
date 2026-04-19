import { useState } from 'react';
import { User, Shield, Info, Check, Bell } from 'lucide-react';
import { Sidebar } from '../Components/Sidebar';
import { ProfileCard } from '../Components/ProfileCard';
import { PasswordInput } from '../Components/PasswordInput';
import { UserAvatar } from '../Components/UserAvatar';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  border: 'none', background: '#eff6ff',
  fontSize: 14, color: '#374151', outline: 'none', boxSizing: 'border-box',
};

const sectionCard: React.CSSProperties = {
  background: 'white', borderRadius: 16,
  border: '1px solid #e5e7eb',
  padding: '24px 28px',
  display: 'flex', flexDirection: 'column', gap: 20,
};

export default function PerfilUsuario() {
  // info personal
  const [name,  setName]  = useState('Josué Monroy Larios');
  const [email, setEmail] = useState('josue.monroy@sanitek.com');

  // Password
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd,      setNewPwd]     = useState('');
  const [confirmPwd,  setConfirmPwd] = useState('');
  const [pwdErrors,   setPwdErrors]  = useState<Record<string, string>>({});
  const [pwdSuccess,  setPwdSuccess] = useState(false);

  const validatePassword = () => {
    const e: Record<string, string> = {};
    if (!currentPwd) e.current = 'Ingresa tu contraseña actual';
    if (newPwd.length < 8 || !/[A-Z]/.test(newPwd) || !/[a-z]/.test(newPwd) || !/\d/.test(newPwd))
      e.new = 'Mínimo 8 caracteres, mayúscula, minúscula y número';
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
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Sidebar />
    <div style={{ flex: 1, background: '#f8fafc', boxSizing: 'border-box' }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', borderBottom: '1px solid #e5e7eb', background: 'white' }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#111827' }}>Configuración de Perfil</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', position: 'relative' }}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#ef4444', border: '1.5px solid white' }} />
          </button>
          <UserAvatar name="Josué Monroy" bgColor="#7b9ab3" size="sm" />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Profile card */}
        <ProfileCard
          name="Josué Monroy"
          email="josue.monroy@sanitek.com"
          onChangeImage={() => {}}
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
            />
            <PasswordInput
              label="Confirmar Nueva Contraseña"
              placeholder="Confirma tu nueva contraseña"
              value={confirmPwd}
              onChange={setConfirmPwd}
              error={pwdErrors.confirm}
            />
          </div>

          {/* Info box */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#dbeafe', borderRadius: 10, padding: '12px 14px' }}>
            <Info size={15} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ margin: 0, fontSize: 13, color: '#1e40af' }}>
              La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números.
            </p>
          </div>

          {/*  button */}
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
    </div>
  );
}
