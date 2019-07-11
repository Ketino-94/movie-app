import React from 'react'
import Login from './Login/Login'
import UserMenu from './UserMenu'

class Header extends React.Component {
	state = {
		isFetched: false,
	}

	updateFetch = status => {
		this.setState({
			isFetched: status,
		})
	}
	render() {
		const { user } = this.props
		if (this.state.isFetched) {
			return 'Loading...'
		}
		return (
			<nav className="navbar navbar-dark bg-primary">
				<div className="container">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<a className="nav-link">Home</a>
						</li>
					</ul>
					{user ? <UserMenu /> : <Login />}
				</div>
			</nav>
		)
	}
}

export default Header
