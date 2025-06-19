import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importamos o hook do nosso contexto

export default function Login() {
  const [email, setEmail] = useState(''); // Mantemos 'email' para o formulário, mas enviaremos como 'login'
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Usamos a função login do contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // O contexto agora cuida de toda a lógica da API
      await login(email, password); 
      
      // Se a função login for bem-sucedida, o PrivateRoute nos deixará passar
      navigate('/app/home', { replace: true });
    } catch (err: any) {
      // O erro é re-lançado pelo contexto, então podemos pegá-lo aqui
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Falha no login. Verifique suas credenciais.');
      } else {
        setError('Falha no login. Verifique suas credenciais.');
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
            Under Sound
          </h1>
          <p className="text-text-secondary">Entre para continuar</p>
        </div>

        <div className="bg-surface-light rounded-lg p-8">
          {error && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary hover:text-primary-hover">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 