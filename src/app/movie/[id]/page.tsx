import { Suspense } from "react";
import MovieDetail from "../../components/movie-detail/MovieDetail";
import MovieDetailSkeleton from "../../components/movie-detail/MovieDetailSkeleton";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MovieDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const movieId = parseInt(resolvedParams.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<MovieDetailSkeleton />}>
        <MovieDetail movieId={movieId} />
      </Suspense>
    </div>
  );
}
