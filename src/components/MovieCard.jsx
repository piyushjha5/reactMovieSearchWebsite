import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContext';

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
      e.preventDefault();  
      if (favorite) removeFromFavorites(movie.id);
      else addToFavorites(movie);
    }
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={movie.poster_path || "https://via.placeholder.com/500x750?text=No+Poster"} alt={movie.title}/>
                <div className="movie-overplay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    )
}

export default MovieCard;