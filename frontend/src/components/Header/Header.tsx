// Library
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

// Zustand
import { useMenu } from '../../GlobalSetZustand/menuForAutorization';
import { useAuthStore } from '../../GlobalSetZustand/authStore';

// React-lucide
import { Home, Tag, User } from 'lucide-react';

// Images
import logo from './logo.png';

export default function Header() {

  // State
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Zustand - USE
  const { isLoggedIn, logout } = useAuthStore();
  const { changeStateOpen } = useMenu();

  // Клик вне — закрываем
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        profileRef.current &&
        !profileRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Позиционирование dropdown под кнопкой
  const [dropdownStyle, setDropdownStyle] = useState({ top: 80, right: 0 });

  useEffect(() => {
    if (profileOpen && profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [profileOpen]);

  return (
    <>
      <header className={`${visible ? 'h-58' : 'h-22'} bg-amber-600/90 top-0 sm:h-22 z-50 transition-all duration-300 ease-in-out fixed w-full`}>

        {/* Верхняя панель */}
        <nav className="flex justify-between items-center px-4 sm:px-6 max-w-400 m-auto">

          {/* Логотип */}
          <Link to='/' className='cursor-pointer hover:scale-105'>
            <img src={logo} alt="Логотип титан" className="w-17 sm:w-19 hover:brightness-75 transition-all" />
          </Link>

          {/* Меню для расширенных устройств */}
          <nav>
            <ul className='hidden sm:flex gap-10 h-15 items-center'>
              <li className='hover:scale-110 duration-200 transition-all cursor-pointer sm:text-2xl md:text-3xl hover:text-amber-400'>
                <Link to='/' className='flex items-center'>Главная <span className='ml-2 mt-2'>{<Home />}</span></Link>
              </li>
              <li className='hover:scale-110 duration-200 transition-all cursor-pointer sm:text-2xl md:text-3xl hover:text-amber-400'>
                <Link to='/abonement' className='flex items-center'>Абонемент <span className='ml-2 mt-2'>{<Tag />}</span></Link>
              </li>

              {isLoggedIn ? (
                <button
                  ref={profileRef}
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    changeStateOpen();
                  }}
                  className="block relative"
                >

                  <div className={` hover:scale-210 transition-all ${profileOpen ? 'scale-210' : 'scale-170'}`}><User /></div>
                </button>
              ) : (
                <li className='hover:scale-110 duration-200 transition-all cursor-pointer sm:text-2xl md:text-3xl hover:text-amber-400'>
                  <Link to='/authorization'>Войти</Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Кнопка бургер меню */}
          <button
            aria-label={visible ? "Закрыть меню" : "Открыть меню"}
            className="sm:hidden z-10 cursor-pointer mr-2"
            onClick={() => setVisible(!visible)}
          >
            <div className="h-8 w-10">
              <div className={`${visible ? 'rotate-45 translate-y-[11.5px] duration-200' : 'rotate-0'} transition-all w-10 h-2 bg-black m-auto mb-1`}></div>
              <div className={`${visible ? 'opacity-0 transition-all duration-200' : 'block'} transition-all w-10 h-2 bg-black m-auto mb-1`}></div>
              <div className={`${visible ? '-rotate-45 translate-y-[-11.5px] duration-200' : 'rotate-0'} transition-all w-10 h-2 bg-black m-auto`}></div>
            </div>
          </button>
        </nav>

        <nav
          className="sm:hidden opacity-95 overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: visible ? '200px' : '0px',
            opacity: visible ? 1 : 0,
          }}
          role="menu">
          <ul className="bg-amber-500 mt-1 mobile-ul">
            <li>
              <Link to='/' className='block w-full text-left px-3 py-3 border-b border-black cursor-pointer' onClick={() => setVisible(!visible)}>
                Главная
              </Link>
            </li>
            <li>
              <Link to='/abonement' className='block w-full text-left px-3 py-3 border-b border-black cursor-pointer' onClick={() => setVisible(!visible)}>
                Абонемент
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link
                  to={'/'}
                  className="block w-full text-left px-3 py-3 border-b border-black cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white"
                  onClick={() => {
                    setVisible(!visible);
                    logout();
                  }}
                >
                  Выйти с аккаунта
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to='/authorization'
                  className="block w-full text-left px-3 py-3 border-b border-black cursor-pointer bg-indigo-700 hover:bg-indigo-800 text-white"
                  onClick={() => setVisible(!visible)}>
                  Войти
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {isLoggedIn && (
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: dropdownStyle.top,
            right: dropdownStyle.right,
            zIndex: 9999,
          }}
          className={`
            w-48 bg-amber-500 rounded-lg shadow-lg overflow-hidden
            transform origin-top-right transition-all duration-200 ease-out
            ${profileOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }
          `}>
          <div className="py-2">
            <Link
              to="/authorization"
              className="block px-4 py-3 hover:bg-amber-400 transition-colors text-black"
              onClick={() => setProfileOpen(false)}>
              Профиль
            </Link>
            <button
              onClick={() => {
                setProfileOpen(false);
                logout();
              }}
              className="block w-full text-left px-4 py-3 hover:bg-amber-400 transition-colors text-black">
              Выйти с аккаунта
            </button>
          </div>
        </div>
      )}
    </>
  );
}