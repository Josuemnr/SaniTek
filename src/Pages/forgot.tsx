import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle, RefreshCw } from 'lucide-react';
import { Globe3D } from '../Components/modules/login/Globe3D';
import { CustomImput } from '../Components/modules/login/CustomImput';
import { PrimaryButton } from '../Components/modules/login/PrimaryButton';

type Step = 'email' | 'success';

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(20, 35, 90, 0.72)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: '1px solid rgba(100, 140, 255, 0.25)',
  padding: '40px 36px',
  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
  width: '380px',
};

const BACK_LINK: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  color: '#90cdf4', fontSize: '0.85rem', textDecoration: 'none',
};

export default function ForgotPassword() { //para olvidar contraseña
  const [email,     setEmail]     = useState('');
  const [error,     setError]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step,      setStep]      = useState<Step>('email');

  const handleSubmit = () => {
    setError('');
    if (!email.trim()) { setError('Por favor ingresa tu correo.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Formato de correo inválido.'); return; }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1800);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#060b1a', fontFamily: 'sans-serif' }}>

      <Globe3D />

      {/* Gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,11,26,0.3) 0%, transparent 50%, rgba(6,11,26,0.5) 100%)' }} />

      {/* Card — centered */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
        <AnimatePresence mode="wait">

          {/* ── STEP 1: Email ── */}
          {step === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={CARD_STYLE}
            >
              {/* Icon + title */}
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(100,140,255,0.12)', border: '1px solid rgba(100,140,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Mail size={28} color="#90cdf4" />
                </div>
                <h1 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>
                  ¿Olvidaste tu contraseña?
                </h1>
                <p style={{ color: '#a0aec0', fontSize: '0.88rem', marginTop: 10, lineHeight: 1.6, margin: '10px 0 0' }}>
                  Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                </p>
              </div>

              {/* Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <CustomImput
                  label="Correo electrónico"
                  placeholder="tu@correo.com"
                  value={email}
                  onChangeText={v => { setEmail(v); setError(''); }}
                />

                {error && (
                  <p style={{ color: '#fc8181', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>
                    {error}
                  </p>
                )}

                <PrimaryButton
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  text="Enviar enlace de recuperación"
                  loadingText="Enviando..."
                />

                <Link to="/" style={BACK_LINK}>
                  <ArrowLeft size={14} />
                  Volver al inicio de sesión
                </Link>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Success ── */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={CARD_STYLE}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>

                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                  style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(72,187,120,0.12)', border: '1px solid rgba(72,187,120,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CheckCircle size={36} color="#68d391" />
                </motion.div>

                <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                  ¡Enlace enviado!
                </h2>

                <p style={{ color: '#a0aec0', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                  Hemos enviado un enlace de recuperación a
                </p>
                <p style={{ color: '#90cdf4', fontWeight: 600, fontSize: '0.95rem', margin: 0, wordBreak: 'break-all' }}>
                  {email}
                </p>

                <p style={{ color: '#718096', fontSize: '0.82rem', margin: 0, lineHeight: 1.55 }}>
                  Revisa tu bandeja de entrada y sigue las instrucciones.<br />
                  El enlace expirará en <span style={{ color: '#a0aec0' }}>30 minutos</span>.
                </p>

                {/* Divider */}
                <div style={{ width: '100%', height: 1, background: 'rgba(100,140,255,0.15)', margin: '4px 0' }} />

                {/* Buttons */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {/* Reenviar — outlined style */}
                  <button
                    onClick={handleResend}
                    disabled={isLoading}
                    style={{ width: '100%', height: 56, borderRadius: 16, border: '1px solid rgba(100,140,255,0.35)', background: 'rgba(100,140,255,0.08)', color: '#90cdf4', fontWeight: 700, fontSize: '1rem', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: isLoading ? 0.6 : 1, transition: 'all 0.2s' }}
                  >
                    <RefreshCw size={16} />
                    {isLoading ? 'Reenviando...' : 'Reenviar enlace'}
                  </button>

                  <Link to="/" style={BACK_LINK}>
                    <ArrowLeft size={14} />
                    Volver al inicio de sesión
                  </Link>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
