import React, { Component } from 'react'
import FavouriteMovie from './FavouriteMovies'
import WatchlistMovie from './WatchlistMovies'

export default class SelectionMovie extends Component {
	render() {
		const { favouriteMovie, watchlistMovie } = this.props
		if (favouriteMovie.length > 0 || watchlistMovie.length > 0) {
			return (
				<div className="card">
					<div className="card-body">
						{favouriteMovie.length > 0 && (
							<FavouriteMovie favouriteMovie={favouriteMovie} />
						)}
						{watchlistMovie.length > 0 && (
							<WatchlistMovie watchlistMovie={watchlistMovie} />
						)}
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
