import React from 'react';
import { MapPin, User, Users } from 'lucide-react';

export type Role = 'Administrador' | 'Gerente' | 'Director';

interface Props {
  role: Role;
}

const config: Record<Role, { bg: string; color: string; icon: React.ReactNode }> = {
  Administrador: { bg: '#fee2e2', color: '#ef4444', icon: <MapPin size={11} /> },
  Gerente:       { bg: '#dbeafe', color: '#3b82f6', icon: <User size={11} /> },
  Director:      { bg: '#ede9fe', color: '#7c3aed', icon: <Users size={11} /> },
};

export const RoleBadge: React.FC<Props> = ({ role }) => {
  const { bg, color, icon } = config[role];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 10px',
        borderRadius: 999,
        backgroundColor: bg,
        color,
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      {icon}
      {role}
    </span>
  );
};
