import { useState, useEffect } from "react"

export default function Abonement() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    return (
        <section className="overflow-hidden">
            <div className='p-2 sm:p-5 sm:flex justify-center mt-5'>
                {/* Секция с услугами */}
                <section className={`${loading ? '-left-400' : 'left-0'} relative transition-all duration-500 max-w-150 mb-5`}>
                    <h1 className="text-5xl mb-5">Что входит в программу обучения в нашем спортклубе:</h1>
                    <ul>
                        <li className="text-xl font-medium mb-5">TitanVolleyClub - сообщество любителей волейбола. Мы проводим обучение людей классическому и пляжному волейболу любого уровня в возрасте от 16 лет.</li>
                        <li>🏐 Иры на профессиональном уровне</li>
                        <li>🏆 Турниры</li>
                        <li>🔥 Групповые занятия</li>
                        <li>💥 Персональные занятия</li>
                        <li>🤝 Товарищеские встречи и корпоративы</li>
                    </ul>
                </section>
                {/* Изображения услуг */}
                <div className={`${loading ? '-right-400' : 'right-0'} relative gap-4 transition-all duration-650 ease-in-out flex flex-col items-center`}>
                    <img
                        src="https://sun9-78.userapi.com/s/v1/ig2/BzW3sXV64r6CU_vqnnFc2OWRs-PuWYiwAPAzA5xUcmnEFYDlXLqZi3zi3Ao3jJDRBJRy60JVqkAn9bfNj0sHZFoE.jpg?quality=95&as=32x43,48x64,72x96,108x145,160x214,240x321,360x482,480x643,540x723,640x857,720x964,996x1334&from=bu&cs=996x0"
                        className="w-62 md:w-72 max-w-xs shadow-2xl rounded-xl object-cover aspect-square "
                        alt="Групповая тренировка Titan Volley Club"
                        loading="lazy"
                    />
                    <img
                        src="https://sun9-64.userapi.com/s/v1/ig2/kl-oSiSFcZyYmIYq6xnKIcOXLWz7kIa4-O7EllmeEHoEJh2iBcEFQXoAN0puw8HrKYuR7tk1IX4IoMPyb5TWk3Eq.jpg?quality=95&as=32x42,48x63,72x95,108x143,160x212,240x317,360x476,480x635,540x714,640x846,720x952,999x1321&from=bu&cs=999x0"
                        className="w-62 md:w-72 max-w-xs shadow-2xl rounded-xl object-cover aspect-square "
                        alt="Матч Titan Volley Club на открытой площадке"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    )
}