import React, { useState } from "react";
import { connect } from 'react-redux';
import { InputAutocomplete } from '../Autocomplete/Autocomplete';
import FontAwesome from 'react-fontawesome';
import { store } from '../../index';
import { getCrossCourseFromFixer } from '../../index'

import Api from '../Api/index';
import { keyData } from '../Api/Apikey';
import { Button } from '../Button/Button';
import { Footer } from '../Table/Footer'
import { Amount } from '../Autocomplete/Amount';
import format from 'date-fns/format';



const Input = ({ data, currency, baseCurrency, dispatch, getExchange }) => {
    console.log(getExchange)
    const[currencyFrom, changeCurrencyFrom]= useState(null)
    const[currencyTo, changeCurrencyTo]=useState(null)
    
    //there are two different function with the same contects. 
    //it made for different autocomplete, get value from different component

    const getAmountFromInput = (amount, event, dispatch) => {
        store.dispatch({ type : 'AUTOCOMPLETE_SELECTED_AMOUNT', amount })
    }
    const getFrom = (from, event) => {
        console.log(from)
        store.dispatch({ type: 'AUTOCOMPLETE_SELECTED_CURRENCY_FROM',from })
    }
    const getTo = (to, event) => {
        console.log(to)
        store.dispatch({ type: 'AUTOCOMPLETE_SELECTED_CURRENCY_TO', to})
    }
    console.log(`currency from ${currencyFrom}`)
    console.log(`currency to ${currencyTo}`)
    
    return(   
        <div className="form">         
            <form className="form-field">
                <section className="form-field-amount">
                <InputAutocomplete
                from={true}
                getFrom={getFrom}
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
                from={false}
                getTo={getTo}
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
const mapDispatchToProps = dispatch => ({
    getExchange : ()=>dispatch(getCrossCourseFromFixer),
  })

export default connect(null, mapDispatchToProps)(Input);