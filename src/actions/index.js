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

export const FETCH_CURRENCY_PENDING = 'FETCH_CURRENCY_PENDING';
export const FETCH_CURRENCY_START = 'FETCH_CURRENCY_START';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_ERROR = 'FETCH_CURRENCY_ERROR';


export const fetchCurrencyPending = () => makeActionCreator(FETCH_CURRENCY_PENDING);


export const fetchCurrencySuccess = ({ items, data, baseCurrency }) => ({
  type: FETCH_CURRENCY_SUCCESS,
  items,
  data,
  baseCurrency,
});
export const fetchStart = () => ({
  type: FETCH_CURRENCY_START,
});


export const fetchCurrencyError = error => ({
  type: FETCH_CURRENCY_ERROR,
  payload: {
    error,
  },
});
