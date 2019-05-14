import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import format from 'date-fns/format';
import './index.css';
import App from './App';
import Api from './components/Api/index';
import { keyData } from "./components/Api/Apikey";


import * as serviceWorker from './serviceWorker';

import reducer from './reducers/appReducer';

export const store = createStore(reducer, applyMiddleware(thunk,logger));
//for testing in browser
window.store = store;
export const getCurrencyFromFixer = () => store.dispatch(dispatch => {
  dispatch({type : 'FETCH_CURRENCY_PENDING'})
  const api = new Api();
  const endpoint = keyData.endpoint;
  const key = keyData.key;
  api.getData(endpoint, key)
  .then(res => 
    dispatch({type : 'FETCH_CURRENCY_SUCCESS', payload : { 
    items: res.data.rates,
    data: format(res.data.date, 'DD.MM.YYYY'),
    baseCurrency : res.data.base
  }
  }))
  .catch(err => dispatch({type : 'FETCH_CURRENCY_ERROR', payload : err}))
  
})
export const getCrossCourseFromFixer = (from, to, amount) => store.dispatch(dispatch => {
  console.log(from, to, amount)
  const api = new Api();
  const endpoint = keyData.endpoint;
  const key = keyData.key;
  api.getCrossCurrency(endpoint, key , {from, to, amount})
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
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
