import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'client' | 'manager')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role as any)) {
    // Logged in but doesn't have the right role, redirect to their home
    if (role === 'admin') return <Navigate to="/workspace" replace />;
    if (role === 'client') return <Navigate to="/portal" replace />;
    if (role === 'manager') return <Navigate to="/operations" replace />;
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
