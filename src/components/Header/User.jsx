import React from 'react'
import { AppContext } from '../App'

class User extends React.Component {
	render() {
		const { user } = this.props
		return (
			<div>
				<img
					width="40"
					className="rounded-circle"
					src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`}
					alt="avatar"
				/>
			</div>
		)
	}
}

const UserContainer = () => {
	return (
		<AppContext.Consumer>
			{context => {
				console.log(context.user)
				return <User user={context.user} />
			}}
		</AppContext.Consumer>
	)
}

UserContainer.displayName = 'UserContainer'

export default UserContainer; 
