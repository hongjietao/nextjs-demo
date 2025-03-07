"use client";

import { useState, useEffect } from "react";
import { Movie } from "./data/movies";
import MovieCard from "./components/MovieCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import InfiniteScroll from "./components/InfiniteScroll";

// 创建一个加载中的MovieCard占位符
function MovieCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full animate-pulse">
      <div className="h-[400px] bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="flex space-x-1 mb-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    </div>
  );
}

// 电影列表骨架屏
function MovieListSkeleton() {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
    </>
  );
}

export default function Home() {
  // 热门电影状态
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [popularPage, setPopularPage] = useState(1);
  const [popularTotalPages, setPopularTotalPages] = useState(1);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);

  // 最佳评分电影状态
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [topRatedTotalPages, setTopRatedTotalPages] = useState(1);
  const [isLoadingTopRated, setIsLoadingTopRated] = useState(false);

  // 初始加载热门电影
  useEffect(() => {
    fetchPopularMovies(1);
  }, []);

  // 初始化最佳评分电影（当用户切换到该标签时）
  const initializeTopRatedMovies = () => {
    if (topRatedMovies.length === 0) {
      fetchTopRatedMovies(1);
    }
  };

  // 获取热门电影
  const fetchPopularMovies = async (page: number) => {
    try {
      setIsLoadingPopular(true);
      const response = await fetch(`/api/movies/popular?page=${page}`);
      const data = await response.json();

      if (page === 1) {
        setPopularMovies(data.movies);
      } else {
        setPopularMovies((prev) => [...prev, ...data.movies]);
      }

      setPopularPage(data.page);
      setPopularTotalPages(data.totalPages);
      setIsLoadingPopular(false);
    } catch (error) {
      console.error("获取热门电影失败:", error);
      setIsLoadingPopular(false);
    }
  };

  // 获取最佳评分电影
  const fetchTopRatedMovies = async (page: number) => {
    try {
      setIsLoadingTopRated(true);
      const response = await fetch(`/api/movies/top-rated?page=${page}`);
      const data = await response.json();

      if (page === 1) {
        setTopRatedMovies(data.movies);
      } else {
        setTopRatedMovies((prev) => [...prev, ...data.movies]);
      }

      setTopRatedPage(data.page);
      setTopRatedTotalPages(data.totalPages);
      setIsLoadingTopRated(false);
    } catch (error) {
      console.error("获取最佳评分电影失败:", error);
      setIsLoadingTopRated(false);
    }
  };

  // 加载更多热门电影
  const loadMorePopularMovies = () => {
    if (popularPage < popularTotalPages && !isLoadingPopular) {
      fetchPopularMovies(popularPage + 1);
    }
  };

  // 加载更多最佳评分电影
  const loadMoreTopRatedMovies = () => {
    if (topRatedPage < topRatedTotalPages && !isLoadingTopRated) {
      fetchTopRatedMovies(topRatedPage + 1);
    }
  };

  // 标签切换处理函数
  const handleTabChange = (value: string) => {
    if (value === "top-rated") {
      initializeTopRatedMovies();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
              电影<span className="text-blue-500">精选</span>
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索电影..."
                  className="py-2 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs
          defaultValue="popular"
          className="mb-8"
          onValueChange={handleTabChange}
        >
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              <TabsTrigger
                value="popular"
                className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
              >
                热门电影
              </TabsTrigger>
              <TabsTrigger
                value="top-rated"
                className="px-4 py-2 rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm"
              >
                最佳评分
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="popular">
            <InfiniteScroll
              onLoadMore={loadMorePopularMovies}
              hasMore={popularPage < popularTotalPages}
              isLoading={isLoadingPopular}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {popularMovies.length > 0 ? (
                  popularMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))
                ) : isLoadingPopular ? (
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
          </TabsContent>

          <TabsContent value="top-rated">
            <InfiniteScroll
              onLoadMore={loadMoreTopRatedMovies}
              hasMore={topRatedPage < topRatedTotalPages}
              isLoading={isLoadingTopRated}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {topRatedMovies.length > 0 ? (
                  topRatedMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))
                ) : isLoadingTopRated ? (
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
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              基于 Next.js 开发的豆瓣电影 Top 100 展示网站
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              数据来源于豆瓣电影，仅用于学习目的
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
