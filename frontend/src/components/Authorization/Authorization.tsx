// React use 
import { useState, useEffect, useRef } from 'react';

// Zustand
import { useAuthStore } from '../../GlobalSetZustand/authStore';

// React Router
import { Link } from 'react-router-dom';

// Lucide-react
import { Eye, EyeOff } from 'lucide-react';

// Components
import UserMenu from '../UserAndAdmin/UserMenu';
import AdminMenu from '../UserAndAdmin/AdminMenu'; 

export default function Authorization() {
  const { isLoggedIn, loading, error, login, loadUsers, currentUser } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const validate = (): boolean => {
    if (!email.trim()) {
      useAuthStore.setState({ error: 'Email обязателен' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      useAuthStore.setState({ error: 'Некорректный email' });
      return false;
    }
    if (!password) {
      useAuthStore.setState({ error: 'Пароль обязателен' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    useAuthStore.setState({ error: '' });

    if (!validate()) {
      passwordRef.current?.focus();
      return;
    }

    await login(email, password);
  };

  // Open Admin menu
  if (isLoggedIn && currentUser?.role === 'admin') return <AdminMenu />
  
  //Open User menu
  if (isLoggedIn && currentUser?.role === 'user') return <UserMenu />
  
  return (
    <div className="max-w-md mx-auto p-6 h-[80vh] sm:flex items-center justify-center">
      <section className="w-full rounded-xl shadow-lg border border-orange-100 p-6 bg-white">
        <h1 className="text-2xl font-oswald font-bold text-center text-orange-600 mb-6">Вход в аккаунт</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6 relative">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Нет аккаунта?{' '}
          <Link to="/registration" className="text-orange-600 font-semibold hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </section>
    </div>
  );
}