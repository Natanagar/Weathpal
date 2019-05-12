import React, { useState } from "react";
import { InputAutocomplete } from '../Autocomplete/Autocomplete'
import FontAwesome from 'react-fontawesome';

import { Button } from '../Button/Button';
import { Amount } from '../Autocomplete/Amount'
import format from 'date-fns/format';


export const Input = ({ data, currency }) => {
    const[currencyFrom, changeCurrencyFrom]= useState(null)
    const[currencyTo, changeCurrencyTo]=useState(null)
    const[amount, changeAmount]=useState(null)
    
    
    //there are two different function with the same contects. 
    //it made for different autocomplete, get value from different component

    const getAmount = (value) => {
        changeCurrencyFrom(value)
    }
    const getCurrencyFrom = (data, value) =>{
        console.log(data)
    }
    const getCurrencyTo = (data, event) => {
        changeCurrencyTo(data);
    }
    return(   
        <div className="form">         
            <form className="form-field">
                <section className="form-field-amount">
                <InputAutocomplete
                getCurrencyFrom={getCurrencyFrom}
                currencyFrom={currencyFrom}
                currency={currency}
                />
                </section>
                <section className="form-field-from">
                <Amount 
                getAmount={getAmount}
                />
                </section>
                <section className="form-field-to">
                <InputAutocomplete
                getCurrencyTo={getCurrencyTo}
                currency={currency}
                currencyTo={currencyTo}
                />
                </section>
                <section>
                    <Button />
                </section>
            </form>
        </div>
    )
}