import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <div className="text-center mt-12">
            <h1 className="text-4xl mb-5">404 - Страница не найдена :(</h1>
            <p className="text-xl mb-5">К сожалению, запрошенная страница не существует.</p>
            <Link to='/' className="text-2xl hover:text-amber-400 transition-colors duration-300">Вернуться на главную</Link>
        </div>
    )
}