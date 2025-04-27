import { useState, useEffect } from "react";
import axios from "axios";
const Trending = () => {
  const [trendingmovies, settrendingmoives] = useState([]);
  const fetchTrending = async () => {
    const options = {
      method: "GET",
      url: "https://imdb236.p.rapidapi.com/imdb/india/trending-telugu",
      headers: {
        "x-rapidapi-key": "4ffb9b6111mshd785d93d2ed0c3dp136a28jsna3833c265185",
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      settrendingmoives(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTrending();
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <h2 className="mt-5 d-flex">Telugu Movies</h2>
        <div
          className="d-flex gap-4 bunny"
          style={{
            flexWrap: "nowrap",
            overflowX: "scroll",
            paddingBottom: "10px",
          }}
        >
          {Array.isArray(trendingmovies) &&
            trendingmovies.slice(0, 10).map((trend, index) => (
              <div
                className="card flex-shrink-0"
                style={{ width: "15rem" }}
                key={index}
              >
                <img
                  src={
                    trend?.primaryImage
                      ? trend.primaryImage
                      : "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  className="card-img-top"
                  alt={trend?.primaryTitle || "No Title"}
                />
                <div className="card-body">
                  <h5 className="card-title">{trend.primaryTitle}</h5>
                  <p>
                    <strong>WorldWide Gross: </strong>
                    {trend.grossWorldwide || "N/A"}
                  </p>
                  <p>
                    <strong>Rating : </strong>
                    {trend.averageRating || "N/A"}
                  </p>
                  <p>
                    <strong>Genres : </strong>
                    {trend.genres?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <strong>Runtime : </strong>
                    {trend.runtimeMinutes || "N/A"}
                  </p>
                  <a
                    href={trend.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    View on IMDb
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Trending;
