import { useState } from "react";
import MainLayout from "../templates/MainLayout";
import CarouselSection from "../organisms/CarouselSection";
import MovieDetailModal from "../organisms/MovieDetailModal"; 
import PremiumModal from "../organisms/PremiumModal"; 
import movies from "../../data/movies";  
import leftArrow from "/assets/frame72.png";  
import rightArrow from "/assets/frame71.png";

export default function Film() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isUserPremium] = useState(false);

  const filterByFilm = (dataArray) => {
    return dataArray.filter(item => item.type === "film");
  };

  const handleItemClick = (movie) => {
    if (movie.isPremium && !isUserPremium) {
      setShowPremiumModal(true);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <MainLayout>
      <div className="pt-20 pb-10">
        <h1 className="text-3xl font-bold px-8 mb-4">Film Layar Lebar</h1>
        
        <CarouselSection
          title="Film Trending"
          items={filterByFilm(movies.trending)}
          leftArrowSrc={leftArrow}  
          rightArrowSrc={rightArrow} 
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Top Rating Film"
          items={filterByFilm(movies.toprated)}
          leftArrowSrc={leftArrow}  
          rightArrowSrc={rightArrow} 
          onItemClick={handleItemClick}
        />
      </div>

      {selectedMovie && (
        <MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
      {showPremiumModal && (
        <PremiumModal onClose={() => setShowPremiumModal(false)} />
      )}
    </MainLayout>
  );
}