import { Movie } from "../data/movies";
import { getImageUrl } from "./tmdb";

// TMDB电影类型
export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  runtime?: number;
  genres?: Array<{ id: number; name: string }>;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
    }>;
  };
  recommendations?: {
    results: TMDBMovie[];
  };
}

/**
 * 将TMDB电影数据转换为应用使用的Movie格式
 */
export function adaptMovie(tmdbMovie: TMDBMovie): Movie {
  // 从crew中获取导演
  const director =
    tmdbMovie.credits?.crew?.find((person) => person.job === "Director")
      ?.name || "未知";

  // 获取演员列表
  const actors =
    tmdbMovie.credits?.cast
      ?.slice(0, 5) // 仅取前5位演员
      .map((actor) => actor.name) || [];

  // 获取电影类型
  const genres = tmdbMovie.genres?.map((genre) => genre.name) || [];

  // 从release_date提取年份
  const year = tmdbMovie.release_date
    ? new Date(tmdbMovie.release_date).getFullYear()
    : 0;

  // 转换评分 (TMDB的评分满分是10)
  const rating = parseFloat(tmdbMovie.vote_average.toFixed(1));

  // 格式化片长
  const duration = tmdbMovie.runtime ? `${tmdbMovie.runtime}分钟` : "未知";

  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    originalTitle: tmdbMovie.original_title,
    year,
    rating,
    director,
    actors,
    genres,
    summary: tmdbMovie.overview || "",
    posterUrl: getImageUrl(tmdbMovie.poster_path),
    duration,
  };
}

/**
 * 将多个TMDB电影数据转换为Movie数组
 */
export function adaptMovieList(tmdbMovies: TMDBMovie[]): Movie[] {
  return tmdbMovies.map((movie) => {
    // 尝试从crew中获取导演（如果有）
    const director =
      movie.credits?.crew?.find((person) => person.job === "Director")?.name ||
      "导演信息需要在详情页查看";

    // 尝试获取演员（如果有）
    const actors =
      movie.credits?.cast?.slice(0, 3).map((actor) => actor.name) || [];

    // 尝试获取电影类型
    const genres = movie.genres?.map((genre) => genre.name) || [];

    return {
      id: movie.id,
      title: movie.title,
      originalTitle: movie.original_title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
      rating: parseFloat(movie.vote_average.toFixed(1)),
      director,
      actors,
      genres,
      summary: movie.overview || "",
      posterUrl: getImageUrl(movie.poster_path),
      duration: movie.runtime ? `${movie.runtime}分钟` : "未知",
    };
  });
}
