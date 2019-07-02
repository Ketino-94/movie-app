import React, { Component } from 'react';

import SortBy from "./SortBy";
import SortByYear from "./SortByYear";
import GenresContainer from "./GenresContainer";

export default class Filters extends Component {
  render() {
    const {filters: {sort_by, primary_release_year, with_genres}, onChangeGenres, onChangeFilters, onChangYear, page, onChangePage} = this.props; 
    return(
      <form className="mb-3">
        <SortBy value={sort_by} 
                onChangeFilters={onChangeFilters}/>
        <SortByYear value={primary_release_year}
                onChangYear={onChangYear}/>
        <GenresContainer with_genres={with_genres} 
                    onChangeGenres={onChangeGenres}
                    onChangeFilters={onChangeFilters} />
        <div className="btn-group" >
          <button type="button" 
                  className="btn btn-light"
                  disabled={page === 1}
                  onClick={onChangePage.bind(null, page - 1)}>Назад</button>
          <button type="button" 
                  className="btn btn-light"
                  onClick={() => {onChangePage(page + 1)}}>Вперед</button>
        </div>   
      </form>
    );
  }
}