import { movies } from "./getMovies";
import React from "react";

export const Banner = () => {
  let movie = movies.results[0];
  return (
    <>
      {movie === "" ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="card banner-card">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="card-img-top banner-img"
          />
          <h5 className="card-title banner-title">{movie.original_title}</h5>
          <p className="card-text banner-text">{movie.overview}</p>
        </div>
      )}
    </>
  );
};
