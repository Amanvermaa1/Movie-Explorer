import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from "../config";
import { getFavorites, toggleFavorite } from "../utils/favorites";

// Loading Skeleton Component
const MovieDetailsSkeleton = () => (
    <div className="min-h-screen bg-[#141414] animate-fade-in-up">
        {/* Backdrop Skeleton */}
        <div className="h-[50vh] skeleton" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Poster Skeleton */}
                <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
                    <div className="aspect-[2/3] rounded-lg skeleton" />
                </div>
                
                {/* Content Skeleton */}
                <div className="flex-1 space-y-6 pt-8">
                    <div className="h-12 skeleton rounded w-3/4" />
                    <div className="flex items-center gap-4">
                        <div className="h-6 skeleton rounded w-20" />
                        <div className="h-6 skeleton rounded w-24" />
                    </div>
                    <div className="flex gap-2">
                        <div className="h-8 skeleton rounded-full w-24" />
                        <div className="h-8 skeleton rounded-full w-24" />
                    </div>
                    <div className="space-y-3 pt-4">
                        <div className="h-4 skeleton rounded w-full" />
                        <div className="h-4 skeleton rounded w-full" />
                        <div className="h-4 skeleton rounded w-5/6" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = getFavorites();
        return favorites.includes(Number(id));
    });
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            setError("");
            setImageLoaded(false);
            
            try {
                const res = await fetch(
                    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
                );
                
                if (!res.ok) throw new Error("Movie not found");
                
                const data = await res.json();
                setMovie(data);
                
                // Check if favorite
                const favorites = getFavorites();
                setIsFavorite(favorites.includes(Number(id)));
            } catch {
                setError("Failed to load movie details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleFavorite = () => {
        const updated = toggleFavorite(Number(id));
        setIsFavorite(updated.includes(Number(id)));
    };

    // Format runtime
    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    // Loading State
    if (loading) {
        return <MovieDetailsSkeleton />;
    }

    // Error State
    if (error || !movie) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {error || "Movie not found"}
                    </h2>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#E50914] text-white rounded-md font-medium hover:bg-[#f40612] transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414]">
            {/* Backdrop Image */}
            <div className="relative h-[50vh] md:h-[60vh]">
                {!imageLoaded && (
                    <div className="absolute inset-0 skeleton" />
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 md:-mt-48 relative z-10 pb-12">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Browse
                </Link>

                <div className="flex flex-col md:flex-row gap-8 animate-fade-in-up">
                    {/* Poster */}
                    <div className="w-full md:w-72 lg:w-80 flex-shrink-0">
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {movie.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                            <span className="text-green-400 font-semibold">
                                {movie.vote_average?.toFixed(1)} Rating
                            </span>
                            <span className="text-gray-400">
                                {movie.release_date?.substring(0, 4)}
                            </span>
                            {movie.runtime > 0 && (
                                <span className="text-gray-400">
                                    {formatRuntime(movie.runtime)}
                                </span>
                            )}
                            {movie.adult && (
                                <span className="border border-gray-600 px-1.5 py-0.5 text-xs text-gray-400">
                                    18+
                                </span>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <button
                                onClick={handleFavorite}
                                className={`flex items-center gap-2 px-8 py-3 rounded-md font-bold text-lg transition-all duration-200 hover:scale-105 ${
                                    isFavorite
                                        ? "bg-gray-600 text-white hover:bg-gray-500"
                                        : "bg-[#E50914] text-white hover:bg-[#f40612]"
                                }`}
                            >
                                {isFavorite ? (
                                    <>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        In My List
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add to My List
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Tagline */}
                        {movie.tagline && (
                            <p className="text-xl text-gray-300 italic mb-6">
                                "{movie.tagline}"
                            </p>
                        )}

                        {/* Overview */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-white mb-3">
                                Overview
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {movie.overview || "No overview available."}
                            </p>
                        </div>

                        {/* Genres */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                                    Genres
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-3 py-1 border border-gray-700 text-gray-300 rounded-full text-sm"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-800">
                            {movie.status && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Status</p>
                                    <p className="text-white">{movie.status}</p>
                                </div>
                            )}
                            {movie.original_language && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Original Language</p>
                                    <p className="text-white uppercase">{movie.original_language}</p>
                                </div>
                            )}
                            {movie.vote_count && (
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Total Votes</p>
                                    <p className="text-white">{movie.vote_count.toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
