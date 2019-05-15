import React, {useEffect} from "react";
import { connect } from 'react-redux';

import { Table } from './components/Table/Table';
import Input from './components/Input/Input';
import { getCurrencyFromFixer } from '../src/index';
import { sortingObject } from './components/utils/utils'

import "./App.css";


 

const App = ({ getCurrency, dispatch, items, 
  data, baseCurrency, amount, from, to,  
  dateByConvert, currencyByDate
}) => { 
  const calculatingRating =(event, from, to, amount, items) => {
    console.log("CLICK CLICK")
    const valueFrom = sortingObject(items, from)
    const valueTo = sortingObject(items, to)
  }
  //useEffect as didMount
  useEffect((dispatch) => {
    const result = getCurrency();
  } ,[]);
  
  return(
    <div className="App">
    <h1>Currency exchange by the {data}</h1>
    <Input
    calculatingRating={calculatingRating} 
    data={data}
    currency={items}
    baseCurrency={baseCurrency}
    />
    <label htmlFor="currency"/>
    <form id="currency">
     <Table
     dateByConvert={dateByConvert}
     currencyByDate={currencyByDate}
     data={data}
     currency={items} />
    <section>Exchanged by {baseCurrency}</section>
    </form>
  </div>
  )
}

// which props do we want to inject, given the global store state?
//we observe addSelectedCurrency reducer in input
const mapStateToProps= ({ getDataFromApi, addSelectedCurrency, getDataByDate }) =>{
  
  const{ from, to, amount } = addSelectedCurrency;
  const { date, currencyByDate, startFetching } = getDataByDate;
  const { data, items, baseCurrency } = getDataFromApi;
  
  return{
    dateByConvert : date,
    currencyByDate : currencyByDate,
    data : data,
    items : items,
    baseCurrency : baseCurrency,
    amount : amount,
    from : from, 
    to : to,
  }
}

//const state = store.getState();
const mapDispatchToProps = dispatch => ({
  getCurrency : ()=>dispatch(getCurrencyFromFixer),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);




