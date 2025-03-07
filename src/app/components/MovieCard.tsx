import Image from "next/image";
import Link from "next/link";
import { Movie } from "../data/movies";
import { StarIcon } from "@heroicons/react/24/solid";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col h-full">
      <Link
        href={`/movie/${movie.id}`}
        className="relative h-[400px] overflow-hidden block"
      >
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <div className="flex items-center space-x-2">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="font-bold">{movie.rating}</span>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-full p-3 transform translate-y-4 hover:translate-y-0 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <Link
          href={`/movie/${movie.id}`}
          className="hover:text-blue-500 transition-colors"
        >
          <h3 className="text-lg font-bold line-clamp-1">{movie.title}</h3>
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          {movie.originalTitle} ({movie.year})
        </p>

        <div className="mt-2 mb-3">
          <div className="flex flex-wrap gap-1">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 mt-auto">
          <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
            导演: {movie.director}
          </p>
        </div>
      </div>
    </div>
  );
}
