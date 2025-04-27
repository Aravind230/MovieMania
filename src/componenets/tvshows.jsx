import { useState, useEffect } from "react";
import Nav from "./navbar";
const Show = () => {
  const [tvshows, settvshows] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchshows = async () => {
      const url = "https://imdb236.p.rapidapi.com/imdb/top250-tv";
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
        const result2 = await response.json();
        settvshows(result2);
      } catch (error) {
        setError("Failed to fetch details");
        console.error(error);
      }
    };

    fetchshows();
  }, []);
  return (
    <>
      <Nav />
      <div>
        <h1 className="mt-5">Top Tv Shows</h1>
        <div className="d-flex w-full overflow-x-auto whitespace-nowrap p-4 gap-5">
          <div className="d-flex flex-wrap gap-3">
            {Array.isArray(tvshows) &&
              tvshows.slice(0, 10).map((tvshow, index) => (
                <div className="card" style={{ width: "18rem" }} key={index}>
                  <img src={tvshow.primaryImage} className="card-img-top" />
                  <div class="card-body">
                    <h5 class="card-title">{tvshow.primaryTitle}</h5>
                    <p class="card-text">{tvshow.description}</p>
                    <p>
                      <strong>Rating : </strong>
                      {tvshow.averageRating}
                    </p>
                    <p>
                      <strong>Genres : </strong>
                      {tvshow.genres}
                    </p>
                    <a href={tvshow.url} class="btn btn-primary">
                      View on IMDB
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Show;
