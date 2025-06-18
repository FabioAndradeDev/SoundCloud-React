import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';

/**
 * @type AuthContextType
 * @description Define a forma do contexto de autenticação, incluindo o usuário
 * e as funções para manipular a autenticação.
 */
export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, username: string) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
};

/**
 * Contexto de Autenticação.
 * Usado para prover os dados de autenticação para toda a aplicação.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados mockados para teste
const mockUser: User = {
  id: '1',
  username: 'usuario_teste',
  email: 'teste@exemplo.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=teste@exemplo.com',
  followers: 0,
  following: 0,
  playlists: [],
  likedSongs: [],
  likedPlaylists: [],
  likedArtists: [],
};

/**
 * Provedor do Contexto de Autenticação.
 * @param {object} props - Propriedades do componente.
 * @param {ReactNode} props.children - Componentes filhos que terão acesso ao contexto.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  /**
   * Efeito que roda uma vez na inicialização para verificar se há um usuário
   * salvo no localStorage e restaurar a sessão.
   */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Falha ao carregar usuário do localStorage:', error);
      localStorage.removeItem('user');
    }
  }, []);

  /**
   * Função de login.
   * Simula a autenticação e salva o usuário no estado e no localStorage.
   */
  const login = async (email: string, password: string) => {
    console.log('Tentativa de login com:', { email, password });
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios.');
    }
    // Lógica de autenticação simulada
    const mockUser: User = {
      id: `user-${Date.now()}`,
      username: 'Usuário Logado',
      email: email,
      avatarUrl: 'https://i.pravatar.cc/150?u=loggeduser',
      followers: 123,
      following: 45,
      playlists: [],
      likedSongs: [],
      likedPlaylists: [],
      likedArtists: [],
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  /**
   * Função de logout.
   * Limpa os dados do usuário do estado e do localStorage.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  /**
   * Função de registro.
   * Simula a criação de um novo usuário e o loga automaticamente.
   */
  const register = async (email: string, password: string, username: string) => {
    console.log('Tentativa de registro com:', { email, password, username });
    if (!email || !password || !username) {
      throw new Error('Todos os campos são obrigatórios.');
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      avatarUrl: `https://i.pravatar.cc/150?u=${username}`,
      followers: 0,
      following: 0,
      playlists: [],
      likedSongs: [],
      likedPlaylists: [],
      likedArtists: [],
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  
  /**
   * Função para atualizar os dados do usuário logado.
   * @param {Partial<User>} data - Dados parciais do usuário a serem atualizados.
   */
  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook customizado para consumir o AuthContext.
 * Garante que o hook só possa ser usado dentro de um AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 