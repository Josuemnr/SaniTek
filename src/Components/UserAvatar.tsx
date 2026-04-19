import React from 'react';

interface Props {
  name: string;
  bgColor: string;
  size?: 'sm' | 'lg';
}

export const UserAvatar: React.FC<Props> = ({ name, bgColor, size = 'sm' }) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0].toUpperCase())
    .join('');

  const dim = size === 'lg' ? 72 : 40;
  const fontSize = size === 'lg' ? 24 : 14;

  return (
    <div
      style={{
        width: dim,
        height: dim,
        borderRadius: '50%',
        backgroundColor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
};
