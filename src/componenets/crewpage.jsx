import { useState, useEffect } from "react";
import axios from "axios";
const Castpage = () => {
  const [telugumovies, settelugumoives] = useState([]);
  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://imdb236.p.rapidapi.com/imdb/india/top-rated-telugu-movies",
      headers: {
        "x-rapidapi-key": "4ffb9b6111mshd785d93d2ed0c3dp136a28jsna3833c265185",
        "x-rapidapi-host": "imdb236.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      settelugumoives(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
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
          {Array.isArray(telugumovies) &&
            telugumovies.slice(0, 50).map((telugu, index) => (
              <div
                className="card flex-shrink-0"
                style={{ width: "15rem" }}
                key={index}
              >
                <img
                  src={
                    telugu?.primaryImage
                      ? telugu.primaryImage
                      : "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  className="card-img-top"
                  alt={telugu?.primaryTitle || "No Title"}
                />
                <div className="card-body">
                  <h5 className="card-title">{telugu.primaryTitle}</h5>
                  <p>
                    <strong>WorldWide Gross: </strong>
                    {telugu.grossWorldwide || "N/A"}
                  </p>
                  <p>
                    <strong>Rating : </strong>
                    {telugu.averageRating || "N/A"}
                  </p>
                  <p>
                    <strong>Genres : </strong>
                    {telugu.genres?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <strong>Runtime : </strong>
                    {telugu.runtimeMinutes || "N/A"}
                  </p>
                  <a
                    href={telugu.url}
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
export default Castpage;
