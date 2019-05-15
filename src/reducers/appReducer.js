import { combineReducers } from 'redux';
import { addSelectedCurrency } from './AutocompleteReducers';
import { getDataByDate } from './inputReducer';
import { createReducer } from '../components/utils/utils';
import {
  FETCH_CURRENCY_START,
  FETCH_CURRENCY_PENDING,
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_ERROR,
  AUTOCOMPLETE_SELECTED_CURRENCY_FROM,
  AUTOCOMPLETE_SELECTED_CURRENCY_TO,
  AUTOCOMPLETE_SELECTED_AMOUNT,
} from '../actions/index';

const initialState = Object.freeze({
  pending: false,
  isLoading: false,
  error: null,
  items: [],
  data: [],
  baseCurrency: 'EUR',
  exchange: {
    from: null,
    to: null,
    amount: null,
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
    case FETCH_CURRENCY_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_CURRENCY_ERROR:
      return {
        ...state,
        pending: false,
        isLoading: true,
        error: action.error,
      };
    case FETCH_CURRENCY_SUCCESS:
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


// root reducer
const rootReducer = combineReducers({
  getDataFromApi,
  addSelectedCurrency,
  getDataByDate,
});

export default rootReducer;
