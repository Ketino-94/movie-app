import React, { Component } from 'react'

export default class WatchlistMovie extends Component {
	render() {
		const { watchlistMovie } = this.props
		return (
			<div>
				<h6>Watchlist:</h6>
				{watchlistMovie.map(movie => {
					return <p key={movie.id}>{movie.title}</p>
				})}
			</div>
		)
	}
}
