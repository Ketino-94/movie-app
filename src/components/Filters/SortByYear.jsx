import React, { Component } from "react";

const year = [2013, 2014, 2015, 2016, 2017, 2018, 2019]

export default class SortByYear extends Component {

  render() {
    const {primary_release_year , onChangeFilters} = this.props; 
    return(
      <div className="form-group">
        <label htmlFor="primary_release_year"> Сортировать по году:</label>
        <select className="form-control" 
                id="primary_release_year"
                name="primary_release_year"
                value={primary_release_year} 
                onChange={onChangeFilters}>
          {year.map( option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>   
      </div>
    )
  }
}