interface Props {
  name: string;
  email: string;
}

export const ProfileCard: React.FC<Props> = ({ name, email }) => (
  <div style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)', borderRadius: 16, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 22 }}>

    {/* Avatar */}
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{
        width: 84, height: 84, borderRadius: '50%',
        background: 'linear-gradient(135deg, #a8c5da 0%, #7b9ab3 50%, #8fad9e 100%)',
        border: '3px solid white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
      }} />
    </div>

    <div> 
      <h2 style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 700, color: '#1e3a5f' }}>{name}</h2>
      <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>{email}</p>
    </div>

  </div>
);
