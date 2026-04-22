import { useState } from 'react';
import { CheckCircle, XCircle, Shield, Thermometer, Droplets, Users, Wind, BarChart2 } from 'lucide-react';
import { UserAvatar }            from '../Components/UserAvatar';
import { RoleBadge }             from '../Components/modules/gestion_usuarios/RoleBadge';
import { PaymentStatusBadge }    from '../Components/modules/suscrpcion/PaymentStatusBadge';
import { FilterTab }             from '../Components/modules/gestion_usuarios/FilterTab';
import { PaginationBar }         from '../Components/modules/gestion_usuarios/PaginationBar';
import { CustomImput }           from '../Components/modules/login/CustomImput';
import { PasswordInput }         from '../Components/modules/perfil_usuario/PasswordInput';
import { AddPaymentCard }        from '../Components/modules/suscrpcion/AddPaymentCard';
import { PaymentCard }           from '../Components/modules/suscrpcion/PaymentCard';
import type { CardData }         from '../Components/modules/suscrpcion/PaymentCard';
import { PlanFeatureItem }       from '../Components/modules/suscrpcion/PlanFeatureItem';
import { PlanCard }              from '../Components/modules/suscrpcion/PlanCard';
import { ProfileCard }           from '../Components/modules/perfil_usuario/ProfileCard';
import { PaymentHistoryTable }   from '../Components/modules/suscrpcion/PaymentHistoryTable';
import type { PaymentRecord }    from '../Components/modules/suscrpcion/PaymentHistoryTable';
import { ConfirmModal }          from '../Components/modules/suscrpcion/ConfirmModal';
import { AddCardModal }          from '../Components/modules/suscrpcion/AddCardModal';
import { UserRow }               from '../Components/modules/gestion_usuarios/UserRow';
import type { User }             from '../Components/modules/gestion_usuarios/UserRow';
import { NewUserModal }          from '../Components/modules/gestion_usuarios/NewUserModal';
import { EditUserPanel }         from '../Components/modules/gestion_usuarios/EditUserPanel';
import { PrimaryButton }         from '../Components/modules/login/PrimaryButton';
import { PantallaCarga }         from '../Components/modules/login/Pantalla_Carga';
import { ChangePlanModal }       from '../Components/modules/suscrpcion/ChangePlanModal';
import { IRSACard }              from '../Components/modules/detalle-alcaldia/IRSACard';
import { VariableCard }          from '../Components/modules/detalle-alcaldia/VariableCard';
import { VariablesGrid }         from '../Components/modules/detalle-alcaldia/VariablesGrid';
import { AlcaldiaItem }          from '../Components/modules/filtrar-alcaldias/AlcaldiaItem';
import { AlcaldiasList }         from '../Components/modules/filtrar-alcaldias/AlcaldiasList';
import { EstadisticasRapidas }   from '../Components/modules/filtrar-alcaldias/EstadisticasRapidas';
import { FilterBar }             from '../Components/modules/filtrar-alcaldias/FilterBar';
import type { FilterType }       from '../Components/modules/filtrar-alcaldias/alcaldias-filter-data';
import { ZONAS_MOCK }            from '../Components/modules/filtrar-alcaldias/alcaldias-filter-data';
import { MetricCard }            from '../Components/modules/historial-riesgos/MetricCard';
import { MetricsRow }            from '../Components/modules/historial-riesgos/MetricsRow';
import { SanidadChart }          from '../Components/modules/historial-riesgos/SanidadChart';
import { DATA_CDMX, getMetricas } from '../Components/modules/historial-riesgos/historial-data';
import { CalendarCard }          from '../Components/modules/hoy-no-circula/CalendarCard';
import { CirculaCalendarDay }    from '../Components/modules/hoy-no-circula/CirculaCalendarDay';
import { EstadoDiaCard }         from '../Components/modules/hoy-no-circula/EstadoDiaCard';
import { HologramasCard }        from '../Components/modules/hoy-no-circula/HologramasCard';
import { InfoNota }              from '../Components/modules/hoy-no-circula/InfoNota';
import { PlacasRestringidasCard } from '../Components/modules/hoy-no-circula/PlacasRestringidasCard';
import { getDayRestriction, getRestrictedDatesForMonth } from '../Components/modules/hoy-no-circula/circula-data';
import { QuickStatsCard }        from '../Components/modules/risk-map/QuickStatsCard';
import { SidebarAlcaldias }      from '../Components/modules/risk-map/SidebarAlcaldias';
import { TemporalControl }       from '../Components/modules/risk-map/TemporalControl';

