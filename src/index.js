import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger, { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as reducers from './reducers/appReducer';

const reduxLogger = createLogger({ diff: true,
    predicate: (state, action) => {
    return action.type.startsWith('fooberry/player/');
  }
});
const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware, logger));
store.dispatch(dispatch=>{
  dispatch({type : 'FETCH_CURRENCY_PENDING'})
  //
  dispatch({type : 'FETCH_CURRENCY_SUCCESS'})
})

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
