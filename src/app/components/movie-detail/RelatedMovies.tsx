import Link from "next/link";
import { Movie } from "../../data/movies";
import { getAllMovies, getMovieById } from "../../data/movies";
import { StarIcon } from "@heroicons/react/24/solid";

interface RelatedMovieCardProps {
  movie: Movie;
}

function RelatedMovieCard({ movie }: RelatedMovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="block group">
      <div className="relative h-[200px] overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
          <div className="flex items-center space-x-1">
            <StarIcon className="h-3 w-3 text-yellow-400" />
            <span className="text-xs font-bold">{movie.rating}</span>
          </div>
          <h3 className="text-sm font-medium line-clamp-1">{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
}

interface RelatedMoviesProps {
  movieId: number;
}

export default async function RelatedMovies({ movieId }: RelatedMoviesProps) {
  const allMoviesData = await getAllMovies();
  const movie = await getMovieById(movieId);

  if (!movie) return null;

  const relatedMovies = allMoviesData.movies
    .filter(
      (m: Movie) =>
        m.id !== movie.id &&
        m.genres.some((genre: string) => movie.genres.includes(genre))
    )
    .slice(0, 4);

  if (relatedMovies.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-10">
      <div className="my-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          相关推荐
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedMovies.map((movie: Movie) => (
            <RelatedMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
