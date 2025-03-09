"use client";

import Header from "./components/home/Header";
import MovieFetcher from "./components/home/MovieFetcher";
import MovieTabs from "./components/home/MovieTabs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <MovieFetcher>
          {({
            popularMovies,
            popularPage,
            popularTotalPages,
            isLoadingPopular,
            loadMorePopularMovies,

            topRatedMovies,
            topRatedPage,
            topRatedTotalPages,
            isLoadingTopRated,
            loadMoreTopRatedMovies,

            handleTabChange,
          }) => (
            <MovieTabs
              popularMovies={popularMovies}
              popularPage={popularPage}
              popularTotalPages={popularTotalPages}
              isLoadingPopular={isLoadingPopular}
              loadMorePopularMovies={loadMorePopularMovies}
              topRatedMovies={topRatedMovies}
              topRatedPage={topRatedPage}
              topRatedTotalPages={topRatedTotalPages}
              isLoadingTopRated={isLoadingTopRated}
              loadMoreTopRatedMovies={loadMoreTopRatedMovies}
              onTabChange={handleTabChange}
            />
          )}
        </MovieFetcher>
      </main>
    </div>
  );
}
