import React, { Component } from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header/Header'
import CallApi from '../api/api'
import Cookies from 'universal-cookie'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MoviePage from './pages/MoviePage/MoviePage'
import {
	actionCreatorUpdateAuth,
	actionCreatorLogOut,
} from '../actions/actions'
import { connect } from 'react-redux'

const cookies = new Cookies()

export const AppContext = React.createContext()
class App extends React.Component {
	// updateAuth = (user, session_id) => {
	//   this.props.store.dispatch(
	//     actionCreatorUpdateAuth({
	//       user,
	//       session_id
	//     })
	//   );
	// };

	// onLogOut = () => {
	//   this.props.store.dispatch(actionCreatorLogOut());
	// };

	componentDidMount() {
		const { session_id } = this.props
		if (session_id) {
			CallApi.get('/account', {
				params: {
					session_id,
				},
			}).then(user => {
				this.props.updateAuth(user, session_id)
			})
		}
	}

	render() {
		console.log(this.props)
		const { user, session_id, isAuth, updateAuth, onLogOut } = this.props
		return isAuth || !session_id ? (
			<BrowserRouter>
				<AppContext.Provider
					value={{
						user,
						session_id,
						isAuth,
						updateAuth,
						onLogOut,
					}}
				>
					<div>
						<Header user={user} />
						<Route exact path="/" component={MoviesPage} />
						<Route path="/movie/:id" component={MoviePage} />
					</div>
				</AppContext.Provider>
			</BrowserRouter>
		) : (
			<p>...Loading</p>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		session_id: state.session_id,
		isAuth: state.isAuth,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateAuth: (user, session_id) =>
			dispatch(
				actionCreatorUpdateAuth({
					user,
					session_id,
				})
			),
		onLogOut: () => dispatch(actionCreatorLogOut()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
