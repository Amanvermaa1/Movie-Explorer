import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../config";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../utils/favorites";

const Favorites = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favoriteIds = getFavorites();

            if (favoriteIds.length === 0) {
                setMovies([]);
                return;
            }

            const requests = favoriteIds.map((id) =>
                fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then((res) =>
                    res.json()
                )
            );

            const results = await Promise.all(requests);
            setMovies(results);
        };

        fetchFavorites();
    }, []);

    if (movies.length === 0) {
        return <p className="p-6">No favorite movies yet ❤️</p>;
    }

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default Favorites;
