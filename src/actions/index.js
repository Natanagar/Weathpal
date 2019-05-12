const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

export const FETCH_CURRENCY_PENDING = 'FETCH_CURRENCY_PENDING';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_ERROR = 'FETCH_CURRENCY_ERROR';

export const fetchCurrencyPending = () => makeActionCreator(FETCH_CURRENCY_PENDING);


export const fetchCurrencySuccess = currency => makeActionCreator(FETCH_CURRENCY_SUCCESS, currency);

export const fetchCurrencyError = error => makeActionCreator(FETCH_CURRENCY_ERROR, error);
