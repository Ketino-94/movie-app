import React, { Component } from 'react'

import Filters from './Filters/Filters'
import MoviesList from './Movies/MoviesList'
import Header from './Header/Header'
import { API_URL, API_KEY_3, fetchApi } from '../api/api'
import Cookies from 'universal-cookie'
import SelectionMovie from './SelectionMovie/SelectionMovie'

const cookies = new Cookies()

export const AppContext = React.createContext()

export default class App extends Component {
	state = {
		user: null,
		session_id: null,
		filters: {
			sort_by: 'vote_average.desc',
		},
		primary_release_year: 2013,
		filtersGenre: [],
		page: 1,
		favouriteMovie: [],
		watchlistMovie: [],
	}

	updateUser = user => {
		this.setState({
			user,
		})
	}

	updateSessionId = session_id => {
		cookies.set('session_id', session_id, {
			path: '/',
			maxAge: 2592000,
		})
		this.setState({
			session_id,
		})
	}

	onLogOut = () => {
		cookies.remove('session_id')
		this.setState({
			session_id: null,
			user: null,
		})
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

	onChangYear = e => {
		const name = e.target.name
		const value = e.target.value
		this.setState(prevState => ({
			[name]: value,
			...prevState.primary_release_year,
		}))
	}

	componentDidMount() {
		const session_id = cookies.get('session_id')
		if (session_id) {
			fetchApi(
				`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
			).then(user => {
				this.updateUser(user)
				this.updateSessionId(session_id)
			})
		}
	}

	toggleClassLike = item => {
		const newItem = item
		this.setState(prevState => ({
			favouriteMovie: [...prevState.favouriteMovie, newItem],
		}))
	}

	toggleClassBookmark = item => {
		const newItem = item
		this.setState(prevState => ({
			watchlistMovie: [...prevState.watchlistMovie, newItem],
		}))
	}

	render() {
		const {
			filters,
			page,
			filtersGenre,
			user,
			primary_release_year,
			session_id,
		} = this.state
		return (
			<AppContext.Provider
				value={{
					user: user,
					session_id,
					updateUser: this.updateUser,
					updateSessionId: this.updateSessionId,
					onLogOut: this.onLogOut,
				}}
			>
				<div>
					<Header user={user} />
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
											onChangYear={this.onChangYear}
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
									toggleClassLike={this.toggleClassLike}
									toggleClassBookmark={this.toggleClassBookmark}
								/>
							</div>
							<div className="p-2">
								<SelectionMovie
									favouriteMovie={this.state.favouriteMovie}
									watchlistMovie={this.state.watchlistMovie}
								/>
							</div>
						</div>
					</div>
				</div>
			</AppContext.Provider>
		)
	}
}
