import { useState, useRef, useEffect } from "react";
import PosterItem from "../molecules/PosterItem";

export default function CarouselSection({ title, items, leftArrowSrc, rightArrowSrc, onItemClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const carouselRef = useRef(null);

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

  const infiniteItems = [...items, ...items, ...items];

  const scrollLeft = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? items.length * 2 - 1 : prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => (prev + 1 >= items.length * 2 ? items.length : prev + 1));
  };

  const getTransformValue = () => {
    const gap = 16; 
    return -(currentIndex * (100 / itemsPerView + gap / (window.innerWidth / itemsPerView / 100)));
  };

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-8 relative group">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{title}</h3>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-1.5 sm:p-2 rounded-full z-10 transition-all duration-200 flex items-center justify-center"
        >
          <img src={leftArrowSrc} alt="Arrow Left" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="overflow-hidden" ref={carouselRef}>
          <div 
            className="flex gap-3 sm:gap-4 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${getTransformValue()}%)` }}
          >
            {infiniteItems.map((item, index) => (
              <PosterItem
                key={`${item.id}-${index}`}
                src={item.src}
                title={item.title}
                year={item.year}
                itemsPerView={itemsPerView}
                onClick={() => onItemClick(item)}
              />
            ))}
          </div>
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-1.5 sm:p-2 rounded-full z-10 transition-all duration-200 flex items-center justify-center"
        >
          <img src={rightArrowSrc} alt="Arrow Right" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
}