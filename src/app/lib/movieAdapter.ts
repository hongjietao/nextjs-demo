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
  vote_count: number;
  popularity: number;
  status: string;
  production_companies?: Array<{ name: string }>;
  production_countries?: Array<{ name: string }>;
  spoken_languages?: Array<{ name: string }>;
  tagline?: string;
  budget: number;
  revenue: number;
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

  // 新增信息处理
  // 获取编剧
  const writers =
    tmdbMovie.credits?.crew
      ?.filter(
        (person) =>
          person.job === "Screenplay" ||
          person.job === "Writer" ||
          person.job === "Story"
      )
      .map((person) => person.name) || [];

  // 获取摄影师
  const cinematographers =
    tmdbMovie.credits?.crew
      ?.filter(
        (person) =>
          person.job === "Director of Photography" ||
          person.job === "Cinematography"
      )
      .map((person) => person.name) || [];

  // 格式化预算和票房 (转换为亿/万)
  const formatMoney = (amount: number): string => {
    if (!amount) return "未知";
    if (amount >= 100000000) {
      return `${(amount / 100000000).toFixed(2)}亿`;
    } else if (amount >= 10000) {
      return `${(amount / 10000).toFixed(2)}万`;
    }
    return `${amount}`;
  };

  // 处理制作公司
  const productionCompanies =
    tmdbMovie.production_companies?.map((company) => company.name) || [];

  // 处理制作国家
  const productionCountries =
    tmdbMovie.production_countries?.map((country) => country.name) || [];

  // 处理语言
  const languages = tmdbMovie.spoken_languages?.map((lang) => lang.name) || [];

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
    // 新增字段
    backdropUrl: getImageUrl(tmdbMovie.backdrop_path, "original"),
    voteCount: tmdbMovie.vote_count,
    popularity: tmdbMovie.popularity,
    status: tmdbMovie.status,
    productionCompanies,
    productionCountries,
    tagline: tmdbMovie.tagline || "",
    budget: formatMoney(tmdbMovie.budget),
    revenue: formatMoney(tmdbMovie.revenue),
    languages,
    writers,
    cinematographers,
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
      // 添加部分可用于列表展示的新字段
      backdropUrl: getImageUrl(movie.backdrop_path),
      voteCount: movie.vote_count,
      popularity: movie.popularity,
      tagline: movie.tagline || "",
    };
  });
}
