import React from 'react';
import axios from 'axios';
import { store } from '../../index';
import { keyData } from './Apikey';

class Api {
	constructor(endpoint, key, nextEndpoint, oldkey) {
		this.endpoint = endpoint;
		this.nextEndpoint = nextEndpoint;
		this.key = key;
		this.oldkey = oldkey;
	}
	//fetch data for first render
	getData = async (endpoint, key) => {
		return await axios.get(`${endpoint}/latest?access_key=${key}`);
	};
	// fetch data for cross-course
	getCrossCurrency = async (endpoint) => {
		return await axios.get(endpoint);
	};
	//fetch rating as at
	getCurrencyByDate = async (nextEndpoint, date) => {
		return await axios.get(`${nextEndpoint}`);
	};
	//fetch historical rating of currency
	getHistoricalRating = async (nextEndpoint) => {
		return await axios.get(`${nextEndpoint}`);
	};
}

export default Api;
