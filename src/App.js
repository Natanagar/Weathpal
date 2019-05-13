import React, {useState, useEffect, useReducer} from "react";
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { createReducer } from './components/utils/utils'

import { Table } from './components/Table/Table';
import { Input } from './components/Input/Input';
import { keyData } from "./components/Api/Apikey";
import { getCurrencyFromFixer } from '../src/index';
import { getCurrency, getCurrencyPending, getCurrencyError } from './reducers/appReducer' 


import { fetchCurrencyPending, fetchCurrencySuccess, fetchCurrencyError } from './actions/index'

import styled from "styled-components";
import Api from "./components/Api/index";
import "./App.css";


 

const App = ({ getCurrency, dispatch }) => {
  console.log(dispatch)
  const [currency, putCurrency] = useState([]);
  const [data, changeData] = useState([]);
  const [baseCurrency, changeBaseCurrency] = useState(null)

  //ask to get first data
 
  
  //useEffect as didMount
  useEffect((dispatch) => {
    const result = getCurrency();
  } ,[]);
  
  return(
    <div className="App">
    <h1>Currency exchange</h1>
    <Input 
    data={data}
    currency={currency}
    //getDataFromFixer={getDataFromFixer}
    />
    <label htmlFor="currency"/>
    <form id="currency">
     <Table 
     data={data}
     currency={currency} />
    <section>Exchanged by {baseCurrency}</section>
    </form>
  </div>
  )
}

// which props do we want to inject, given the global store state?
const mapStateToProps= state =>({
  error : getCurrencyError(state),
  items : getCurrency(state),
  pending : getCurrencyPending(state)
})

//const state = store.getState();
const mapDispatchToProps = dispatch => ({
  getCurrency : ()=>dispatch(getCurrencyFromFixer),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);




