import MainLayout from "../templates/MainLayout";
import Hero from "../organisms/Hero";
import ContinueWatchCarousel from "../organisms/ContinueWatchCarousel";
import CarouselSection from "../organisms/CarouselSection";
import initialMovies from "../../data/movies"; 
import { useState, useEffect } from "react";

import leftArrow from "/assets/frame72.png"; 
import rightArrow from "/assets/frame71.png";

export default function Home() {
  const [movieList, setMovieList] = useState(() => {
    const savedData = localStorage.getItem("chill_movie_list");
    return savedData ? JSON.parse(savedData) : initialMovies;
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const [newMovie, setNewMovie] = useState({ title: "", category: "trending", src: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000); 
  };

  useEffect(() => {
    localStorage.setItem("chill_movie_list", JSON.stringify(movieList));
  }, [movieList]);

  const handleDeleteMovie = (category, id) => {
    setMovieList((prev) => ({
      ...prev,
      [category]: prev[category].filter((movie) => movie.id !== id),
    }));
    showToast("Film berhasil dihapus!", "error");
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    const movieData = {
      id: `${newMovie.category}-${Date.now()}`, 
      title: newMovie.title,
      src: newMovie.src || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500", 
      year: "2024"
    };

    setMovieList((prev) => ({
      ...prev,
      [newMovie.category]: [movieData, ...prev[newMovie.category]], 
    }));

    setNewMovie({ title: "", category: "trending", src: "" });
    showToast("Film berhasil ditambahkan ke koleksi!");
  };

  return (
    <MainLayout>
      <Hero />

      {toast.show && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl transition-all duration-500 animate-bounce flex items-center gap-2 ${
          toast.type === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          <span className="text-white font-bold">{toast.type === "success" ? "✓" : "✕"}</span>
          <p className="text-white text-sm font-medium">{toast.message}</p>
        </div>
      )}

      <section className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-[#1C1C1C] p-6 rounded-xl border border-white/10 shadow-xl">
          <div className="flex justify-between items-center mb-4 text-white">
            <h3 className="text-xl font-bold">Tambah Koleksi Film</h3>
            <button 
              onClick={() => {
                if(confirm("Reset ke data awal?")) {
                  localStorage.removeItem("chill_movie_list");
                  window.location.reload();
                }
              }}
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              Reset Database
            </button>
          </div>
          <form onSubmit={handleAddMovie} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Judul Film</label>
              <input 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none focus:ring-1 ring-blue-500 transition"
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
              <label className="text-xs text-gray-400 block mb-1">URL Poster (Opsional)</label>
              <input 
                className="w-full bg-[#2C2F32] p-2.5 rounded-lg text-white outline-none"
                value={newMovie.src}
                onChange={(e) => setNewMovie({...newMovie, src: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <button 
              type="submit" 
              className="bg-[#0F1E93] hover:bg-[#192DB7] text-white py-2.5 px-4 rounded-lg font-semibold transition duration-200"
            >
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