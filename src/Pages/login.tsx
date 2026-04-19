import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Globe3D } from '../Components/modules/login/Globe3D';
import { motion } from 'framer-motion';
import { CustomImput } from '../Components/modules/login/CustomImput';
import { PrimaryButton } from '../Components/modules/login/PrimaryButton';
import { PantallaCarga } from '../Components/modules/login/Pantalla_Carga';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Por favor, llena todos los campos.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => { //para simular datos fake de login
      if (email === 'josue@sanitek.com' && password === '12345') {
        navigate('/Gestion_Usuarios', { replace: true });
      } else {
        setIsLoading(false);
        setErrorMessage('Correo o contraseña incorrectos.');
      }
    }, 1500);
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
              onClick={handleLogin}
              isLoading={isLoading}
              text="⮕  Iniciar Sesión"
              loadingText="Ingresando..."
            />

            <Link
              to="/forgot" //para ir a la página de olvidar contraseña
              style={{ display: 'block', textAlign: 'center', color: '#90cdf4', fontSize: '0.85rem', textDecoration: 'underline' }}
            >
              Forgot password?
            </Link>
          </div>
        </motion.div>
      </div>

      <PantallaCarga isVisible={isLoading} mensaje="Iniciando sesión..." />
    </div>
  );
}
