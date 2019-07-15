import React from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faHeart as fasHeart,
	faBookmark as fasBookmark,
} from '@fortawesome/fontawesome-free-solid'
import {
	faHeart as farHeart,
	faBookmark as farBookmark,
} from '@fortawesome/fontawesome-free-regular'
import { fetchApi, API_URL, API_KEY_3 } from '../../api/api'

export default class MovieItem extends React.Component {
	state = {
		isActiveLike: false,
		isActiveBookmark: false,
	}

	toggleLike = () => {
		const { isActiveLike } = this.state
		this.props.updateLike(this.props.item)
		this.handleLike()
		this.setState({
			isActiveLike: !isActiveLike,
		})
	}

	toggleBookmark = () => {
		const { isActiveBookmark } = this.state
		this.props.updateBookmark(this.props.item)
		this.handleBookmark()
		this.setState({
			isActiveBookmark: !isActiveBookmark,
		})
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
		const { item } = this.props
		const { isActiveLike, isActiveBookmark } = this.state
		return (
			<div className="card" style={{ width: '100%' }}>
				<img
					className="card-img-top card-img--height"
					src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
						item.poster_path}`}
					alt=""
				/>
				<div className="card-body">
					<h6 className="card-title">{item.title}</h6>
					<div className="card-text">
						Рейтинг: {item.vote_average} <br />{' '}
						{moment(item.release_date).year()}
					</div>
					<div>
						<FontAwesomeIcon
							className="mr-2"
							icon={isActiveLike ? fasHeart : farHeart}
							onClick={this.toggleLike}
						/>
						<FontAwesomeIcon
							icon={isActiveBookmark ? fasBookmark : farBookmark}
							onClick={this.toggleBookmark}
						/>
					</div>
				</div>
			</div>
		)
	}
}

library.add(fasHeart, farHeart, farBookmark, fasBookmark)
