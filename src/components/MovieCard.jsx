import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../config";
import { getFavorites, toggleFavorite } from "../utils/favorites";
import { useState } from "react";

const MovieCard = ({ movie, index = 0 }) => {
    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = getFavorites();
        return favorites.includes(Number(movie.id));
    });
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const updated = toggleFavorite(Number(movie.id));
        setIsFavorite(updated.includes(Number(movie.id)));
    };

    // Calculate animation delay based on index
    const delayClass = `delay-${(index % 8 + 1) * 100}`;

    return (
        <Link 
            to={`/movie/${movie.id}`} 
            className={`group block animate-fade-in-up ${delayClass}`}
            style={{ opacity: 0 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative rounded-md overflow-hidden transition-all duration-300 ease-out hover:scale-110 hover:z-20 netflix-card">
                
                {/* Favorite Button */}
                <button
                    onClick={handleFavorite}
                    className={`absolute top-2 right-2 z-30 p-2 rounded-full bg-black/60 backdrop-blur-sm transition-all duration-200 hover:bg-black/80 hover:scale-110 ${
                        isFavorite ? "text-red-500" : "text-white/70 hover:text-white"
                    }`}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                {/* Image Container */}
                <div className="relative aspect-[2/3] overflow-hidden bg-[#1a1a1a]">
                    {/* Loading Skeleton */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 skeleton" />
                    )}
                    
                    <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                        } ${isHovered ? "scale-110 brightness-75" : "scale-100"}`}
                    />

                    {/* Hover Overlay - Netflix Style */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 flex flex-col justify-end p-3 ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}>
                        {/* Quick Info */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-white/90">
                                <span className="text-green-400 font-semibold">
                                    {movie.vote_average?.toFixed(1)} Rating
                                </span>
                                <span className="text-gray-400">•</span>
                                <span>{movie.release_date?.substring(0, 4)}</span>
                            </div>
                            
                            {/* Match Percentage (Simulated) */}
                            <div className="text-xs">
                                <span className="text-green-400 font-semibold">
                                    {Math.floor(90 + Math.random() * 9)}% Match
                                </span>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-1">
                                {movie.genre_ids?.slice(0, 2).map((genreId) => (
                                    <span key={genreId} className="text-[10px] text-gray-300 bg-white/10 px-1.5 py-0.5 rounded">
                                        Genre
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title - Always visible but enhanced on hover */}
                <div className={`p-2 transition-all duration-300 ${isHovered ? "bg-[#1a1a1a]" : ""}`}>
                    <h3 className={`font-medium text-sm text-white line-clamp-1 transition-colors ${
                        isHovered ? "text-[#E50914]" : ""
                    }`}>
                        {movie.title}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
