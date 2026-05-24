import React from 'react';
import { motion } from 'framer-motion';
import { UserAvatar } from '../../UserAvatar';
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
  onToggleStatus: (userId: number) => void;
}

export const UserRow: React.FC<Props> = ({ user, onToggleStatus }) => (
  <motion.tr
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.2 }}
    style={{ borderBottom: '1px solid #f3f4f6', background: 'white' }}
  >
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <motion.span 
          animate={{ color: user.status === 'Activo' ? '#16a34a' : '#9ca3af' }}
          style={{ fontSize: 13, fontWeight: 700, width: 60 }}
        >
          {user.status}
        </motion.span>
        <div 
          onClick={() => onToggleStatus(user.id)}
          style={{
            position: 'relative',
            width: 44,
            height: 22,
            backgroundColor: user.status === 'Activo' ? '#22c55e' : '#cbd5e1',
            borderRadius: 20,
            cursor: 'pointer',
            padding: 2,
            transition: 'background-color 0.3s ease',
            boxShadow: user.status === 'Activo' ? '0 0 12px rgba(34,197,94,0.3)' : 'none'
          }}
        >
          <motion.div
            animate={{ x: user.status === 'Activo' ? 22 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              width: 18,
              height: 18,
              backgroundColor: 'white',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </div>
    </td>
    <td style={{ padding: '14px 24px' }}>
      <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>{user.lastAccessLabel}</p>
      <p style={{ margin: 0, fontSize: 12, color: '#9ca3af' }}>{user.lastAccessDate}</p>
    </td>
  </motion.tr>
);
