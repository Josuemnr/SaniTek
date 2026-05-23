import { PaymentStatusBadge } from './PaymentStatusBadge';
import type { PaymentStatus } from './PaymentStatusBadge';

export interface PaymentRecord {
  id: number;
  date: string;
  description: string;
  status: PaymentStatus;
  amount: number;
}

interface Props {
  records: PaymentRecord[];
}

export const PaymentHistoryTable: React.FC<Props> = ({ records }) => (
  <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid #f3f4f6', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
          {(['Fecha', 'Descripción', 'Estado', 'Monto'] as const).map(col => (
            <th key={col} style={{ padding: '14px 24px', textAlign: col === 'Monto' ? 'right' : 'left', fontSize: 13, fontWeight: 500, color: '#6b7280' }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map(r => (
          <tr key={r.id} style={{ borderBottom: '1px solid #f9fafb' }}>
            <td style={{ padding: '14px 24px', fontSize: 14, color: '#374151' }}>{r.date}</td>
            <td style={{ padding: '14px 24px', fontSize: 14, color: '#374151' }}>{r.description}</td>
            <td style={{ padding: '14px 24px' }}>
              <PaymentStatusBadge status={r.status} />
            </td>
            <td style={{ padding: '14px 24px', fontSize: 14, fontWeight: 600, color: '#1e293b', textAlign: 'right' }}>
              ${r.amount.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
