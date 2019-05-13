import { combineReducers } from 'redux';
import { createReducer } from '../components/utils/utils';
import {
  FETCH_CURRENCY_START,
  FETCH_CURRENCY_PENDING,
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_ERROR,
  AUTOCOMPLETE_SELECTED_CURRENCY_FROM,
  AUTOCOMPLETE_SELECTED_CURRENCY_TO,
} from '../actions/index';

const initialState = Object.freeze({
  pending: false,
  isLoading: false,
  error: null,
  items: [],
  data: [],
  baseCurrency: 'EUR',
  selectedCurrency: {
    from: null,
    to: null,
  },
});
// reducers for App
const getDataFromApi = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENCY_START:
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_CURRENCY_PENDING':
      return {
        ...state,
        pending: true,
      };
    case 'FETCH_CURRENCY_ERROR':
      return {
        ...state,
        pending: false,
        isLoading: true,
        error: action.error,
      };
    case 'FETCH_CURRENCY_SUCCESS':
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        data: action.payload.data,
        currencyFrom: action.payload.base,
      };
    default:
      return state;
  }
};
//
export const addSelectedCurrency = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTOCOMPLETE_SELECTED_CURRENCY_FROM':
      return {
        ...state,
        selectedCurrency: { from: action.payload.currency },

      };
    case 'AUTOCOMPLETE_SELECTED_CURRENCY_TO':
      return {
        ...state,
        selectedCurrency: { to: action.payload.currency },

      };
    default:
      return state;
  }
};

// root reducer
const rootReducer = combineReducers({
  getDataFromApi,
  addSelectedCurrency,
});

export default rootReducer;
