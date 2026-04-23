import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Puedes poner un spinner o pantalla de carga aquí
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#060b1a]">
        <div className="text-white">Cargando sesión...</div>
      </div>
    );
  }

  if (!user) {
    // Redirigir al login si no hay usuario, guardando la ubicación original
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
