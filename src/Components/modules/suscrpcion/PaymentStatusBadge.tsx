export type PaymentStatus = 'Pagado' | 'Pendiente' | 'Fallido';

const config: Record<PaymentStatus, string> = {
  Pagado:    '#16a34a',
  Pendiente: '#d97706',
  Fallido:   '#dc2626',
};

interface Props {
  status: PaymentStatus;
}

export const PaymentStatusBadge: React.FC<Props> = ({ status }) => (
  <span style={{ color: config[status], fontWeight: 600, fontSize: 13 }}>{status}</span>
);
