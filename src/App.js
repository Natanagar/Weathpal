import React, {useState, useEffect} from "react";
import {keyData} from "./components/Api/Apikey";
import styled from "styled-components";
import Api from "./components/Api/index";
import "./App.css";

const App = () => {
  const [data, putData] = useState({});

  //ask to get first data

  const getDataFromFixer = () => {
    const api = new Api();
    const endpoint = keyData.endpoint;
    const key = keyData.key;
    api.getData(endpoint, key).then(res => res.data).then(json => putData(json.rates)).catch(error => console.log(error));
  };
  //useEffect as didMount
  useEffect(async data => (
    const result = await getDataFromFixer();
    console.log(result)
  ));

  return (<div className="App">
    Currency exchange
    <label htmlFor="currency"/>
    <form id="currency">
      <ul/>
    </form>
  </div>);
};

export default App;
