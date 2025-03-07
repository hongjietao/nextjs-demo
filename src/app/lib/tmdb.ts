// TheMovieDB API客户端
// 使用环境变量存储访问令牌，确保安全性

// 使用本地API代理 - 确保使用绝对URL路径
// 在客户端环境中，应该使用相对路径，在服务器端则需要完整URL
function getApiUrl() {
  // 检查是否在浏览器环境中
  const isClient = typeof window !== "undefined";
  // 如果在客户端，使用相对路径
  if (isClient) {
    return "/api/tmdb";
  }
  // 如果在服务器端，使用完整URL (使用环境变量获取主机名或默认使用localhost)
  const host = process.env.VERCEL_URL || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}/api/tmdb`;
}

// TMDB图片服务地址
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// 请求超时时间（毫秒）
const REQUEST_TIMEOUT = 8000;

/**
 * 创建带超时的fetch请求
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout = REQUEST_TIMEOUT
) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(id);
    return response;
  } catch (error) {
    console.error(`请求超时或失败: ${url}`, error);
    throw error;
  }
}

/**
 * 从TheMovieDB获取热门电影
 */
export async function fetchPopularMovies(page = 1, language = "zh-CN") {
  try {
    // 获取API完整URL
    const apiUrl = getApiUrl();
    console.log(`获取热门电影，API URL: ${apiUrl}`);

    // 使用API代理，设置超时
    const response = await fetchWithTimeout(
      `${apiUrl}?endpoint=movie/popular&page=${page}&language=${language}`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error(`API响应错误: ${response.status}`);
      throw new Error(`API响应错误: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !data.results || !Array.isArray(data.results)) {
      console.error("API返回的数据格式不正确");
      throw new Error("API返回的数据格式不正确");
    }

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
    console.log(`获取电影详情，ID: ${id}，API URL: ${apiUrl}`);

    // 使用API代理，设置超时
    const response = await fetchWithTimeout(
      `${apiUrl}?endpoint=movie/${id}&append_to_response=credits,recommendations&language=${language}`,
      {
        cache: "no-store",
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(`API响应错误 (电影ID ${id}): ${response.status}`);
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

  try {
    // 创建完整的TMDB图片URL
    const tmdbUrl = `${TMDB_IMAGE_BASE_URL}/${size}${path}`;

    // 使用本地图片代理API
    const proxyUrl = `/api/image?url=${encodeURIComponent(tmdbUrl)}`;

    // 使用代理URL解决图片加载问题
    return proxyUrl;
  } catch (error) {
    console.error("图片URL生成失败:", error);
    return "/placeholder-movie.jpg";
  }
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
    console.log(`搜索电影，查询: ${query}，API URL: ${apiUrl}`);

    // 使用API代理
    const response = await fetchWithTimeout(
      `${apiUrl}?endpoint=search/movie&query=${encodeURIComponent(
        query
      )}&page=${page}&language=${language}`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error(`搜索API响应错误: ${response.status}`);
      throw new Error(`API响应错误: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("搜索电影失败:", error);
    return [];
  }
}
