import React from "react";
import { InputAutocomplete } from '../Autocomplete/Autocomplete'
import FontAwesome from 'react-fontawesome';

import { Button } from '../Button/Button'
import format from 'date-fns/format';


export const Input = ({ data, currency }) => {
    
    return(   
        <div className="form">         
            <form className="form-field">
                <section className="form-field-amount">
                <InputAutocomplete
                currency={currency}
                />
                </section>
                <section className="form-field-from">
                <label htmlFor="input"/>
                <input id="input" type="text" placeholder="From"></input>
                </section>
                <section className="form-field-to">
                <label htmlFor="input"/>
                <input id="input" type="text" placeholder="To"></input>
                </section>
                <section>
                    <Button />
                </section>
            </form>
        </div>
    )
}