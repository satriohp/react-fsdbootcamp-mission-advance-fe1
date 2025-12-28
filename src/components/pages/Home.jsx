import { useState, useEffect, useCallback } from "react";
import { getMovies, addMovie, deleteMovie } from "../../services/api";
import MainLayout from "../templates/MainLayout";
import Hero from "../organisms/Hero";
import ContinueWatchCarousel from "../organisms/ContinueWatchCarousel";
import CarouselSection from "../organisms/CarouselSection";
import MovieDetailModal from "../organisms/MovieDetailModal"; 
import PremiumModal from "../organisms/PremiumModal"; 
import VideoPlayer from "../organisms/VideoPlayer"; 

import leftArrow from "/assets/frame72.png"; 
import rightArrow from "/assets/frame71.png";

export default function Home() {
  const [movieList, setMovieList] = useState({
    continue: [],
    toprated: [],
    trending: [],
    newrelease: []
  });

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null); 
  const [pendingMovie, setPendingMovie] = useState(null); 
  const [isUserPremium] = useState(false); 
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  
  const [newMovie, setNewMovie] = useState({ 
    title: "", 
    category: "trending", 
    src: "",
    type: "film" 
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000); 
  };

  const fetchAllMovies = useCallback(async () => {
    try {
      const response = await getMovies();
      const data = response.data; 

      setMovieList({
        continue: data.filter(m => m.category === "continue"),
        toprated: data.filter(m => m.category === "toprated"),
        trending: data.filter(m => m.category === "trending"),
        newrelease: data.filter(m => m.category === "newrelease"),
      });
    } catch (error) {
      console.error("Gagal Fetch:", error);
      showToast("Gagal mengambil data dari server", "error");
    }
  }, []);

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  const handleDeleteMovie = async (category, id) => {
    try {
      await deleteMovie(id);
      setMovieList((prev) => ({
        ...prev,
        [category]: prev[category].filter((movie) => String(movie.id) !== String(id)),
      }));
      showToast("Movie berhasil dihapus!");
    } catch (error) {
      console.error("Error Hapus:", error);
      showToast("Gagal menghapus dari server", "error");
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!newMovie.title) return showToast("Judul wajib diisi", "error");

    const movieToSave = {
      title: newMovie.title,
      category: newMovie.category,
      src: newMovie.src || "https://placehold.co/400x600?text=No+Poster",
      type: newMovie.type,
      year: "2024",
      rating: "5.0/5", 
      isPremium: Math.random() > 0.7, 
      genres: ["New Release"],
      description: `Deskripsi untuk ${newMovie.title}. Film ini baru saja ditambahkan melalui panel admin.`
    };

    try {
      const response = await addMovie(movieToSave);
      const savedMovie = response.data; 

      setMovieList((prev) => ({
        ...prev,
        [savedMovie.category]: [savedMovie, ...prev[savedMovie.category]],
      }));

      setNewMovie({ title: "", src: "", category: "trending", type: "film" });
      showToast("Movie berhasil ditambahkan!");
    } catch (error) {
      console.error("Gagal menambah movie:", error); 
      showToast("Gagal menyambung ke API", "error");
    }
  };

  const handleItemClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleStartWatch = (movie) => {
    if (movie.isPremium && !isUserPremium) {
      setPendingMovie(movie); 
      setSelectedMovie(null);
      setShowPremiumModal(true); 
      document.body.style.overflow = "hidden";
    } else {
      setSelectedMovie(null);
      setActiveVideo(movie); 
      document.body.style.overflow = "hidden";
    }
  };

  const handleBackFromPlayer = () => {
    setActiveVideo(null);
    document.body.style.overflow = "auto";
  };

  const handleClosePremium = () => {
    setShowPremiumModal(false);
    setPendingMovie(null);
    document.body.style.overflow = "auto";
  };

  return (
    <MainLayout>
      {activeVideo && (
        <VideoPlayer 
          movie={activeVideo} 
          onBack={handleBackFromPlayer} 
        />
      )}

      {showPremiumModal && (
        <PremiumModal 
          movie={pendingMovie} 
          onClose={handleClosePremium} 
        />
      )}

      <Hero type="home" />
      
      {toast.show && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-white shadow-2xl transition-all ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
          {toast.message}
        </div>
      )}

      <section className="px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-[#181A1C] p-6 rounded-xl border border-white/10 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-6">Tambah Koleksi Film (Admin)</h2>
          <form onSubmit={handleAddMovie} className="flex flex-col md:grid md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Judul Film</label>
              <input 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none focus:ring-1 focus:ring-[#0F1E93]" 
                value={newMovie.title} 
                onChange={(e) => setNewMovie({...newMovie, title: e.target.value})} 
                placeholder="Judul..." 
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Kategori</label>
              <select 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none focus:ring-1 focus:ring-[#0F1E93]" 
                value={newMovie.category} 
                onChange={(e) => setNewMovie({...newMovie, category: e.target.value})}
              >
                <option value="continue">Melanjutkan</option>
                <option value="toprated">Top Rated</option>
                <option value="trending">Trending</option>
                <option value="newrelease">Rilis Baru</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Tipe</label>
              <select 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none focus:ring-1 focus:ring-[#0F1E93]" 
                value={newMovie.type} 
                onChange={(e) => setNewMovie({...newMovie, type: e.target.value})}
              >
                <option value="film">Film</option>
                <option value="series">Series</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">URL Poster</label>
              <input 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none focus:ring-1 focus:ring-[#0F1E93]"
                value={newMovie.src}
                onChange={(e) => setNewMovie({...newMovie, src: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <button 
              type="submit" 
              className="bg-[#0F1E93] hover:bg-[#192DB7] text-white py-2.5 px-6 rounded-lg font-semibold transition w-full"
            >
              + Tambah
            </button>
          </form>
        </div>
      </section>

      <div className="flex flex-col gap-4 sm:gap-8 pb-10">
        <ContinueWatchCarousel
          title="Melanjutkan Tonton"
          items={movieList.continue}
          category="continue"
          onDelete={handleDeleteMovie}
          leftArrowSrc={leftArrow}  
          rightArrowSrc={rightArrow} 
          onItemClick={handleItemClick} 
        />

        <CarouselSection
          title="Top Rating Hari Ini"
          items={movieList.toprated}
          category="toprated"
          onDelete={handleDeleteMovie}
          leftArrowSrc={leftArrow}  
          rightArrowSrc={rightArrow} 
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Film Trending"
          items={movieList.trending}
          category="trending"
          onDelete={handleDeleteMovie}
          leftArrowSrc={leftArrow}  
          rightArrowSrc={rightArrow} 
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Rilis Baru"
          items={movieList.newrelease}
          category="newrelease"
          onDelete={handleDeleteMovie}
          leftArrowSrc={leftArrow}  
          rightArrowSrc={rightArrow} 
          onItemClick={handleItemClick}
        />
      </div>

      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)}
          onStartWatch={handleStartWatch} 
        />
      )}
    </MainLayout>
  );
}