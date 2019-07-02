import React from "react";
import MovieItem from "./MovieItem";


const MovieList = (props) => {
  <div className="row">
    {filterMovies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4" >
          <MovieItem item={movie} />
        </div>
      );
    })}
  </div>
}
export default MovieList