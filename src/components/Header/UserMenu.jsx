import React from 'react'
import {
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
} from 'reactstrap'
import AppContextHOC from '../HOC/AppContextHOC'
import { fetchApi, API_URL, API_KEY_3 } from '../../api/api'

class UserMenu extends React.Component {
	state = {
		dropdownOpen: false,
	}

	toggle = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen,
		}))
	}

	handleLogOut = () => {
		fetchApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				session_id: this.props.session_id,
			}),
		}).then(() => {
			this.props.onLogOut()
		})
	}

	render() {
		const { user } = this.props
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle
					tag="span"
					onClick={this.toggle}
					data-toggle="dropdown"
					aria-expanded={this.state.dropdownOpen}
				>
					<img
						width="40"
						className="rounded-circle"
						src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
						alt="avatar"
						onClick={this.toggle}
					/>
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem onClick={this.handleLogOut}> Выход </DropdownItem>
				</DropdownMenu>
			</Dropdown>
		)
	}
}

export default AppContextHOC(UserMenu)
