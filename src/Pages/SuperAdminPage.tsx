import { useState } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { EmpresaRow } from '../Components/modules/superadmin/EmpresaRow';
import type { Empresa } from '../Components/modules/superadmin/EmpresaRow';
import { NuevaEmpresaModal } from '../Components/modules/superadmin/NuevaEmpresaModal';
import { EditarEmpresaModal } from '../Components/modules/superadmin/EditarEmpresaModal';

const INITIAL_EMPRESAS: Empresa[] = [
  { id: 1, nombre: 'Grupo Industrial S.A.',    nombreAdmin: 'María García López',  correoAdmin: 'admin@grupoindustrial.com', suscrita: true  },
  { id: 2, nombre: 'Logística Norte S.C.',      nombreAdmin: 'Carlos Ramos Pérez',  correoAdmin: 'admin@logisticanorte.com', suscrita: true  },
  { id: 3, nombre: 'Distribuidora Alfa S.A.',   nombreAdmin: 'Ana Torres Medina',   correoAdmin: 'admin@distribalfa.com',     suscrita: false },
];

export function SuperAdminPage() {
  const [empresas,      setEmpresas]      = useState<Empresa[]>(INITIAL_EMPRESAS);
  const [showModal,     setShowModal]     = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);

  const handleEditEmpresa = (updated: Empresa) => {
    setEmpresas(prev => prev.map(e => e.id === updated.id ? updated : e));
  };

  const handleAddEmpresa = (data: Omit<Empresa, 'id' | 'suscrita'>) => {
    setEmpresas(prev => [{ id: Date.now(), ...data, suscrita: false }, ...prev]);
  };

  const suscritas   = empresas.filter(e => e.suscrita).length;
  const sinSuscr    = empresas.filter(e => !e.suscrita).length;

  return (
    <div style={{ flex: 1, background: '#f8fafc', padding: '28px 32px', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: 'linear-gradient(135deg, #B7D2FF 0%, #7baaf7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={20} color="#1d4ed8" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111827' }}>Panel SaniTek</h1>
            <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>Gestión de empresas clientes</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#6fa8f7', color: 'white', border: 'none', borderRadius: 12, padding: '10px 20px', fontSize: 13, fontWeight: 500, cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,162,247,0.4)' }}
        >
          <Plus size={15} />
          Nueva Empresa
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total empresas',    value: empresas.length, color: '#DEEBFF', textColor: '#1d4ed8' },
          { label: 'Suscritas',         value: suscritas,        color: '#dcfce7', textColor: '#16a34a' },
          { label: 'Sin suscripción',   value: sinSuscr,         color: '#f3f4f6', textColor: '#6b7280' },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1, background: 'white', borderRadius: 12, border: '1px solid #f3f4f6', padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#111827' }}>{stat.value}</span>
              <span style={{ padding: '2px 8px', borderRadius: 20, background: stat.color, color: stat.textColor, fontSize: 11, fontWeight: 600 }}>
                {stat.label === 'Suscritas' ? 'activas' : stat.label === 'Sin suscripción' ? 'pendientes' : 'registradas'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 16, border: '1px solid #f3f4f6', boxShadow: '0 1px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Empresa / Administrador', 'Correo', 'Suscripción', ''].map(col => (
                <th key={col} style={{ padding: '14px 24px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {empresas.length > 0
              ? empresas.map(e => <EmpresaRow key={e.id} empresa={e} onEdit={setEditingEmpresa} />)
              : (
                <tr>
                  <td colSpan={4} style={{ padding: '48px 24px', textAlign: 'center', color: '#9ca3af', fontSize: 14 }}>
                    No hay empresas registradas aún.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      {showModal && (
        <NuevaEmpresaModal onClose={() => setShowModal(false)} onSave={handleAddEmpresa} />
      )}
      {editingEmpresa && (
        <EditarEmpresaModal
          empresa={editingEmpresa}
          onClose={() => setEditingEmpresa(null)}
          onSave={handleEditEmpresa}
        />
      )}
    </div>
  );
}
