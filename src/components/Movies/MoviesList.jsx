import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const {sort_by, primary_release_year} = filters; 
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&year=${primary_release_year}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
      });
    console.log(link)
  }

  componentDidMount() {
    // console.log(window.location.search.substring) ;
    this.getMovies(this.props.filters, this.props.page);
  }
  
  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.filters.sort_by !== this.props.filters.sort_by) {
  //     this.getMovies(nextProps.filters);
  //   }
  // }

  componentDidUpdate(prevProps) {
    if(this.props.filters.sort_by !== prevProps.filters.sort_by) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    if(this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }

    if(this.props.filters.primary_release_year !== prevProps.filters.primary_release_year) {
      this.getMovies(this.props.filters, 1);
      console.log(this.props.filters.primary_release_year)
    }
  }

  render() {
    const { movies } = this.state;
    console.log('movies', movies);
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}