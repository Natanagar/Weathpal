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
import { wrap } from 'module';

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
				getExchange(from, to);
			},
			[ from, to ]
		);
		return <Button onClick={handleRating(from, to)} data={'calculate'} />;
	};

	//put amount to store
	const getAmountFromInput = (amount, event, dispatch) => {
		amount = Number(amount);
		store.dispatch({ type: 'AUTOCOMPLETE_SELECTED_AMOUNT', amount });
	};
	//adding data to Redux
	const handleInputChange = (event, value) => {
		const date = format(event.target.value, 'YYYY-MM-DD');
		//dispatching data from
		store.dispatch({ type: 'INPUT_ADDED_DATE', date });
		getByDate(date);
	};

	//put data to redux
	const ratingHandleChange = (event, flag) => {
		let ratingFrom, ratingTill;
		if (flag == 'true') {
			ratingFrom = event.target.value;
			store.dispatch({ type: 'INPUT_HISTORICAL_RATING_FROM', ratingFrom });
		} else {
			ratingTill = event.target.value;
			store.dispatch({ type: 'INPUT_HISTORICAL_RATING_TILL', ratingTill });
			getHistorical(ratingTill, ratingFrom);
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
				<section style={{
					flexWrap:"nowrap",
					margin: '20px auto',
					maxHeight: '70px'
				}} onClick={(e) => stopBrowser(e)}>
					<CalculatingRating />
					
				</section>
			</form>
			<Footer
				data={data}
				baseCurrency={baseCurrency}
				handleInputChange={handleInputChange}
				resultFrom={resultFrom}
				resultTo={resultTo}
				from={from}
				to={to}
				amount={amount}
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
		items,
		from,
		to,
		amount,
		resultFrom,
		resultTo,
		tableOfRating
	};
};
const mapDispatchToProps = (dispatch) => ({
	getExchange: (from, to) => dispatch(getCrossCourse(from, to)),
	getByDate: (date) => dispatch(getRatingByDate(date)),
	getHistorical: (ratingTill, ratingFrom) => dispatch(getHistoricalRating(ratingTill, ratingFrom))
});
export default connect(mapStateToProps, mapDispatchToProps)(Input);
