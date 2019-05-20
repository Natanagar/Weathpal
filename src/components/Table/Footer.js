import React, { useState } from 'react';
import { store } from '../../index';
export const Footer = ({ data, baseCurrency, handleInputChange, resultTo, resultFrom, from, to, amount }) => {
	console.log(resultTo, resultFrom);
	const [ date, searchByDate ] = useState(null);
	const title = `Convert ${amount} from ${from} to ${to}`;
	const ResultFrom = (resultTo, resultFrom) => {
		return (
			<div>
				{isNaN(from) || isNaN(to) ? (
					<span>
						{title} <br />
						{resultFrom}
					</span>
				) : null}
			</div>
		);
	};
	const ResultTo = (resultTo) => {
		console.log(resultTo);
		return <div>{resultTo}</div>;
	};

	return (
		<div>
			<h4>Figure out your request</h4>
			<div>
				<h5>Summ</h5>
				<div>{Math.round(resultTo * 10) / 10}</div>
			</div>
			<section>Currency from to {baseCurrency}</section>
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
					defaultValue={date}
					className="form-control"
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
};
