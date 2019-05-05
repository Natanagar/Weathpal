import React from "react";
import axios from "axios";
import {api} from "./Apikey";

class Api {
  constructor() {
    this.api = api;
  }
  //http://data.fixer.io/api/latest?access_key=ebad364e6eba547a0daee933c19ce18c
  getData = param => {
    return axios.get(`${api.endpoint}/latest?access_key=${api.key}`, {
      params: {
        client_secret: `${api.key}`
      }
    });
  };
}
export default Api;
