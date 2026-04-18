import { useState } from 'react';
import { CheckCircle, XCircle, Shield, Star, Zap } from 'lucide-react';

import { UserAvatar }          from '../Components/UserAvatar';
import { RoleBadge }           from '../Components/RoleBadge';
import { PaymentStatusBadge }  from '../Components/PaymentStatusBadge';
import { FilterTab }           from '../Components/FilterTab';
import { PaginationBar }       from '../Components/PaginationBar';
import { CustomImput }         from '../Components/CustomImput';
import { PasswordInput }       from '../Components/PasswordInput';
import { AddPaymentCard }      from '../Components/AddPaymentCard';
import { PaymentCard }         from '../Components/PaymentCard';
import type { CardData }       from '../Components/PaymentCard';
import { PlanFeatureItem }     from '../Components/PlanFeatureItem';
import { PlanCard }            from '../Components/PlanCard';
import { ProfileCard }         from '../Components/ProfileCard';
import { PaymentHistoryTable } from '../Components/PaymentHistoryTable';
import type { PaymentRecord }  from '../Components/PaymentHistoryTable';
import { ConfirmModal }        from '../Components/ConfirmModal';
import { AddCardModal }        from '../Components/AddCardModal';

const SECTIONS = [
  'UserAvatar', 'RoleBadge', 'PaymentStatusBadge',
  'FilterTab', 'PaginationBar', 'CustomImput',
  'PasswordInput', 'AddPaymentCard', 'PaymentCard',
  'PlanFeatureItem', 'PlanCard', 'ProfileCard',
  'PaymentHistoryTable', 'ConfirmModal', 'AddCardModal',
];

const SAMPLE_CARD: CardData = { id: 1, last4: '4242', holder: 'Josue M', expiry: '08/27', isDefault: true };
const SAMPLE_CARD_2: CardData = { id: 2, last4: '9999', holder: 'Paula C', expiry: '12/26', isDefault: false };

const SAMPLE_RECORDS: PaymentRecord[] = [
  { id: 1, date: '10 Mar 2026', description: 'Suscripción Premium - Mensual', status: 'Pagado',    amount: 17000 },
  { id: 2, date: '10 Feb 2026', description: 'Suscripción Premium - Mensual', status: 'Pendiente', amount: 17000 },
  { id: 3, date: '10 Ene 2026', description: 'Suscripción Premium - Mensual', status: 'Fallido',   amount: 17000 },
];

const Section: React.FC<{ id: string; title: string; description: string; children: React.ReactNode }> =
  ({ id, title, description, children }) => (
    <section id={id} style={{ marginBottom: 56 }}>
      <div style={{ marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, color: '#111827' }}>{title}</h2>
        <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>{description}</p>
      </div>
      {children}
    </section>
  );

const Row: React.FC<{ label: string; children: React.ReactNode; dark?: boolean }> =
  ({ label, children, dark }) => (
    <div style={{ marginBottom: 16 }}>
      <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </p>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
        padding: '20px 24px', borderRadius: 12,
        background: dark ? '#0f172a' : '#f8fafc',
        border: '1px solid #e5e7eb',
      }}>
        {children}
      </div>
    </div>
  );
