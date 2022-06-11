import React, { useState, useEffect } from "react";
import axios from "axios";

export const Movie = () => {
  const [hover, setHover] = useState("");
  const [parr, setParr] = useState([1]);
  const [currPage, setCurrPage] = useState(1);
  const [movie, setMovie] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=b1a9077ab25473e53a150e1a72b0f62f&language=en-US&page=${currPage}`
      );
      let data = res.data;
      setMovie([...data.results]);
      let oldData = JSON.parse(
        localStorage.getItem("small-movies-app") || "[]"
      );
      setFavourites(oldData.map((movieObj) => movieObj.id));
    })();
  }, [currPage]);

  const changeMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=b1a9077ab25473e53a150e1a72b0f62f&language=en-US&page=${currPage}`
    );
    let data = res.data;
    setMovie([...data.results]);
  };

  const handleLeft = () => {
    if (currPage !== 1) {
      setCurrPage(currPage - 1);
      changeMovies();
    }
  };

  const handleClick = (value) => {
    if (currPage !== value) {
      setCurrPage(value);
      changeMovies();
    }
  };

  const handleRight = () => {
    let tempArr = [];
    for (let i = 1; i <= parr.length + 1; i++) {
      tempArr.push(i);
    }
    setParr([...tempArr]);
    setCurrPage(currPage + 1);
    changeMovies();
  };

  const handleFavourite = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("small-movies-app") || "[]");
    if (favourites.includes(movie.id)) {
      oldData = oldData.filter((m) => {
        return movie.id !== m.id;
      });
    } else {
      oldData.push(movie);
    }
    localStorage.setItem("small-movies-app", JSON.stringify(oldData));
    handleFavouriteState();
  };

  const handleFavouriteState = () => {
    let oldData = JSON.parse(localStorage.getItem("small-movies-app") || "[]");
    let temp = oldData.map((movieObj) => movieObj.id);
    setFavourites([...temp]);
  };

  return (
    <>
      {movie.length === "" ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <h1 className="text-center">
            <strong>Trending</strong>
          </h1>
          <div className="movies-list">
            {movie.map((movieObj, index) => (
              <div
                className="card movies-card"
                key={index}
                onMouseEnter={() => setHover(movieObj.id)}
                onMouseLeave={() => setHover("")}
              >
                <img
                  src={
                    movieObj.backdrop_path !== null
                      ? `https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`
                      : `https://image.tmdb.org/t/p/original${movieObj.poster_path}`
                  }
                  alt={movieObj.title}
                  className="card-img-top movies-img"
                />
                <h5 className="card-title movies-title">
                  {movieObj.original_title || movieObj.original_name}
                </h5>
                <div
                  className="button-wrapper"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {hover === movieObj.id && (
                    <button
                      className="btn btn-primary movies-button"
                      onClick={() => handleFavourite(movieObj)}
                    >
                      {favourites.includes(movieObj.id)
                        ? "Remove From Favourites"
                        : "Add to Favourites"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={handleLeft}>
                  <button className="page-link">Prev</button>
                </li>
                {parr.map((value, index) => {
                  return (
                    <li
                      className="page-item"
                      key={index}
                      onClick={() => handleClick(value)}
                    >
                      <button className="page-link">{value}</button>
                    </li>
                  );
                })}
                <li className="page-item" onClick={handleRight}>
                  <button className="page-link">Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
