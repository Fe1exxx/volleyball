import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../GlobalSetZustand/authStore';

import logo from './logo.png';

export default function Header() {
  const [visible, setVisible] = useState(false);
  const { isLoggedIn } = useAuthStore();

  return (
    <header className={`${visible ? 'h-70' : 'h-22'} ${visible && isLoggedIn ? 'h-[233px] transition-all' : 'h-22'} bg-amber-600/90 top-0 sm:h-22 z-50 transition-all`}>
      
      {/* Верхняя панель */}
      <nav className="flex justify-between items-center px-4 sm:px-6 max-w-400 m-auto">

        {/* Логотип */}
        <Link to='/' className='cursor-pointer hover:scale-105'>
          <img src={logo} alt="Логотип титан" className="w-17 sm:w-19 hover:brightness-75 transition-all" />
        </Link>

        {/* Меню для расширенных устройств */}
        <nav>
          <ul className='hidden sm:flex gap-10  h-15 items-center'>
            <li className='hover:scale-110 duration-200 transition-all cursor-pointer text-[18px] md:text-xl hover:text-amber-400'><Link to='/' >Главная</Link></li>
            <li className='hover:scale-110 duration-200 transition-all cursor-pointer text-[18px] md:text-xl hover:text-amber-400'><Link to='/abonement'>Абонемент</Link></li>
            {isLoggedIn ?

              <Link to='/authorization' className="block" onClick={() => setVisible(!visible)}>
                <img src="https://img.icons8.com/?size=100&id=12438&format=png&color=000000" alt="profile" className='w-11 hover:scale-110 transition-all' />
              </Link>

              : (
                <>
                  <li><Link to='/authorization' className='cursor-pointer text-[18px] md:text-xl hover:text-amber-400 transition-colors duration-200'>Войти</Link></li>
                  <li><Link to='/registration' className='cursor-pointer text-[18px] md:text-xl hover:text-amber-400 transition-colors duration-200'>Зарегистрироваться</Link></li>
                </>
              )}
          </ul>
        </nav>

        {/* Кнопка бургер меню */}
        <button aria-label={visible ? "Закрыть меню" : "Открыть меню"} className="sm:hidden z-10 cursor-pointer mr-2  " onClick={() => setVisible(!visible)}>
          <div className="h-8 w-10">
            <div className={`${visible ? 'rotate-45 translate-y-[11.5px] duration-200' : 'rotate-0'} transition-all w-10 h-2 bg-black m-auto mb-1`}></div>
            <div className={`${visible ? 'opacity-0 transition-all duration-200' : 'block'} transition-all w-10 h-2 bg-black m-auto mb-1`}></div>
            <div className={`${visible ? '-rotate-45 translate-y-[-11.5px] duration-200' : 'rotate-0'} transition-all w-10 h-2 bg-black m-auto`}></div>
          </div>
        </button>
      </nav>

      {/* Мобильное меню */}
      <nav className={`${visible ? 'block' : 'hidden'} sm:hidden opacity-95`} role="menu">
        <ul className="bg-amber-500 mt-1 mobile-ul">
          <li><Link to='/' className='block w-full text-left px-3 py-3 border-b border-black cursor-pointer' onClick={() => setVisible(!visible)}>Главная</Link></li>
          <li><Link to='/abonement' className='block w-full text-left px-3 py-3 border-b border-black cursor-pointer' onClick={() => setVisible(!visible)}>Абонемент</Link></li>
          {
            isLoggedIn ?
              <li><Link to='/authorization' className="block w-full text-left px-3 py-3 border-b border-black cursor-pointer bg-indigo-600 hover:bg-indigo-800 text-white" onClick={() => setVisible(!visible)}>Профиль</Link></li>
              :
              <>
                <li><Link to='/authorization' className="block w-full text-left px-3 py-3 border-b border-black cursor-pointer bg-indigo-700 hover:bg-indigo-800 text-white" onClick={() => setVisible(!visible)}>Войти</Link></li>
                <li><Link to='/registration' className="block w-full text-left px-3 py-3 border-b border-black cursor-pointer bg-amber-500 hover:bg-amber-600" onClick={() => setVisible(!visible)}>Зарегистрироваться</Link></li>
              </>
          }

        </ul>
      </nav>
    </header>
  );
}