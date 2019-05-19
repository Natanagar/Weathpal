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
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Currency</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(tableOfRating).map((item, index) => (
						<tr key={index}>
							{Object.entries(item).map((el) => {
								<th>{el[0]}</th>;
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
