import React, { useId } from 'react';

interface Props {
  label: string;
  placeholder: string;
  type?: "text" | "password";
  value: string;
  onChangeText: (text: string) => void;
}

export const CustomImput = ({ label, placeholder, type = "text", value, onChangeText }: Props) => {
  const id = useId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <label htmlFor={id} style={{ marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e0' }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        style={{
          height: '48px',
          width: '100%',
          borderRadius: '12px',
          border: '1px solid rgba(100, 140, 255, 0.3)',
          background: 'rgba(100, 130, 255, 0.18)',
          padding: '0 16px',
          color: 'white',
          fontSize: '0.95rem',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        onFocus={e => e.target.style.border = '1px solid rgba(100,160,255,0.7)'}
        onBlur={e => e.target.style.border = '1px solid rgba(100, 140, 255, 0.3)'}
      />
    </div>
  );
};