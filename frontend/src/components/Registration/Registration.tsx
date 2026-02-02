import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuthStore } from '../GlobalSetZustand/authStore';
import { Eye, EyeOff } from 'lucide-react';

// Схема для регистрации
const registerSchema = z.object({
    username: z.string().min(2, 'Минимум 2 символа').max(30, 'Максимум 30 символов'),
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Минимум 6 символов'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
});

type RegisterData = z.infer<typeof registerSchema>;

export default function Registration() {
    const [formData, setFormData] = useState<Omit<RegisterData, 'confirmPassword'>>({
        username: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof RegisterData, string>>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();
    const { login } = useAuthStore(); // Для автовхода после регистрации

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Убираем ошибку при вводе
        if (errors[name as keyof RegisterData]) {
            setErrors(prev => {
                const newErr = { ...prev };
                delete newErr[name as keyof RegisterData];
                return newErr;
            });
        }
    };

    const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        if (errors.confirmPassword) {
            setErrors(prev => {
                const newErr = { ...prev };
                delete newErr.confirmPassword;
                return newErr;
            });
        }
    };

    const validate = (): boolean => {
        try {
            registerSchema.parse({ ...formData, confirmPassword });
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors: Partial<Record<keyof RegisterData, string>> = {};
                err.issues.forEach(issue => {
                    newErrors[issue.path[0] as keyof RegisterData] = issue.message;
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);

        try {
            //  Отправляем данные на API
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors({ email: data.error || 'Ошибка регистрации' });
                return;
            }

            //  Успешная регистрация
            setSuccess(true);

            //  Автоматический вход после регистрации
            await login(formData.email, formData.password);

            // Через 2 секунды перенаправляем на главную
            setTimeout(() => {
                navigate('/'); // или куда нужно
            }, 2000);

        } catch (err) {
            setErrors({ email: 'Ошибка соединения с сервером' });
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <section className='h-[85vh] sm:flex m-auto justify-center items-center p-2'>
                <div className="max-w-md mx-auto p-8 text-center bg-white rounded-xl shadow-lg border border-orange-200 mt-40 sm:mt-0">
                    <h2 className="text-2xl font-oswald font-bold text-orange-600 mb-4">Регистрация успешна!</h2>
                    <p className="text-gray-700 mb-6">
                        Добро пожаловать! Вы уже вошли в систему.
                    </p>
                    <button
                        onClick={() => navigate('/')} // или на профиль
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition"
                    >
                        Перейти на главную
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className='mt-5 p-2'>
            <div className="max-w-md mx-auto p-10 bg-white rounded-xl shadow-lg border border-orange-100">
                <h1 className="text-3xl font-oswald font-bold text-center text-orange-600 mb-2">
                    Регистрация
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Создайте аккаунт, чтобы начать играть за TITAN!
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Имя пользователя
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.username
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-orange-500'
                                }`}
                            placeholder="Ваш никнейм"
                        />
                        {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-orange-500'
                                }`}
                            placeholder="example@email.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Пароль
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:ring-orange-500'
                                    }`}
                                placeholder="минимум 6 символов"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Подтвердите пароль
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 focus:ring-orange-500'
                                }`}
                            placeholder="..."
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-600">
                    Уже есть аккаунт?{' '}
                    <Link to="/authorization" className="text-orange-600 font-semibold hover:underline">
                        Войти
                    </Link>
                </div>
            </div>
        </section>
    );
}