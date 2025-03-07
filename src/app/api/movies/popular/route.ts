import { NextRequest, NextResponse } from "next/server";
import { getAllMovies } from "../../../data/movies";

export async function GET(request: NextRequest) {
  // 从URL获取page参数
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");

  try {
    const result = await getAllMovies(page);
    return NextResponse.json(result);
  } catch (error) {
    console.error("获取热门电影失败:", error);
    return NextResponse.json({ error: "获取热门电影失败" }, { status: 500 });
  }
}
