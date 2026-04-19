import { Check } from 'lucide-react';

interface Props {
  text: string;
}

export const PlanFeatureItem: React.FC<Props> = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#374151' }}>
    <Check size={14} strokeWidth={2.5} style={{ color: '#3b82f6', flexShrink: 0 }} />
    {text}
  </div>
);
