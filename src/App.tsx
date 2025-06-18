import { Outlet } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';

/**
 * @component App
 * @description Componente raiz para as rotas autenticadas da aplicação.
 * Ele renderiza o layout principal que contém a sidebar e o player,
 * e usa o <Outlet /> do React Router para renderizar a página
 * filha correspondente à rota atual.
 */
export default function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
