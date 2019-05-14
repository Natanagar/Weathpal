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



const Input = ({ data, currency, baseCurrency, dispatch, getExchange, from, to, amount }) => {
    console.log(from, to, amount)
    const getAmountFromInput = (amount, event, dispatch) => {
        store.dispatch({ type : 'AUTOCOMPLETE_SELECTED_AMOUNT', amount })
    }
    
    
    return(   
        <div className="form">         
            <form className="form-field">
                <section className="form-field-amount">
                <InputAutocomplete
                from={true}
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
const mapStateToProps= ({ addSelectedCurrency }) =>{
    const {from, to, amount } = addSelectedCurrency; 
    console.log(from, to, amount) 
}
const mapDispatchToProps = dispatch => ({
    getExchange : ()=>dispatch(getCrossCourseFromFixer),
  })

export default connect(mapStateToProps, mapDispatchToProps)(Input);