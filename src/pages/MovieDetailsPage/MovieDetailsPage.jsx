import fetchMovieById from "../../api/api";
import Loader from "../../components/Loader/Loader";
import MovieDetalsInfo from "../../components/MovieDetalsInfo/MovieDetalsInfo";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    if (!movieId) return;

    async function getMovie() {
      try {
        setLoading(true);
        const fetchedMovie = await fetchMovieById(movieId);
        setSelectedMovie(fetchedMovie);
      } catch (error) {
        window.alert(
          "Oops! Something went wrong! Please try reloading this page!"
        );
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      <Link to={backLinkRef.current}>Go back</Link>

      {selectedMovie && <MovieDetalsInfo movie={selectedMovie} />}

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
