import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  current: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const PaginationBar: React.FC<Props> = ({ current, totalPages, totalItems, itemsPerPage, onPageChange }) => {
  const from = (current - 1) * itemsPerPage + 1;
  const to = Math.min(current * itemsPerPage, totalItems);

  const btnBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32, borderRadius: 8,
    border: '1px solid #e5e7eb', background: 'white',
    cursor: 'pointer', color: '#6b7280',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderTop: '1px solid #f3f4f6' }}>
      <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
        Mostrando {from}-{to} de {totalItems} usuarios
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={() => onPageChange(current - 1)} disabled={current === 1} style={{ ...btnBase, opacity: current === 1 ? 0.4 : 1 }}>
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              width: 32, height: 32, borderRadius: 8,
              border: 'none',
              background: page === current ? '#3b82f6' : 'transparent',
              color: page === current ? 'white' : '#6b7280',
              fontSize: 13, fontWeight: page === current ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        ))}
        <button onClick={() => onPageChange(current + 1)} disabled={current === totalPages} style={{ ...btnBase, opacity: current === totalPages ? 0.4 : 1 }}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
