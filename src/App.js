import React, {useState, useEffect} from "react";
import {keyData} from "./components/Api/Apikey";
import styled from "styled-components";
import Api from "./components/Api/index";
import "./App.css";

const App = () => {
  const [currency, putCurrency] = useState({});

  //ask to get first data

  const getDataFromFixer = () => {
    const api = new Api();
    const endpoint = keyData.endpoint;
    const key = keyData.key;
    api.getData(endpoint, key).then(res => {
      const result = res.data.rates;
      console.log(result)
      putCurrency(result);
    })
    .catch(error => console.log(error));
  };
  //useEffect as didMount
  useEffect(data => {
    const result = getDataFromFixer();
  } ,[]);
  
  return(<div className="App">
    Currency exchange
    <label htmlFor="currency"/>
    <form id="currency">
    
      <div>Result {Object.values(currency)}</div>
      <ul/>
    </form>
  </div>);
};

export default App;
