import { useState } from 'react';
import { X } from 'lucide-react';
import type { User } from './UserRow';
import type { Role } from './RoleBadge';

interface Props {
  onClose: () => void;
  onSave: (user: Omit<User, 'id'>) => void;
}

const ROLES: Role[] = ['Administrador', 'Gerente', 'Director'];
const AVATAR_COLORS = ['#ef4444', '#f97316', '#ec4899', '#6366f1', '#10b981', '#3b82f6', '#8b5cf6'];

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
  const [role, setRole] = useState<Role>('Gerente');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = 'El nombre es requerido';
    if (!email.trim()) e.email = 'El correo es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Correo inválido';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    const now = new Date();
    const dateStr = now.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
      + ', ' + now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

    onSave({
      name: name.trim(),
      email: email.trim(),
      role,
      status: 'Activo',
      lastAccessLabel: 'Recién creado',
      lastAccessDate: dateStr,
      avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    });
    onClose();
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
      onClick={onClose}
    >
      <div
        style={{ background: 'white', borderRadius: 16, padding: 28, width: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: 20 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#111827' }}>Nuevo Usuario</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Nombre completo</label>
            <input
              type="text"
              placeholder="Ej. Juan Pérez García"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
              style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : '#e5e7eb' }}
            />
            {errors.name && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.name}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Correo electrónico</label>
            <input
              type="email"
              placeholder="usuario@empresa.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
              style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : '#e5e7eb' }}
            />
            {errors.email && <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ef4444' }}>{errors.email}</p>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 }}>Rol</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as Role)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: '1px solid #e5e7eb', background: 'white', color: '#374151', cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            style={{ padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer' }}
          >
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
};
