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

export default class MovieItem extends React.Component {
	state = {
		isActiveLike: false,
		isActiveBookmark: false,
	}

	toggleClassLike = () => {
		this.props.toggleClassLike(this.props.item)
		const currentClass = this.state.isActiveLike
		this.setState({
			isActiveLike: !currentClass,
		})
	}

	toggleClassBookmark = () => {
		this.props.toggleClassBookmark(this.props.item)
		const currentClass = this.state.isActiveBookmark
		this.setState({
			isActiveBookmark: !currentClass,
		})
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
							onClick={this.toggleClassLike}
						/>
						<FontAwesomeIcon
							icon={isActiveBookmark ? fasBookmark : farBookmark}
							onClick={this.toggleClassBookmark}
						/>
					</div>
				</div>
			</div>
		)
	}
}

library.add(fasHeart, farHeart, farBookmark, fasBookmark)
