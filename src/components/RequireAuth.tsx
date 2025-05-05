import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RequireAuthProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

export const RequireAuth = ({ children, adminOnly = false }: RequireAuthProps) => {
  const { user } = useAuth();

  // For admin routes, bypass authentication
  if (adminOnly) {
    return children;
  }

  // For regular user routes, require authentication
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};