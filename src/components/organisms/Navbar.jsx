import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; 

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation(); 

  const activeClass = (path) => 
    location.pathname === path ? "text-white font-bold" : "text-gray-300 hover:text-white";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#181A1C]/70 backdrop-blur-sm p-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <Link to="/home">
            <img src="/assets/Logo.png" alt="Chill Logo" />
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/home" className={`transition ${activeClass("/home")}`}>
            Beranda
          </Link>
          <Link to="/series" className={`transition ${activeClass("/series")}`}>
            Series
          </Link>
          <Link to="/film" className={`transition ${activeClass("/film")}`}>
            Film
          </Link>
          <Link to="/daftar-saya" className={`transition ${activeClass("/daftar-saya")}`}>
            Daftar Saya
          </Link>
        </nav>
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-2 cursor-pointer focus:outline-none"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <img
            src="/assets/Avatar.png"
            alt="Avatar"
            className="w-20 h-10 rounded-full object-cover" 
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-3 bg-[#2C2F32] rounded-2xl py-3 w-52 shadow-xl border border-white/5 overflow-hidden">
            <Link 
              to="/profile" 
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 transition"
              onClick={() => setDropdownOpen(false)} 
            >
              <img src="/assets/account.png" alt="Profile" className="w-5 h-5" />
              <span className="text-sm">Profil Saya</span>
            </Link>
            
            <Link 
              to="/premium" 
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 transition"
              onClick={() => setDropdownOpen(false)}
            >
              <img src="/assets/Vector1.png" alt="Premium" className="w-5 h-5" />
              <span className="text-sm">Ubah Premium</span>
            </Link>
            
            <div className="my-2 border-t border-white/10 mx-4"></div>
            
            <Link 
              to="/login" 
              className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 transition"
              onClick={() => setDropdownOpen(false)}
            >
              <img src="/assets/Vector.png" alt="Logout" className="w-5 h-5" />
              <span className="text-sm">Keluar</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}