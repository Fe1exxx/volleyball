import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="px-4 py-6 m-auto overflow-hidden z-10 relative">
      <div className="md:flex justify-around items-center max-w-300 m-auto">
        <header className="text-center md:min-w-110">
          <h1
            className={`${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} transition-all duration-700 delay-300 ease-out text-3xl max-w-100 m-auto font-semibold font-mono mt-3 md:m-0 md:text-left lg:text-5xl lg:max-w-170`}>Волейбол — это не просто игра. Это твой{" "}<b className="text-amber-700">TITAN!</b>
          </h1>
          <p className={`${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
            } transition-all duration-700 delay-400 ease-out text-2xl font-semibold font-mono mt-3 text-center md:text-left  lg:text-3xl`}>Самое важное правило волейбола -<br />
            не бойся начать играть!</p>
        </header>

        <section className={
          `${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          } transition-all duration-700 delay-500 ease-out flex flex-col sm:flex-row justify-center items-center m-auto md:block md:m-0`}>
          <img src="https://i.pinimg.com/736x/51/3f/11/513f11f42fc1005d8decaba522ddc386.jpg" alt="volleyball-man" className="w-[90%] max-w-100" />
        </section>
      </div>
    </section>
  );
}