export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  year: number;
  rating: number;
  director: string;
  actors: string[];
  genres: string[];
  summary: string;
  posterUrl: string;
  duration: string;
}

// 导入TMDB API相关函数
import { fetchPopularMovies, fetchMovieById } from "../lib/tmdb";
import { adaptMovie, adaptMovieList } from "../lib/movieAdapter";
import { FALLBACK_MOVIES } from "../lib/fallback-movies";

// 电影缓存
const movieCache: Map<number, Movie> = new Map();
let allMoviesCache: Movie[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 缓存5分钟

// 网络连接状态记录
let hasNetworkError = false;

// 强制使用后备数据的开关，设为false以允许从TMDB获取实时数据
const USE_FALLBACK_DATA = false;

// 缓存是否过期
function isCacheExpired(): boolean {
  return Date.now() - cacheTimestamp > CACHE_DURATION;
}

// 根据索引范围获取电影列表
export async function getMovies(start = 0, limit = 10): Promise<Movie[]> {
  const movies = await getAllMovies();
  return movies.slice(start, start + limit);
}

// 获取所有电影 (TMDB热门电影)
export async function getAllMovies(): Promise<Movie[]> {
  // 如果缓存有效，直接返回缓存
  if (allMoviesCache && !isCacheExpired()) {
    return allMoviesCache;
  }

  // 如果强制使用后备数据，则直接返回
  if (USE_FALLBACK_DATA) {
    console.log("配置设置为使用后备数据");
    allMoviesCache = FALLBACK_MOVIES;
    cacheTimestamp = Date.now();
    return FALLBACK_MOVIES;
  }

  try {
    // 获取TMDB热门电影
    const tmdbMovies = await fetchPopularMovies(1);

    // 如果API返回空数组，使用后备数据
    if (!tmdbMovies || tmdbMovies.length === 0) {
      console.log("API返回空数据，使用后备数据");

      // 更新缓存时间戳，但保留短缓存时间以便稍后重试
      allMoviesCache = FALLBACK_MOVIES;
      cacheTimestamp = Date.now();

      return FALLBACK_MOVIES;
    }

    // 转换为应用的Movie格式
    const movies = adaptMovieList(tmdbMovies);

    // 更新缓存
    allMoviesCache = movies;
    cacheTimestamp = Date.now();
    hasNetworkError = false;

    // 同时更新单个电影的缓存
    movies.forEach((movie) => {
      movieCache.set(movie.id, movie);
    });

    return movies;
  } catch (error) {
    console.error("获取电影列表失败，使用后备数据:", error);
    hasNetworkError = true;

    // 更新缓存但使用短缓存时间
    allMoviesCache = FALLBACK_MOVIES;
    cacheTimestamp = Date.now() - (CACHE_DURATION - 60000); // 只缓存1分钟

    return FALLBACK_MOVIES;
  }
}

// 根据ID获取电影详情
export async function getMovieById(id: number): Promise<Movie | undefined> {
  // 检查缓存 - 仅当缓存中的电影有完整导演信息时才使用
  if (
    movieCache.has(id) &&
    !isCacheExpired() &&
    movieCache.get(id)!.director !== "导演信息需要在详情页查看"
  ) {
    return movieCache.get(id);
  }

  // 如果有网络错误，先尝试从后备数据查找
  if (hasNetworkError) {
    const fallbackMovie = FALLBACK_MOVIES.find((movie) => movie.id === id);
    if (fallbackMovie) return fallbackMovie;
  }

  try {
    // 从TMDB获取电影详情
    const tmdbMovie = await fetchMovieById(id);
    if (!tmdbMovie) {
      // 在API找不到时，尝试从后备数据查找
      return FALLBACK_MOVIES.find((movie) => movie.id === id);
    }

    // 转换为应用的Movie格式
    const movie = adaptMovie(tmdbMovie);

    // 更新缓存
    movieCache.set(id, movie);
    hasNetworkError = false;

    return movie;
  } catch (error) {
    console.error(`获取电影ID ${id} 失败，尝试使用后备数据:`, error);
    hasNetworkError = true;

    // 尝试从后备数据查找
    return FALLBACK_MOVIES.find((movie) => movie.id === id);
  }
}

// 导出后备数据作为TOP_MOVIES，以兼容可能存在的旧代码引用
export const TOP_MOVIES: Movie[] = FALLBACK_MOVIES;
