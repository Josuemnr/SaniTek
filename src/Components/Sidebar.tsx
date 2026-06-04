import { useLocation, useNavigate } from 'react-router-dom';
import { Map, History, Car, Users, CreditCard, UserCog, LogOut, ShieldCheck } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { useAuth } from '../hooks/useAuth';
import logo from '@/assets/logo.svg';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Mapa de Riesgo',          icon: <Map size={16} />,     path: '/' },
  { label: 'Historial de riesgos',    icon: <History size={16} />, path: '/historial' },
  { label: 'Hoy no Circula CDMX',     icon: <Car size={16} />,     path: '/hoy-no-circula' },
];

const ADMIN_ITEMS: NavItem[] = [
  { label: 'Estatus de usuarios',      icon: <Users size={16} />,       path: '/Gestion_Usuarios' },
  { label: 'Administrar Suscripción',  icon: <CreditCard size={16} />,  path: '/Suscrpcion' },
  { label: 'Configuración de Perfil',  icon: <UserCog size={16} />,     path: '/Perfil_Usuario' },
  { label: 'Panel SaniTek',            icon: <ShieldCheck size={16} />, path: '/superadmin' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, role } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const filteredAdminItems = ADMIN_ITEMS.filter((item) => {
    if (item.path === '/Gestion_Usuarios') return role === 'ADMIN';
    if (item.path === '/superadmin') return role === 'SUPER_ADMIN';
    return true;
  });

  const itemStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '9px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    color: active ? '#1d4ed8' : '#374151',
    background: active ? '#dbeafe' : 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    transition: 'background 0.15s, color 0.15s',
  });

  return (
    <div style={{
      width: 220,
      minWidth: 220,
      minHeight: '100vh',
      background: 'white',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 14px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 6px', marginBottom: 32 }}>
        <img src={logo} alt="SaniTek Logo" style={{ width: 44, height: 44, objectFit: 'contain' }} />
        <span style={{ fontWeight: 800, fontSize: 18, color: '#111827', letterSpacing: '-0.5px' }}>SaniTek</span>
      </div>

      {/* Main nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => (
          <button key={item.path} onClick={() => navigate(item.path)} style={itemStyle(isActive(item.path))}>
            <span style={{ color: isActive(item.path) ? '#1d4ed8' : '#6b7280', flexShrink: 0 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Admin section */}
      <div style={{ marginTop: 24 }}>
        <p style={{ margin: '0 0 6px 6px', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Administración
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredAdminItems.map(item => (
            <button key={item.path} onClick={() => navigate(item.path)} style={itemStyle(isActive(item.path))}>
              <span style={{ color: isActive(item.path) ? '#1d4ed8' : '#6b7280', flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* User profile */}
      <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 6px' }}>
          <UserAvatar name="Josué Monroy" bgColor="#7b9ab3" size="sm" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Josué Monroy</p>
            <p style={{ margin: 0, fontSize: 11, color: '#6b7280' }}>Administrador</p>
          </div>
          <button onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 4 }} title="Cerrar sesión">
            <LogOut size={15} />
          </button>
        </div>
      </div>

    </div>
  );
};
