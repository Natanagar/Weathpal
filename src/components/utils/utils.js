import React from 'react';


export const createReducer = (initialState, actionHandlers) => (state = initialState, action) => {
  if (actionHandlers.hasOwnProperty(action.type)) {
    return actionHandlers[action.type](state, action);
  }
  return state;
};

export const sortingObject = (object, key) => {
  const item = Object.entries(object).filter(item =>
    item[0] === key,);
  return item;
};
