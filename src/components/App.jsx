import React, { Component } from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header/Header'
import { API_URL, API_KEY_3, fetchApi } from '../api/api'
import Cookies from 'universal-cookie'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MoviePage from './pages/MoviePage/MoviePage'

const cookies = new Cookies()

export const AppContext = React.createContext()

export default class App extends Component {
	state = {
		user: null,
		session_id: null,
		page: 1,
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

	render() {
		const { user, session_id } = this.state
		return (
			<BrowserRouter>
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
						<Route exact path="/" component={MoviesPage} />
						<Route path="/movie/:id" component={MoviePage} />
					</div>
				</AppContext.Provider>
			</BrowserRouter>
		)
	}
}
