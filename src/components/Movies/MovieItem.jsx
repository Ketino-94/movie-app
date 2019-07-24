import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import LikeMovie from './LikeMovie'
import BookmarkMovie from './BookmarkMovie'

export default class MovieItem extends React.Component {
	render() {
		const { item, updateBookmark, updateLike, session_id } = this.props
		return (
			<div className="card" style={{ width: '100%' }}>
				<img
					className="card-img-top card-img--height"
					src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
						item.poster_path}`}
					alt=""
				/>
				<div className="card-body">
					<Link className="card-title" to={`/movie/${item.id}`}>
						{item.title}
					</Link>
					<div className="card-text">
						Рейтинг: {item.vote_average} <br />{' '}
						{moment(item.release_date).year()}
					</div>
					<div>
						<LikeMovie
							item={item}
							updateLike={updateLike}
							session_id={session_id}
						/>
						<BookmarkMovie
							item={item}
							updateBookmark={updateBookmark}
							session_id={session_id}
						/>
					</div>
				</div>
			</div>
		)
	}
}
