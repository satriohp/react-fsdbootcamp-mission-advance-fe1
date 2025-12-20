import { useState, useEffect } from "react";
import LandscapePosterItem from "../molecules/LandscapePosterItem";

export default function ContinueWatchCarousel({ title, items, leftArrowSrc, rightArrowSrc, onItemClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) setItemsPerView(1); 
      else if (width < 1024) setItemsPerView(2); 
      else setItemsPerView(4);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-8 relative overflow-hidden">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{title}</h3>
      <div className="relative flex items-center">
        <button onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))} className="absolute left-0 z-20 bg-black/70 p-2 rounded-full -translate-x-2">
          <img src={leftArrowSrc} className="w-6 h-6" />
        </button>
        
        <div className="w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {items.map((item) => (
              <div 
                key={item.id} 
                className="px-2 flex-shrink-0 cursor-pointer" 
                style={{ width: `${100 / itemsPerView}%` }}
                onClick={() => onItemClick(item)}
              >
                <LandscapePosterItem src={item.src} title={item.title} itemsPerView={1} />
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setCurrentIndex(prev => Math.min(prev + 1, items.length - itemsPerView))} className="absolute right-0 z-20 bg-black/70 p-2 rounded-full translate-x-2">
          <img src={rightArrowSrc} className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}