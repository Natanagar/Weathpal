import React from "react";
import axios from "axios";
import {keyData} from "./Apikey";

class Api {
  constructor(keyData) {
    this.endpoint = "http://data.fixer.io/api/";
    this.key = "ebad364e6eba547a0daee933c19ce18c";
  }

  //http://data.fixer.io/api/latest?access_key=ebad364e6eba547a0daee933c19ce18c
  getData = param => {
    return axios.get(`${this.endpoint}/latest?access_key=${this.key}`);
  };
}
export default Api;
