import { Navigate } from 'react-router-dom';
import useAuth from '../context/auth';

interface PublicRouteProps {
  element: React.ReactElement;
  redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, redirectTo = '/home' }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

export default PublicRoute;
