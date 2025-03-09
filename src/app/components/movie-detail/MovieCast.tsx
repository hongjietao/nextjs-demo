import { Movie } from "../../data/movies";
import ActorCard from "../ActorCard";

interface MovieCastProps {
  movie: Movie;
}

export default function MovieCast({ movie }: MovieCastProps) {
  if (!movie.castDetails || movie.castDetails.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        演员阵容
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movie.castDetails.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  );
}
