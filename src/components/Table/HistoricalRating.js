import React from 'react';
import format from 'date-fns/format';
import { store } from '../../index';

export const HistoricalTable = () => {
	const { tableOfRating } = store.getState().inputReducer;
	const arr = Object.entries(tableOfRating).map((item) => [ item[0], ...Object.entries(item[1]) ]);

	return (
		<div>
			<table>
				<tbody>
					{arr.map(([ name, ...values ], i) => (
						<tr key={i}>
							{[
								<td
									style={{
										fontWeight: 'bold'
									}}
								>
									{format(name, 'DD.MM.YYYY')}
								</td>,
								...values.map(([ moneyName, value ]) => (
									<td
										style={{
											fontSize: '80%'
										}}
									>{`${moneyName}: ${Math.round(value * 100) / 100}`}</td>
								))
							]}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
