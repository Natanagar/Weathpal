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
export const INPUT_CONVERT_AMOUNT_FROM = 'INPUT_CONVERT_AMOUNT_FROM';
export const INPUT_CONVERT_AMOUNT_TO = 'INPUT_CONVERT_AMOUNT_TO';

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
/* export const fetchOrders = (token) => dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json?auth=' + token)
    .then(res => {
      let fetchedOrders = []
      for(let key in res.data){
        fetchedOrders.push({
          ...res.data[key],
          id:key
        })
      }
      dispatch(fetchOrdersSuccess(fetchedOrders))
    })
    .catch(error => dispatch(fetchOrdersFailed(error)))
  }; */

// fetching data if you  want convert currency from to
export const getCrossCourse = () => async (dispatch) => {
  dispatch({ type: 'INPUT_CONVERT_START' });
  const api = new Api();
  const { key, endpoint } = keyData;
  const { from, to } = store.getState().addSelectedCurrency;
  const endpointConvert = `${endpoint}latest?access_key=${key}&base=EUR&symbols=${from},${to}`;
  await api.getCrossCurrency(endpointConvert)
    // .then(res => console.log(res.data.rates, res.data.date, res.data.base))
    // .catch(error => console.log(error));
    .then(res => dispatch(fetchCrossCourse(res.data)))
    .catch(error => dispatch({ type: 'INPUT_CONVERT_ERROR', payload: error }));
};


// fetching currency for fetching data as at
export const getRatingByDate = () => (dispatch) => {
  dispatch({ type: 'INPUT_FETCH_START' });
  const { date } = store.getState().getDataByDate;
  const api = new Api();
  const endpoint = `${keyData.endpoint}${date}`;
  const { key } = keyData;
  api.getCurrencyByDate(endpoint, key)
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
