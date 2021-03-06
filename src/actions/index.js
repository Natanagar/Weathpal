import format from 'date-fns/format';
import { store } from '../index';

import Api from '../components/Api/index';
import { keyData } from '../components/Api/Apikey';
import { crossCourse } from '../components/utils/utils';

// actions from App
export const FETCH_CURRENCY_PENDING = 'FETCH_CURRENCY_PENDING';
export const FETCH_CURRENCY_START = 'FETCH_CURRENCY_START';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_ERROR = 'FETCH_CURRENCY_ERROR';

// actions from autocomplete
export const AUTOCOMPLETE_SELECTED_CURRENCY_FROM = 'AUTOCOMPLETE_SELECTED_CURRENCY_FROM';
export const AUTOCOMPLETE_SELECTED_CURRENCY_TO = 'AUTOCOMPLETE_SELECTED_CURRENCY_TO';
export const AUTOCOMPLETE_SELECTED_AMOUNT = 'AUTOCOMPLETE_SELECTED_AMOUNT';

export const AUTOCOMPLETE_EXCHANGE_FETCHING_START = 'AUTOCOMPLETE_EXCHANGE_FETCHING_START';
export const AUTOCOMPLETE_EXCHANGE_FETCHING_SUCCESS = 'AUTOCOMPLETE_EXCHANGE_FETCHING_SUCCESS';
export const AUTOCOMPLETE_EXCHANGE_FETCHING_ERROR = 'AUTOCOMPLETE_EXCHANGE_FETCHING_ERROR';

// actions from input
// added date
export const INPUT_ADDED_DATE = 'INPUT_ADDED_DATE';
// fetching list on the currency as at
export const INPUT_FETCH_START = 'INPUT_FETCH_START';
export const INPUT_FETCH_ERROR = 'INPUT_FETCH_ERROR';
export const INPUT_FETCH_SUCCESS = 'INPUT_FETCH_SUCCESS';

// convert currency from
export const INPUT_CONVERT_START = 'INPUT_CONVERT_START';
export const INPUT_CONVERT_ERROR = 'INPUT_CONVERT_ERROR';
export const INPUT_CONVERT_SUCCESS = 'INPUT_CONVERT_SUCCESS';
export const INPUT_CONVERT_AMOUNT_FROM = 'INPUT_CONVERT_AMOUNT_FROM';
export const INPUT_CONVERT_AMOUNT_TO = 'INPUT_CONVERT_AMOUNT_TO';
export const INPUT_CONVERT_AMOUNT_START = 'INPUT_CONVERT_AMOUNT_START';

// fetch rating as at
export const INPUT_FETCH_HISTORICAL_RATING_START = 'INPUT_FETCH_HISTORICAL_RATING_START';
export const INPUT_FETCH_HISTORICAL_RATING_SUCCESS = 'INPUT_FETCH_HISTORICAL_RATING_SUCCESS';
export const INPUT_FETCH_HISTORICAL_RATING_ERROR = 'INPUT_FETCH_HISTORICAL_RATING_ERROR';

// added date from input for historical rating
export const INPUT_HISTORICAL_RATING_FROM = 'INPUT_HISTORICAL_RATING_FROM';
export const INPUT_HISTORICAL_RATING_TILL = 'INPUT_HISTORICAL_RATING_TILL';

// action creators for Input
export const fetchCurrencyByDate = ({ currencyByDate, date, baseCurrency }) => ({
  type: FETCH_CURRENCY_SUCCESS,
  currencyByDate,
  date,
  baseCurrency,
});

// action creators for Input
export const fetchCrossCourse = (rating, dateFrom, baseCurrency) => ({
  type: INPUT_CONVERT_SUCCESS,
  rating,
  dateFrom,
  baseCurrency,
});

// first fetching data for App
export const getCurrencyFromFixer = () => store.dispatch((dispatch) => {
    dispatch({ type: 'FETCH_CURRENCY_PENDING' });
    const api = new Api();
    const { endpoint } = keyData;
    const { key } = keyData;
    api
      .getData(endpoint, key)
      .then(res => dispatch({
          type: 'FETCH_CURRENCY_SUCCESS',
          payload: {
            items: res.data.rates,
            data: format(res.data.date, 'DD.MM.YYYY'),
            baseCurrency: res.data.base,
          },
        }),)
      .catch(err => dispatch({ type: 'FETCH_CURRENCY_ERROR', payload: err }));
  });
// calculate rate for currency (middleware)
export const calculatingSum = dispatch => (dispatch) => {
  store.dispatch({ type: 'INPUT_CONVERT_AMOUNT_START' });
  const { amount } = store.getState().autocompleteReducer;
  const { base, date, rates } = store.getState().inputReducer.rating;
  const arrayWithValues = Object.entries(rates).map(item => [].concat(item));

  const resultFrom = crossCourse(arrayWithValues[0][1], arrayWithValues[1][1]) * amount;
  const resultTo = crossCourse(arrayWithValues[1][1], arrayWithValues[0][1]) * amount;
  store.dispatch({ type: 'INPUT_CONVERT_AMOUNT_FROM', resultFrom });
  store.dispatch({ type: 'INPUT_CONVERT_AMOUNT_TO', resultTo });
};

// fetching data if you  want convert currency from to
export const getCrossCourse = (from, to) => (dispatch) => {
  dispatch({ type: 'INPUT_CONVERT_START' });
  const api = new Api();
  const { key, endpoint } = keyData;
  const endpointConvert = `${endpoint}latest?access_key=${key}&base=EUR&symbols=${from},${to}`;
  api
    .getCrossCurrency(endpointConvert)
    .then(res => dispatch(fetchCrossCourse(res.data)))
    .then(res => dispatch({ type: 'INPUT_CONVERT_AMOUNT_START' }))
    .then(() => store.dispatch(calculatingSum()))
    .catch(error => dispatch({ type: 'INPUT_CONVERT_ERROR', payload: error }));
};

// fetching currency for fetching data as at
export const getRatingByDate = date => (dispatch) => {
  dispatch({ type: 'INPUT_FETCH_START' });
  const { date } = store.getState().inputReducer;
  const api = new Api();
  const { key } = keyData;
  const endpoint = `${keyData.nextEndpoint}${date}`;
  api
    .getCurrencyByDate(endpoint, key)
    .then(res => dispatch({
        type: 'INPUT_FETCH_SUCCESS',
        payload: {
          from: res.data.rates,
        },
      }),)
    .catch(error => dispatch({ type: 'INPUT_FETCH_ERROR', payload: error }));
};
// https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01&base=USD

export const getHistoricalRating = (ratingTill, ratingFrom) => (dispatch) => {
  dispatch({ type: 'INPUT_FETCH_HISTORICAL_RATING_START' });
  const { ratingTill, ratingFrom } = store.getState().inputReducer;
  const api = new Api();
  const endpoint = `${keyData.nextEndpoint}history?start_at=${ratingFrom}&end_at=${ratingTill}&base=USD`;
  api
    .getHistoricalRating(endpoint)
    .then(res => store.dispatch({
        type: 'INPUT_FETCH_HISTORICAL_RATING_SUCCESS',
        payload: {
          tableOfRating: res.data.rates,
        },
      }),)
    .catch(error => store.dispatch({ type: 'INPUT_FETCH_HISTORICAL_RATING_ERROR', payload: error }));
};
