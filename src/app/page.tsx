import { getAllMovies } from "./data/movies";
import MovieCard from "./components/MovieCard";
import { Suspense } from "react";

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

// 异步电影列表组件
async function MovieList() {
  const movies = await getAllMovies();

  if (movies.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          无法加载电影数据，请稍后再试
        </p>
      </div>
    );
  }

  return (
    <>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
              热门电影 <span className="text-blue-500">Top 20</span>
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            热门电影
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <Suspense
              fallback={
                <>
                  {Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <MovieCardSkeleton key={index} />
                    ))}
                </>
              }
            >
              <MovieList />
            </Suspense>
          </div>
        </div>
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
