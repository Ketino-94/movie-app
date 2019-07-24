import React, { Component } from 'react'

const year = [
	{
		value: 0,
		year: 'Все года',
	},
	{
		value: 2011,
		year: 2011,
	},
	{
		value: 2012,
		year: 2012,
	},
	{
		value: 2013,
		year: 2013,
	},
	{
		value: 2014,
		year: 2014,
	},
	{
		value: 2015,
		year: 2015,
	},
]

export default class SortByYear extends Component {
	render() {
		const { primary_release_year, onChangYear } = this.props
		return (
			<div className="form-group">
				<label htmlFor="primary_release_year"> Сортировать по году:</label>
				<select
					className="form-control"
					id="primary_release_year"
					name="primary_release_year"
					value={primary_release_year}
					onChange={onChangYear}
				>
					{year.map(option => (
						<option key={option.value} value={option.value}>
							{option.year}
						</option>
					))}
				</select>
			</div>
		)
	}
}
