import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../Services/authService';
import { Globe3D } from '../Components/modules/login/Globe3D';
import { motion } from 'framer-motion';
import { CustomImput } from '../Components/modules/login/CustomImput';
import { PrimaryButton } from '../Components/modules/login/PrimaryButton';
import { PantallaCarga } from '../Components/modules/login/Pantalla_Carga';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const handleLogin = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Por favor, llena todos los campos.');
      return;
    }
    setIsLoading(true);
    try {
      const token = await loginUser(email, password);
      console.log('Backend ID Token:', token);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      const message = err instanceof Error ? err.message : '';
      if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        setErrorMessage('Correo o contraseña incorrectos.');
      } else if (code === 'auth/invalid-email') {
        setErrorMessage('El formato del correo no es válido.');
      } else if (code === 'auth/too-many-requests') {
        setErrorMessage('Demasiados intentos. Intenta más tarde.');
      } else if (message.includes('Invalid email or password') || message.includes('401')) {
        setErrorMessage('Correo o contraseña incorrectos.');
      } else if (message.includes('Firebase web API key is not configured')) {
        setErrorMessage('El backend no tiene configurada la API key de Firebase.');
      } else {
        setErrorMessage('Ocurrió un error. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#060b1a', fontFamily: 'sans-serif' }}>

      {/* GLOBO 3D DE FONDO, importado */}
      <Globe3D />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,11,26,0.3) 0%, transparent 50%, rgba(6,11,26,0.5) 100%)' }} />
      <div style={{ position: 'absolute', bottom: '5%', right: '4%', width: '380px', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            background: 'rgba(20, 35, 90, 0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(100, 140, 255, 0.25)',
            padding: '40px 36px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* Encabezado */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ color: 'white', fontSize: '2rem', fontWeight: 700, margin: 0 }}>Inicia Sesión</h1>
            <p style={{ color: '#a0aec0', fontSize: '0.95rem', marginTop: '8px' }}>Bienvenido de vuelta!</p>
          </div>

          {/* Inputs y botón con los componetes */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <CustomImput
              label="Email"
              placeholder="Correo"
              value={email}
              onChangeText={setEmail}
            />
            <CustomImput
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
              value={password}
              onChangeText={setPassword}
            />

            {errorMessage && (
              <p style={{ color: '#fc8181', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>{errorMessage}</p>
            )}

            <PrimaryButton
              type="submit"
              isLoading={isLoading}
              text="⮕  Iniciar Sesión"
              loadingText="Ingresando..."
            />

            <Link
              to="/forgot" // para ir a la página de olvidar contraseña
              style={{ display: 'block', textAlign: 'center', color: '#90cdf4', fontSize: '0.85rem', textDecoration: 'underline' }}
            >
              Forgot password?
            </Link>
          </form>
        </motion.div>
      </div>

      <PantallaCarga isVisible={isLoading} mensaje="Iniciando sesión..." />
    </div>
  );
}
