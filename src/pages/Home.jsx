import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import SearchBar from "../components/SearchBar";
import HeroBanner from "../components/HeroBanner";
import { API_KEY, BASE_URL } from "../config";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchPopularMovies = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `${BASE_URL}/movie/popular?api_key=${API_KEY}`
            );
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            const results = data.results || [];
            setMovies(results);
            
            // Set first movie as featured (or random from top 5)
            if (results.length > 0) {
                const randomIndex = Math.floor(Math.random() * Math.min(5, results.length));
                setFeaturedMovie(results[randomIndex]);
            }
            
            setSearchQuery("");
        } catch {
            setError("Failed to fetch movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const searchMovies = async (query) => {
        if (!query.trim()) {
            fetchPopularMovies();
            return;
        }
        
        setLoading(true);
        setError("");
        setSearchQuery(query);
        setFeaturedMovie(null); // Hide hero banner during search
        
        try {
            const res = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
            );
            if (!res.ok) throw new Error("Search failed");
            const data = await res.json();
            setMovies(data.results || []);
        } catch {
            setError("Search failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <div className="min-h-screen bg-[#141414]">
            {/* Hero Banner */}
            {!searchQuery && featuredMovie && <HeroBanner movie={featuredMovie} />}

            {/* Content Section */}
            <div className="px-4 sm:px-6 lg:px-8 xl:px-12 pb-12">
                {/* Search Section */}
                <div className="mb-8">
                    <SearchBar 
                        onSearch={searchMovies} 
                        onClear={fetchPopularMovies}
                        hasSearch={!!searchQuery}
                    />
                </div>

                {/* Section Title */}
                {!searchQuery && (
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                        Popular on MovieFlix
                    </h2>
                )}

                {/* Search Results Title */}
                {searchQuery && (
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            Search Results for "{searchQuery}"
                        </h2>
                        <p className="text-gray-400 mt-1">
                            {movies.length} {movies.length === 1 ? "title" : "titles"} found
                        </p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-center">
                        <p className="text-red-400 mb-3">{error}</p>
                        <button
                            onClick={fetchPopularMovies}
                            className="px-6 py-2 bg-[#E50914] text-white rounded-md font-medium hover:bg-[#f40612] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <MovieCardSkeleton key={index} index={index} />
                        ))}
                    </div>
                )}

                {/* Movies Grid */}
                {!loading && !error && (
                    <>
                        {movies.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                {movies.map((movie, index) => (
                                    <MovieCard 
                                        key={movie.id} 
                                        movie={movie} 
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {searchQuery ? "No movies found" : "No movies available"}
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    {searchQuery 
                                        ? "Try a different search term"
                                        : "Check back later for popular movies"
                                    }
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={fetchPopularMovies}
                                        className="px-6 py-2 bg-[#E50914] text-white rounded-md font-medium hover:bg-[#f40612] transition-colors"
                                    >
                                        View Popular Movies
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
