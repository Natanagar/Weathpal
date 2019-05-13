import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger, { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './App';
import Api from './components/Api/index';
import { keyData } from "./components/Api/Apikey";


import * as serviceWorker from './serviceWorker';

import reducer from './reducers/appReducer';

const reduxLogger = createLogger({ 
    diff: true,
    predicate: (state, action) => {
    return action.type.startsWith('fooberry/player/');
  }
});
const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
store.subscribe(()=>{
  console.log('store changed', store.getState()) 
})
store.dispatch(dispatch => {
  dispatch({type : 'FETCH_CURRENCY_PENDING'})
  const api = new Api();
  const endpoint = keyData.endpoint;
  const key = keyData.key;
  api.getData(endpoint, key)
  .then(res => dispatch({type : 'FETCH_CURRENCY_SUCCESS', payload : res.data}))
  .catch(err => dispatch({type : 'FETCH_CURRENCY_ERROR', payload : err}))
  
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
