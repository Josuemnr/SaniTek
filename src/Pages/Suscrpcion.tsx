import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { Sidebar } from '../Components/Sidebar';
import { PlanCard } from '../Components/modules/suscrpcion/PlanCard';
import { PaymentCard } from '../Components/modules/suscrpcion/PaymentCard';
import type { CardData } from '../Components/modules/suscrpcion/PaymentCard';
import { AddPaymentCard } from '../Components/modules/suscrpcion/AddPaymentCard';
import { PaymentHistoryTable } from '../Components/modules/suscrpcion/PaymentHistoryTable';
import type { PaymentRecord } from '../Components/modules/suscrpcion/PaymentHistoryTable';
import { AddCardModal } from '../Components/modules/suscrpcion/AddCardModal';
import { ConfirmModal } from '../Components/modules/suscrpcion/ConfirmModal';

const INITIAL_CARDS: CardData[] = [
  { id: 1, last4: '4242', holder: 'Josue M', expiry: '08/27', isDefault: true },
];

const PAYMENT_HISTORY: PaymentRecord[] = [
  { id: 1, date: '10 Mar 2026', description: 'Suscripción Premium - Mensual', status: 'Pagado', amount: 17000.00 },
  { id: 2, date: '10 Feb 2026', description: 'Suscripción Premium - Mensual', status: 'Pagado', amount: 17000.00 },
  { id: 3, date: '10 Ene 2026', description: 'Suscripción Premium - Mensual', status: 'Pagado', amount: 17000.00 },
  { id: 4, date: '10 Dic 2025', description: 'Suscripción Premium - Mensual', status: 'Pagado', amount: 17000.00 },
  { id: 5, date: '10 Nov 2025', description: 'Suscripción Premium - Mensual', status: 'Pagado', amount: 17000.00 },
];

type Modal = 'cancelPlan' | 'addCard' | 'confirmDelete' | null;

export default function Suscrpcion() {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [modal, setModal] = useState<Modal>(null);
  const [cardToDelete, setCardToDelete] = useState<CardData | null>(null);

  const handleAddCard = (data: Omit<CardData, 'id'>) => {
    const newCard: CardData = { id: Date.now(), ...data };
    setCards(prev =>
      data.isDefault
        ? [newCard, ...prev.map(c => ({ ...c, isDefault: false }))]
        : [...prev, newCard]
    );
  };

  const handleDeleteCard = (card: CardData) => {
    setCardToDelete(card);
    setModal('confirmDelete');
  };

  const confirmDelete = () => {
    if (cardToDelete) setCards(prev => prev.filter(c => c.id !== cardToDelete.id));
    setCardToDelete(null);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Sidebar />
    <div style={{ flex: 1, background: '#f8fafc', padding: '36px 32px', boxSizing: 'border-box', textAlign: 'left' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        
        <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: '#111827' }}>Administración de Suscripción</h1>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>Gestiona tu plan y métodos de pago</p>
        </div>

        {/* Plan card */}
        <div style={{ marginBottom: 36 }}>
          <PlanCard onCancelPlan={() => setModal('cancelPlan')} />
        </div>

        {/* Payment methods section */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#111827' }}>Métodos de Pago</h2>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LayoutGrid size={15} color="#6b7280" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cards.map(card => (
              <PaymentCard
                key={card.id}
                card={card}
                onEdit={() => {}}
                onDelete={handleDeleteCard}
              />
            ))}
            <AddPaymentCard onClick={() => setModal('addCard')} />
          </div>
        </div>

        {/* Payment history section */}
        <div>
          <h2 style={{ margin: '0 0 16px', fontSize: 17, fontWeight: 700, color: '#111827' }}>Historial de Pagos</h2>
          <PaymentHistoryTable records={PAYMENT_HISTORY} />
        </div>

      </div>

      {/* Modals */}
      {modal === 'cancelPlan' && (
        <ConfirmModal
          title="Cancelar Plan"
          message="¿Seguro que deseas cancelar tu suscripción Sanitek Premium? Perderás acceso al finalizar el período actual (10 Abril 2026)."
          confirmLabel="Sí, cancelar plan"
          onConfirm={() => {}}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'addCard' && (
        <AddCardModal onClose={() => setModal(null)} onSave={handleAddCard} />
      )}
      {modal === 'confirmDelete' && cardToDelete && (
        <ConfirmModal
          title="Eliminar tarjeta"
          message={`¿Seguro que deseas eliminar la tarjeta que termina en ${cardToDelete.last4}? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          onConfirm={confirmDelete}
          onClose={() => { setModal(null); setCardToDelete(null); }}
        />
      )}
    </div>
    </div>
  );
}
