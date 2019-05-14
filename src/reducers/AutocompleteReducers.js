import {
  AUTOCOMPLETE_SELECTED_CURRENCY_FROM,
  AUTOCOMPLETE_SELECTED_CURRENCY_TO,
  AUTOCOMPLETE_SELECTED_AMOUNT,
  AUTOCOMPLETE_EXCHANGE_FETCHING_START,
  AUTOCOMPLETE_EXCHANGE_FETCHING_SUCCESS,
  AUTOCOMPLETE_EXCHANGE_FETCHING_ERROR,
} from '../actions/index';

const initialState = Object.freeze({
  from: null,
  to: null,
  amount: null,
  loadingExchange: false,
  errorExchange: null,
  summ: null,
});

export const addSelectedCurrency = (state = initialState, action) => {
  switch (action.type) {
    case AUTOCOMPLETE_SELECTED_CURRENCY_FROM:
      return {
        ...state,
        from: action.from,

      };
    case AUTOCOMPLETE_SELECTED_CURRENCY_TO:
      console.log(action);
      return {
        ...state,
        to: action.to,

      };
    case AUTOCOMPLETE_SELECTED_AMOUNT:
      return {
        ...state,
        amount: action.amount,

      };
    case AUTOCOMPLETE_EXCHANGE_FETCHING_START:
      return {
        ...state,
        loadingExchange: true,

      };
    case AUTOCOMPLETE_EXCHANGE_FETCHING_SUCCESS:
      return {
        ...state,
        summ: action.payload,

      };
    case AUTOCOMPLETE_EXCHANGE_FETCHING_ERROR:
      return {
        ...state,
        error: action.error,

      };
    default:
      return state;
  }
};
