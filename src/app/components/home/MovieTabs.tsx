"use client";

import { Movie } from "../../data/movies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import MovieTabContent from "./MovieTabContent";

interface MovieTabsProps {
  topRatedMovies: Movie[];
  topRatedPage: number;
  topRatedTotalPages: number;
  isLoadingTopRated: boolean;
  loadMoreTopRatedMovies: () => void;

  popularMovies: Movie[];
  popularPage: number;
  popularTotalPages: number;
  isLoadingPopular: boolean;
  loadMorePopularMovies: () => void;

  onTabChange: (value: string) => void;
}

export default function MovieTabs({
  topRatedMovies,
  topRatedPage,
  topRatedTotalPages,
  isLoadingTopRated,
  loadMoreTopRatedMovies,

  popularMovies,
  popularPage,
  popularTotalPages,
  isLoadingPopular,
  loadMorePopularMovies,

  onTabChange,
}: MovieTabsProps) {
  return (
    <Tabs defaultValue="top-rated" className="mb-8" onValueChange={onTabChange}>
      <div className="flex items-center justify-between mb-6">
        <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          <TabsTrigger
            value="top-rated"
            className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
          >
            最佳评分
          </TabsTrigger>
          <TabsTrigger
            value="popular"
            className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
          >
            热门电影
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="top-rated">
        <MovieTabContent
          movies={topRatedMovies}
          page={topRatedPage}
          totalPages={topRatedTotalPages}
          isLoading={isLoadingTopRated}
          onLoadMore={loadMoreTopRatedMovies}
        />
      </TabsContent>

      <TabsContent value="popular">
        <MovieTabContent
          movies={popularMovies}
          page={popularPage}
          totalPages={popularTotalPages}
          isLoading={isLoadingPopular}
          onLoadMore={loadMorePopularMovies}
        />
      </TabsContent>
    </Tabs>
  );
}
