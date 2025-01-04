import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../header/header.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${searchQuery}&page=1`
      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <nav>
        <Link to="/" className="title">
          MovieDb
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/">Popular</NavLink>
          </li>
          <li>
            <NavLink to="/toprated">Top Rated</NavLink>
          </li>
          <li>
            <NavLink to="/upcoming">Upcoming</NavLink>
          </li>
        </ul>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Movie Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <p>Search</p>
          </button>
        </form>
      </nav>

      {movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <Link to={`/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </Link>
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-rating">Rating: {movie.vote_average}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
