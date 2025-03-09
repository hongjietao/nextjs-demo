import { Movie } from "../../data/movies";

interface MovieBackdropProps {
  movie: Movie;
}

export default function MovieBackdrop({ movie }: MovieBackdropProps) {
  return (
    <div className="h-[500px] bg-gray-900 relative">
      <div className="absolute inset-0 opacity-30">
        {/* 背景海报 */}
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
      </div>

      {/* 标语展示 */}
      {movie.tagline && (
        <div className="absolute inset-x-0 bottom-10 text-center">
          <p className="text-white text-xl italic font-light px-4 py-2 inline-block bg-black/40 rounded-lg">
            &ldquo;{movie.tagline}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
