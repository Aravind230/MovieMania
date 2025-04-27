import { useNavigate } from "react-router-dom";
import Nav from "./navbar";
import imdbCarouselImages from "./carousel";
import Castpage from "./crewpage";
import Trending from "./trending";
import { useState, useEffect } from "react";
const Body = () => {
  const [upcoming, setupcoming] = useState([]);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchupcoming = async () => {
      const url =
        "https://imdb236.p.rapidapi.com/imdb/upcoming-releases?countryCode=US&type=MOVIE";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "9b5851428bmshb5bbd1362ade0ebp1b60ebjsnf08fe694f6f4",
          "x-rapidapi-host": "imdb236.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setupcoming(result);
        console.log(result);
      } catch (error) {
        seterror(error);
      }
    };
    fetchupcoming();
  }, []);
  return (
    <>
      <Nav />
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {imdbCarouselImages.map((src, indx) => {
            return (
              <div
                className={`carousel-item ${indx === 0 ? "active" : ""}`}
                key={indx}
              >
                <img
                  src={src}
                  className="d-block w-100"
                  alt={`slide-${indx}`}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <button
        onClick={() => {
          navigate("/newpage");
        }}
        className="mt-5 btn btn-primary w-50"
      >
        Lowest Rated Movies
      </button>
      <br />
      <button
        className="mt-3 btn btn-primary w-50"
        onClick={() => navigate("/tvshows")}
      >
        Top 250 TV shows
      </button>
      <div className="container-fluid">
        <h2 className="mt-5 d-flex">Upcoming Movies</h2>
        <div
          className="d-flex gap-4 bunny"
          style={{
            flexWrap: "nowrap",
            overflowX: "scroll",
            paddingBottom: "10px",
          }}
        >
          {Array.isArray(upcoming) &&
            upcoming.slice(0, 50).map((latest, index) => (
              <div
                className="card flex-shrink-0"
                style={{ width: "15rem" }}
                key={index}
              >
                <img
                  src={
                    latest.titles[0]
                      ? latest.titles[0].primaryImage
                      : "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  className="card-img-top"
                  alt={latest.titles[0].primaryTitle}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {latest.titles[0].primaryTitle}
                  </h5>
                  <p className="card-text">
                    <strong>Release Date : </strong>
                    {latest.titles[0].releaseDate}
                  </p>
                  <p>
                    <strong>Rating : </strong>
                    {latest.titles[0].averageRating || "N/A"}
                  </p>
                  <p>
                    <strong>Genres : </strong>
                    {latest.titles[0].ganre?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <strong>Adults : </strong>
                    {latest.titles[0].isAdult || "N/A"}
                  </p>
                  <a
                    href={latest.titles[0].url}
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
      <Castpage />
      <Trending />
    </>
  );
};

export default Body;
