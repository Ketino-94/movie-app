import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      filterMovies: []
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
          movies: data.results,
          filterMovies: data.results
        });
      });
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

    // if (this.props.filtersGenre.includes(id) ) {

    // }
    if (this.props.filtersGenre !== prevProps.filtersGenre ) {
      this.getGenreMovie() ;
    }
  }

  getGenreMovie = () => {
    console.log('filters',this.props.filtersGenre);
      const filtersGenreMovie = this.state.movies.filter(movie => {
        // console.log('id',movie.genre_ids);
        
        return movie.genre_ids.some( id => {
          return this.props.filtersGenre.includes(id)
        })
      })
      console.log("3", filtersGenreMovie);
      this.setState({
        filterMovies: filtersGenreMovie
      })
  }


  render() {
    const { filterMovies } = this.state;
    // console.log('movies', movies);
    return (
      <div className="row">
        {filterMovies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4" >
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}