import Image from "next/image";
import Link from "next/link";
import { getMovieById, getAllMovies, Movie } from "../../data/movies";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  ChevronLeftIcon,
  ClockIcon,
  UserIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = parseInt(params.id);
  const movie = getMovieById(movieId);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">电影未找到</h1>
          <Link
            href="/"
            className="text-blue-500 hover:underline flex items-center justify-center"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  // 获取相关推荐电影 - 相同类型的其他电影
  const allMovies = getAllMovies();
  const relatedMovies = allMovies
    .filter(
      (m) =>
        m.id !== movie.id &&
        m.genres.some((genre) => movie.genres.includes(genre))
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Back Button */}
      <header className="bg-white dark:bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            返回首页
          </Link>
        </div>
      </header>

      {/* Movie Detail Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Hero Section with Poster and Basic Info */}
          <div className="relative">
            {/* Background Image (Blurred) */}
            <div className="w-full h-[400px] relative overflow-hidden">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                className="object-cover blur-sm scale-110 brightness-50"
                priority
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black/30">
              <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center md:justify-start md:items-end py-8 gap-6">
                {/* Poster */}
                <div className="w-48 h-72 md:w-56 md:h-80 relative rounded-lg overflow-hidden shadow-2xl group">
                  <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 224px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Basic Info */}
                <div className="text-white max-w-lg">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {movie.title}
                  </h1>
                  <p className="text-lg mt-1 text-gray-300">
                    {movie.originalTitle} ({movie.year})
                  </p>

                  <div className="flex items-center mt-4 space-x-6">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="h-6 w-6 text-yellow-400" />
                      <span className="text-xl font-bold">{movie.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-5 w-5 text-gray-300" />
                      <span>{movie.duration}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-100 text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* 交互按钮 */}
                  <div className="mt-6 flex items-center space-x-4">
                    <button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition-colors">
                      <HeartIcon className="h-5 w-5" />
                      <span>喜欢</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-gray-600/40 hover:bg-gray-600/60 text-white py-2 px-4 rounded-full transition-colors">
                      <BookmarkIcon className="h-5 w-5" />
                      <span>收藏</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-gray-600/40 hover:bg-gray-600/60 text-white py-2 px-4 rounded-full transition-colors">
                      <ShareIcon className="h-5 w-5" />
                      <span>分享</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  剧情简介
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {movie.summary}
                </p>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-4">
                  导演
                </h2>
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {movie.director}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-8 mb-4">
                  主演
                </h2>
                <div className="flex flex-wrap gap-4">
                  {movie.actors.map((actor) => (
                    <div
                      key={actor}
                      className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {actor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                    电影信息
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        上映年份
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {movie.year}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        片长
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        {movie.duration}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        豆瓣评分
                      </p>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                        <span className="text-gray-700 dark:text-gray-300 font-bold">
                          {movie.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 相关推荐部分 */}
        {relatedMovies.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              相关推荐
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedMovies.map((relatedMovie) => (
                <RelatedMovieCard key={relatedMovie.id} movie={relatedMovie} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// 相关电影卡片组件
function RelatedMovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.03] block"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-2 left-3 text-white flex items-center space-x-1">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">{movie.rating}</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800 dark:text-white line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
          {movie.genres.join(" · ")}
        </p>
      </div>
    </Link>
  );
}
