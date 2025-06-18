import React, { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * @component PrivateRoute
 * @description Um componente de ordem superior que protege rotas.
 * Verifica se o usuário está autenticado. Se estiver, renderiza o componente filho.
 * Caso contrário, redireciona o usuário para a página de login, salvando a rota
 * que ele tentou acessar para que possa ser redirecionado de volta após o login.
 * @param {{ children: ReactNode }} props - As propriedades do componente, incluindo os filhos a serem renderizados.
 * @returns {ReactNode} O componente filho ou um redirecionamento.
 */
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redireciona para a página de login, mas mantém o caminho que o usuário tentou acessar
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute; 