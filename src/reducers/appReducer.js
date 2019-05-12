import { createReducer } from '../components/utils/utils';
import * as types from '../actions/index';

const initialState = {
  map: null,
  polyLine: null,
  loading: true,
  snackBar: {
    open: false,
    message: null,
  },
};

export const appReducer = createReducer(initialState, {
  [types.FETCH_DATA](state, { payload: { map, polyLine } }) { return { ...state, map, polyLine }; },

  [types.SET_LOADING](state) { return { ...state, loading: false }; },

  [types.SET_SNAPBAR](state, { payload }) { return { ...state, snackBar: payload }; },
});
