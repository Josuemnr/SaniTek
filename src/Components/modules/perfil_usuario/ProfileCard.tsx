import { Camera } from 'lucide-react';

interface Props {
  name: string;
  email: string;
  onChangeImage: () => void;
}

export const ProfileCard: React.FC<Props> = ({ name, email, onChangeImage }) => (
  <div style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)', borderRadius: 16, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 22 }}>

    {/* Avatar + camera button */}
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{
        width: 84, height: 84, borderRadius: '50%',
        background: 'linear-gradient(135deg, #a8c5da 0%, #7b9ab3 50%, #8fad9e 100%)',
        border: '3px solid white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
      }} />
      <button
        onClick={onChangeImage}
        style={{ position: 'absolute', bottom: 1, right: 1, width: 26, height: 26, borderRadius: '50%', background: '#3b82f6', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        <Camera size={12} color="white" />
      </button>
    </div>

    <div> 
      <h2 style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 700, color: '#1e3a5f' }}>{name}</h2>
      <p style={{ margin: '0 0 14px', fontSize: 13, color: '#64748b' }}>{email}</p>
      <button
        onClick={onChangeImage}
        style={{ padding: '7px 18px', borderRadius: 8, border: '1px solid #cbd5e1', background: 'white', fontSize: 13, color: '#374151', cursor: 'pointer', fontWeight: 500 }}
      >
        Cambiar imagen
      </button>
    </div>

  </div>
);
