import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  MusicalNoteIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

/**
 * @constant navigation
 * @description Array de objetos que define os itens da navegação principal da sidebar.
 * Cada objeto contém o nome da rota, o caminho (href) e o ícone correspondente.
 */
const navigation = [
  { name: 'Início', href: '/app/home', icon: HomeIcon },
  { name: 'Buscar', href: '/app/search', icon: MagnifyingGlassIcon },
  { name: 'Músicas Curtidas', href: '/app/liked-songs', icon: HeartIcon },
  { name: 'Minhas Playlists', href: '/app/my-playlists', icon: MusicalNoteIcon },
  { name: 'Enviar Música', href: '/app/upload', icon: ArrowUpTrayIcon },
];

/**
 * @component Sidebar
 * @description A barra lateral de navegação da aplicação.
 * Exibe links para as principais seções e um link para o perfil do usuário.
 * Destaca o link da página ativa.
 */
export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const linkClasses = 'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors';
  const activeLinkClasses = 'bg-surface-light text-white';
  const inactiveLinkClasses = 'text-text-secondary hover:bg-surface-light hover:text-white';

  return (
    <div className="w-64 bg-black h-full p-6 flex flex-col text-white">
      {/* --- Logo --- */}
      <Link to="/app/home" className="text-2xl font-bold mb-10 text-white hover:text-primary transition-colors">
        UnderSound
      </Link>
      
      {/* --- Navegação Principal --- */}
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`${linkClasses} ${
              location.pathname === item.href ? activeLinkClasses : inactiveLinkClasses
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* --- Seção do Perfil --- */}
      <div className="mt-auto">
        <Link
          to="/app/profile"
          className={`${linkClasses} ${
            location.pathname === '/app/profile' ? activeLinkClasses : inactiveLinkClasses
          }`}
        >
          {user?.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={user.username} 
              className="w-8 h-8 rounded-full object-cover" 
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center">
              <span className="text-white font-bold">{user?.username?.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <span>Meu Perfil</span>
        </Link>
      </div>
    </div>
  );
} 