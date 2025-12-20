import { X, Play, Plus } from "lucide-react"; 

export default function MovieDetailModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      <div className="relative bg-[#181A1C] w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-white hover:text-black transition"
        >
          <X size={20} />
        </button>

        <div className="relative h-64 sm:h-80">
          <img src={movie.src} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181A1C] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">{movie.title}</h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-[#0F1E93] px-6 py-2 rounded-full font-semibold hover:bg-[#192DB7]">
                <Play size={18} fill="currentColor" /> Mulai
              </button>
              <button className="flex items-center justify-center w-10 h-10 border border-white/50 rounded-full hover:bg-white/10">
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
            <span>2024</span>
            <span className="border border-gray-600 px-2 rounded text-[10px]">13+</span>
            <span className="text-[#0F1E93] font-bold">95% Match</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Ini adalah deskripsi dummy untuk film {movie.title}. Di sini lo bisa jelasin sinopsis singkat 
            biar mirip sama mockup yang ada di flow 8.1.
          </p>
        </div>
      </div>
    </div>
  );
}