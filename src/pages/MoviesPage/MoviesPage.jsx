import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import fetchMoviesBySearch from "../../api/api";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [loading, setLoading] = useState(false);
  const [movieItems, setMovieItems] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchFormSubmit = (query) => {
    if (!query) {
      return;
    }
    setSearchParams({ search: query });
  };

  useEffect(() => {
    const value = searchParams.get("search");
    if (!value) return;

    async function getSearchMovies() {
      try {
        setLoading(true);
        const searchMovies = await fetchMoviesBySearch(value);
        setMovieItems(searchMovies);
      } catch (error) {
        window.alert(
          "Oops! Something went wrong! Please try reloading this page!"
        );
      } finally {
        setLoading(false);
      }
    }
    getSearchMovies();
  }, [searchParams]);

  return (
    <>
      {loading && <Loader />}

      <SearchBar onSubmit={handleSearchFormSubmit} />

      {searchParams && <MovieList items={movieItems} />}
    </>
  );
};

export default MoviesPage;
