import React from 'react';

interface Props {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const FilterTab: React.FC<Props> = ({ label, icon, active = false, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '7px 16px',
      borderRadius: 999,
      border: active ? 'none' : '1px solid #e5e7eb',
      backgroundColor: active ? '#3b82f6' : 'white',
      color: active ? 'white' : '#6b7280',
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer',
    }}
  >
    {icon}
    {label}
  </button>
);
