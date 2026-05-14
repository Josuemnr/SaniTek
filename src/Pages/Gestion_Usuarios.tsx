import { useState } from 'react';
import { Search, CheckCircle, XCircle, Shield, Plus } from 'lucide-react';
import { FilterTab } from '../Components/modules/gestion_usuarios/FilterTab';
import { UserRow } from '../Components/modules/gestion_usuarios/UserRow';
import type { User } from '../Components/modules/gestion_usuarios/UserRow';
import { PaginationBar } from '../Components/modules/gestion_usuarios/PaginationBar';
import { EditUserPanel } from '../Components/modules/gestion_usuarios/EditUserPanel';
import { NewUserModal } from '../Components/modules/gestion_usuarios/NewUserModal';
import { Sidebar } from '../Components/Sidebar';

type FilterType = 'Activos' | 'Inactivos' | 'Administradores';

const INITIAL_USERS: User[] = [
  { id: 1, name: 'Josué Monroy Larios',    email: 'Josue@sanitek.com',       role: 'Administrador', status: 'Activo',   lastAccessLabel: 'Hace 2 horas',  lastAccessDate: '17 Marzo 2026, 14:30', avatarColor: '#ef4444' },
  { id: 2, name: 'Paula Concepcion Herrera',     email: 'paula.concepcion@sanitek.com',    role: 'Gerente',       status: 'Activo',   lastAccessLabel: 'Hace 5 horas',  lastAccessDate: '15 Marzo 2026, 11:15', avatarColor: '#f97316' },
  { id: 3, name: 'Iker Mejía Hernandez',  email: 'iker.mejia@sanitek.com',   role: 'Director',      status: 'Activo',   lastAccessLabel: 'Hace 1 día',    lastAccessDate: '14 Marzo 2026, 16:45', avatarColor: '#ec4899' },
  { id: 4, name: 'Gerado García Landa', email: 'gerardo.garcia@sanitek.com',role: 'Gerente',       status: 'Activo', lastAccessLabel: 'Hace 15 días',  lastAccessDate: '2 Marzo 2026, 09:20', avatarColor: '#6366f1' },
  { id: 5, name: 'Wolfgang Von Goethe',     email: 'william.goethe@sanitek.com',   role: 'Director',      status: 'Inactivo',   lastAccessLabel: 'Hace 3 días',   lastAccessDate: '14 Marzo 2026, 13:10', avatarColor: '#dc2626' },
];

const ITEMS_PER_PAGE = 5;

export default function GestionUsuarios() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [activeFilter, setActiveFilter] = useState<FilterType>('Activos');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(INITIAL_USERS[0]);
  const [showModal, setShowModal] = useState(false);

  const filtered = users.filter(u => {
    const matchesFilter =
      activeFilter === 'Activos'         ? u.status === 'Activo' :
      activeFilter === 'Inactivos'       ? u.status === 'Inactivo' :
      u.role === 'Administrador';
    const matchesSearch =
      !search || //para que no filtre si el campo de búsqueda está vacío
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleAddUser = (data: Omit<User, 'id'>) => {
    const newUser: User = { id: Date.now(), ...data };
    setUsers(prev => [newUser, ...prev]);
    setActiveFilter('Activos');
    setCurrentPage(1);
    setEditingUser(newUser);
  };

  const handleFilterChange = (f: FilterType) => {
    setActiveFilter(f);
    setCurrentPage(1);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Sidebar />
    <div style={{ flex: 1, background: '#f8fafc', padding: '28px 32px', boxSizing: 'border-box', textAlign: 'left' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#111827' }}>Gestión de Usuarios</h1>
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
          <FilterTab label="Administradores" icon={<Shield size={14} />}      active={activeFilter === 'Administradores'} onClick={() => handleFilterChange('Administradores')} />
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

        {/* Table card */}
        <div style={{ flex: 1, background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                {['Usuario', 'Rol', 'Estado', 'Último Acceso', 'Acciones'].map(col => (
                  <th key={col} style={{ padding: '14px 24px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0
                ? paginated.map(user => <UserRow key={user.id} user={user} onEdit={setEditingUser} />)
                : (
                  <tr>
                    <td colSpan={5} style={{ padding: '40px 24px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                      No se encontraron usuarios.
                    </td>
                  </tr>
                )
              }
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

        {/* Edit panel */}
        {editingUser && (
          <EditUserPanel user={editingUser} onClose={() => setEditingUser(null)} />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <NewUserModal onClose={() => setShowModal(false)} onSave={handleAddUser} />
      )}
    </div>
    </div>
  );
}
