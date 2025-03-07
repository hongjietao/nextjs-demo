// TheMovieDB API客户端
// 使用环境变量存储访问令牌，确保安全性

// 使用本地API代理 - 确保使用绝对URL路径
// 在客户端环境中，应该使用相对路径，在服务器端则需要完整URL
function getApiUrl() {
  // 检查是否在浏览器环境中
  const isClient = typeof window !== "undefined";
  const baseUrl = isClient ? window.location.origin : "http://localhost:3000"; // 开发环境默认值
  return `${baseUrl}/api/tmdb`;
}

// TMDB图片服务地址
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * 从TheMovieDB获取热门电影
 */
export async function fetchPopularMovies(page = 1, language = "zh-CN") {
  try {
    // 获取API完整URL
    const apiUrl = getApiUrl();
    // 使用API代理
    const response = await fetch(
      `${apiUrl}?endpoint=movie/popular&page=${page}&language=${language}`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`API响应错误: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("获取热门电影失败:", error);
    console.log("API返回空数据，使用后备数据");
    // 返回一些后备数据
    return [];
  }
}

/**
 * 根据ID获取电影详情
 */
export async function fetchMovieById(id: number, language = "zh-CN") {
  try {
    // 获取API完整URL
    const apiUrl = getApiUrl();
    // 使用API代理
    const response = await fetch(
      `${apiUrl}?endpoint=movie/${id}&append_to_response=credits,recommendations&language=${language}`,
      {
        cache: "no-store",
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`API响应错误: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`获取电影ID ${id} 失败:`, error);
    return null;
  }
}

/**
 * 构建图片URL
 * @param path 图片路径
 * @param size 图片尺寸 (w500, original等)
 */
export function getImageUrl(path: string | null, size = "w500") {
  if (!path) return "/placeholder-movie.jpg";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * 搜索电影
 */
export async function searchMovies(
  query: string,
  page = 1,
  language = "zh-CN"
) {
  try {
    // 获取API完整URL
    const apiUrl = getApiUrl();
    // 使用API代理
    const response = await fetch(
      `${apiUrl}?endpoint=search/movie&query=${encodeURIComponent(
        query
      )}&page=${page}&language=${language}`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`API响应错误: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("搜索电影失败:", error);
    return [];
  }
}
