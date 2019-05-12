import React from "react";
import { InputAutocomplete } from '../Autocomplete/Autocomplete'
import FontAwesome from 'react-fontawesome';

import { Button } from '../Button/Button';
import { Amount } from '../Autocomplete/Amount'
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
                <Amount />
                </section>
                <section className="form-field-to">
                <InputAutocomplete
                currency={currency}
                />
                </section>
                <section>
                    <Button />
                </section>
            </form>
        </div>
    )
}