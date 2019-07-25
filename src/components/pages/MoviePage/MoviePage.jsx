import React, { Component } from 'react'
import CallApi from '../../../api/api'

export default class MoviePage extends Component {
	state = {
		movie: [],
	}

	componentDidMount() {
		CallApi.get(`/movie/${this.props.match.params.id}`).then(data => {
			this.setState({
				movie: data,
			})
		})
	}

	render() {
		console.log(this.state.movie)
		const { movie } = this.state
		return (
			<div className="container mt-4">
				<div className="row">
					<div className="col-4 ">
						<img
							className="card-img-top card-img--height"
							src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
								movie.poster_path}`}
							alt="Poster"
						/>
					</div>
					<div className="col-8">
						<h3> {movie.original_title} </h3>
						<div className="mb-3">
							<h5> Рейтинг: {movie.vote_average} </h5>
						</div>
						{movie.genres.map(a => {
							return a.name
						})}
						<p>{movie.overview}</p>
					</div>
				</div>
			</div>
		)
	}
}
