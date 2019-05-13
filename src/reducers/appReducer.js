import { propOr, identity } from 'ramda';
import { createReducer } from '../components/utils/utils';
import * as types from '../actions/index';

const initialState = Object.freeze({
  pending: false,
  isLoading: false,
  error: null,
  currency: [],
  data: [],
  baseCurrency: null,
});
export const actionHandlers = {
  FETCH_CURRENCY_PENDING: (state, action) => Object.assign({}, state, { pending: true, isLoading: action.bool }),
  FETCH_CURRENCY_SUCCESS: (state, action) => Object.assign({}, state, { currency: action.result, isLoading: action.bool }),
  FETCH_CURRENCY_ERROR: (state, action) => Object.assign({}, state, { error: action.error }),
};
export const data = (initialState, actionHandlers) => (state = initialState, action) => propOr(identity, action.type, actionHandlers)(state, action);
console.log(data(initialState, actionHandlers));

/* export const appReducer = createReducer(initialState, {
  [types.FETCH_DATA](state, { payload: { map, polyLine } }) { return { ...state, map, polyLine }; },

  [types.SET_LOADING](state) { return { ...state, loading: false }; },

  [types.SET_SNAPBAR](state, { payload }) { return { ...state, snackBar: payload }; },
}); */
