import { useState } from "react";
import MainLayout from "../templates/MainLayout";
import Hero from "../organisms/Hero";
import ContinueWatchCarousel from "../organisms/ContinueWatchCarousel";
import CarouselSection from "../organisms/CarouselSection";
import MovieDetailModal from "../organisms/MovieDetailModal"; 
import PremiumModal from "../organisms/PremiumModal"; 
import movies from "../../data/movies";  

import leftArrow from "/assets/frame72.png";  
import rightArrow from "/assets/frame71.png";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  const [isUserPremium] = useState(false);

  const handleItemClick = (movie) => {
    if (movie.isPremium && !isUserPremium) {
      setShowPremiumModal(true);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <MainLayout>
      <Hero />
      
      <ContinueWatchCarousel
        title="Melanjutkan Tonton"
        items={movies.continue}
        leftArrowSrc={leftArrow}  
        rightArrowSrc={rightArrow} 
        onItemClick={handleItemClick} 
      />

      <CarouselSection
        title="Top Rating Hari Ini"
        items={movies.toprated}
        leftArrowSrc={leftArrow}  
        rightArrowSrc={rightArrow} 
        onItemClick={handleItemClick}
      />

      <CarouselSection
        title="Film Trending"
        items={movies.trending}
        leftArrowSrc={leftArrow}  
        rightArrowSrc={rightArrow} 
        onItemClick={handleItemClick}
      />

      <CarouselSection
        title="Rilis Baru"
        items={movies.newrelease}
        leftArrowSrc={leftArrow}  
        rightArrowSrc={rightArrow} 
        onItemClick={handleItemClick}
      />

      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {showPremiumModal && (
        <PremiumModal 
          onClose={() => setShowPremiumModal(false)} 
        />
      )}
    </MainLayout>
  );
}