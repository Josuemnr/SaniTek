import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { UserAvatar } from '../../UserAvatar';
import type { User } from './UserRow';

interface Props {
  user: User | null;
  onClose: () => void;
}

const ROLES = ['Administrador', 'Gerente', 'Director'] as const;

const MODULES_BY_ROLE: Record<string, string[]> = {
  Administrador: ['MODULO 1', 'MODULO 2'],
  Gerente:       ['MODULO 1', 'MODULO 3'],
  Director:      ['MODULO 1', 'MODULO 2', 'MODULO 3'],
};

export const EditUserPanel: React.FC<Props> = ({ user, onClose }) => {
  const [selectedRole, setSelectedRole] = useState(user?.role ?? 'Administrador');

  useEffect(() => {
    if (user) setSelectedRole(user.role);
  }, [user]);

  if (!user) return null;

  const modules = MODULES_BY_ROLE[selectedRole] ?? [];

  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        background: 'white',
        borderRadius: 16,
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#1f2937' }}>Editar Usuario</h3>
        <button
          onClick={onClose}
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center', padding: 4 }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Avatar + info */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 20px', borderBottom: '1px solid #f3f4f6', gap: 6 }}>
        <UserAvatar name={user.name} bgColor={user.avatarColor} size="lg" />
        <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#1f2937', marginTop: 6 }}>{user.name}</p>
        <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>{user.email}</p>
      </div>

      {/* Role selector */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
        <label style={{ display: 'block', fontSize: 12, color: '#6b7280', marginBottom: 8 }}>Rol del Usuario</label>
        <div style={{ position: 'relative' }}>
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value as typeof ROLES[number])}
            style={{
              width: '100%',
              appearance: 'none',
              border: '1px solid #e5e7eb',
              borderRadius: 10,
              padding: '10px 36px 10px 12px',
              fontSize: 13,
              color: '#1f2937',
              background: 'white',
              cursor: 'pointer',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          >
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <ChevronDown size={16} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Modules */}
      <div style={{ padding: '16px 20px' }}>
        <p style={{ margin: '0 0 12px', fontSize: 12, color: '#6b7280' }}>Accesos a :</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {modules.map(mod => (
            <p key={mod} style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#1f2937' }}>{mod}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
