import MovieCardSkeleton from "./MovieCardSkeleton";

export default function MovieListSkeleton() {
  return (
    <>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
    </>
  );
}
