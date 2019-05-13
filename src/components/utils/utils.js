import { actionHandlers } from '../../reducers/appReducer';

export const createReducer = (initialState, actionHandlers) => function reducer(state = initialState, action) {
  if (actionHandlers.hasOwnProperty(action.type)) {
    return actionHandlers[action.type](state, action);
  }
  return state;
};
