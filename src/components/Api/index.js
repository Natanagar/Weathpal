import React from "react";
import axios from "axios";
import { store } from '../../index';
import {keyData} from "./Apikey";


class Api {
  constructor(endpoint, key, nextEndpoint) {
    this.endpoint = endpoint;
    this.nextEndpoint = nextEndpoint;
    this.key = key;
  }

  getData = async (endpoint, key) => {
    return await axios.get(`${endpoint}/latest?access_key=${key}`);
  };
  //https://data.fixer.io/api/convert
    //? access_key = API_KEY
    //& from = GBP
    //& to = JPY
    //& amount = 25
  getCrossCurrency = async (endpoint, key, {from, to, amount} ) => {
    console.log(endpoint)
    console.log(`${endpoint}convert`)
    return await axios.get(`${endpoint}/convert?access_key=${key}`, {
      params: {
        '&from' : {from},
        '&to' : {to},
        '&amount' : {amount}
      }
  })}

  //http://data.fixer.io/api/2013-12-24
  //? access_key = API_KEY
  //& base = GBP
  //& symbols = USD,CAD,EUR
  getCurrencyByDate = async (nextEndpoint, date) => {
    return await axios.get(`${nextEndpoint}`)
  }
}


export default Api;

//https://data.fixer.io/api/convert?access_key=ebad364e6eba547a0daee933c19ce18c&from=GBP&to=JPY&amount=25