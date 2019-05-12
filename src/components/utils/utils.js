
export const createReducer = (initialState, handlers) => function reducer(state = initialState, action) {
      if (actionHandlers.hasOwnProperty(action.type)) {
        return actionHandlers[action.type](state, action);
      } else {
        return state;
      }
    };


