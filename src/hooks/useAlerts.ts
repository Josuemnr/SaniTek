import { useEffect, useState } from 'react';
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
        const subscription = activeAlerts.find(
          (alert) => alert.municipality.id === municipalityId
        );
        setIsSubscribed(Boolean(subscription));
        setAlertId(subscription?.id ?? null);
      } catch (error) {
        console.error('[useAlerts] error al consultar suscripcion:', error);
        setIsSubscribed(false);
        setAlertId(null);
      }
    };

    void checkSubscription();
  }, [userId, municipalityId]);

  const toggleSubscription = async () => {
    if (!userId || !municipalityId) {
      toast.error(!userId ? 'Debes iniciar sesion para suscribirte' : 'No se pudo identificar la alcaldia');
      return;
    }

    setLoading(true);
    try {
      if (isSubscribed && alertId) {
        await api.alerts.deactivate(alertId);
        setIsSubscribed(false);
        setAlertId(null);
        toast.success('Suscripcion cancelada');
        return;
      }

      const alert = await api.alerts.subscribe(userId, municipalityId);
      setIsSubscribed(true);
      setAlertId(alert.id);
      toast.success('Te avisaremos cuando el riesgo sea alto');
    } catch (error) {
      console.error('[useAlerts] error al cambiar suscripcion:', error);
      toast.error(error instanceof Error ? error.message : 'Ocurrio un error al procesar tu solicitud');
    } finally {
      setLoading(false);
    }
  };

  return { isSubscribed, toggleSubscription, loading };
}
