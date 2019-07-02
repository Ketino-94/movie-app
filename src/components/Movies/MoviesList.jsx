import React, { Component } from 'react'
import MovieItem from './MovieItem'
import { API_URL, API_KEY_3 } from '../../api/api'
import moment from 'moment'

export default class MovieList extends Component {
	constructor() {
		super()

		this.state = {
			movies: [],
			filterMovies: [],
			year: '',
		}
	}

	getMovies = (filters, page) => {
		const { sort_by } = filters
		const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}`
		fetch(link)
			.then(response => {
				return response.json()
			})
			.then(data => {
				this.setState({
					movies: data.results,
					filterMovies: data.results,
				})
			})
	}

	componentDidMount() {
		this.getMovies(this.props.filters, this.props.page)
	}

	// componentWillReceiveProps(nextProps) {
	//   if(nextProps.filters.sort_by !== this.props.filters.sort_by) {
	//     this.getMovies(nextProps.filters);
	//   }
	// }

	componentDidUpdate(prevProps) {
		if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
			this.props.onChangePage(1)
			this.getMovies(this.props.filters, 1)
		}
		if (this.props.page !== prevProps.page) {
			this.getMovies(this.props.filters, this.props.page)
		}
		if (this.props.filtersGenre !== prevProps.filtersGenre) {
			this.getGenreMovie()
		}

		if (this.props.primary_release_year !== prevProps.primary_release_year) {
			this.getYearMovie()
		}
	}

	getGenreMovie = () => {
		console.log('filters', this.props.filtersGenre)
		const filtersGenreMovie = this.state.movies.filter(movie => {
			return movie.genre_ids.some(id => {
				return this.props.filtersGenre.includes(id)
			})
		})
		this.setState({
			filterMovies: filtersGenreMovie,
		})
	}

	getYearMovie = () => {
		const year_movie = this.state.movies.filter(movie => {
			return (
				moment(movie.release_date).year() ===
				parseInt(this.props.primary_release_year, 10)
			)
		})
		this.setState({
			filterMovies: year_movie,
		})
		console.log('year-movie', parseInt(this.props.primary_release_year, 10))
	}

	render() {
		const { filterMovies } = this.state
		return (
			<div className="row">
				{filterMovies.map(movie => {
					return (
						<div key={movie.id} className="col-6 mb-4">
							<MovieItem item={movie} />
						</div>
					)
				})}
			</div>
		)
	}
}
