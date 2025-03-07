import { NextResponse } from "next/server";
import { fetchMovieById } from "@/app/lib/tmdb";
import { adaptMovie, TMDBMovie } from "@/app/lib/movieAdapter";

export async function GET() {
  try {
    // 获取Fight Club电影的数据
    const movieId = 550;
    const tmdbMovie = await fetchMovieById(movieId);

    if (!tmdbMovie) {
      return NextResponse.json({
        success: false,
        message: "无法获取电影数据",
      });
    }

    // 检查是否存在credits和crew
    const hasCredits = Boolean(tmdbMovie.credits);
    const crewCount = tmdbMovie.credits?.crew?.length || 0;

    // 查找导演
    let directorInfo = null;
    if (tmdbMovie.credits?.crew) {
      directorInfo = tmdbMovie.credits.crew.find(
        (person: { job: string }) => person.job === "Director"
      );
    }

    // 使用适配器处理数据
    const adaptedMovie = adaptMovie(tmdbMovie as TMDBMovie);

    return NextResponse.json({
      success: true,
      movieId,
      title: tmdbMovie.title,
      originalTitle: tmdbMovie.original_title,
      creditsExist: hasCredits,
      crewCount,
      director: directorInfo,
      adaptedDirector: adaptedMovie.director,
    });
  } catch (error) {
    console.error("测试API错误:", error);
    return NextResponse.json({
      success: false,
      message: "测试API出错",
      error: (error as Error).message,
    });
  }
}
