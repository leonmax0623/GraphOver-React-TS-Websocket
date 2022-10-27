import { Navigate, Outlet } from 'react-router-dom';
import { useLocalStorage } from 'shared/hooks';

export const PrivateRoute = ({ toHome = false }) => {
  const [auth] = useLocalStorage('access_token', '', true);
  return auth ? <Outlet /> : toHome ? <Navigate to="/catalog" /> : <Navigate to="/login" />;
};

export const UnAuthRoute = () => {
  const [auth] = useLocalStorage('access_token', '', true);
  return auth && auth !== null ? <Navigate to="/catalog" /> : <Outlet />;
};
