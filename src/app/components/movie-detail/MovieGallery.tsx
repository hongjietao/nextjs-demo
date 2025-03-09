import { Movie } from "../../data/movies";
import ImageGallery from "../ImageGallery";

interface MovieGalleryProps {
  movie: Movie;
}

export default function MovieGallery({ movie }: MovieGalleryProps) {
  if (
    !movie.images ||
    (!movie.images.backdrops.length && !movie.images.posters.length)
  ) {
    return null;
  }

  const images = [
    ...(movie.images.backdrops || []),
    ...(movie.images.posters || []),
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        剧照 & 海报
      </h2>
      <div className="overflow-hidden">
        <ImageGallery images={images} />
      </div>
    </div>
  );
}
