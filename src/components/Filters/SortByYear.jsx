import React, { Component } from "react";

import { API_URL, API_KEY_3 } from "../../api/api";

export default class SortByYear extends Component {
  constructor() {
    super();

    this.state = {
      options: []
    };
  }

  getYear = () => {
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          options: data.results
        });
      });
  }
  componentDidMount() {
    this.getYear();
  }

  
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
          {this.state.options.map( option => {
            return (
            <option key={option.id} value={option.release_date}>{option.release_date}</option>
          )})}
        </select>   
      </div>
    )
  }
}