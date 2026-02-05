import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../config";
import { getFavorites, toggleFavorite } from "../utils/favorites";
import { useState, useEffect } from "react";

const MovieCard = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = getFavorites();
        setIsFavorite(favorites.includes(movie.id));
    }, [movie.id]);

    const handleFavorite = (e) => {
        e.preventDefault(); // prevent navigation
        const updated = toggleFavorite(movie.id);
        setIsFavorite(updated.includes(movie.id));
    };

    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition">

                {/* Favorite Button */}
                <button
                    onClick={handleFavorite}
                    className="absolute top-2 right-2 text-xl"
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>

                <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-80 object-cover"
                />

                <div className="p-4">
                    <h3 className="font-semibold text-lg truncate">
                        {movie.title}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ⭐ {movie.vote_average.toFixed(1)}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
