import React, {useState, useEffect} from "react";
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { Table } from './components/Table/Table';
import { Input } from './components/Input/Input';
import { keyData } from "./components/Api/Apikey";
import { getCurrencyFromFixer } from './actions/index'
import styled from "styled-components";
import Api from "./components/Api/index";
import "./App.css";

const state = store.getState();
const mapDispatchToProps = (dispatch) => {
  getCurrencyFromFixer
}

// which props do we want to inject, given the global store state?
const mapStateToProps=(state)=>{
  return {};
}
  

const App = ({ store }) => {
  const [currency, putCurrency] = useState([]);
  const [data, changeData] = useState([]);
  const [baseCurrency, changeBaseCurrency] = useState(null)

  //ask to get first data

  
  //useEffect as didMount
  useEffect(data => {
    const result = (getCurrencyFromFixer());
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
  </div>)
};
  


export default connect(null, mapDispatchToProps)(App);




