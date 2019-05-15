import {
  INPUT_FETCH_ERROR,
  INPUT_FETCH_START,
  INPUT_FETCH_SUCCESS,
  INPUT_ADDED_DATE,
} from '../actions/index';

const initialState = {
  startFetching: false,
  error: null,
  currencyByDate: [],
  date: null,
};
// reducers for Input
export const getDataByDate = (state = initialState, action) => {
  switch (action.type) {
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
      console.log(action);
      return {
        ...state,
        startFetching: false,
        currencyByDate: action.payload,
      };
    case INPUT_ADDED_DATE:
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
};
