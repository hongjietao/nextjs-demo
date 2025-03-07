// TheMovieDB API客户端
// 使用环境变量存储访问令牌，确保安全性

// 使用本地API代理 - 确保使用绝对URL路径
// 在客户端环境中，应该使用相对路径，在服务器端则需要完整URL
function getApiUrl() {
  // 统一使用相对URL，避免在服务器端和客户端环境下的差异
  return "/api/tmdb";
}

// TMDB图片服务地址
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * 从TheMovieDB获取热门电影
 */
export async function fetchPopularMovies(page = 1, language = "zh-CN") {
  try {
    // 获取API URL
    const apiUrl = getApiUrl();

    // 使用API代理
    const response = await fetch(
      `${apiUrl}?endpoint=movie/popular&page=${page}&language=${language}`,
      {
        cache: "no-store",
        // 移除revalidate，使用no-store确保每次都获取最新数据
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

    // 如果成功获取数据，记录日志
    console.log(`成功获取热门电影，共 ${data.results.length} 条记录`);
    return data.results;
  } catch (error) {
    console.error("获取热门电影失败:", error);
    console.log("API返回空数据，使用后备数据");
    // 返回空数组，会触发使用后备数据
    return [];
  }
}

/**
 * 根据ID获取电影详情
 */
export async function fetchMovieById(id: number, language = "zh-CN") {
  try {
    // 获取API URL
    const apiUrl = getApiUrl();

    // 使用API代理
    const response = await fetch(
      `${apiUrl}?endpoint=movie/${id}&append_to_response=credits,recommendations&language=${language}`,
      {
        cache: "no-store",
        // 使用no-store确保获取最新数据
      }
    );

    if (!response.ok) {
      console.error(`API响应错误 (电影ID ${id}): ${response.status}`);
      throw new Error(`API响应错误: ${response.status}`);
    }

    const data = await response.json();
    console.log(`成功获取电影详情，ID: ${id}`);
    return data;
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
    // 直接使用TMDB图片URL
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
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
    // 获取API URL
    const apiUrl = getApiUrl();

    // 使用API代理
    const response = await fetch(
      `${apiUrl}?endpoint=search/movie&query=${encodeURIComponent(
        query
      )}&page=${page}&language=${language}`,
      {
        cache: "no-store",
        // 使用no-store确保获取最新数据
      }
    );

    if (!response.ok) {
      console.error(`搜索API响应错误: ${response.status}`);
      throw new Error(`API响应错误: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      `成功搜索电影，关键词: ${query}，结果数: ${data.results.length}`
    );
    return data.results;
  } catch (error) {
    console.error("搜索电影失败:", error);
    return [];
  }
}
