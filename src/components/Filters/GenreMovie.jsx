import React, { Component } from "react";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class GenreMovie extends Component {
  constructor() {
    super();

    this.state = {
      genres: [],
      filtersGenre: []
    };
  }

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  }

  componentDidMount() {
    this.getGenres();
  }

  onChange = (id) => {
    if (this.state.filtersGenre.includes(id)) {
      let newState = this.state.filtersGenre.filter( item => item !== id)
      this.setState({
        filtersGenre: newState
      })
    } else {
    this.setState(prevState =>({
      filtersGenre: [
        ...prevState.filtersGenre, id
      ]
      }), () => console.log(this.state.filtersGenre));
      
    }
  }
  

  render() {
    const { genres } = this.state;
    console.log(this.state.filtersGenre);
    return(
      <div className="form-group">
        <p>Жанры:</p>
        {genres.map(genre => {
          return (
            <div className="form-check"  key={genre.id} >
              <input  type="checkbox"
                      className="form-check-input"
                      name="genre" 
                      id={genre.id} 
                      onChange={this.onChange.bind(null, genre.id)}/>
              <label  htmlFor={genre.id} 
                      className="form-check-label"> {genre.name} </label>
             </div>
          );
        })}  
      </div>
    )
  }
}