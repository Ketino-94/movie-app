import React, { Component } from 'react';

import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";

export default class App extends Component {

  state = {
    filters: {
      sort_by: 'vote_average.desc',
      primary_release_year: '2013'
    },
    filtersGenre: [],
    page: 1
  }

  onChangeFilters = (e) => {
    const newFilters = {
      ...this.state.filter,
      [e.target.name]: e.target.value
    }
    this.setState({
      filters: newFilters
    });
  }

  onChangePage = page => {
    this.setState({
      page
    })
  }

  onChangeGenres = (id) => {
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
      }));
    }
  }


  render() {
    const {filters, page, filtersGenre} = this.state;
    return(
      <div>
        <Header />
        <div className="container">
          <div className="row mt-4">
            <div className="col-4">
              <div className="card" style={{width: "100%" }}>
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters  filters={filters}
                            page={page}
                            onChangePage={this.onChangePage}
                            onChangeGenres={this.onChangeGenres}
                            onChangeFilters={this.onChangeFilters}  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesList filters={filters}
                          page={page} 
                          filtersGenre={filtersGenre}
                          onChangePage={this.onChangePage}/>
            </div>   
          </div>     
        </div>
      </div>
    );
  }
}