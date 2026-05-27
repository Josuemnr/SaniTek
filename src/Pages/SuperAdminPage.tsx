import { useEffect, useState } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { EmpresaRow } from '../Components/modules/superadmin/EmpresaRow';
import type { Empresa } from '../Components/modules/superadmin/EmpresaRow';
import { NuevaEmpresaModal, type NuevaEmpresaFormData } from '../Components/modules/superadmin/NuevaEmpresaModal';
import { EditarEmpresaModal } from '../Components/modules/superadmin/EditarEmpresaModal';
import { api, type CompanyApiResponse, type UserApiResponse } from '@/Services/backendApi';
import { toast } from 'sonner';

export function SuperAdminPage() {
  const [empresas,      setEmpresas]      = useState<Empresa[]>([]);
  const [loading,       setLoading]       = useState(false);
  const [showModal,     setShowModal]     = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadEmpresas = async () => {
      setLoading(true);
      try {
        const [companies, admins] = await Promise.all([
          api.companies.listAll(),
          api.admins.listAll(),
        ]);

        if (!cancelled) {
          setEmpresas(mapEmpresas(companies, admins));
        }
      } catch (error) {
        console.error('[SuperAdminPage] error al listar empresas:', error);
        toast.error('No se pudieron cargar las empresas');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void loadEmpresas();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleEditEmpresa = async (updated: Empresa) => {
    if (!updated.adminId) {
      throw new Error('Esta empresa no tiene administrador asignado.');
    }

    const admin = await api.admins.update(updated.adminId, {
      names: updated.nombreAdmin,
      email: updated.correoAdmin,
    });

    setEmpresas(prev => prev.map(e => e.id === updated.id ? {
      ...e,
      nombreAdmin: admin.names ?? updated.nombreAdmin,
      correoAdmin: admin.email,
      adminId: admin.id,
    } : e));
    toast.success('Administrador actualizado');
  };

  const handleAddEmpresa = async (data: NuevaEmpresaFormData) => {
    const company = await api.companies.create({
      companyName: data.nombre,
    });

    const admin = await api.admins.create({
      companyId: company.id,
      names: data.nombreAdmin,
      email: data.correoAdmin,
      password: data.password,
    });

    setEmpresas(prev => [{
      id: company.id,
      adminId: admin.id,
      nombre: company.companyName,
      nombreAdmin: admin.names ?? data.nombreAdmin,
      correoAdmin: admin.email,
      suscrita: false,
    }, ...prev]);
    toast.success('Empresa y administrador creados');
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
                    {loading ? 'Cargando empresas...' : 'No hay empresas registradas aún.'}
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

function mapEmpresas(companies: CompanyApiResponse[], admins: UserApiResponse[]): Empresa[] {
  return companies.map((company) => {
    const admin = admins.find((user) => user.company?.id === company.id);

    return {
      id: company.id,
      adminId: admin?.id ?? null,
      nombre: company.companyName,
      nombreAdmin: admin?.names ?? 'Sin administrador',
      correoAdmin: admin?.email ?? 'Sin correo',
      suscrita: company.isActive,
    };
  });
}
