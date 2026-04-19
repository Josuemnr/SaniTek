import React from 'react';
import { Edit2, MoreVertical } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { RoleBadge } from './RoleBadge';
import type { Role } from './RoleBadge';

export type Status = 'Activo' | 'Inactivo';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  lastAccessLabel: string;
  lastAccessDate: string;
  avatarColor: string;
}

interface Props {
  user: User;
  onEdit: (user: User) => void;
}

export const UserRow: React.FC<Props> = ({ user, onEdit }) => (
  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
    <td style={{ padding: '14px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <UserAvatar name={user.name} bgColor={user.avatarColor} />
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: '#1f2937' }}>{user.name}</p>
          <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>{user.email}</p>
        </div>
      </div>
    </td>
    <td style={{ padding: '14px 24px' }}>
      <RoleBadge role={user.role} />
    </td>
    <td style={{ padding: '14px 24px' }}>
      <span style={{ fontSize: 14, color: user.status === 'Activo' ? '#374151' : '#9ca3af', fontWeight: 500 }}>
        {user.status}
      </span>
    </td>
    <td style={{ padding: '14px 24px' }}>
      <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>{user.lastAccessLabel}</p>
      <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>{user.lastAccessDate}</p>
    </td>
    <td style={{ padding: '14px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <button
          onClick={() => onEdit(user)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            border: 'none', background: 'none', cursor: 'pointer',
            color: '#3b82f6', fontSize: 13, fontWeight: 500,
            padding: '4px 8px', borderRadius: 6,
          }}
        >
          <Edit2 size={13} />
          Editar
        </button>
        <button
          style={{
            border: 'none', background: 'none', cursor: 'pointer',
            color: '#9ca3af', padding: 4, borderRadius: 6,
            display: 'flex', alignItems: 'center',
          }}
        >
          <MoreVertical size={16} />
        </button>
      </div>
    </td>
  </tr>
);
