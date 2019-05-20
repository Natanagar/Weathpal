import React from 'react';
import { store } from '../../index';
export const Footer = ({ data, baseCurrency, handleInputChange, resultTo, resultFrom, from, to, amount }) => {
	//create ui with result
	const title = `Convert ${amount} ${from} to ${to} will be ${Math.round(resultTo * 10) / 10} `;
	const opposite = `On the other hand convert ${amount} ${to} to ${from} will be ${Math.round(resultFrom * 10) /
		10} `;

	return (
		<div>
			<h4>Figure out your request</h4>
			<div>{amount && from && to && resultTo ? <div>{title}</div> : null}</div>
			<div>{amount && from && to && resultFrom ? <div>{opposite}</div> : null}</div>
			<section>Last update {data}</section>
			<form>
				<section>
					<h4>Compare currency rating</h4>
				</section>
				<label htmlFor="date" text="date">
					Currency by date
				</label>
				<br />
				<input
					type="date"
					id="date"
					defaultValue={data}
					className="form-control"
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
};
