import React, { Component } from 'react'

import Filters from '../../Filters/Filters'
import MoviesList from '../../Movies/MoviesList'

import SelectionMovie from '../../SelectionMovie/SelectionMovie'

export default class MoviesPage extends Component {
	state = {
		user: null,
		filters: {
			sort_by: 'popularity.desc',
		},
		primary_release_year: 0,
		filtersGenre: [],
		page: 1,
		favouriteMovie: [],
		watchlistMovie: [],
		filterWatchMovie: [],
	}

	onChangeFilters = e => {
		const newFilters = {
			...this.state.filter,
			[e.target.name]: e.target.value,
		}
		this.setState({
			filters: newFilters,
		})
	}

	onChangePage = page => {
		this.setState({
			page,
		})
	}

	onChangeGenres = id => {
		if (this.state.filtersGenre.includes(id)) {
			let newState = this.state.filtersGenre.filter(item => item !== id)
			this.setState({
				filtersGenre: newState,
			})
		} else {
			this.setState(prevState => ({
				filtersGenre: [...prevState.filtersGenre, id],
			}))
		}
	}

	onChangeYear = e => {
		const name = e.target.name
		const value = e.target.value
		this.setState(prevState => ({
			[name]: value,
			...prevState.primary_release_year,
		}))
	}

	updateLike = movie => {
		const isAddedWatchMovie = this.state.favouriteMovie.some(
			item => item.id === movie.id
		)

		if (isAddedWatchMovie) {
			const filterLikeMovie = this.state.favouriteMovie.filter(item => {
				return item.id !== movie.id
			})
			this.setState({
				favouriteMovie: filterLikeMovie,
			})
		} else {
			this.setState(prevState => ({
				favouriteMovie: [...prevState.favouriteMovie, movie],
			}))
		}
	}

	updateBookmark = movie => {
		const isAddedWatchMovie = this.state.watchlistMovie.some(
			item => item.id === movie.id
		)
		if (isAddedWatchMovie) {
			const filterWatchMovie = this.state.watchlistMovie.filter(item => {
				return item.id !== movie.id
			})
			this.setState({
				watchlistMovie: filterWatchMovie,
			})
		} else {
			this.setState(prevState => ({
				watchlistMovie: [...prevState.watchlistMovie, movie],
			}))
		}
	}

	render() {
		const {
			filters,
			page,
			filtersGenre,
			primary_release_year,
			favouriteMovie,
			watchlistMovie,
		} = this.state
		const { session_id } = this.props
		return (
			<div className="container">
				<div className="d-flex justify-content-between">
					<div className="p-2">
						<div className="card" style={{ width: '100%' }}>
							<div className="card-body">
								<h3>Фильтры:</h3>
								<Filters
									filters={filters}
									page={page}
									onChangePage={this.onChangePage}
									onChangeGenres={this.onChangeGenres}
									onChangeFilters={this.onChangeFilters}
									onChangeYear={this.onChangeYear}
								/>
							</div>
						</div>
					</div>
					<div className="p-2">
						<MoviesList
							filters={filters}
							page={page}
							primary_release_year={primary_release_year}
							filtersGenre={filtersGenre}
							onChangePage={this.onChangePage}
							updateLike={this.updateLike}
							updateBookmark={this.updateBookmark}
						/>
					</div>
					<div className="p-2">
						{session_id !== null && (
							<SelectionMovie
								favouriteMovie={favouriteMovie}
								watchlistMovie={watchlistMovie}
							/>
						)}
					</div>
				</div>
			</div>
		)
	}
}
