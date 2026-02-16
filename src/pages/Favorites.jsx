import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { API_KEY, BASE_URL } from "../config";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import { getFavorites } from "../utils/favorites";

const Favorites = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = useCallback(async () => {
        const ids = getFavorites();

        if (ids.length === 0) {
            setMovies([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const requests = ids.map((id) =>
                fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
                    .then((res) => {
                        if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);
                        return res.json();
                    })
                    .catch(err => {
                        console.error(`Error fetching movie ${id}:`, err);
                        return null;
                    })
            );

            const results = await Promise.all(requests);
            const validResults = results.filter(movie => movie && movie.id);
            setMovies(validResults);
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    // Refresh on window focus
    useEffect(() => {
        const handleFocus = () => {
            fetchFavorites();
        };

        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [fetchFavorites]);

    // Empty State
    if (!loading && movies.length === 0) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-6">📂</div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        My List is Empty
                    </h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Add movies you want to watch later
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#E50914] text-white rounded-md font-bold hover:bg-[#f40612] transition-all duration-200 hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Browse Movies
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] pt-20">
            <div className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        My List
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {movies.length > 0 
                            ? `${movies.length} ${movies.length === 1 ? "title" : "titles"}`
                            : "Loading..."
                        }
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <MovieCardSkeleton key={index} index={index} />
                        ))}
                    </div>
                )}

                {/* Movies Grid */}
                {!loading && movies.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {movies.map((movie, index) => (
                            <MovieCard 
                                key={movie.id} 
                                movie={movie} 
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
