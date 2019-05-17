import {
  INPUT_FETCH_ERROR,
  INPUT_FETCH_START,
  INPUT_FETCH_SUCCESS,
  INPUT_ADDED_DATE,
  INPUT_CONVERT_START,
  INPUT_CONVERT_ERROR,
  INPUT_CONVERT_SUCCESS,
} from '../actions/index';

const initialState = Object.freeze({
  startFetching: false,
  error: null,
  currencyByDate: [],
  date: null,
  ratingAll: [],
  currency: [],
  dateFrom: null,
  baseCurrency: null,
});
// reducers for Input
export const getDataByDate = (state = initialState, action) => {
  switch (action.type) {
    // put data to store for fetching data as at
    case INPUT_FETCH_START:
      return {
        ...state,
        startFetching: true,
      };
    case INPUT_FETCH_ERROR:
      return {
        ...state,
        startFetching: false,
        error: action.payload,
      };
    case INPUT_FETCH_SUCCESS:
      return {
        ...state,
        startFetching: false,
        currencyByDate: action.payload.from,
        convertFrom: action.payload.baseCurrency,
        convertByDate: action.payload.dateFrom,

      };
      // added date
    case INPUT_ADDED_DATE:
      return {
        ...state,
        date: action.date,
      };
      // cross course currency
    case INPUT_CONVERT_START:
      return {
        ...state,
        startFetching: true,
      };
    case INPUT_CONVERT_ERROR:
      console.log(action);
      return {
        ...state,
        startFetching: false,
        error: action.payload,
      };
    case INPUT_CONVERT_SUCCESS:
      console.log(action);
      return {
        ...state,
        startFetching: false,
        currency: action.currency,
        dateFrom: action.date,
        baseCurrency: action.baseCurrency,

      };

    default:
      return state;
  }
};
