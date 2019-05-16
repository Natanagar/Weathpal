import format from 'date-fns/format';
import { store } from '../index';

import Api from '../components/Api/index';
import { keyData } from '../components/Api/Apikey';


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

// action creators for Input
export const fetchCurrencyByDate = ({ currencyByDate, date, baseCurrency }) => ({
  type: FETCH_CURRENCY_SUCCESS,
  currencyByDate,
  date,
  baseCurrency,
});

// action creators for Input
export const fetchCrossCourse = ({ currency, dateFrom, baseCurrency }) => ({
  type: INPUT_CONVERT_SUCCESS,
  currency,
  dateFrom,
  baseCurrency,
});

// first fetching data for App
export const getCurrencyFromFixer = () => store.dispatch((dispatch) => {
  dispatch({ type: 'FETCH_CURRENCY_PENDING' });
  const api = new Api();
  const { endpoint } = keyData;
  const { key } = keyData;
  api.getData(endpoint, key)
    .then(res => dispatch({
      type: 'FETCH_CURRENCY_SUCCESS',
      payload: {
        items: res.data.rates,
        data: format(res.data.date, 'DD.MM.YYYY'),
        baseCurrency: res.data.base,
      },
    }))
    .catch(err => dispatch({ type: 'FETCH_CURRENCY_ERROR', payload: err }));
});


// fetching data if you  want convert currency from to
export const getCrossCourse = (from, to) => (dispatch) => {
  console.log(from, to);
  // store.dispatch({ type: 'INPUT_CONVERT_START' });
  const api = new Api();
  // https://api.exchangeratesapi.io/latest?symbols=USD,GBP
  const endpoint = keyData.nextEndpoint;
  console.log(endpoint);
  api.getCrossCurrency(`${endpoint}latest?symbols=${from},${to}`)
    .then(res => console.log(res.data))
    .catch(error => console.log(error));
  // .then(res => dispatch(fetchCrossCourse(res.data)))
  // .catch(error => dispatch({ type: 'INPUT_CONVERT_ERROR', payload: error }));
};

// fetching currency for fetching data as at
export const getCurrencyFromFixerByDate = date => (dispatch) => {
  dispatch({ type: 'INPUT_FETCH_START' });
  const { date } = store.getState().getDataByDate;
  const api = new Api();
  const endpoint = `${keyData.nextEndpoint}${date}`;
  api.getCurrencyByDate(endpoint)
    .then(res => dispatch({
      type: 'INPUT_FETCH_SUCCESS',
      payload: {
        from: res.data.rates,
        /* dateFrom: format(res.data.date, 'DD.MM.YYYY'),
        baseCurrency : res.data.base */
      },
    }))
    .catch(error => dispatch({ type: 'INPUT_FETCH_ERROR', payload: error }));
};
