import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MusicPlayer from '../components/MusicPlayer';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useMusic } from '../contexts/MusicContext';

/**
 * @component MainLayout
 * @description Layout principal da aplicação, contendo a estrutura com sidebar,
 * cabeçalho (para mobile), área de conteúdo principal e o player de música.
 * Gerencia o estado da sidebar no modo mobile.
 *
 * @param {object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - O conteúdo da página a ser renderizado dentro do layout.
 */
export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-surface to-surface-light">
      {/* ============================================= */}
      {/* Cabeçalho Mobile */}
      {/* Fica fixo no topo e só é visível em telas pequenas (lg:hidden) */}
      {/* ============================================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-surface-light/20">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-text-primary hover:text-primary z-50"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <Link to="/app" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Under Sound
          </Link>
          <div className="w-6" /> {/* Espaçador para centralizar o título */}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ============================================= */}
        {/* Sidebar para Desktop */}
        {/* Visível apenas em telas grandes (hidden lg:block) */}
        {/* ============================================= */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* ============================================= */}
        {/* Sidebar para Mobile (Animada) */}
        {/* Aparece com animação quando isSidebarOpen é true */}
        {/* ============================================= */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)} // Fecha ao clicar fora
            >
              <div onClick={(e) => e.stopPropagation()}>
                <Sidebar />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================= */}
        {/* Conteúdo Principal */}
        {/* Ocupa o espaço restante e tem scroll próprio */}
        {/* ============================================= */}
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* ============================================= */}
      {/* Player de Música Fixo na Base */}
      {/* O Player é autossuficiente e pega tudo do MusicContext */}
      {/* ============================================= */}
      <MusicPlayer />
    </div>
  );
} 