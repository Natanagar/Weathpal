import {
  INPUT_FETCH_ERROR,
  INPUT_FETCH_START,
  INPUT_FETCH_SUCCESS,
  INPUT_ADDED_DATE,
  INPUT_CONVERT_START,
  INPUT_CONVERT_ERROR,
  INPUT_CONVERT_SUCCESS,
  INPUT_CONVERT_AMOUNT_FROM,
  INPUT_CONVERT_AMOUNT_TO,
  INPUT_CONVERT_AMOUNT_START,
  INPUT_FETCH_HISTORICAL_RATING_START,
  INPUT_FETCH_HISTORICAL_RATING_SUCCESS,
  INPUT_FETCH_HISTORICAL_RATING_ERROR,
  INPUT_HISTORICAL_RATING_FROM,
  INPUT_HISTORICAL_RATING_TILL,
} from '../actions/index';

const initialState = Object.freeze({
  startFetching: false,
  error: null,
  currencyByDate: [],
  date: null,
  ratingAll: [],
  rating: [],
  ratingFrom: null,
  ratingTill: null,
  tableOfRating: [],
});
// reducers for Input
export const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    // put data to store for fetching data as at
    case INPUT_FETCH_START:
      return {
        ...state,
        startFetching: true,
      };
    case INPUT_CONVERT_AMOUNT_START:
      return {
        ...state,
        startFetching: true,
      };
      return {
        ...state,
        startFetching: true,
      };
    case INPUT_CONVERT_AMOUNT_FROM:
      return {
        ...state,
        resultFrom: action.resultFrom,
      };
    case INPUT_CONVERT_AMOUNT_TO:
      return {
        ...state,
        resultTo: action.resultTo,
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
      return {
        ...state,
        startFetching: false,
        error: action.payload,
      };
    case INPUT_CONVERT_SUCCESS:
      return {
        ...state,
        startFetching: false,
        rating: action.rating,
        dateFrom: action.date,
        baseCurrency: action.baseCurrency,
      };
      // delay
    case INPUT_CONVERT_START:
      return {
        ...state,
        startFetching: true,
      };
    case INPUT_CONVERT_ERROR:
      return {
        ...state,
        startFetching: false,
        error: action.payload,
      };
    case INPUT_CONVERT_SUCCESS:
      return {
        ...state,
        startFetching: false,
        rating: action.rating,
        dateFrom: action.date,
        baseCurrency: action.baseCurrency,
      };

    case INPUT_HISTORICAL_RATING_FROM:
      return {
        ...state,
        ratingFrom: action.ratingFrom,
      };
    case INPUT_HISTORICAL_RATING_TILL:
      return {
        ...state,
        ratingTill: action.ratingTill,
      };
    case INPUT_FETCH_HISTORICAL_RATING_START:
      return {
        ...state,
        startFetching: true,
      };
    case INPUT_FETCH_HISTORICAL_RATING_SUCCESS:
      return {
        ...state,
        startFetching: false,
        tableOfRating: action.payload.tableOfRating,
      };
    case INPUT_FETCH_HISTORICAL_RATING_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
