import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from "../config";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const res = await fetch(
                `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
            );
            const data = await res.json();
            setMovie(data);
            setLoading(false);
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) return <p className="p-6">Loading...</p>;
    if (!movie) return <p className="p-6">Movie not found</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full md:w-80 rounded-lg"
                />

                <div>
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-500 mb-2">
                        ⭐ {movie.vote_average.toFixed(1)}
                    </p>
                    <p className="mb-4">{movie.overview}</p>
                    <p className="text-sm text-gray-500">
                        Release date: {movie.release_date}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
