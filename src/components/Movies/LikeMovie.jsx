import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchApi, API_URL, API_KEY_3 } from '../../api/api'

export default class LikeMovie extends Component {
	state = {
		isActiveLike: false,
	}

	toggleLike = () => {
		const { isActiveLike } = this.state
		this.props.updateLike(this.props.item)
		this.handleLike()
		if (this.props.session_id !== null) {
			console.log(this.props.session_id)
			this.setState({
				isActiveLike: !isActiveLike,
			})
		} else {
			this.setState({
				isActiveLike: isActiveLike,
			})
		}
	}

	handleLike = () => {
		fetchApi(
			`${API_URL}/account/${this.props.session_id}/favorite?api_key=${API_KEY_3}&session_id=${this.props.session_id}`,
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					media_type: 'movie',
					media_id: this.props.item.id,
					favorite: true,
				}),
			}
		)
	}

	render() {
		const { isActiveLike } = this.state
		return (
			<FontAwesomeIcon
				className="mr-2"
				icon={isActiveLike ? fasHeart : farHeart}
				onClick={this.toggleLike}
			/>
		)
	}
}

library.add(fasHeart, farHeart)
