import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'admin' | 'client' | 'manager' | null;

interface AuthContextType {
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('flowinvoice_role') as Role;
    if (savedRole) {
      setRole(savedRole);
    }
    setIsLoading(false);
  }, []);

  const login = (newRole: Role) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('flowinvoice_role', newRole);
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('flowinvoice_role');
  };

  if (isLoading) {
    return null; // Prevent flicker on initial load
  }

  return (
    <AuthContext.Provider value={{ role, login, logout, isAuthenticated: !!role }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
