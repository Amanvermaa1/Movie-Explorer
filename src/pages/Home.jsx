import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { API_KEY, BASE_URL } from "../config";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPopularMovies = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${BASE_URL}/movie/popular?api_key=${API_KEY}`
            );
            const data = await res.json();
            setMovies(data.results || []);
        } catch {
            setError("Failed to fetch movies");
        } finally {
            setLoading(false);
        }
    };

    const searchMovies = async (query) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
            );
            const data = await res.json();
            setMovies(data.results || []);
        } catch {
            setError("Search failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <div className="p-6">
            <SearchBar onSearch={searchMovies} />

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Home;
