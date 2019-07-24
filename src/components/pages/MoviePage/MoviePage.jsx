import React, { Component } from 'react'
import CallApi from '../../../api/api'

export default class MoviePage extends Component {
	state = {
		movie: [],
	}

	componentDidMount() {
		CallApi.get(`/movie/${this.props.match.params.id}`).then(data => {
			this.setState({
				movie: data.results,
			})
		})
	}

	render() {
		console.log(this.state.data)
		const { item } = this.props
		return (
			<div className="card" style={{ width: '100%' }}>
				{/* {filterMovies.filter(movie => {
					return (
						<div key={movie.id} className="col-6 mb-4">
							item
						</div>
					)
				})} */}
			</div>
		)
	}
}
