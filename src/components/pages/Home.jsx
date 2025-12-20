import MainLayout from "../templates/MainLayout";
import Hero from "../organisms/Hero";
import ContinueWatchCarousel from "../organisms/ContinueWatchCarousel";
import CarouselSection from "../organisms/CarouselSection";
import { useState, useEffect,useCallback } from "react";
import { getMovies, addMovie, deleteMovie } from "../../services/api";

import leftArrow from "/assets/frame72.png"; 
import rightArrow from "/assets/frame71.png";

export default function Home() {
  const [movieList, setMovieList] = useState({
    continue: [],
    toprated: [],
    trending: [],
    newrelease: []
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [newMovie, setNewMovie] = useState({ title: "", category: "trending", src: "" });

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
  }
}, []);

  useEffect(() => {
  fetchAllMovies();
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

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

    const movieToSave = {
      title: newMovie.title,
      category: newMovie.category,
      src: newMovie.src || "https://placehold.co/400x600?text=No+Poster",
      year: "2024"
    };

    try {
      const response = await addMovie(movieToSave);
      const savedMovie = response.data; 

      setMovieList((prev) => ({
        ...prev,
        [savedMovie.category]: [...prev[savedMovie.category], savedMovie],
      }));

      setNewMovie({ title: "", src: "", category: "trending" });
      showToast("Movie berhasil ditambahkan!");
      
    } catch (error) {
  console.error("Gagal menambah movie:", error); 
  showToast("Gagal menambah movie", "error");
}
  };

  return (
    <MainLayout>
      <Hero />

      {toast.show && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          <span className="text-white font-bold">{toast.type === "success" ? "✓" : "✕"}</span>
          <p className="text-white text-sm font-medium">{toast.message}</p>
        </div>
      )}

      <section className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-[#1C1C1C] p-6 rounded-xl border border-white/10 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">Tambah Koleksi Film</h3>
          <form onSubmit={handleAddMovie} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Judul Film</label>
              <input 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none"
                value={newMovie.title}
                onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                placeholder="Judul film..."
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Kategori</label>
              <select 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none cursor-pointer"
                value={newMovie.category}
                onChange={(e) => setNewMovie({...newMovie, category: e.target.value})}
              >
                <option value="continue">Melanjutkan Tonton</option>
                <option value="toprated">Top Rating</option>
                <option value="trending">Trending</option>
                <option value="newrelease">Rilis Baru</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">URL Poster</label>
              <input 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none"
                value={newMovie.src}
                onChange={(e) => setNewMovie({...newMovie, src: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <button type="submit" className="bg-[#0F1E93] hover:bg-[#192DB7] text-white py-2.5 px-4 rounded-lg font-semibold transition">
              + Tambah Movie
            </button>
          </form>
        </div>
      </section>

      <ContinueWatchCarousel title="Melanjutkan Tonton" items={movieList.continue} category="continue" onDelete={handleDeleteMovie} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} />
      <CarouselSection title="Top Rating Hari Ini" items={movieList.toprated} category="toprated" onDelete={handleDeleteMovie} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} />
      <CarouselSection title="Film Trending" items={movieList.trending} category="trending" onDelete={handleDeleteMovie} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} />
      <CarouselSection title="Rilis Baru" items={movieList.newrelease} category="newrelease" onDelete={handleDeleteMovie} leftArrowSrc={leftArrow} rightArrowSrc={rightArrow} />
    </MainLayout>
  );
}