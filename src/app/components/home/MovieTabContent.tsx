"use client";

import { Movie } from "../../data/movies";
import MovieCard from "../MovieCard";
import MovieListSkeleton from "../skeletons/MovieListSkeleton";
import InfiniteScroll from "../InfiniteScroll";

interface MovieTabContentProps {
  movies: Movie[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function MovieTabContent({
  movies,
  page,
  totalPages,
  isLoading,
  onLoadMore,
}: MovieTabContentProps) {
  return (
    <InfiniteScroll
      onLoadMore={onLoadMore}
      hasMore={page < totalPages}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : isLoading ? (
          <MovieListSkeleton />
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              无法加载电影数据，请稍后再试
            </p>
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
}
