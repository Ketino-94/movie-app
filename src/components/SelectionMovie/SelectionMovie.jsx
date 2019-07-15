import React, { Component } from 'react'

export default class SelectionMovie extends Component {
	render() {
		const { favouriteMovie, watchlistMovie } = this.props
		if (favouriteMovie.length > 0 || watchlistMovie.length > 0) {
			return (
				<div className="card">
					<div className="card-body">
						<h6>Favourite:</h6>
						{favouriteMovie.map(movie => {
							return <p key={movie.id}>{movie.title}</p>
						})}
						<h6>Watchlist:</h6>
						{watchlistMovie.map(movie => {
							return <p key={movie.id}>{movie.title}</p>
						})}
					</div>
				</div>
			)
		} else {
			return (
				<div className="card">
					<div className="card-body">
						<h6>You have not selected a movie</h6>
					</div>
				</div>
			)
		}
	}
}
