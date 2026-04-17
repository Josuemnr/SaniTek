import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // La magia de las animaciones web
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Asumiremos que pondrás tus componentes web en src/components/
import { CustomInput } from '../Components/CustomImput';
import { PantallaCarga } from '../Components/Pantalla_Carga';

// Utilidad estándar de shadcn para fusionar clases de Tailwind
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function LoginScreen() {
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

    setTimeout(() => {
      const mockUsers = [
        { email: 'prueba@sanitek.com', password: '12345', role: 'Administrador' }
      ];
      
      const user = mockUsers.find(
        (u) => u.email === email.toLowerCase().trim() && u.password === password
      );
      
      if (user) {
        // En web usamos navigate en lugar de router.replace
        navigate('/Gestion_Usuarios', { replace: true }); 
      } else {
        setIsLoading(false); 
        setErrorMessage('Correo o contraseña incorrectos.');
      }
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden relative">
      
      {/* IMAGEN DE FONDO ANIMADA (PLANETA ROTANDO) con Framer Motion */}
      <motion.img
        src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop"
        alt="Planeta girando"
        className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] opacity-40 object-cover pointer-events-none"
        // Esta línea reemplaza todo el Animated.loop y el useEffect de React Native
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      />
      
      {/* Contenedor derecho para el formulario */}
      <div className="flex-1 flex justify-center lg:justify-end items-center p-8 lg:p-24 z-10" >
        
        {/* TARJETA DE LOGIN con animación de entrada flotante */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-slate-900/80 p-10 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-md"
        >
          <div className="mb-10">
            <h1 className="text-3xl text-white font-bold tracking-tight">Inicia Sesión</h1>
            <p className="text-slate-400 text-base mt-2">Plataforma de Riesgo Sanitario</p>
          </div>

          <div className="flex flex-col space-y-6">
            <CustomInput
              label="Email" 
              placeholder="usuario@sanitek.com" 
              value={email}
              onChangeText={setEmail}
            />
            
            <CustomInput
              label="Contraseña" 
              placeholder="********" 
              type="password" 
              value={password}
              onChangeText={setPassword}
            />

            {errorMessage && (
              <p className="text-red-400 text-sm font-medium text-center mt-2">
                {errorMessage}
              </p>
            )}
            
            <button 
              onClick={handleLogin}
              disabled={isLoading} 
              className={cn(
                "w-full bg-blue-600 rounded-xl h-14 shadow-lg hover:bg-blue-500 active:bg-blue-700 transition-colors flex items-center justify-center mt-2",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="font-semibold italic text-white text-lg">
                Ingresar al Sistema
              </span>
            </button>

            <Link 
              to="/forgot" 
              className="mt-4 self-center text-slate-400 text-sm hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </motion.div>

      </div>

      <PantallaCarga isVisible={isLoading} mensaje="Iniciando sesión..." />

    </div>
  );
}