import { useState, useEffect } from 'react';

// Тип для изображения
export interface SliderImage {
  src: string;
  alt: string;
}

// Тип для пропсов компонента
interface ImageSliderProps {
  images: SliderImage[];
  autoPlayInterval?: number;
  height?: string;
  showIndicators?: boolean;
  showArrows?: boolean;
  showCounter?: boolean;
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ 
  images, 
  autoPlayInterval = 5000, 
  height = 'h-[300px] md:h-[400px] lg:h-[500px]',
  showIndicators = true,
  showArrows = true,
  showCounter = true,
  className = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Автопрокрутка
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, images.length]);

  // Переключение на предыдущий слайд
  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  // Переключение на следующий слайд
  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  // Переход к конкретному слайду
  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Если нет изображений или пустой массив
  if (!images || images.length === 0) {
    return null;
  }

  // Если только одно изображение
  if (images.length === 1) {
    return (
      <div className={`relative w-full ${className}`}>
        <img 
          src={images[0].src} 
          alt={images[0].alt} 
          className={`w-full ${height} object-cover rounded-xl shadow-2xl`}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full group ${className}`}>
      {/* Контейнер слайдов */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="w-full shrink-0"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className={`w-full ${height} object-cover`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка влево */}
      {showArrows && (
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 backdrop-blur-sm"
          aria-label="Предыдущее фото"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Кнопка вправо */}
      {showArrows && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 backdrop-blur-sm"
          aria-label="Следующее фото"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Индикаторы (точки) */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Счетчик слайдов */}
      {showCounter && (
        <div className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
          {currentSlide + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;