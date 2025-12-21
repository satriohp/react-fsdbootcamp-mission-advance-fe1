import { useState } from "react";
import MainLayout from "../templates/MainLayout";
import Hero from "../organisms/Hero";
import CarouselSection from "../organisms/CarouselSection";
import MovieDetailModal from "../organisms/MovieDetailModal";
import VideoPlayer from "../organisms/VideoPlayer";
import movies from "../../data/movies";

import leftArrow from "/assets/frame72.png";
import rightArrow from "/assets/frame71.png";

export default function Film() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const filmContinue = movies.continue.filter((item) => item.type === "film");
  const filmTrending = movies.trending.filter((item) => item.type === "film");
  const filmTopRated = movies.toprated.filter((item) => item.type === "film");
  const filmNewRelease = movies.newrelease.filter((item) => item.type === "film");
  const filmOriginals = movies.trending.slice(0, 6);

  const handleItemClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleStartWatch = (movie) => {
    setSelectedMovie(null);
    setActiveVideo(movie);
    document.body.style.overflow = "hidden";
  };

  return (
    <MainLayout>
      {activeVideo && (
        <VideoPlayer 
          movie={activeVideo} 
          onBack={() => {
            setActiveVideo(null);
            document.body.style.overflow = "auto";
          }} 
        />
      )}

      <Hero type="film" />

      <div className="flex flex-col gap-4 sm:gap-8 pb-10 -mt-12 sm:-mt-16 relative z-20">
        
        <CarouselSection
          title="Melanjutkan Tontonan Film"
          items={filmContinue}
          isHorizontal={true}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Film Persembahan Chill"
          items={filmOriginals}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Top Rating Film Hari Ini"
          items={filmTopRated}
          isTopTen={true}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Film Trending"
          items={filmTrending}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Rilis Baru"
          items={filmNewRelease}
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