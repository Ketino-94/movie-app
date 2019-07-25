import React from 'react'
import MovieItem from './MovieItem'
import PropTypes from 'prop-types'
import MoviesHOC from './MoviesHOC'

const MoviesList = ({
	filterMovies,
	updateLike,
	updateBookmark,
	session_id,
	user,
}) => (
	<div className="row">
		{filterMovies.map(movie => {
			return (
				<div key={movie.id} className="col-6 mb-4">
					<MovieItem
						item={movie}
						updateLike={updateLike}
						updateBookmark={updateBookmark}
						session_id={session_id}
						user={user}
					/>
				</div>
			)
		})}
	</div>
)

MoviesList.defaultProps = {
	filterMovies: [],
}

MoviesList.propTypes = {
	filterMovies: PropTypes.array.isRequired,
}

export default MoviesHOC(MoviesList)
