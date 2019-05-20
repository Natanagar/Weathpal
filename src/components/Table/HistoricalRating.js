import React, { useState } from 'react';
import { store } from '../../index';

export const HistoricalTable = () => {
	const { tableOfRating } = store.getState().inputReducer;
	const [ date, changeDate ] = useState([]);
	const [ rating, changeRating ] = useState([]);
	const arrayWithDate = [],
		arrayWithRating = [];
	Object.entries(tableOfRating).map((item) => {
		arrayWithDate.push(item[0]);
		arrayWithRating.push(item[1]);
		return arrayWithDate, arrayWithRating;
	});
	console.log(Array.isArray(arrayWithDate), date, arrayWithRating);

	return (
		<div>
			<table>
				<thead>
					{Object.entries(tableOfRating).map((item, index) => (
						<tr key={index}>
							<th>{item[0]}</th>
						</tr>
					))}
				</thead>
				<tbody>
					{Object.entries(tableOfRating).map((item, index) => (
						<tr key={index}>
							<th>{item[1]}</th>; })}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
{
	/*<ul>
				{Object.entries(tableOfRating).map((item, index) => (
					<li>
						{item.map((el) => (
							<ul>
								{Object.entries(el).map((elem, index) => (
									<li key={index}>{Math.round(elem[1] * 100) / 100}</li>
								))}
							</ul>
						))}
					</li>
				))}
			</ul>*/
}
