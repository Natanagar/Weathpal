import React, {useEffect} from "react";
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { createReducer } from './components/utils/utils'

import { Table } from './components/Table/Table';
import Input from './components/Input/Input';
import { keyData } from "./components/Api/Apikey";
import { getCurrencyFromFixer } from '../src/index';

import styled from "styled-components";
import Api from "./components/Api/index";
import "./App.css";


 

const App = ({ getCurrency, dispatch, items, data, baseCurrency, amount }) => { 
  
  //useEffect as didMount
  useEffect((dispatch) => {
    const result = getCurrency();
  } ,[]);
  
  return(
    <div className="App">
    <h1>Currency exchange by the {data}</h1>
    <Input 
    data={data}
    currency={items}
    baseCurrency={baseCurrency}
    />
    <label htmlFor="currency"/>
    <form id="currency">
     <Table 
     data={data}
     currency={items} />
    <section>Exchanged by {baseCurrency}</section>
    </form>
  </div>
  )
}

// which props do we want to inject, given the global store state?
const mapStateToProps= ({ getDataFromApi, addSelectedCurrency }) =>{
  const{ from, to, amount } = addSelectedCurrency;
  console.log(amount)
  const { data, items, baseCurrency } = getDataFromApi;
  return{
    data : data,
    items : items,
    baseCurrency : baseCurrency,
    amount : amount
  }
}

//const state = store.getState();
const mapDispatchToProps = dispatch => ({
  getCurrency : ()=>dispatch(getCurrencyFromFixer),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);




