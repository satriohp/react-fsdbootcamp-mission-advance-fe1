import Badge from "../atoms/Badge";
import IconButton from "../atoms/IconButton";

export default function LandscapePosterItem({ src, title, year, badge, itemsPerView = 6, onDelete, onClick }) {
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
      {badge && <Badge>{badge}</Badge>}

      {onDelete && (
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
      )}

      <img
        src={src}
        alt={title}
        className="rounded-lg w-full h-auto object-cover group-hover:opacity-80 transition-opacity duration-200"
        style={{ aspectRatio: '16/9' }} 
      />

      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent rounded-b-lg p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <h4 className="text-xs sm:text-sm font-semibold text-white truncate">{title}</h4>
          {year && <p className="text-[10px] sm:text-xs text-white/70">{year}</p>}
        </div>
      )}
    </div>
  );
}