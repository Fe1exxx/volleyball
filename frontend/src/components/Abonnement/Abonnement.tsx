import { useState, useEffect } from "react"

export default function Abonement() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    return (
        <section className="overflow-hidden">
            <div className={`${loading ? '-left-400' : 'left-0'} transition-all mt-5 duration-500 sm:flex justify-center relative`}>
                <h1>фывфыв</h1>
                <div className="">
                    <img
                        src="https://sun9-78.userapi.com/s/v1/ig2/BzW3sXV64r6CU_vqnnFc2OWRs-PuWYiwAPAzA5xUcmnEFYDlXLqZi3zi3Ao3jJDRBJRy60JVqkAn9bfNj0sHZFoE.jpg?quality=95&as=32x43,48x64,72x96,108x145,160x214,240x321,360x482,480x643,540x723,640x857,720x964,996x1334&from=bu&cs=996x0"
                        className="w-[90%] sm:w-[45%] max-w-xs shadow-2xl rounded-xl object-cover aspect-square md:w-full"
                        alt="Групповая тренировка Titan Volley Club"
                        loading="lazy"
                    />
                    <img
                        src="https://sun9-64.userapi.com/s/v1/ig2/kl-oSiSFcZyYmIYq6xnKIcOXLWz7kIa4-O7EllmeEHoEJh2iBcEFQXoAN0puw8HrKYuR7tk1IX4IoMPyb5TWk3Eq.jpg?quality=95&as=32x42,48x63,72x95,108x143,160x212,240x317,360x476,480x635,540x714,640x846,720x952,999x1321&from=bu&cs=999x0"
                        className="w-[90%] sm:w-[45%] max-w-xs shadow-2xl rounded-xl object-cover aspect-square md:w-full"
                        alt="Матч Titan Volley Club на открытой площадке"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    )
}