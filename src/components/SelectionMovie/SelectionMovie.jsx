import React, { Component } from 'react'
import { fetchApi, API_URL, API_KEY_3 } from '../../api/api'

export default class SelectionMovie extends Component {
	handleLogOut = () => {
		fetchApi(
			`${API_URL}/account/${this.props.session_id}/favorite?api_key=${API_KEY_3}`,
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					session_id: this.props.session_id,
					media_type: 'movie',
					media_id: 550,
					favorite: true,
				}),
			}
		)
	}

	render() {
		const { favouriteMovie, watchlistMovie } = this.props
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
	}
}
