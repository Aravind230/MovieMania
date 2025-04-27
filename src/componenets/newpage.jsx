import { useState, useEffect, useMemo } from "react";
import Nav from "./navbar";
const NewPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchterm, setsearchterm] = useState("");
  const filtereddetails = useMemo(() => {
    return movies.filter((movie) =>
      movie?.primaryTitle?.toLowerCase().includes(searchterm.toLowerCase())
    );
  }, [movies, searchterm]);
  useEffect(() => {
    const fetchDetails = async () => {
      const url = "https://imdb236.p.rapidapi.com/imdb/lowest-rated-movies";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "4ffb9b6111mshd785d93d2ed0c3dp136a28jsna3833c265185",
          "x-rapidapi-host": "imdb236.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovies(result);
      } catch (error) {
        setError("Failed to fetch details");
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  return (
    <div>
      <Nav />
      <input
        type="search"
        placeholder="Search Movies, Webseries"
        className="w-50 border rounded-3"
        value={searchterm}
        onChange={(e) => setsearchterm(e.target.value)}
      />
      <h2 className="mt-5">Lowest Rated Movies</h2>
      {error && <p>{error}</p>}
      <div className="container d-flex w-full overflow-x-auto whitespace-nowrap p-4 gap-5">
        <div className="d-flex flex-wrap gap-3">
          {filtereddetails.length === 0 && !error && <p>Loading...</p>}
          {filtereddetails.slice(0, 20).map((movie, index) => (
            <div className="card" style={{ width: "18rem" }} key={index}>
              <img src={movie.primaryImage} className="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">{movie.primaryTitle}</h5>
                <p class="card-text">{movie.description}</p>
                <p>
                  <strong>Rating : </strong>
                  {movie.averageRating}
                </p>
                <p>
                  <strong>Genres : </strong>
                  {movie.genres}
                </p>
                <a href={movie.url} class="btn btn-primary">
                  View on IMDB
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NewPage;
