import React from 'react'
import MovieItem from './MovieItem'
import PropTypes from 'prop-types'
import MoviesHOC from './MoviesHOC'

const MoviesList = ({ filterMovies, toggleClassLike, toggleClassBookmark }) => (
	<div className="row">
		{filterMovies.map(movie => {
			return (
				<div key={movie.id} className="col-6 mb-4">
					<MovieItem
						item={movie}
						toggleClassLike={toggleClassLike}
						toggleClassBookmark={toggleClassBookmark}
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