const CORE_SECTIONS = [
  'UserAvatar', 'RoleBadge', 'PaymentStatusBadge',
  'FilterTab', 'PaginationBar', 'CustomImput',
  'PasswordInput', 'AddPaymentCard', 'PaymentCard',
  'PlanFeatureItem', 'PlanCard', 'ProfileCard',
  'PaymentHistoryTable', 'ConfirmModal', 'AddCardModal',
];

const GESTION_SECTIONS  = ['UserRow', 'NewUserModal', 'EditUserPanel'];
const LOGIN_SECTIONS    = ['PrimaryButton', 'PantallaCarga'];
const SUSCRIPCION_SECTIONS = ['ChangePlanModal'];
const DETALLE_SECTIONS  = ['IRSACard', 'VariableCard', 'VariablesGrid'];
const FILTRAR_SECTIONS  = ['AlcaldiaItem', 'AlcaldiasList', 'EstadisticasRapidas', 'FilterBar'];
const HISTORIAL_SECTIONS = ['MetricCard', 'MetricsRow', 'SanidadChart'];
const CIRCULA_SECTIONS  = ['CirculaCalendarDay', 'CalendarCard', 'EstadoDiaCard', 'HologramasCard', 'InfoNota', 'PlacasRestringidasCard'];
const RISKMAP_SECTIONS  = ['QuickStatsCard', 'SidebarAlcaldias', 'TemporalControl'];

const SAMPLE_CARD: CardData   = { id: 1, last4: '4242', holder: 'Josue M',   expiry: '08/27', isDefault: true  };
const SAMPLE_CARD_2: CardData = { id: 2, last4: '9999', holder: 'Paula C',   expiry: '12/26', isDefault: false };

const SAMPLE_RECORDS: PaymentRecord[] = [
  { id: 1, date: '10 Mar 2026', description: 'Suscripción Premium - Mensual', status: 'Pagado',    amount: 17000 },
  { id: 2, date: '10 Feb 2026', description: 'Suscripción Premium - Mensual', status: 'Pendiente', amount: 17000 },
  { id: 3, date: '10 Ene 2026', description: 'Suscripción Premium - Mensual', status: 'Fallido',   amount: 17000 },
];

const SAMPLE_USER: User = {
  id: 1,
  name: 'Josué Monroy',
  email: 'josue.monroy@sanitek.com',
  role: 'Administrador',
  status: 'Activo',
  lastAccessLabel: 'Hace 2 horas',
  lastAccessDate: '19 Abr 2026, 10:30',
  avatarColor: '#7b9ab3',
};

const SAMPLE_USER_2: User = {
  id: 2,
  name: 'Paula Concepción',
  email: 'paula.c@sanitek.com',
  role: 'Gerente',
  status: 'Inactivo',
  lastAccessLabel: 'Hace 3 días',
  lastAccessDate: '16 Abr 2026, 09:15',
  avatarColor: '#f97316',
};

const SAMPLE_VARIABLES = {
  temperatura: 33,
  humedad: 40,
  densidad: 20100,
  calidadAire: 95,
  riesgoTemperatura: 'Crítico'  as const,
  riesgoDensidad:    'Crítico'  as const,
};

const SAMPLE_METRICAS = getMetricas(DATA_CDMX);
const WEEKDAY_DATE = new Date(2026, 3, 20);
const SAMPLE_RESTRICTION = getDayRestriction(WEEKDAY_DATE)!;

