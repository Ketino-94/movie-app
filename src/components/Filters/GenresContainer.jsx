import React, { Component } from "react";
import GenreMovie from './GenreMovie';
import { API_URL, API_KEY_3 } from "../../api/api";

export default class GenresContainer extends Component {
  constructor() {
    super();

    this.state = {
      genres: []
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



  render() {
    const { genres } = this.state;
    const { onChangeGenres} = this.props;
    return <GenreMovie genres={genres} onChangeGenres={onChangeGenres}/>;
  }
}