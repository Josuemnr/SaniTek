import { Building2, Pencil } from 'lucide-react';

export interface Empresa {
  id: number;
  nombre: string;
  correoAdmin: string;
  nombreAdmin: string;
  suscrita: boolean;
}

interface EmpresaRowProps {
  empresa: Empresa;
  onEdit: (empresa: Empresa) => void;
}

export function EmpresaRow({ empresa, onEdit }: EmpresaRowProps) {
  return (
    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
      <td style={{ padding: '14px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg, #B7D2FF 0%, #7baaf7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Building2 size={16} color="#1d4ed8" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#111827' }}>{empresa.nombre}</p>
            <p style={{ margin: 0, fontSize: 11, color: '#6b7280' }}>{empresa.nombreAdmin}</p>
          </div>
        </div>
      </td>
      <td style={{ padding: '14px 24px', fontSize: 13, color: '#374151' }}>{empresa.correoAdmin}</td>
      <td style={{ padding: '14px 24px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
          background: empresa.suscrita ? '#dcfce7' : '#f3f4f6',
          color: empresa.suscrita ? '#16a34a' : '#9ca3af',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: empresa.suscrita ? '#16a34a' : '#d1d5db' }} />
          {empresa.suscrita ? 'Suscrita' : 'Sin suscripción'}
        </span>
      </td>
      <td style={{ padding: '14px 24px' }}>
        <button
          onClick={() => onEdit(empresa)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: 'white', color: '#374151', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
        >
          <Pencil size={13} />
          Editar
        </button>
      </td>
    </tr>
  );
}
