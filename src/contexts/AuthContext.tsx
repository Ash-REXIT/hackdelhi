import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, setToken } from '@/lib/api';
import type { BackendRole, User } from '@/types/api';

export type UIRole = 'admin' | 'client' | 'manager';

interface AuthContextType {
  role: UIRole | null;
  user: User | null;
  login: (email: string) => Promise<void>;
  completeOAuthLogin: (token: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function backendToUiRole(role: BackendRole): UIRole {
  if (role === 'FINOPS') return 'admin';
  if (role === 'CLIENT') return 'client';
  return 'manager';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('flowinvoice_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const me = await api<User>('/api/auth/me');
      setUser(me);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email: string) => {
    const res = await api<{ token: string; user: User }>('/api/auth/dev-login', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    setToken(res.token);
    setUser(res.user);
    localStorage.setItem('flowinvoice_role', backendToUiRole(res.user.role));
  };

  const completeOAuthLogin = async (token: string): Promise<User> => {
    setToken(token);
    const me = await api<User>('/api/auth/me');
    setUser(me);
    localStorage.setItem('flowinvoice_role', backendToUiRole(me.role));
    return me;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('flowinvoice_role');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center text-muted-foreground">
        Loading FlowInvoice AI...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        role: user ? backendToUiRole(user.role) : null,
        user,
        login,
        completeOAuthLogin,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
