import React, { Component } from 'react'

export default class FavouriteMovie extends Component {
	render() {
		const { favouriteMovie } = this.props
		return (
			<div>
				<h6>Favourite:</h6>
				{favouriteMovie.map(movie => {
					return <p key={movie.id}>{movie.title}</p>
				})}
			</div>
		)
	}
}
