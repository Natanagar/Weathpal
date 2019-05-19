import React from 'react';

export const HistoricalRating = ({ data, ratingHandleChange, flag, tableOfRating }) => {
	const HistoricalTable = (tableOfRating) => {
		console.log();
		Object.entries(tableOfRating).map((item) => console.log(item));
		return (
			<div>
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
								<td>{item}</td>
								{/*<td>{Math.round(item[2] * 100) / 100}</td>*/}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	};
	const InputDate = ({ flag, ratingHandleChange }) => {
		return (
			<section>
				<label htmlFor="dateFrom" text="date" />
				<br />
				<input
					type="date"
					id="dateFrom"
					flag={flag}
					defaultValue="Currency from"
					className="form-control-currency-from"
					onChange={(e) => ratingHandleChange(e, flag)}
				/>
			</section>
		);
	};

	return (
		<div>
			<h4>Choosing currencies are as at</h4>
			<form>
				<h4>Historical rating</h4>
				<InputDate flag={'true'} defaultValue={'Currency from'} ratingHandleChange={ratingHandleChange} />
				<InputDate flag={'false'} defaultValue={'Currency till'} ratingHandleChange={ratingHandleChange} />
			</form>
			<HistoricalTable tableOfRating={tableOfRating} />
		</div>
	);
};
