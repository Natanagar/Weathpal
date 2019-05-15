const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};
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
export const INPUT_ADDED_DATE = 'INPUT_ADDED_DATE';
export const INPUT_FETCH_START = 'INPUT_FETCH_START';
export const INPUT_FETCH_ERROR = 'INPUT_FETCH_ERROR';
export const INPUT_FETCH_SUCCESS = 'INPUT_FETCH_SUCCESS';


export const fetchCurrencyPending = () => makeActionCreator(FETCH_CURRENCY_PENDING);

// action creators for App
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

// action creator for Autocomplete
export const selectedCurrencyFrom = currency => ({
  type: AUTOCOMPLETE_SELECTED_CURRENCY_FROM,
  currency,
});

export const selectedCurrencyTo = currency => ({
  type: AUTOCOMPLETE_SELECTED_CURRENCY_TO,
  currency,
});
export const selectedAmount = amount => ({
  type: AUTOCOMPLETE_SELECTED_AMOUNT,
  amount,
});

// action creators for Input
export const fetchCurrencyByDate = ({ currencyByDate, date, baseCurrency }) => ({
  type: FETCH_CURRENCY_SUCCESS,
  currencyByDate,
  date,
  baseCurrency,
});
