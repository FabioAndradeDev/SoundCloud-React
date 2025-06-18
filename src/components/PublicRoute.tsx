import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * @component PublicRoute
 * @description Um container de rota que protege rotas públicas (como Login, Register).
 * Se o usuário JÁ ESTIVER autenticado, ele é redirecionado para a home.
 * Caso contrário, ele pode ver a rota pública.
 */
export default function PublicRoute() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/app/home" replace />;
  }

  return <Outlet />;
} 