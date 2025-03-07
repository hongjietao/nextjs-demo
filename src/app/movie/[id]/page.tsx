import Link from "next/link";
import { getMovieById, getAllMovies, Movie } from "../../data/movies";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  ChevronLeftIcon,
  ClockIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { Suspense } from "react";
import ActorCard from "../../components/ActorCard";
import ImageGallery from "../../components/ImageGallery";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

// 电影详情页加载骨架
function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="h-[500px] bg-gray-200 dark:bg-gray-700 relative"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="h-[350px] bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-1/2"></div>
              <div className="flex flex-wrap gap-2 mb-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20"
                  ></div>
                ))}
              </div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-1/4"></div>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 相关电影组件
function RelatedMovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="block group">
      <div className="relative h-[200px] overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
          <div className="flex items-center space-x-1">
            <StarIcon className="h-3 w-3 text-yellow-400" />
            <span className="text-xs font-bold">{movie.rating}</span>
          </div>
          <h3 className="text-sm font-medium line-clamp-1">{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
}

// 异步获取电影相关推荐
async function RelatedMovies({ movieId }: { movieId: number }) {
  const allMovies = await getAllMovies();
  const movie = await getMovieById(movieId);

  if (!movie) return null;

  const relatedMovies = allMovies
    .filter(
      (m) =>
        m.id !== movie.id &&
        m.genres.some((genre) => movie.genres.includes(genre))
    )
    .slice(0, 4);

  if (relatedMovies.length === 0) return null;

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        相关推荐
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedMovies.map((movie) => (
          <RelatedMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

// 电影详情主体组件
async function MovieDetail({ movieId }: { movieId: number }) {
  const movie = await getMovieById(movieId);

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

  return (
    <>
      <div className="h-[500px] bg-gray-900 relative">
        <div className="absolute inset-0 opacity-30">
          {/* 背景海报 */}
          <img
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>

        {/* 标语展示 */}
        {movie.tagline && (
          <div className="absolute inset-x-0 bottom-10 text-center">
            <p className="text-white text-xl italic font-light px-4 py-2 inline-block bg-black/40 rounded-lg">
              &ldquo;{movie.tagline}&rdquo;
            </p>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-auto"
                />
              </div>

              <div className="mt-6 flex flex-col space-y-4">
                <div className="flex justify-between">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors">
                    <HeartIcon className="h-5 w-5" />
                    <span>收藏</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                    <ShareIcon className="h-5 w-5" />
                    <span>分享</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500 dark:text-gray-300 dark:hover:text-yellow-400 transition-colors">
                    <BookmarkIcon className="h-5 w-5" />
                    <span>想看</span>
                  </button>
                </div>

                {/* 新增电影基本信息卡片 */}
                <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3 border-b border-gray-200 dark:border-gray-600 pb-2">
                    影片信息
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex">
                      <span className="text-gray-500 dark:text-gray-400 min-w-[80px]">
                        上映状态:
                      </span>
                      <span className="text-gray-700 dark:text-gray-200">
                        {movie.status || "未知"}
                      </span>
                    </li>
                    {movie.productionCountries &&
                      movie.productionCountries.length > 0 && (
                        <li className="flex">
                          <span className="text-gray-500 dark:text-gray-400 min-w-[80px]">
                            制作国家:
                          </span>
                          <span className="text-gray-700 dark:text-gray-200">
                            {movie.productionCountries.join("、")}
                          </span>
                        </li>
                      )}
                    <li className="flex">
                      <span className="text-gray-500 dark:text-gray-400 min-w-[80px]">
                        预算:
                      </span>
                      <span className="text-gray-700 dark:text-gray-200">
                        {movie.budget}
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-gray-500 dark:text-gray-400 min-w-[80px]">
                        票房:
                      </span>
                      <span className="text-gray-700 dark:text-gray-200">
                        {movie.revenue}
                      </span>
                    </li>
                    {movie.languages && movie.languages.length > 0 && (
                      <li className="flex">
                        <span className="text-gray-500 dark:text-gray-400 min-w-[80px]">
                          语言:
                        </span>
                        <span className="text-gray-700 dark:text-gray-200">
                          {movie.languages.join("、")}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="flex items-center mb-2">
                <Link
                  href="/"
                  className="text-blue-500 hover:underline flex items-center mr-4"
                >
                  <ChevronLeftIcon className="h-5 w-5 mr-1" />
                  返回首页
                </Link>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {movie.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {movie.originalTitle} ({movie.year})
              </p>

              <div className="flex items-center mb-6 flex-wrap gap-3">
                <div className="flex items-center bg-yellow-400 text-white rounded-lg px-3 py-1">
                  <StarIcon className="h-5 w-5 mr-1" />
                  <span className="font-bold">{movie.rating}</span>
                  {movie.voteCount && (
                    <span className="text-xs ml-1">
                      ({movie.voteCount}人评分)
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <ClockIcon className="h-5 w-5 mr-1" />
                  <span>{movie.duration}</span>
                </div>
                {movie.popularity && (
                  <div className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-md">
                    热度: {movie.popularity.toFixed(1)}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* 电影制作公司信息 */}
              {movie.productionCompanies &&
                movie.productionCompanies.length > 0 && (
                  <div className="mb-4 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      制作公司:{" "}
                    </span>
                    <span className="text-gray-700 dark:text-gray-200">
                      {movie.productionCompanies.join("、")}
                    </span>
                  </div>
                )}

              <div className="mb-6">
                <div className="flex items-start text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-medium min-w-[70px]">导演：</span>
                  <span>{movie.director}</span>
                </div>

                {/* 新增编剧信息 */}
                {movie.writers && movie.writers.length > 0 && (
                  <div className="flex items-start text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-medium min-w-[70px]">编剧：</span>
                    <span>{movie.writers.join("、")}</span>
                  </div>
                )}

                {/* 新增摄影师信息 */}
                {movie.cinematographers &&
                  movie.cinematographers.length > 0 && (
                    <div className="flex items-start text-gray-600 dark:text-gray-300 mb-2">
                      <span className="font-medium min-w-[70px]">摄影：</span>
                      <span>{movie.cinematographers.join("、")}</span>
                    </div>
                  )}

                <div className="flex items-start text-gray-600 dark:text-gray-300">
                  <span className="font-medium min-w-[70px]">演员：</span>
                  <span>{movie.actors.join("、")}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  剧情简介
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {movie.summary}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 演员阵容部分 */}
        {movie.castDetails && movie.castDetails.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              主要演员
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {movie.castDetails.map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
              ))}
            </div>
          </div>
        )}

        {/* 剧照墙部分 */}
        {movie.images && movie.images.backdrops.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              精彩剧照
            </h2>
            <ImageGallery images={movie.images.backdrops} />
          </div>
        )}

        <Suspense
          fallback={
            <div className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl my-12"></div>
          }
        >
          <RelatedMovies movieId={movieId} />
        </Suspense>
      </div>
    </>
  );
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = parseInt(params.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<MovieDetailSkeleton />}>
        <MovieDetail movieId={movieId} />
      </Suspense>
    </div>
  );
}
