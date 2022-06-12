import React from "react";
import { useState, useEffect } from "react";

export const Favourites = () => {
  const [genre, setGenre] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [movie, setMovie] = useState([]);
  const [currText, setCurrText] = useState("");
  const [curPage, setCurPage] = useState(1);

  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    10765: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("small-movies-app") || "[]");
    let tempArr = [];
    data.forEach((movieObj) => {
      if (!tempArr.includes(genreids[movieObj.genre_ids[0]]))
        tempArr.push(genreids[movieObj.genre_ids[0]]);
    });
    tempArr.unshift("All Genres");
    setGenre([...tempArr]);
    setMovie([...data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let filterArr = [];

  const limit = 6;

  if (currText === "") {
    filterArr = movie;
  } else {
    filterArr = movie.filter((movieObj) => {
      let title = movieObj.original_title || movieObj.original_name;
      return title.includes(currText);
    });
  }

  if (currGenre !== "All Genres") {
    filterArr = movie.filter((movieObj) => {
      return currGenre === genreids[movieObj.genre_ids[0]];
    });
  }

  let pages = Math.ceil(filterArr.length / limit);
  let pagesArr = [];
  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i);
  }

  let si = (curPage - 1) * limit;
  let ei = si + limit;
  filterArr = filterArr.slice(si, ei);

  const sortPopularityDesc = () => {
    let temp = movie;
    temp.sort(function (objA, objB) {
      return objB.popularity - objA.popularity;
    });
    setMovie([...temp]);
  };
  const sortPopularityAsc = () => {
    let temp = movie;
    temp.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    });
    setMovie([...temp]);
  };
  const sortRatingDesc = () => {
    let temp = movie;
    temp.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average;
    });
    setMovie([...temp]);
  };
  const sortRatingAsc = () => {
    let temp = movie;
    temp.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
    setMovie([...temp]);
  };

  const handleGenreChange = (Genre) => {
    setCurrGenre(Genre);
  };

  const handleDelete = (id) => {
    let newArr = [];
    newArr = movie.filter((movieObj) => movieObj.id !== id);
    setMovie([...newArr]);
    localStorage.setItem("small-movies-app", JSON.stringify(newArr));
  };

  const handlePageChange = (page) => {
    setCurPage(page);
  };

  return (
    <>
      <div className="main">
        <div className="row">
          <div className="col-12 col-md-3">
            <ul className="list-group favourites-genres">
              {genre.map((Genre, index) =>
                currGenre === Genre ? (
                  <li
                    key={index}
                    className="list-group-item"
                    style={{
                      background: "#3f51b5",
                      color: "white",
                      fontWeight: "bold",
                      minWidth: "150px",
                    }}
                  >
                    {Genre}
                  </li>
                ) : (
                  <li
                    key={index}
                    className="list-group-item"
                    style={{
                      background: "white",
                      color: "#3f51b5",
                      minWidth: "150px",
                    }}
                    onClick={() => handleGenreChange(Genre)}
                  >
                    {Genre}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="col-12 col-md-9 favourites-table">
            <div className="row">
              <input
                type="text"
                className="input-group-text col"
                placeholder="Search"
                value={currText}
                onChange={(e) => setCurrText(e.target.value)}
              />
            </div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genres</th>
                    <th scope="col">
                      <i
                        className="fas fa-sort-up"
                        onClick={sortPopularityDesc}
                      />
                      Popularity
                      <i
                        className="fas fa-sort-down"
                        onClick={sortPopularityAsc}
                      />
                    </th>
                    <th scope="col">
                      <i className="fas fa-sort-up" onClick={sortRatingDesc} />
                      Rating
                      <i className="fas fa-sort-down" onClick={sortRatingAsc} />
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterArr.map((movieObj, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={
                              movieObj.backdrop_path !== null
                                ? `https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`
                                : `https://image.tmdb.org/t/p/original${movieObj.poster_path}`
                            }
                            alt={movieObj.title}
                            style={{ width: "5rem" }}
                          />
                          {movieObj.original_title || movieObj.original_name}
                        </td>
                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                        <td>{movieObj.popularity}</td>
                        <td>{movieObj.vote_average}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(movieObj.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination favourites-pagination">
                {pagesArr.map((page, ind) => (
                  <li className="page-item" key={ind}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
