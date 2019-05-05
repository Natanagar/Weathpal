import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Api from "./components/Api/index";
import "./App.css";

const App = () => {
  const [data, putData] = useState({});

  //ask to get first data

  const getDataFromFixer = data => {
    console.log(typeof Api.getData);
  };
  //useEffect as didMount
  useEffect(() => {
    getDataFromFixer();
  }, []);

  return (<div className="App">
    Currency exchange
    <label htmlFor="currency"/>
    <form id="currency">
      <ul/>
    </form>
  </div>);
};

export default App;
