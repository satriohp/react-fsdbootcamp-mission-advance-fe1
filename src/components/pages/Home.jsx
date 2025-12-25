import MainLayout from "../templates/MainLayout";
import Hero from "../organisms/Hero";
import ContinueWatchCarousel from "../organisms/ContinueWatchCarousel";
import CarouselSection from "../organisms/CarouselSection";
import PremiumModal from "../organisms/PremiumModal"; 
import initialMovies from "../../data/movies"; 
import { useState, useEffect } from "react";

import leftArrow from "/assets/frame72.png"; 
import rightArrow from "/assets/frame71.png";

export default function Home() {
  const [movieList, setMovieList] = useState(() => {
    const savedData = localStorage.getItem("chill_movie_list");
    return savedData ? JSON.parse(savedData) : initialMovies;
  });

  const [isUserPremium] = useState(false); 
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [newMovie, setNewMovie] = useState({ title: "", category: "trending", src: "" });

  useEffect(() => {
    localStorage.setItem("chill_movie_list", JSON.stringify(movieList));
  }, [movieList]);

  const handleItemClick = (item) => {
    if (item.isPremium && !isUserPremium) {
      setShowPremiumModal(true);
    } else {
      console.log("Buka film:", item.title);
    }
  };

  const handleDeleteMovie = (category, id) => {
    setMovieList((prev) => ({
      ...prev,
      [category]: prev[category].filter((movie) => movie.id !== id),
    }));
    showToast("Film berhasil dihapus", "success");
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!newMovie.title) return showToast("Judul wajib diisi", "error");
    
    const id = `${newMovie.category}-${Date.now()}`;
    const movieToAdd = { 
        ...newMovie, 
        id, 
        src: newMovie.src || "https://placehold.co/600x400?text=No+Image",
        isPremium: Math.random() > 0.5 
    };

    setMovieList(prev => ({
      ...prev,
      [newMovie.category]: [movieToAdd, ...prev[newMovie.category]]
    }));

    setNewMovie({ title: "", category: "trending", src: "" });
    showToast("Film berhasil ditambahkan!");
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000); 
  };

  return (
    <MainLayout>
      <Hero />
      
      {toast.show && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full text-white shadow-2xl transition-all ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
          {toast.message}
        </div>
      )}
      
      {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}

      <section className="px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-[#1C1C1C] p-6 rounded-xl border border-white/5 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Tambah Koleksi Film</h2>
          <form onSubmit={handleAddMovie} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="text-xs text-gray-400 block mb-1">Judul Film</label>
              <input 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none focus:ring-1 focus:ring-[#0F1E93]" 
                value={newMovie.title} 
                onChange={(e) => setNewMovie({...newMovie, title: e.target.value})} 
                placeholder="Masukkan judul..." 
              />
            </div>
            <div className="w-full md:w-48">
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
            <div className="flex-1 w-full">
              <label className="text-xs text-gray-400 block mb-1">URL Poster (Opsional)</label>
              <input 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none focus:ring-1 focus:ring-[#0F1E93]"
                value={newMovie.src}
                onChange={(e) => setNewMovie({...newMovie, src: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto bg-[#0F1E93] hover:bg-[#192DB7] text-white py-2.5 px-6 rounded-lg font-semibold transition duration-200"
            >
              + Tambah Movie
            </button>
          </form>
        </div>
      </section>

      <ContinueWatchCarousel title="Melanjutkan Tonton" items={movieList.continue} category="continue" onDelete={handleDeleteMovie} onNavigate={handleItemClick} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} />
      <CarouselSection title="Top Rating Hari Ini" items={movieList.toprated} category="toprated" onDelete={handleDeleteMovie} onNavigate={handleItemClick} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} />
      <CarouselSection title="Film Trending" items={movieList.trending} category="trending" onDelete={handleDeleteMovie} onNavigate={handleItemClick} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} />
      <CarouselSection title="Rilis Baru" items={movieList.newrelease} category="newrelease" onDelete={handleDeleteMovie} onNavigate={handleItemClick} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} />
    </MainLayout>
  );
}