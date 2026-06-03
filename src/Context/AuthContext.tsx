import React, { useEffect, useState, ReactNode } from 'react';
import {
  clearAuthSession,
  getStoredAuthSession,
  type AuthSessionUser,
} from '../Services/authService';
import type { UserRole } from '../Services/backendApi';
import { AuthContext } from './auth-context';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthSessionUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncSession = () => {
      const session = getStoredAuthSession();
      setUser(session?.user ?? null);
      setRole(session?.user.role ?? null);
      setLoading(false);
    };

    syncSession();
    window.addEventListener('auth-session-changed', syncSession);
    window.addEventListener('storage', syncSession);

    return () => {
      window.removeEventListener('auth-session-changed', syncSession);
      window.removeEventListener('storage', syncSession);
    };
  }, []);

  const logout = async () => {
    clearAuthSession();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#060b1a' }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

