import { useState, useEffect } from "react";

import timeTable from './timeTable.jpg'
import price from './price.jpg'

export default function Abonement() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <section className="overflow-hidden py-8 px-4">
            {/* Обёртка-контейнер */}
            <div className='transition-all duration-800'>
                {/* Flex-контейнер: на мобильных — колонка, на sm+ — строка */}
                <div className="flex flex-col sm:flex-row gap-8 max-w-6xl mx-auto items-start">
                    
                    {/* Текстовая секция */}
                    <div className={`${loading ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'} transition-all duration-800 ease-in-out flex-1 min-w-0`}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
                            Что входит в программу обучения в нашем спортклубе:
                        </h1>
                        <ul className="space-y-4 text-lg">
                            <li className="font-medium">
                                TitanVolleyClub - сообщество любителей волейбола. Мы проводим обучение людей классическому и пляжному волейболу любого уровня в возрасте от 16 лет.
                            </li>
                            <li>🏐 Игры на профессиональном уровне</li>
                            <li>🏆 Турниры</li>
                            <li>🔥 Групповые занятия</li>
                            <li>💥 Персональные занятия</li>
                            <li>🤝 Товарищеские встречи и корпоративы</li>
                        </ul>
                    </div>

                    {/* Изображения */}
                    <div className={`${loading ? 'opacity-0  translate-x-full' : 'opacity-100 translate-x-0'} flex flex-col gap-4 items-center sm:items-start shrink-0 transition-all duration-800 ease-in-out`}>
                        <img
                            src={timeTable}
                            className="w-60 sm:w-70 md:w-80 rounded-xl shadow-2xl object-cover aspect-square"
                            alt="Матч Titan Volley Club на открытой площадке"
                            loading="lazy"
                        />
                        <img
                            src={price}
                            className="w-60 sm:w-70 md:w-80 rounded-xl shadow-2xl object-cover aspect-square"
                            alt="Групповая тренировка Titan Volley Club"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}