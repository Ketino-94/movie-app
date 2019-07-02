import React  from "react";

const GenreMovie = ({genres, onChangeGenres}) => ( 
  <div className="form-group">
    <p>Жанры:</p>
    {genres.map(genre => {
      return (
        <div className="form-check"  key={genre.id} >
          <input  type="checkbox"
                  className="form-check-input"
                  name="genre" 
                  id={genre.id} 
                  onChange={onChangeGenres.bind(null, genre.id)}/>
          <label  htmlFor={genre.id} 
                  className="form-check-label"> {genre.name} </label>
          </div>
      );
    })}  
  </div>
)

GenreMovie.defaultProps = {
  genres: []
};

export default GenreMovie;

