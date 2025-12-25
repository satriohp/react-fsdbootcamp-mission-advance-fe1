import IconButton from "../atoms/IconButton";

export default function PosterItem({ src, title, year, onDelete, onClick, itemsPerView = 6 }) {
  const getItemWidth = () => {
    const gap = itemsPerView > 1 ? (itemsPerView - 1) * 1 : 0; 
    return `calc((100% - ${gap}rem) / ${itemsPerView})`;
  };

  return (
    <div 
      className="relative cursor-pointer group flex-shrink-0"
      style={{ width: getItemWidth() }}
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 z-40 opacity-0 group-hover:opacity-100 transition-opacity">
        <IconButton 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="bg-red-600/90 hover:bg-red-700 text-white w-7 h-7 sm:w-8 sm:h-8"
        >
          <span className="text-xs font-bold">✕</span>
        </IconButton>
      </div>

      <img
        src={src}
        alt={title}
        className="rounded-lg w-full h-auto object-cover group-hover:opacity-80 transition-opacity duration-200"
        style={{ aspectRatio: '2/3' }} 
      />
      {title && (
        <div className="mt-2">
          <h4 className="text-white text-xs sm:text-sm font-medium truncate">{title}</h4>
        </div>
      )}
    </div>
  );
}