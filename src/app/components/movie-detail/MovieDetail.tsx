import Link from "next/link";
import { getMovieById } from "../../data/movies";
import MovieBackdrop from "./MovieBackdrop";
import MovieHeader from "./MovieHeader";
import MovieCast from "./MovieCast";
import MovieGallery from "./MovieGallery";
import RelatedMovies from "./RelatedMovies";
import { Suspense } from "react";

interface MovieDetailProps {
  movieId: number;
}

export default async function MovieDetail({ movieId }: MovieDetailProps) {
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
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <MovieBackdrop movie={movie} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
          <MovieHeader movie={movie} />
        </div>

        {/* 演员阵容 - 只有当有演员数据时才渲染该区块 */}
        {movie.castDetails && movie.castDetails.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
            <MovieCast movie={movie} />
          </div>
        )}

        {/* 电影剧照 - 只有当有图片数据时才渲染该区块 */}
        {movie.images &&
          (movie.images.backdrops.length > 0 ||
            movie.images.posters.length > 0) && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
              <MovieGallery movie={movie} />
            </div>
          )}

        {/* 相关电影 - 使用Suspense包裹，并且由RelatedMovies组件内部决定是否渲染 */}
        <Suspense
          fallback={
            <div className="h-20 flex items-center justify-center">
              <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <RelatedMovies movieId={movieId} />
        </Suspense>
      </div>
    </>
  );
}
