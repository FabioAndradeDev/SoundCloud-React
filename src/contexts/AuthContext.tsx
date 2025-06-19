import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import api from '../utils/api'; // Importa nossa instância do axios
import { jwtDecode } from 'jwt-decode'; // Importa a função para decodificar o token

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
   * Efeito que roda uma vez na inicialização para verificar se há um token
   * salvo no localStorage e restaurar a sessão.
   */
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Se tivermos um endpoint para buscar dados do usuário, chamaríamos ele aqui.
        // Por agora, vamos criar um usuário a partir do token.
        const decodedToken: { sub: string } = jwtDecode(token);
        const userFromToken: User = {
            id: decodedToken.sub, // Usando o email/login como ID por enquanto
            username: decodedToken.sub.split('@')[0], // Deriva um username
            email: decodedToken.sub,
            avatarUrl: `https://i.pravatar.cc/150?u=${decodedToken.sub}`,
            // Preenchendo o resto dos campos obrigatórios
            followers: 0,
            following: 0,
            playlists: [],
            likedSongs: [],
            likedPlaylists: [],
            likedArtists: [],
        };
        setUser(userFromToken);
        // O token já está no localStorage, não precisamos fazer nada
      }
    } catch (error) {
      console.error('Falha ao processar token do localStorage:', error);
      localStorage.removeItem('token');
    }
  }, []);

  /**
   * Função de login real.
   * Autentica na API, salva o token e atualiza o estado do usuário.
   */
  const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { login: email, password });
        const { token } = response.data;

        if (token) {
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configura o header para futuras requisições

            const decodedToken: { sub: string } = jwtDecode(token);
            // Idealmente, você faria uma chamada para buscar os dados completos do usuário
            // ex: const { data: userData } = await api.get(`/users/${decodedToken.sub}`);
            // Mas por agora, vamos montar o objeto do usuário a partir do token:
            const authenticatedUser: User = {
                id: decodedToken.sub,
                username: decodedToken.sub.split('@')[0],
                email: decodedToken.sub,
                avatarUrl: `https://i.pravatar.cc/150?u=${decodedToken.sub}`,
                followers: 0,
                following: 0,
                playlists: [],
                likedSongs: [],
                likedPlaylists: [],
                likedArtists: [],
            };

            setUser(authenticatedUser);
        } else {
            throw new Error('Token não encontrado na resposta da API');
        }
    } catch (error) {
        console.error('Falha no login:', error);
        // Re-lança o erro para que a página de login possa exibi-lo
        throw error;
    }
  };

  /**
   * Função de logout.
   * Limpa o estado, o localStorage e os headers da API.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
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