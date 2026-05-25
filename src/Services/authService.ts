import { api, type LoginApiResponse, type UserApiResponse } from './backendApi';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const AUTH_USER_KEY = 'authUser';

export interface AuthSessionUser {
  id: number;
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN' | null;
  backendUser: UserApiResponse;
}

export interface AuthSession {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthSessionUser;
}

export const loginUser = async (email: string, password: string): Promise<string> => {
  const session = toAuthSession(await api.auth.login({ email, password }));
  saveAuthSession(session);
  window.dispatchEvent(new Event('auth-session-changed'));
  return session.token;
};

export function getStoredAuthSession(): AuthSession | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const userJson = localStorage.getItem(AUTH_USER_KEY);

  if (!token || !refreshToken || !userJson) return null;

  try {
    return {
      token,
      refreshToken,
      expiresIn: 0,
      user: JSON.parse(userJson) as AuthSessionUser,
    };
  } catch {
    clearAuthSession();
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  window.dispatchEvent(new Event('auth-session-changed'));
}

function saveAuthSession(session: AuthSession) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(REFRESH_TOKEN_KEY, session.refreshToken);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user));
}

function toAuthSession(response: LoginApiResponse): AuthSession {
  return {
    token: response.idToken,
    refreshToken: response.refreshToken,
    expiresIn: response.expiresIn,
    user: {
      id: response.user.id,
      uid: response.user.firebaseUid,
      email: response.user.email,
      displayName: response.user.names,
      role: response.user.role?.roleName ?? null,
      backendUser: response.user,
    },
  };
}
