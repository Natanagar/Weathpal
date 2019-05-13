import React, { useState } from "react";
import { InputAutocomplete } from '../Autocomplete/Autocomplete'
import FontAwesome from 'react-fontawesome';

import Api from '../Api/index';
import { keyData } from '../Api/Apikey';
import { Button } from '../Button/Button';
import { Footer } from '../Table/Footer'
import { Amount } from '../Autocomplete/Amount';
import format from 'date-fns/format';


export const Input = ({ data, currency, baseCurrency }) => {
    
    const[currencyFrom, changeCurrencyFrom]= useState(null)
    const[currencyTo, changeCurrencyTo]=useState(null)
    const[amount, changeAmount]=useState(null)
    
    //there are two different function with the same contects. 
    //it made for different autocomplete, get value from different component

    const getAmountFromInput = (data, event) => {
        changeAmount(data)
    }
    const getCurrencyFrom = (data, event) =>{
        changeCurrencyFrom(data)
    }
    const getCurrencyTo = (data, event) => {
        console.log(data)
        changeCurrencyTo(data);
    }
    console.log(`currency from ${currencyFrom}`)
    console.log(`currency to ${currencyTo}`)
    console.log(`amount ${amount}`)
    return(   
        <div className="form">         
            <form className="form-field">
                <section className="form-field-amount">
                <InputAutocomplete
                getCurrencyFrom={getCurrencyFrom}
                currency={currency}
                />
                </section>
                <section className="form-field-from">
                <Amount 
                getAmountFromInput={getAmountFromInput}
                />
                </section>
                <section className="form-field-to">
                <InputAutocomplete
                getCurrencyTo={getCurrencyTo}
                currency={currency}
                />
                </section>
                <section>
                    {/* need to add some styles to button ex. styled.component */}
                    <Button style={{
                        width: '200px'}}
                    />
                </section>
            </form>
            <Footer 
            data={data}
            baseCurrency={baseCurrency}

            />
        </div>
    )
}