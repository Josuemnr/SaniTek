import { useState, useEffect } from 'react';
import { api } from '@/Services/backendApi';
import { toast } from 'sonner';

export function useAlerts(userId: number | null, municipalityId: number | null) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertId, setAlertId] = useState<number | null>(null);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!userId || !municipalityId) {
        setIsSubscribed(false);
        setAlertId(null);
        return;
      }

      try {
        const activeAlerts = await api.alerts.listActiveByUser(userId);
        const sub = activeAlerts.find(a => a.municipality.id === municipalityId);
        setIsSubscribed(!!sub);
        setAlertId(sub?.id ?? null);
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };

    void checkSubscription();
  }, [userId, municipalityId]);

  const toggleSubscription = async () => {
    if (!userId || !municipalityId) {
      toast.error('Debes iniciar sesión para suscribirte');
      return;
    }

    setLoading(true);
    try {
      if (isSubscribed && alertId) {
        await api.alerts.deactivate(alertId);
        setIsSubscribed(false);
        setAlertId(null);
        toast.success('Suscripción cancelada');
      } else {
        const res = await api.alerts.subscribe(userId, municipalityId);
        setIsSubscribed(true);
        setAlertId(res.id);
        toast.success('¡Te avisaremos cuando el riesgo sea alto!');
      }
    } catch (error) {
      console.error('Error toggling subscription:', error);
      toast.error('Ocurrió un error al procesar tu solicitud');
    } finally {
      setLoading(false);
    }
  };

  return { isSubscribed, toggleSubscription, loading };
}
