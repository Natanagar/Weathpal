const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

export const createReducer = (initialState, actionHandlers) => (state = initialState, action) => {
  if (actionHandlers.hasOwnProperty(action.type)) {
    return actionHandlers[action.type](state, action);
  }
  return state;
};

export const crossCourse = (fromCurrency, toCurrency) => (Math.round((fromCurrency / toCurrency) * 100) / 100);
export const crossCourseTo = (fromCurrency, toCurrency) => (Math.round((toCurrency / fromCurrency) * 100) / 100);