const SAMPLE_ZONAS = ZONAS_MOCK.slice(0, 5);
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
const NavGroup: React.FC<{ label: string; ids: string[]; onNav: (id: string) => void }> =
  ({ label, ids, onNav }) => (
    <>
      <p style={{ margin: '12px 0 4px 6px', fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
        {label}
      </p>
      {ids.map(id => (
        <button
          key={id}
          onClick={() => onNav(id)}
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
    </>
  );
export default function StorybookPage() {
  const [activeFilter, setActiveFilter] = useState<string>('Activos');
  const [page,         setPage]         = useState(1);
  const [inputVal,     setInputVal]     = useState('');
  const [pwdVal,       setPwdVal]       = useState('');
  const [pwdA,         setPwdA]         = useState('');
  const [pwdB,         setPwdB]         = useState('');

  // Modals — existentes
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [showAddCard,     setShowAddCard]     = useState(false);

  // Modals — nuevos
  const [showNewUser,     setShowNewUser]     = useState(false);
  const [showEditUser,    setShowEditUser]    = useState(false);
  const [showChangePlan,  setShowChangePlan]  = useState(false);
  const [showPantalla,    setShowPantalla]    = useState(false);

  // FilterBar 
  const [alcaldiaFilters, setAlcaldiaFilters] = useState<FilterType[]>([]);

  // CalendarCard
  const today = new Date();
  const [calMonth,    setCalMonth]    = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [calSelected, setCalSelected] = useState(today);
  const restrictedDates = getRestrictedDatesForMonth(calMonth.getFullYear(), calMonth.getMonth());

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fafc' }}>
      {/* Sidebar */}
      <aside style={{
        width: 210, minWidth: 210, position: 'sticky', top: 0, height: '100vh',
        background: 'white', borderRight: '1px solid #e5e7eb',
        padding: '24px 14px', boxSizing: 'border-box', overflowY: 'auto',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ marginBottom: 20, padding: '0 6px' }}>
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

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <NavGroup label="Core"              ids={CORE_SECTIONS}       onNav={scrollTo} />
          <NavGroup label="Gestión Usuarios"  ids={GESTION_SECTIONS}    onNav={scrollTo} />
          <NavGroup label="Login"             ids={LOGIN_SECTIONS}      onNav={scrollTo} />
          <NavGroup label="Suscripción"       ids={SUSCRIPCION_SECTIONS} onNav={scrollTo} />
          <NavGroup label="Detalle Alcaldía"  ids={DETALLE_SECTIONS}    onNav={scrollTo} />
          <NavGroup label="Filtrar Alcaldías" ids={FILTRAR_SECTIONS}    onNav={scrollTo} />
          <NavGroup label="Historial Riesgos" ids={HISTORIAL_SECTIONS}  onNav={scrollTo} />
          <NavGroup label="Hoy No Circula"    ids={CIRCULA_SECTIONS}    onNav={scrollTo} />
          <NavGroup label="Risk Map"          ids={RISKMAP_SECTIONS}    onNav={scrollTo} />
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '40px 48px', boxSizing: 'border-box', maxWidth: 960 }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 800, color: '#111827' }}>Component Showcase</h1>
          <p style={{ margin: 0, fontSize: 14, color: '#6b7280' }}>
            Todos los componentes de SaniTek en sus diferentes estados y variantes.
          </p>
        </div>
        {/* UserAvatar */}
        <Section id="UserAvatar" title="UserAvatar" description="Avatar circular con iniciales generadas del nombre.">
          <Row label="Small">
            <UserAvatar name="Josué Monroy"        bgColor="#7b9ab3" size="sm" />
            <UserAvatar name="Paula Concepcion"    bgColor="#f97316" size="sm" />
            <UserAvatar name="Wolfgang Von Goethe" bgColor="#dc2626" size="sm" />
            <UserAvatar name="Iker Mejía"          bgColor="#ec4899" size="sm" />
          </Row>
          <Row label="Large">
            <UserAvatar name="Josué Monroy"     bgColor="#7b9ab3" size="lg" />
            <UserAvatar name="Paula Concepcion" bgColor="#f97316" size="lg" />
          </Row>
        </Section>

        {/* RoleBadge */}
        <Section id="RoleBadge" title="RoleBadge" description="Badge de rol con color e ícono según el tipo.">
          <Row label="Todas las variantes">
            <RoleBadge role="Administrador" />
            <RoleBadge role="Gerente" />
            <RoleBadge role="Director" />
          </Row>
        </Section>
        {/*PaymentStatusBadge */}
        <Section id="PaymentStatusBadge" title="PaymentStatusBadge" description="Texto coloreado que indica el estado de un pago.">
          <Row label="Estados">
            <PaymentStatusBadge status="Pagado" />
            <PaymentStatusBadge status="Pendiente" />
            <PaymentStatusBadge status="Fallido" />
          </Row>
        </Section>
        {/* FilterTab */}
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
        {/* PaginationBar */}
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
        {/* CustomImput */}
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
        {/* PasswordInput */}
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
        {/* AddPaymentCard */}
        <Section id="AddPaymentCard" title="AddPaymentCard" description="Botón de área punteada para agregar un nuevo método de pago.">
          <Row label="Default">
            <div style={{ width: 360 }}>
              <AddPaymentCard onClick={() => {}} />
            </div>
          </Row>
        </Section>

        {/* PaymentCard */}
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

        {/* PlanFeatureItem */}
        <Section id="PlanFeatureItem" title="PlanFeatureItem" description="Ítem de feature con check azul, usado dentro de PlanCard.">
          <Row label="Ejemplos">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PlanFeatureItem text="Acceso ilimitado a todas las funciones" />
              <PlanFeatureItem text="Soporte 24/7" />
              <PlanFeatureItem text="Reportes avanzados" />
            </div>
          </Row>
        </Section>

        {/* PlanCard */}
        <Section id="PlanCard" title="PlanCard" description="Tarjeta del plan activo con features, fecha de pago y botón de cancelación.">
          <PlanCard onCancelPlan={() => alert('Cancelar plan')} />
        </Section>

        {/* ProfileCard */}
        <Section id="ProfileCard" title="ProfileCard" description="Tarjeta de perfil con avatar circular, nombre, correo y botón para cambiar imagen.">
          <ProfileCard name="Josué Monroy" email="josue.monroy@sanitek.com" onChangeImage={() => {}} />
        </Section>

        {/* PaymentHistoryTable */}
        <Section id="PaymentHistoryTable" title="PaymentHistoryTable" description="Tabla de historial de pagos con fecha, descripción, estado y monto.">
          <PaymentHistoryTable records={SAMPLE_RECORDS} />
        </Section>

        {/* ConfirmModal */}
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
        {/* AddCardModal*/}
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
        {/* Gestion_Usuarios */}
        {/* UserRow */}
        <Section id="UserRow" title="UserRow" description="Fila de tabla con avatar, nombre, correo, rol, estado, último acceso y botón de edición.">
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <UserRow user={SAMPLE_USER}   onEdit={() => {}} />
                <UserRow user={SAMPLE_USER_2} onEdit={() => {}} />
              </tbody>
            </table>
          </div>
        </Section>
        {/* NewUserModal */}
        <Section id="NewUserModal" title="NewUserModal" description="Modal para crear un nuevo usuario con validación de nombre, correo y selección de rol.">
          <Row label="Disparador">
            <button
              onClick={() => setShowNewUser(true)}
              style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#3b82f6', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Abrir NewUserModal
            </button>
          </Row>
          {showNewUser && (
            <NewUserModal
              onClose={() => setShowNewUser(false)}
              onSave={user => { console.log('User created:', user); setShowNewUser(false); }}
            />
          )}
        </Section>
        {/* EditUserPanel */}
        <Section id="EditUserPanel" title="EditUserPanel" description="Panel lateral con avatar, info del usuario, selector de rol y módulos de acceso.">
          <Row label="Con usuario seleccionado">
            <div style={{ width: 280 }}>
              <EditUserPanel user={SAMPLE_USER} onClose={() => {}} />
            </div>
          </Row>
          <Row label="Con botón disparador">
            <button
              onClick={() => setShowEditUser(v => !v)}
              style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#6b7280', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              {showEditUser ? 'Ocultar' : 'Mostrar'} EditUserPanel
            </button>
            {showEditUser && (
              <div style={{ width: 280 }}>
                <EditUserPanel user={SAMPLE_USER_2} onClose={() => setShowEditUser(false)} />
              </div>
            )}
          </Row>
        </Section>
        {/* La parte del loign*/}
        {/* PrimaryButton */}
        <Section id="PrimaryButton" title="PrimaryButton" description="Botón primario full-width azul para acciones de login, con estado de carga.">
          <Row label="Normal">
            <div style={{ width: 320 }}>
              <PrimaryButton text="Iniciar Sesión" />
            </div>
          </Row>
          <Row label="Loading">
            <div style={{ width: 320 }}>
              <PrimaryButton text="Iniciar Sesión" isLoading loadingText="Verificando..." />
            </div>
          </Row>
          <Row label="Disabled">
            <div style={{ width: 320 }}>
              <PrimaryButton text="Iniciar Sesión" disabled />
            </div>
          </Row>
        </Section>
        {/* PantallaCarga */}
        <Section id="PantallaCarga" title="PantallaCarga" description="Overlay de carga full-screen con spinner animado, mensaje personalizable y animación de entrada/salida.">
          <Row label="Disparador">
            <button
              onClick={() => { setShowPantalla(true); setTimeout(() => setShowPantalla(false), 2500); }}
              style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#1d4ed8', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Mostrar PantallaCarga (2.5 s)
            </button>
          </Row>
          <PantallaCarga isVisible={showPantalla} mensaje="Cargando datos..." />
        </Section>
        {/* Suscripcion */}
        {/* ChangePlanModal */}
        <Section id="ChangePlanModal" title="ChangePlanModal" description="Modal para seleccionar y confirmar un cambio de plan (Básico, Premium, Enterprise).">
          <Row label="Disparador">
            <button
              onClick={() => setShowChangePlan(true)}
              style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: '#7c3aed', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              Abrir ChangePlanModal
            </button>
          </Row>
          {showChangePlan && (
            <ChangePlanModal currentPlan="premium" onClose={() => setShowChangePlan(false)} />
          )}
        </Section>
        {/* info de alcaldia*/}
        {/*IRSACard */}
        <Section id="IRSACard" title="IRSACard" description="Tarjeta del Índice de Riesgo Sanitario con valor numérico, barra de progreso y color según nivel.">
          <Row label="Riesgo crítico (8.3)">
            <div style={{ width: 340 }}>
              <IRSACard irsa={8.3} irsaMax={10} descripcion="Riesgo crítico, intervención inmediata necesaria" />
            </div>
          </Row>
          <Row label="Riesgo óptimo (2.4)">
            <div style={{ width: 340 }}>
              <IRSACard irsa={2.4} irsaMax={10} descripcion="Nivel óptimo para operaciones normales" />
            </div>
          </Row>
          <Row label="Riesgo moderado (4.1)">
            <div style={{ width: 340 }}>
              <IRSACard irsa={4.1} irsaMax={10} descripcion="Riesgo moderado, monitoreo continuo recomendado" />
            </div>
          </Row>
        </Section>
        {/*VariableCard*/}
        <Section id="VariableCard" title="VariableCard" description="Tarjeta de variable ambiental con ícono, valor principal, sublabel y tag de riesgo opcional.">
          <Row label="Con risk tag">
            <div style={{ width: 200 }}>
              <VariableCard
                icon={<Thermometer className="w-6 h-6 text-orange-400" />}
                label="Temperatura"
                value="33°C"
                subLabel="Rango óptimo: 18–25°C"
                riskTag="Crítico"
              />
            </div>
            <div style={{ width: 200 }}>
              <VariableCard
                icon={<Wind className="w-6 h-6 text-cyan-500" />}
                label="Calidad del Aire (AQI)"
                value="95"
                subLabel="Rango saludable: 0–50"
                riskTag="Alto"
              />
            </div>
          </Row>
          <Row label="Sin risk tag">
            <div style={{ width: 200 }}>
              <VariableCard
                icon={<Droplets className="w-6 h-6 text-blue-400" />}
                label="Humedad"
                value="65%"
                subLabel="Rango óptimo: 40–70%"
              />
            </div>
            <div style={{ width: 200 }}>
              <VariableCard
                icon={<Users className="w-6 h-6 text-purple-400" />}
                label="Densidad Poblacional"
                value="9,800"
                subLabel="habitantes/km²"
                riskTag="Bajo"
              />
            </div>
          </Row>
        </Section>
        {/* VariablesGrid */}
        <Section id="VariablesGrid" title="VariablesGrid" description="Grid 2×2 de VariableCard con temperatura, humedad, densidad y calidad del aire de una alcaldía.">
          <div style={{ display: 'flex', gap: 16, maxWidth: 480 }}>
            <VariablesGrid variables={SAMPLE_VARIABLES} />
          </div>
        </Section>
        {/* filtrar por alcaldias */}
        {/* AlcaldiaItem */}
        <Section id="AlcaldiaItem" title="AlcaldiaItem" description="Fila de lista con nombre, alcaldía e indicador de nivel de riesgo con color.">
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden', maxWidth: 400 }}>
            {SAMPLE_ZONAS.map(zona => (
              <AlcaldiaItem key={zona.id} zona={zona} />
            ))}
          </div>
        </Section>
        {/* AlcaldiasList */}
        <Section id="AlcaldiasList" title="AlcaldiasList" description="Lista completa de zonas usando AlcaldiaItem; muestra mensaje vacío cuando no hay resultados.">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 320px', maxWidth: 400, height: 280 }}>
              <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Con datos</p>
              <AlcaldiasList zonas={SAMPLE_ZONAS} />
            </div>
            <div style={{ flex: '1 1 320px', maxWidth: 400, height: 280 }}>
              <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase' }}>Vacía</p>
              <AlcaldiasList zonas={[]} />
            </div>
          </div>
        </Section>
        {/* EstadisticasRapidas */}
        <Section id="EstadisticasRapidas" title="EstadisticasRapidas" description="Panel lateral con conteo de zonas críticas, alto riesgo, seguras y población afectada.">
          <Row label="Ejemplo">
            <EstadisticasRapidas criticas={3} altoRiesgo={4} seguras={5} poblacion="2.4M" />
          </Row>
        </Section>
        {/* FilterBar */}
        <Section id="FilterBar" title="FilterBar" description="Barra de filtros con pills toggle (densidad, calidad de aire, humedad) y botón para limpiar. Interactivo.">
          <Row label="Interactivo">
            <FilterBar
              activeFilters={alcaldiaFilters}
              onToggleFilter={f =>
                setAlcaldiaFilters(prev =>
                  prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
                )
              }
              onClear={() => setAlcaldiaFilters([])}
            />
          </Row>
          <Row label="Sin filtros activos">
            <FilterBar activeFilters={[]} onToggleFilter={() => {}} onClear={() => {}} />
          </Row>
        </Section>
        {/* historia del riesgos */}
        {/* MetricCard */}
        <Section id="MetricCard" title="MetricCard" description="Tarjeta de métrica con label, valor principal, sublabel con color opcional e ícono.">
          <Row label="Variantes">
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ width: 180 }}>
                <MetricCard label="Índice Actual" value={78} sub="+5 vs mes anterior" subColor="text-emerald-600" icon={<BarChart2 size={16} />} />
              </div>
              <div style={{ width: 180 }}>
                <MetricCard label="Promedio Mensual" value={80.5} sub="Últimos 12 meses" />
              </div>
              <div style={{ width: 180 }}>
                <MetricCard label="Máximo Registrado" value={90} sub="Hace 3 meses" />
              </div>
              <div style={{ width: 180 }}>
                <MetricCard label="Tendencia" value="Mejorando" sub="Positiva" subColor="text-emerald-600" />
              </div>
            </div>
          </Row>
        </Section>
        {/*MetricsRow*/}
        <Section id="MetricsRow" title="MetricsRow" description="Fila de cuatro MetricCard calculadas a partir de la serie de datos histórica.">
          <div style={{ overflowX: 'auto' }}>
            <MetricsRow metricas={SAMPLE_METRICAS} />
          </div>
        </Section>
        {/* SanidadChart */}
        <Section id="SanidadChart" title="SanidadChart" description="Área chart de Recharts con índice de sanidad ambiental (línea azul) y tendencia (línea gris punteada).">
          <div style={{ height: 320 }}>
            <SanidadChart data={DATA_CDMX} />
          </div>
        </Section>
        {/* para el HOY no circula */}
        {/* CirculaCalendarDay */}
        <Section id="CirculaCalendarDay" title="CirculaCalendarDay" description="Celda de día del calendario con estado seleccionado, con restricción (punto azul) y sin restricción.">
          <Row label="Estados">
            <CirculaCalendarDay date={new Date(2026, 3, 20)} isSelected={false} isRestricted={true}  onClick={() => {}} />
            <CirculaCalendarDay date={new Date(2026, 3, 21)} isSelected={true}  isRestricted={true}  onClick={() => {}} />
            <CirculaCalendarDay date={new Date(2026, 3, 26)} isSelected={false} isRestricted={false} onClick={() => {}} />
            <CirculaCalendarDay date={new Date(2026, 3, 19)} isSelected={true}  isRestricted={false} onClick={() => {}} />
          </Row>
        </Section>
        {/* CalendarCard */}
        <Section id="CalendarCard" title="CalendarCard" description="Calendario mensual interactivo con navegación de mes, días restringidos marcados y leyenda.">
          <div style={{ maxWidth: 380, height: 400 }}>
            <CalendarCard
              selectedDate={calSelected}
              currentMonth={calMonth}
              restrictedDates={restrictedDates}
              onSelectDate={setCalSelected}
              onPrevMonth={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
              onNextMonth={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
            />
          </div>
        </Section>
        {/* EstadoDiaCard */}
        <Section id="EstadoDiaCard" title="EstadoDiaCard" description="Tarjeta con el nombre del día, fecha y estado (Protocolo Activo vs Sin restricciones).">
          <Row label="Con restricción (lunes)">
            <div style={{ width: 340 }}>
              <EstadoDiaCard date={WEEKDAY_DATE} restriction={SAMPLE_RESTRICTION} />
            </div>
          </Row>
          <Row label="Sin restricción (domingo)">
            <div style={{ width: 340 }}>
              <EstadoDiaCard date={new Date(2026, 3, 19)} restriction={null} />
            </div>
          </Row>
        </Section>
        {/* HologramasCard */}
        <Section id="HologramasCard" title="HologramasCard" description="Lista de hologramas con badge de color, estado restringido/exento e ícono de prohibición o check.">
          <Row label="Ejemplo">
            <div style={{ width: 320 }}>
              <HologramasCard hologramas={SAMPLE_RESTRICTION.hologramas} />
            </div>
          </Row>
        </Section>
        {/*InfoNota */}
        <Section id="InfoNota" title="InfoNota" description="Nota informativa azul sin props; advierte que las restricciones pueden cambiar por contingencias.">
          <Row label="Default">
            <div style={{ maxWidth: 480, width: '100%' }}>
              <InfoNota />
            </div>
          </Row>
        </Section>
        {/* PlacasRestringidasCard */}
        <Section id="PlacasRestringidasCard" title="PlacasRestringidasCard" description="Tarjeta con terminaciones de placa restringidas y horario de la restricción.">
          <Row label="Lunes (terminación 3 y 4)">
            <div style={{ width: 320 }}>
              <PlacasRestringidasCard restriction={SAMPLE_RESTRICTION} />
            </div>
          </Row>
        </Section>
        {/* mapa de riesgos */}
        {/* QuickStatsCard  */}
        <Section id="QuickStatsCard" title="QuickStatsCard" description="Grupo de tres tarjetas compactas con estadísticas rápidas (zonas en riesgo, población afectada, zonas seguras).">
          <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
            <QuickStatsCard />
          </div>
        </Section>
        {/* SidebarAlcaldias */}
        <Section id="SidebarAlcaldias" title="SidebarAlcaldias" description="Panel lateral con lista de las 16 alcaldías de la CDMX, nivel de riesgo y botón de detalle. Usa useRiskStore.">
          <div style={{ height: 480, width: 320 }}>
            <SidebarAlcaldias />
          </div>
        </Section>
        {/* TemporalControl */}
        <Section id="TemporalControl" title="TemporalControl" description="Control deslizante que permite navegar la hora del día (00:00–23:59) para visualizar riesgos históricos. Usa useRiskStore.">
          <div style={{ maxWidth: 560, width: '100%' }}>
            <TemporalControl />
          </div>
        </Section>
        <div style={{ height: 60 }} />
      </main>
    </div>
  );
}