export default function StorybookPage() {
  // FilterTab 
  const [activeFilter, setActiveFilter] = useState<string>('Activos');

  // PaginationBar 
  const [page, setPage] = useState(1);

  // CustomImput 
  const [inputVal, setInputVal] = useState('');
  const [pwdVal,   setPwdVal]   = useState('');

  // PasswordInput 
  const [pwdA, setPwdA] = useState('');
  const [pwdB, setPwdB] = useState('');

  // Modals
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [showAddCard,  setShowAddCard]  = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc' }}>

      <aside style={{
        width: 210, minWidth: 210, position: 'sticky', top: 0, height: '100vh',
        background: 'white', borderRight: '1px solid #e5e7eb',
        padding: '24px 14px', boxSizing: 'border-box', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ marginBottom: 24, padding: '0 6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: 12 }}>S</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#111827' }}>SaniTek</span>
          </div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Components
          </p>
        </div>

        <p style={{ margin: '0 0 6px 6px', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Átomos & Moléculas
        </p>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SECTIONS.map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                padding: '7px 12px', borderRadius: 8, border: 'none',
                background: 'transparent', color: '#374151', fontSize: 13,
                textAlign: 'left', cursor: 'pointer', fontWeight: 400,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {id}
            </button>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '40px 48px', boxSizing: 'border-box', maxWidth: 900 }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 800, color: '#111827' }}>Component Showcase</h1>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>
            Todos los componentes de SaniTek en sus diferentes estados y variantes.
          </p>
        </div>

        {/* ── UserAvatar ── */}
        <Section id="UserAvatar" title="UserAvatar" description="Avatar circular con iniciales generadas del nombre.">
          <Row label="Tamaños">
            <UserAvatar name="Josué Monroy"       bgColor="#7b9ab3" size="sm" />
            <UserAvatar name="Paula Concepcion"   bgColor="#f97316" size="sm" />
            <UserAvatar name="Wolfgang Von Goethe" bgColor="#dc2626" size="sm" />
            <UserAvatar name="Iker Mejía"         bgColor="#ec4899" size="sm" />
          </Row>
          <Row label="Large">
            <UserAvatar name="Josué Monroy"     bgColor="#7b9ab3" size="lg" />
            <UserAvatar name="Paula Concepcion" bgColor="#f97316" size="lg" />
          </Row>
        </Section>

        {/* ── RoleBadge ── */}
        <Section id="RoleBadge" title="RoleBadge" description="Badge de rol con color e ícono según el tipo.">
          <Row label="Todas las variantes">
            <RoleBadge role="Administrador" />
            <RoleBadge role="Gerente" />
            <RoleBadge role="Director" />
          </Row>
        </Section>

        {/* ── PaymentStatusBadge ── */}
        <Section id="PaymentStatusBadge" title="PaymentStatusBadge" description="Texto coloreado que indica el estado de un pago.">
          <Row label="Estados">
            <PaymentStatusBadge status="Pagado" />
            <PaymentStatusBadge status="Pendiente" />
            <PaymentStatusBadge status="Fallido" />
          </Row>
        </Section>

        {/* ── FilterTab ── */}
        <Section id="FilterTab" title="FilterTab" description="Botón pill de filtro con estado activo/inactivo. Haz clic para alternar.">
          <Row label="Interactivo">
            {(['Activos', 'Inactivos', 'Administradores'] as const).map(label => (
              <FilterTab
                key={label}
                label={label}
                icon={label === 'Activos' ? <CheckCircle size={14}/> : label === 'Inactivos' ? <XCircle size={14}/> : <Shield size={14}/>}
                active={activeFilter === label}
                onClick={() => setActiveFilter(label)}
              />
            ))}
          </Row>
        </Section>

        {/* ── PaginationBar ── */}
        <Section id="PaginationBar" title="PaginationBar" description="Barra de paginación con contador de registros y navegación de páginas.">
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <PaginationBar
              current={page}
              totalPages={5}
              totalItems={23}
              itemsPerPage={5}
              onPageChange={setPage}
            />
          </div>
        </Section>

        {/* ── CustomImput ── */}
        <Section id="CustomImput" title="CustomImput" description="Input estilizado para usar sobre fondos oscuros (pantalla de login y forgot).">
          <Row label="Variantes" dark>
            <div style={{ width: 280 }}>
              <CustomImput label="Correo electrónico" placeholder="tu@correo.com" value={inputVal} onChangeText={setInputVal} />
            </div>
            <div style={{ width: 280 }}>
              <CustomImput label="Contraseña" placeholder="••••••••" type="password" value={pwdVal} onChangeText={setPwdVal} />
            </div>
          </Row>
        </Section>

        {/* ── PasswordInput ── */}
        <Section id="PasswordInput" title="PasswordInput" description="Input de contraseña con toggle de visibilidad y soporte para error.">
          <Row label="Normal">
            <div style={{ width: 300 }}>
              <PasswordInput label="Nueva Contraseña" placeholder="Ingresa tu contraseña" value={pwdA} onChange={setPwdA} />
            </div>
          </Row>
          <Row label="Con error">
            <div style={{ width: 300 }}>
              <PasswordInput label="Confirmar Contraseña" placeholder="Confirma tu contraseña" value={pwdB} onChange={setPwdB} error="Las contraseñas no coinciden" />
            </div>
          </Row>
        </Section>

        {/* ── AddPaymentCard ── */}
        <Section id="AddPaymentCard" title="AddPaymentCard" description="Botón de área punteada para agregar un nuevo método de pago.">
          <Row label="Default">
            <div style={{ width: 360 }}>
              <AddPaymentCard onClick={() => {}} />
            </div>
          </Row>
        </Section>

        {/* ── PaymentCard ── */}
        <Section id="PaymentCard" title="PaymentCard" description="Tarjeta de crédito/débito con datos del titular, número enmascarado, vencimiento y acciones.">
          <Row label="Predeterminada" dark>
            <div style={{ width: 360 }}>
              <PaymentCard card={SAMPLE_CARD} onEdit={() => {}} onDelete={() => {}} />
            </div>
          </Row>
          <Row label="Secundaria" dark>
            <div style={{ width: 360 }}>
              <PaymentCard card={SAMPLE_CARD_2} onEdit={() => {}} onDelete={() => {}} />
            </div>
          </Row>
        </Section>

        {/* ── PlanFeatureItem ── */}
        <Section id="PlanFeatureItem" title="PlanFeatureItem" description="Ítem de feature con check azul, usado dentro de PlanCard.">
          <Row label="Ejemplos">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PlanFeatureItem text="Acceso ilimitado a todas las funciones" />
              <PlanFeatureItem text="Soporte 24/7" />
              <PlanFeatureItem text="Reportes avanzados" />
            </div>
          </Row>
        </Section>

        {/* ── PlanCard ── */}
        <Section id="PlanCard" title="PlanCard" description="Tarjeta del plan activo con features, fecha de pago y botón de cancelación.">
          <PlanCard onCancelPlan={() => alert('Cancelar plan')} />
        </Section>

        {/* ── ProfileCard ── */}
        <Section id="ProfileCard" title="ProfileCard" description="Tarjeta de perfil con avatar circular, nombre, correo y botón para cambiar imagen.">
          <ProfileCard name="Josué Monroy" email="josue.monroy@sanitek.com" onChangeImage={() => {}} />
        </Section>

        {/* ── PaymentHistoryTable ── */}
        <Section id="PaymentHistoryTable" title="PaymentHistoryTable" description="Tabla de historial de pagos con fecha, descripción, estado y monto.">
          <PaymentHistoryTable records={SAMPLE_RECORDS} />
        </Section>

        {/* ── ConfirmModal ── */}
        <Section id="ConfirmModal" title="ConfirmModal" description="Modal de confirmación reutilizable con título, mensaje y acción destructiva.">
          <Row label="Disparador">
            <button
              onClick={() => setShowConfirm(true)}
              style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#dc2626', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Abrir ConfirmModal
            </button>
          </Row>
          {showConfirm && (
            <ConfirmModal
              title="Cancelar Plan"
              message="¿Seguro que deseas cancelar tu suscripción Sanitek Premium? Perderás acceso al finalizar el período actual."
              confirmLabel="Sí, cancelar plan"
              onConfirm={() => { alert('Confirmado'); setShowConfirm(false); }}
              onClose={() => setShowConfirm(false)}
            />
          )}
        </Section>

        {/* ── AddCardModal ── */}
        <Section id="AddCardModal" title="AddCardModal" description="Modal para agregar una tarjeta nueva con número, titular, vencimiento, CVV y opción de predeterminada.">
          <Row label="Disparador">
            <button
              onClick={() => setShowAddCard(true)}
              style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#3b82f6', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Abrir AddCardModal
            </button>
          </Row>
          {showAddCard && (
            <AddCardModal
              onClose={() => setShowAddCard(false)}
              onSave={data => { console.log('Card saved:', data); setShowAddCard(false); }}
            />
          )}
        </Section>

        {/* Footer spacer */}
        <div style={{ height: 60 }} />
      </main>
    </div>
  );
}
