import { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../config";

const HeroBanner = ({ movie }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!movie) return null;

    // Truncate overview for hero
    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] mb-8">
            {/* Background Image */}
            <div className="absolute inset-0">
                {!imageLoaded && (
                    <div className="w-full h-full bg-gray-800 animate-pulse" />
                )}
                <img
                    src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl animate-fade-in-up">
                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            {movie.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-4 text-white/90">
                            <span className="text-green-400 font-semibold">
                                {movie.vote_average?.toFixed(1)} Rating
                            </span>
                            <span>{movie.release_date?.substring(0, 4)}</span>
                            {movie.runtime && (
                                <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                            )}
                        </div>

                        {/* Overview */}
                        <p className="text-lg text-white/80 mb-8 line-clamp-3 drop-shadow-md">
                            {truncateText(movie.overview, 200)}
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to={`/movie/${movie.id}`}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-md font-bold text-lg hover:bg-white/90 transition-all duration-200 hover:scale-105"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
