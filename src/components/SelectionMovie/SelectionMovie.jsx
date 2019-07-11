import React, { Component } from 'react'

export default class SelectionMovie extends Component {
	render() {
		const { favouriteMovie, watchlistMovie } = this.props
		console.log(this.props.favouriteMovie)
		return (
			<div className="card">
				<div className="card-body">
					<h6>Favourite:</h6>
					{favouriteMovie.map(movie => {
						return (
							<ul key={movie.id}>
								<li>{movie.title}</li>
							</ul>
						)
					})}
					<h6>Watchlist:</h6>
					{watchlistMovie.map(movie => {
						return (
							<ul key={movie.id}>
								<li>{movie.title}</li>
							</ul>
						)
					})}
				</div>
			</div>
		)
	}
}
