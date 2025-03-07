import { NextRequest, NextResponse } from "next/server";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || "";

// 超时配置（毫秒）
const FETCH_TIMEOUT = 30000;

// 带超时的fetch函数，尝试启用HTTP/2
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout = FETCH_TIMEOUT
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    // 在Node.js环境中，fetch应该会自动协商HTTP/2，如果服务器支持的话
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export async function GET(request: NextRequest) {
  try {
    // 从URL获取endpoint和其他参数
    // 使用request.nextUrl替代直接创建URL，避免解析错误
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get("endpoint");

    // 验证必要参数
    if (!endpoint) {
      return NextResponse.json(
        { error: "缺少必要的endpoint参数" },
        { status: 400 }
      );
    }

    // 构建TMDB URL，保留所有原始参数但移除endpoint
    const tmdbUrl = new URL(`${TMDB_API_BASE_URL}/${endpoint}`);
    searchParams.forEach((value, key) => {
      if (key !== "endpoint") {
        tmdbUrl.searchParams.append(key, value);
      }
    });

    // 调用TMDB API，使用带超时的fetch
    console.log(`正在请求TMDB API: ${tmdbUrl.toString()}`);
    const response = await fetchWithTimeout(tmdbUrl.toString(), {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // 60秒内重新验证
    });

    // 如果API返回错误，抛出异常
    if (!response.ok) {
      console.error(`TMDB API响应错误: ${response.status}`);
      throw new Error(`TMDB API错误: ${response.status}`);
    }

    // 获取并返回数据
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // 详细记录错误信息
    console.error("TMDB API代理错误:", error);

    // 根据错误类型返回不同状态码
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "TMDB API请求超时", type: "timeout" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "获取TMDB数据失败", type: "unknown" },
      { status: 500 }
    );
  }
}
