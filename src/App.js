import React, {useState, useEffect} from "react";
import format from 'date-fns/format';
import { Table } from './components/Table/Table';
import { Input } from './components/Input/Input';
import { keyData } from "./components/Api/Apikey";
import styled from "styled-components";
import Api from "./components/Api/index";
import "./App.css";

const App = () => {
  const [currency, putCurrency] = useState([]);
  const [data, changeData] = useState([]);
  const [baseCurrency, changeBaseCurrency] = useState(null)

  //ask to get first data

  const getDataFromFixer = () => {
    const api = new Api();
    const endpoint = keyData.endpoint;
    const key = keyData.key;
    api.getData(endpoint, key).then(res => {
      const result = res.data.rates,
      day = res.data.date,
      basic = res.data.base;
      console.log(result);
      putCurrency(result);
      changeData(day);
      changeBaseCurrency(basic)
    })
    .catch(error => console.log(error));
  };
  //useEffect as didMount
  useEffect(data => {
    const result = getDataFromFixer();
  } ,[]);
  
  return(
    <div className="App">
    <h1>Currency exchange</h1>
    <Input 
    data={data}
    currency={currency}
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

export default App;
