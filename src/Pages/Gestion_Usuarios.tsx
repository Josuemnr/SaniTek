import { useEffect, useState } from 'react';
import { Search, CheckCircle, XCircle, Plus } from 'lucide-react';
import { FilterTab } from '../Components/modules/gestion_usuarios/FilterTab';
import { UserRow } from '../Components/modules/gestion_usuarios/UserRow';
import type { User } from '../Components/modules/gestion_usuarios/UserRow';
import { PaginationBar } from '../Components/modules/gestion_usuarios/PaginationBar';
import { NewUserModal, type NewUserFormData } from '../Components/modules/gestion_usuarios/NewUserModal';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { api, type UserApiResponse } from '@/Services/backendApi';
import type { UserRole } from '@/Services/backendApi';

type FilterType = 'Activos' | 'Inactivos';

const ITEMS_PER_PAGE = 5;
const AVATAR_COLORS = ['#ef4444', '#f97316', '#ec4899', '#6366f1', '#10b981', '#3b82f6', '#8b5cf6'];

export default function GestionUsuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('Activos');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [updatingUserIds, setUpdatingUserIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    let cancelled = false;

    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await api.companyUsers.listAll();
        if (!cancelled) setUsers(response.map(mapUser));
      } catch (error) {
        console.error('[GestionUsuarios] error al listar usuarios:', error);
        toast.error('No se pudieron cargar los usuarios');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = users.filter(u => {
    const matchesFilter =
      activeFilter === 'Activos'         ? u.status === 'Activo' :
      u.status === 'Inactivo';
    const matchesSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleAddUser = async (data: NewUserFormData) => {
    const created = await api.companyUsers.create({
      names: data.name,
      email: data.email,
      password: data.password,
    });

    setUsers(prev => [mapUser(created), ...prev]);
    setActiveFilter('Activos');
    setCurrentPage(1);
    toast.success('Usuario creado');
  };

  const handleToggleStatus = async (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    if (updatingUserIds.has(userId)) return;

    setUpdatingUserIds(prev => new Set(prev).add(userId));
    try {
      if (user.status === 'Activo') {
        await api.companyUsers.deactivate(userId);
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'Inactivo' } : u));
        toast.success('Usuario desactivado');
      } else {
        const activated = await api.companyUsers.activate(userId);
        setUsers(prev => prev.map(u => u.id === userId ? mapUser(activated) : u));
        toast.success('Usuario activado');
      }
    } catch (error) {
      console.error('[GestionUsuarios] error al cambiar estatus:', error);
      toast.error('No se pudo cambiar el estatus');
    } finally {
      setUpdatingUserIds(prev => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  };

  const handleFilterChange = (f: FilterType) => {
    setActiveFilter(f);
    setCurrentPage(1);
  };

  return (
    <div style={{ flex: 1, background: '#f8fafc', padding: '28px 32px', boxSizing: 'border-box', textAlign: 'left' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#111827' }}>Estatus de Usuarios</h1>
        <button
          onClick={() => setShowModal(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#6fa8f7', color: 'white', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,162,247,0.4)' }}
        >
          <Plus size={15} />
          Nuevo Usuario
        </button>
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            style={{ width: 280, paddingLeft: 36, paddingRight: 16, paddingTop: 9, paddingBottom: 9, fontSize: 13, border: '1px solid #e5e7eb', borderRadius: 10, background: 'white', color: '#374151', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <FilterTab label="Activos"         icon={<CheckCircle size={14} />} active={activeFilter === 'Activos'}         onClick={() => handleFilterChange('Activos')} />
          <FilterTab label="Inactivos"       icon={<XCircle size={14} />}     active={activeFilter === 'Inactivos'}       onClick={() => handleFilterChange('Inactivos')} />
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                {['Usuario', 'Rol', 'Estatus', 'Ultimo Acceso'].map(col => (
                  <th key={col} style={{ padding: '14px 24px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paginated.length > 0
                  ? paginated.map(user => (
                    <UserRow
                      key={user.id}
                      user={user}
                      onToggleStatus={handleToggleStatus}
                      isUpdating={updatingUserIds.has(user.id)}
                    />
                  ))
                  : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key="empty"
                    >
                      <td colSpan={4} style={{ padding: '40px 24px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                        {loading ? 'Cargando usuarios...' : 'No se encontraron usuarios.'}
                      </td>
                    </motion.tr>
                  )
                }
              </AnimatePresence>
            </tbody>
          </table>
          <PaginationBar
            current={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {showModal && (
        <NewUserModal onClose={() => setShowModal(false)} onSave={handleAddUser} />
      )}
    </div>
  );
}

function mapUser(user: UserApiResponse): User {
  return {
    id: user.id,
    name: user.names ?? user.email,
    email: user.email,
    role: mapRole(user.role?.roleName),
    status: user.isActive ? 'Activo' : 'Inactivo',
    lastAccessLabel: 'Sin acceso registrado',
    lastAccessDate: '-',
    avatarColor: avatarColorFor(user.id),
  };
}

function mapRole(roleName: UserRole | undefined) {
  if (roleName === 'ADMIN') return 'Administrador';
  return 'Usuario';
}

function avatarColorFor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}
