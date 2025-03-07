import { NextRequest, NextResponse } from "next/server";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || "";

export async function GET(request: NextRequest) {
  try {
    // 从URL获取endpoint和其他参数
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get("endpoint");

    // 验证必要参数
    if (!endpoint) {
      return NextResponse.json(
        { error: "缺少必要的endpoint参数" },
        { status: 400 }
      );
    }

    // 构建TMDB URL
    const tmdbUrl = new URL(`${TMDB_API_BASE_URL}/${endpoint}`);
    searchParams.forEach((value, key) => {
      if (key !== "endpoint") {
        tmdbUrl.searchParams.append(key, value);
      }
    });

    // 调用TMDB API
    console.log(`正在请求TMDB API: ${tmdbUrl.toString()}`);

    // 直接使用标准fetch
    const response = await fetch(tmdbUrl.toString(), {
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

    // 为所有错误返回统一的状态码
    return NextResponse.json(
      { error: "获取TMDB数据失败", details: String(error) },
      { status: 500 }
    );
  }
}
