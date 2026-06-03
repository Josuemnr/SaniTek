import { createContext } from 'react';
import type { AuthSessionUser } from '@/Services/authService';
import type { UserRole } from '@/Services/backendApi';

export interface AuthContextType {
  user: AuthSessionUser | null;
  role: UserRole | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
