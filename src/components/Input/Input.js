import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { InputAutocomplete } from '../Autocomplete/Autocomplete';
import { HistoricalRating } from '../Table/RatingAsAt';
import { store } from '../../index';
import { getCrossCourse, getRatingByDate, calculatingSum, getHistoricalRating } from '../../actions/index';
import { Button } from '../Button/Button';
import { Footer } from '../Table/Footer';
import { Amount } from '../Autocomplete/Amount';
import { crossCourse, crossCourseTo } from '../utils/utils';

const Input = ({
	data,
	flag,
	currency,
	baseCurrency,
	dispatch,
	getExchange,
	from,
	to,
	amount,
	getByDate,
	items,
	rates,
	resultTo,
	resultFrom,
	tableOfRating,
	getCross,
	getHistorical
}) => {
	//after click need to stop propagation
	const stopBrowser = (e) => {
		e.preventDefault();
	};
	//create button component with memoized callback
	const CalculatingRating = ({ dispatch }) => {
		const handleRating = useCallback(
			() => {
				store.dispatch(getExchange(from, to));
				//calculatingSum(amount, from, to)
			},
			[ from, to ]
		);
		return <Button onClick={handleRating(from, to)} data={'calculate'} />;
	};

	//put amount to store
	const getAmountFromInput = (amount, event, dispatch) => {
		amount = Number(amount);
		console.log(amount);
		store.dispatch({ type: 'AUTOCOMPLETE_SELECTED_AMOUNT', amount });
	};
	//adding data to Redux
	const handleInputChange = (event, value) => {
		const date = format(event.target.value, 'YYYY-MM-DD');
		//dispatching data from
		store.dispatch({ type: 'INPUT_ADDED_DATE', date });
		store.dispatch(getByDate(date));
	};

	//
	const ratingHandleChange = (event, flag) => {
		let ratingFrom, ratingTill;
		if (flag == 'true') {
			ratingFrom = event.target.value;
			store.dispatch({ type: 'INPUT_HISTORICAL_RATING_FROM', ratingFrom });
		} else {
			ratingTill = event.target.value;
			store.dispatch({ type: 'INPUT_HISTORICAL_RATING_TILL', ratingTill });
			store.dispatch(getHistorical(ratingTill, ratingFrom));
		}
	};

	return (
		<div className="form">
			<form className="form-field">
				<section className="form-field-amount">
					<InputAutocomplete direction={'Base currency'} from={true} currency={currency} />
				</section>
				<section className="form-field-from">
					<Amount getAmountFromInput={getAmountFromInput} />
				</section>
				<section className="form-field-to">
					<InputAutocomplete direction={'Convert to'} from={false} currency={currency} />
				</section>
				<section onClick={(e) => stopBrowser(e)}>
					<CalculatingRating />
				</section>
			</form>
			<Footer
				data={data}
				baseCurrency={baseCurrency}
				handleInputChange={handleInputChange}
				resultFrom={resultFrom}
				resultTo={resultTo}
				from
				to
				amount
			/>
			<HistoricalRating tableOfRating={tableOfRating} ratingHandleChange={ratingHandleChange} flag={flag} />
		</div>
	);
};
const mapStateToProps = ({ inputReducer, autocompleteReducer, appReducer }) => {
	const { items } = appReducer;
	const { from, to, amount } = autocompleteReducer;

	const { date, currencyByDate, startFetching, resultFrom, resultTo, tableOfRating } = inputReducer;
	return {
		items: items,
		from: from,
		to: to,
		amount: amount,
		resultFrom: resultFrom,
		resultTo: resultTo,
		tableOfRating: tableOfRating
	};
};
const mapDispatchToProps = (dispatch) => ({
	getExchange: () => dispatch(getCrossCourse),
	getByDate: () => dispatch(getRatingByDate),
	getHistorical: () => dispatch(getHistoricalRating)
});
export default connect(mapStateToProps, mapDispatchToProps)(Input);
