import { NextRequest, NextResponse } from "next/server";

// 图片代理API
export async function GET(request: NextRequest) {
  try {
    // 获取请求中的图片URL参数
    const searchParams = request.nextUrl.searchParams;
    const imageUrl = searchParams.get("url");

    // 验证URL参数
    if (!imageUrl) {
      return NextResponse.json({ error: "缺少url参数" }, { status: 400 });
    }

    // 验证是否为tmdb图片域名
    if (!imageUrl.startsWith("https://image.tmdb.org/")) {
      return NextResponse.json({ error: "不支持的图片域名" }, { status: 400 });
    }

    // 请求原始图片
    const response = await fetch(imageUrl);

    // 如果请求失败，返回错误
    if (!response.ok) {
      return NextResponse.json(
        { error: `图片获取失败: ${response.status}` },
        { status: response.status }
      );
    }

    // 读取图片数据
    const imageData = await response.arrayBuffer();

    // 提取Content-Type
    const contentType = response.headers.get("Content-Type") || "image/jpeg";

    // 返回图片数据
    return new NextResponse(imageData, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // 缓存24小时
      },
    });
  } catch (error) {
    console.error("图片代理错误:", error);
    return NextResponse.json({ error: "图片代理服务错误" }, { status: 500 });
  }
}
