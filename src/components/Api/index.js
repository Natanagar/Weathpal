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
 // https://api.exchangeratesapi.io/latest?symbols=USD,GBP
  getCrossCurrency = async (endpoint) => {
    return await axios.get(endpoint);
  }

  //http://data.fixer.io/api/2013-12-24
  //? access_key = API_KEY
  //& base = GBP
  //& symbols = USD,CAD,EUR
  getCurrencyByDate = async (nextEndpoint, date) => {
    return await axios.get(`${nextEndpoint}`)
  }
}


export default Api;

