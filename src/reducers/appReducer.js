import { combineReducers } from 'redux';
import { createReducer } from '../components/utils/utils';
import {
  FETCH_CURRENCY_START,
  FETCH_CURRENCY_PENDING,
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_ERROR,
} from '../actions/index';

const initialState = Object.freeze({
  pending: false,
  isLoading: false,
  error: null,
  items: [],
  data: [],
  baseCurrency: null,
});

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
        baseCurrency: action.payload.base,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  getDataFromApi,
});

export const getCurrency = state => state.items;
export const getCurrencyPending = state => state.pending;
export const getCurrencyError = state => state.error;
export default rootReducer;
