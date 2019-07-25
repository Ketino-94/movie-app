import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark as fasBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchApi, API_URL, API_KEY_3 } from '../../api/api'

export default class BookmarkMovie extends Component {
	state = {
		isActiveBookmark: false,
	}

	toggleBookmark = () => {
		if (this.props.user !== null) {
			const { isActiveBookmark } = this.state
			this.props.updateBookmark(this.props.item)
			this.handleBookmark()
			this.setState({
				isActiveBookmark: !isActiveBookmark,
			})
		} else {
			this.setState({
				isActiveBookmark: false,
			})
		}
	}

	handleBookmark = () => {
		fetchApi(
			`${API_URL}/account/${this.props.session_id}/watchlist?api_key=${API_KEY_3}&session_id=${this.props.session_id}`,
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					media_type: 'movie',
					media_id: this.props.item.id,
					watchlist: true,
				}),
			}
		)
	}

	render() {
		const { isActiveBookmark } = this.state
		return (
			<FontAwesomeIcon
				icon={isActiveBookmark ? fasBookmark : farBookmark}
				onClick={this.toggleBookmark}
			/>
		)
	}
}

library.add(farBookmark, fasBookmark)
