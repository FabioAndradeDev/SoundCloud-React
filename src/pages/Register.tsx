import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

export default function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await api.post('/auth/register', { login, password });
      setSuccess('Usuário registrado com sucesso! Você será redirecionado para o login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Espera 2 segundos antes de redirecionar
    } catch (err: any) {
      if (err.response && err.response.data) {
        // A sua API retorna o texto do erro diretamente no body
        setError(err.response.data || 'Erro ao registrar. Tente novamente.');
      } else {
        setError('Não foi possível conectar ao servidor.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Criar Conta
          </h1>
          <p className="text-text-secondary">Junte-se ao Under Sound</p>
        </div>

        <div className="bg-surface-light rounded-lg p-8">
          {error && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 text-green-500 p-3 rounded-lg text-sm mb-4">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login" className="block text-sm font-medium text-text-secondary mb-2">
                Email (será seu login)
              </label>
              <input
                id="login"
                type="email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-surface-light text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-surface-light text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registrando...' : 'Registrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:text-primary-hover">
                Faça o login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 