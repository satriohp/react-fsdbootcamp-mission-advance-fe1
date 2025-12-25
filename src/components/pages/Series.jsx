import { useState } from "react";
import MainLayout from "../templates/MainLayout";
import Hero from "../organisms/Hero";
import CarouselSection from "../organisms/CarouselSection";
import MovieDetailModal from "../organisms/MovieDetailModal";
import VideoPlayer from "../organisms/VideoPlayer";
import movies from "../../data/movies";

import leftArrow from "/assets/frame72.png";
import rightArrow from "/assets/frame71.png";

export default function Series() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const seriesContinue = movies.continue.filter((item) => item.type === "series");
  const seriesTrending = movies.trending.filter((item) => item.type === "series");
  const seriesTopRated = movies.toprated.filter((item) => item.type === "series");
  const seriesNewRelease = movies.newrelease.filter((item) => item.type === "series");
  const seriesOriginals = movies.trending.slice(0, 6); 

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

      <Hero type="series" />

      <div className="flex flex-col gap-4 sm:gap-8 pb-10 -mt-12 sm:-mt-16 relative z-20">
        
        <CarouselSection
          title="Melanjutkan Tontonan Series"
          items={seriesContinue}
          isHorizontal={true}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Series Persembahan Chill"
          items={seriesOriginals}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Top Rating Series Hari Ini"
          items={seriesTopRated}
          isTopTen={true}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Series Trending"
          items={seriesTrending}
          leftArrowSrc={leftArrow}
          rightArrowSrc={rightArrow}
          onItemClick={handleItemClick}
        />

        <CarouselSection
          title="Rilis Baru"
          items={seriesNewRelease}
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