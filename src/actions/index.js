import format from 'date-fns/format';
import Api from '../components/Api/index';
import { keyData } from '../components/Api/Apikey';

const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

export const getCurrencyFromFixer = (dispatch) => {
  dispatch(fetchCurrencyPending());
  const api = new Api();
  const endpoint = keyData.endpoint;
  const key = keyData.key;
  api.getData(endpoint, key)
    .then((res) => {
      dispatch(fetchCurrencySuccess(res));
    })
    .catch((error) => {
      dispatch(fetchCurrencyError({ type: 'FETCH_CURRENCY_ERROR', payload: error }));
    });
};


export const FETCH_CURRENCY_PENDING = 'FETCH_CURRENCY_PENDING';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_ERROR = 'FETCH_CURRENCY_ERROR';


export const fetchCurrencyPending = () => makeActionCreator(FETCH_CURRENCY_PENDING);


export const fetchCurrencySuccess = response => ({
  type: FETCH_CURRENCY_SUCCESS,
  currency: response.data.rates,
  data: format(response.data.date, 'DD.MM.YYYY'),
});

export const fetchCurrencyError = error => makeActionCreator(FETCH_CURRENCY_ERROR, error);
console.log(fetchCurrencyPending, fetchCurrencySuccess, fetchCurrencyError);
