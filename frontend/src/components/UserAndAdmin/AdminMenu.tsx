import { useState } from 'react';
import { useAuthStore } from '../../GlobalSetZustand/authStore';

export default function AdminMenu() {
    const [open, setOpen] = useState(false);
    const { currentUser, logout } = useAuthStore();

    if (currentUser?.role !== 'admin') return null;

    const menuItems = [
        { label: 'Дашборд', href: '/dashboard', icon: '📊' },
        { label: 'Пользователи', href: '/users', icon: '👥' },
        { label: 'Настройки', href: '/settings', icon: '⚙️' },
        { label: 'Выйти', href: '#', icon: '🚪', action: logout },
    ];

    return (
        <section className="w-full max-w-7xl mx-auto mt-23">
            <nav 
                onClick={() => setOpen(!open)} 
                className={`
                    bg-linear-to-r from-amber-500 to-orange-500 
                    cursor-pointer transition-all duration-500 ease-in-out
                    hover:from-amber-600 hover:to-orange-600
                    shadow-lg hover:shadow-xl m-2
                    ${open ? "h-auto rounded-b-none" : "h-12 rounded-lg"}
                `}
            >
                {/* ВЕРХНЯЯ ЧАСТЬ: Бургер / Заголовок */}
                <div className="w-full flex justify-between items-center px-6 h-12">
                    {/* Бургер иконка с анимацией */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 flex flex-col justify-center gap-1.5">
                            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
                            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                        <span className={`text-white font-bold text-lg transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 hidden'}`}>
                            {currentUser?.username || 'Admin'}
                        </span>
                    </div>

                    {/* Индикатор статуса */}
                    <div className={`flex items-center gap-2 transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}>
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-white text-sm font-medium">Admin</span>
                    </div>
                </div>

                {/* ВЫПАДАЮЩЕЕ МЕНЮ */}
                <div className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                    <ul className="w-full flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 py-4 px-4 border-t border-amber-400/30">
                        {menuItems.map((item, index) => (
                            <li 
                                key={index}
                                className={`
                                    transform transition-all duration-300
                                    ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                                `}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {item.action ? (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); item.action!(); setOpen(false); }}
                                        className="flex items-center gap-2 text-white hover:text-black transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/20"
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ) : (
                                    <a 
                                        href={item.href}
                                        className="flex items-center gap-2 text-white hover:text-black transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/20"
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="font-medium">{item.label}</span>
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </section>
    );
}