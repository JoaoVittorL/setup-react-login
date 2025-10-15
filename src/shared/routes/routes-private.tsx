import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';

interface PrivateRouteProps {
  element: ReactNode;
  requiredRole?: string;
}

const PrivateRoute = ({ element, requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  console.log('UserType', user?.type);
  console.log('Required Role', requiredRole);
  if (requiredRole && user?.type !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
