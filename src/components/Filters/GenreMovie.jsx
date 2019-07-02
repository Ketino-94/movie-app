import React, { Component } from 'react'
import { API_URL, API_KEY_3 } from '../../api/api'

export default class GenreMovie extends Component {
	constructor() {
		super()

		this.state = {
			genres: [],
		}
	}

	getGenres = () => {
		const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`
		fetch(link)
			.then(response => {
				return response.json()
			})
			.then(data => {
				this.setState({
					genres: data.genres,
				})
			})
	}

	componentDidMount() {
		this.getGenres()
	}

	render() {
		const { genres } = this.state
		const { onChangeGenres } = this.props
		return (
			<div className="form-group">
				<p>Жанры:</p>
				{genres.map(genre => {
					return (
						<div className="form-check" key={genre.id}>
							<input
								type="checkbox"
								className="form-check-input"
								name="genre"
								id={genre.id}
								onChange={onChangeGenres.bind(null, genre.id)}
							/>
							<label htmlFor={genre.id} className="form-check-label">
								{genre.name}
							</label>
						</div>
					)
				})}
			</div>
		)
	}
}
