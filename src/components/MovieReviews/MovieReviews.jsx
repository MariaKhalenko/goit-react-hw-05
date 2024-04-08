import fetchMovieReviews from "../../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviewsMovie, setReviewMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function getCast() {
      try {
        setLoading(true);
        const fetchedCast = await fetchMovieReviews(movieId);
        setReviewMovie(fetchedCast);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getCast();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <h2>Oops! Something went wrong! Please try reloading this page!</h2>
      )}

      {reviewsMovie.length > 0 ? (
        <ul>
          {reviewsMovie.map((review) => (
            <li key={review.id}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
