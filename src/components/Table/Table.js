import React from 'react';
import format from 'date-fns/format';

export const Table = ({ data, currency, dateByConvert, currencyByDate }) => {
	const AdditionalTh = () => {
		return (
			<table>
				<thead>
					<tr>
						<th>Currency</th>
						<th>as at {dateByConvert}</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(currencyByDate).map((item, index) => (
						<tr key={index}>
							<td>{item[0]}</td>
							<td>{Math.round(item[1] * 100) / 100}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	};
	if (!dateByConvert || !currencyByDate) {
		return (
			<table>
				<thead>
					<tr>
						<th>Currency</th>
						<th>Rating</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(currency).map((item, index) => (
						<tr key={index}>
							<td
								style={{
									fontFamily: 'Noto Serif TC',
									textTransform: 'uppercase',
									fontSize: '24px',
									fontWeight: '800',
									padding: '20px auto auto'
								}}
							>
								{' '}
								{item[0]}
							</td>
							<td>{Math.round(item[1] * 100) / 100}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	} else {
		return (
			<section>
				<AdditionalTh />
			</section>
		);
	}
};
