import React from 'react';
import { store } from '../../index';

export const HistoricalTable = () => {
	const { tableOfRating } = store.getState().inputReducer;
	Object.entries(tableOfRating).map((item, index) => console.log(item[0], item[1]));

	return (
		<div>
			<ul>
				{Object.entries(tableOfRating).map((item, index) => (
					<li>{item.map((el) => <ul>{Object.entries(el).map((elem) => <span>{elem[0]}</span>)}</ul>)}</li>
				))}
			</ul>
			{/*<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Currency</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(tableOfRating).map((item, index) => (
						<tr key={index}>
							<td>{item[0]}</td>
							<td>{item[1]}</td>
							<td>{Math.round(item[2] * 100) / 100}</td>
						</tr>
					))}
				</tbody>
            </table>*/}
		</div>
	);
};
