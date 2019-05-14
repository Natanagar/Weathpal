import React from "react";
import axios from "axios";
import {keyData} from "./Apikey";

class Api {
  constructor(endpoint, key) {
    this.endpoint = endpoint;
    this.key = key;
  }

  //http://data.fixer.io/api/latest?access_key=ebad364e6eba547a0daee933c19ce18c
  getData = async (endpoint, key) => {
    return await axios.get(`${endpoint}/latest?access_key=${key}`);
  };
  //https://data.fixer.io/api/convert
    //? access_key = API_KEY
    //& from = GBP
    //& to = JPY
    //& amount = 25
  getCrossCurrency = async (endpoint, key, {from, to, amount} ) => {
    return await axios.get(`${endpoint}/convert`, {
      params: {
        '?access_key' : {key},
        '&from' : {from},
        '&to' : {to},
        '&amount' : {amount}
      }
  })}
}
export default Api;