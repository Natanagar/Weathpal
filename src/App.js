import React, {useState, useEffect} from "react";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import {keyData} from "./components/Api/Apikey";
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
  
  return(<div className="App">
    Currency exchange
    <label htmlFor="currency"/>
    <form id="currency">
      <table>
        <section>Currency {format(data,'DD.MM.YYYY')}</section>
        <thead>
            <tr>
              <th>Currency</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
          {Object.entries(currency).map((item, index)=>
             <tr key={index}>
            
              <td style={{
                fontFamily: 'Noto Serif TC',
                textTransform : "uppercase",
                fontSize: '24px',
                fontWeight: '800',
                padding: '20px auto auto'
              }}> {item[0]}
              </td>
              <td>{Math.round(item[1]*100)/100}</td>
            </tr>
          )}
           </tbody>
        </table>
  
      <section>Exchanged by {baseCurrency}</section>
    </form>
  </div>);
};

export default App;
