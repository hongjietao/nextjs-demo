import { Suspense } from "react";
import MovieDetail from "../../components/movie-detail/MovieDetail";
import MovieDetailSkeleton from "../../components/movie-detail/MovieDetailSkeleton";

// 修改为符合 Next.js PageProps 约束的接口
interface MovieDetailPageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = parseInt(params.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<MovieDetailSkeleton />}>
        <MovieDetail movieId={movieId} />
      </Suspense>
    </div>
  );
}
