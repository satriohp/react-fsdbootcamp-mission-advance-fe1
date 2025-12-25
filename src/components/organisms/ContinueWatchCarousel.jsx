import { useState, useEffect } from "react";
import LandscapePosterItem from "../molecules/LandscapePosterItem";

export default function ContinueWatchCarousel({ 
  title, 
  items, 
  category, 
  onDelete, 
  leftArrowSrc, 
  rightArrowSrc,
  onItemClick 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(2);
      else if (width < 768) setItemsPerView(3);
      else if (width < 1024) setItemsPerView(4);
      else if (width < 1280) setItemsPerView(5);
      else setItemsPerView(6);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const scrollLeft = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const scrollRight = () => {
    const maxIndex = Math.max(0, items.length - itemsPerView);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-8 relative overflow-hidden group/carousel">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">{title}</h3>
      <div className="relative flex items-center">
        {currentIndex > 0 && (
          <button 
            onClick={scrollLeft} 
            className="absolute left-0 z-20 bg-black/70 p-2 rounded-full -translate-x-2 transition-transform hover:scale-110"
          >
            <img src={leftArrowSrc} alt="Prev" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
        
        <div className="w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 px-1 sm:px-2" 
                style={{ width: `${100 / itemsPerView}%` }}
                onClick={() => onItemClick && onItemClick(item)}
              >
                <LandscapePosterItem 
                  src={item.src} 
                  title={item.title} 
                  year={item.year}
                  itemsPerView={1} 
                  onDelete={onDelete ? () => onDelete(category, item.id) : null}
                />
              </div>
            ))}
          </div>
        </div>

        {currentIndex < items.length - itemsPerView && (
          <button 
            onClick={scrollRight} 
            className="absolute right-0 z-20 bg-black/70 p-2 rounded-full translate-x-2 transition-transform hover:scale-110"
          >
            <img src={rightArrowSrc} alt="Next" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>
    </section>
  );
}