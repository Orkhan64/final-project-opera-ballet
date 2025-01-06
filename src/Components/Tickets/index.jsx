import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loading.css";
import ballerinaImages from "../../assets/school.png";

const apiUrl = import.meta.env.VITE_API_URL;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${apiUrl}/movie`);
        if (!response.ok) {
          throw new Error("An error occurred while retrieving movies.");
        }
        const data = await response.json();
        setTimeout(() => {
          setMovies(data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="ballerina-figure">
          <img src={ballerinaImages} alt="Ballerina" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center text-lg">Gösterilecek film bulunamadı.</div>
    );
  }

  const handleDetailClick = (id) => {
    if (!id) {
      alert("Invalid movie ID!");
      return;
    }
    navigate(`/MovieDetailPage/${id}`);
  };

  return (
    <div className="my-8 mx-auto max-w-7xl px-4">
      <div className="flex flex-col gap-8">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            style={{ height: "500px" }} 
          >
            <div className="relative w-full md:w-1/2 h-full">
              <img
                src={movie.image}
                alt={movie.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {movie.name}
              </h3>
              <p className="text-gray-500 text-lg mb-3">
                {formatDate(movie.date)}
              </p>
              <p className="text-yellow-500 font-extrabold text-2xl mb-6">
                {movie.price} AZN
              </p>
              <button
                onClick={() => handleDetailClick(movie._id)}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-lg hover:from-teal-600 hover:to-teal-800 transition-all duration-300 transform hover:scale-110 focus:outline-none">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
