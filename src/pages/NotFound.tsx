import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * @page NotFound
 * @description Página exibida quando uma rota não é encontrada (404).
 * Mostra uma mensagem de erro amigável e um link para voltar para a Home.
 */
export default function NotFound() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Ocorreu um erro desconhecido.';
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white p-8">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-8xl font-black text-primary tracking-tighter">Oops!</h1>
        <p className="text-2xl mt-4">Página Não Encontrada</p>
        <p className="text-text-secondary mt-2">
          A página que você está procurando não existe ou foi movida.
        </p>
        <p className="text-text-secondary mt-1">
          <i>{errorMessage}</i>
        </p>
        <Link to="/app/home" className="btn btn-primary mt-8">
          Voltar para a Home
        </Link>
      </motion.div>
    </div>
  );
} 