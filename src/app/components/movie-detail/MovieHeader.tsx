import Link from "next/link";
import { Movie } from "../../data/movies";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  ChevronLeftIcon,
  ClockIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

interface MovieHeaderProps {
  movie: Movie;
}

export default function MovieHeader({ movie }: MovieHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* 海报 */}
      <div className="w-full md:w-1/3 lg:w-1/4">
        <div className="relative group rounded-xl overflow-hidden shadow-lg">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
              查看原图
            </button>
          </div>
        </div>

        {/* 电影评分和操作按钮 */}
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <StarIcon className="h-7 w-7 text-yellow-400 mr-2" />
              <span className="text-3xl font-bold text-gray-800 dark:text-white">
                {movie.rating}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                / 10
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {movie.voteCount ? `${movie.voteCount} 人评分` : ""}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg transition">
              <HeartIcon className="h-6 w-6 text-red-500" />
              <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">
                喜欢
              </span>
            </button>
            <button className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg transition">
              <BookmarkIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">
                收藏
              </span>
            </button>
            <button className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg transition">
              <ShareIcon className="h-6 w-6 text-green-500" />
              <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">
                分享
              </span>
            </button>
          </div>

          <Link
            href="/"
            className="mt-4 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            返回首页
          </Link>
        </div>
      </div>

      {/* 详细信息 */}
      <div className="w-full md:w-2/3 lg:w-3/4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          {movie.title}
          <span className="text-lg ml-2 font-normal text-gray-500">
            ({movie.year})
          </span>
        </h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          {movie.originalTitle}
        </h2>

        {/* 基本信息栏 */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-1" />
            <span>{movie.duration}</span>
          </div>
          <div>
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 mb-2"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* 简介 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
            剧情简介
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {movie.summary}
          </p>
        </div>

        {/* 制作信息 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">导演</h4>
            <p className="text-gray-600 dark:text-gray-400">{movie.director}</p>
          </div>
          {movie.writers && movie.writers.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">
                编剧
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {movie.writers.join(", ")}
              </p>
            </div>
          )}
          {movie.status && (
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">
                状态
              </h4>
              <p className="text-gray-600 dark:text-gray-400">{movie.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
