import { NextRequest, NextResponse } from "next/server";
import nodeFetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN || "";

// 创建代理代理
const proxyAgent = new HttpsProxyAgent("http://localhost:7890");

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

    // 构建完整的TMDB API URL
    let tmdbUrlString = `${TMDB_API_BASE_URL}/${endpoint}`;

    // 构建查询参数
    const queryParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "endpoint") {
        queryParams.append(key, value);
      }
    });

    // 添加查询参数到URL
    const queryString = queryParams.toString();
    if (queryString) {
      tmdbUrlString += `?${queryString}`;
    }

    console.log(`请求TMDB API: ${tmdbUrlString}`);

    // 使用node-fetch和代理发送请求到TMDB API
    const response = await nodeFetch(tmdbUrlString, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      agent: proxyAgent,
    });

    // 检查响应状态
    if (!response.ok) {
      console.error(`TMDB API错误: ${response.status}`);
      return NextResponse.json(
        { error: `TMDB API错误: ${response.status}` },
        { status: response.status }
      );
    }

    // 解析响应数据
    const data = await response.json();

    // 返回成功响应
    return NextResponse.json(data);
  } catch (error) {
    console.error(`TMDB API错误:`, error);
    return NextResponse.json(
      {
        error: "获取TMDB数据失败",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
