import React, { useCallback } from "react";
import { connect } from 'react-redux';
import { InputAutocomplete } from '../Autocomplete/Autocomplete';
import  { store } from '../../index';
import { getCrossCourse, getCurrencyFromFixerByDate } from '../../actions/index';
import { Button } from '../Button/Button';
import { Footer } from '../Table/Footer';
import { Amount } from '../Autocomplete/Amount';
import format from 'date-fns/format';



 
const Input = ({ data, currency, baseCurrency, 
    dispatch, getExchange, from, 
    to, amount, getByDate, items }) => {

    
    const stopBrowser = e => {
        e.preventDefault();
    }
   
    const CalculatingRating = ({ dispatch }) => {
        const handleRating = useCallback(
          () => {
            store.dispatch(getExchange(from, to));
          },
          [from, to],
        )
            return(
                <Button 
                onClick={handleRating(from,to)} 
                data={"calculate"} 
            />)
        
    }


    const getAmountFromInput = (amount, event, dispatch) => {
        amount = Number(amount)
        store.dispatch({ type : 'AUTOCOMPLETE_SELECTED_AMOUNT', amount })
    }
    const handleInputChange = (event, value) => {
        const date = format(event.target.value, 'YYYY-MM-DD')
        //dispatching data from
        store.dispatch({type : 'INPUT_ADDED_DATE', date})
        const result = getByDate(date)

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
                <section
                onClick={e=>stopBrowser(e)}>
                <CalculatingRating />
                </section>
                
            </form>
            <Footer 
            data={data}
            baseCurrency={baseCurrency}
            handleInputChange={handleInputChange}

            />
        </div>
    )
}
const mapStateToProps= ({ addSelectedCurrency, getDataByDate, getDataFromApi }) =>{
    const { items } = getDataFromApi;
    const {from, to, amount } = addSelectedCurrency; 
    const {date, currencyByDate, startFetching} = getDataByDate; //start fetching for spinner
    return{
        items : items,
        from : from,
        to : to,
        amount : amount
      }
}
const mapDispatchToProps = dispatch => ({
    getExchange : ()=>dispatch(getCrossCourse),
    getByDate : ()=>dispatch(getCurrencyFromFixerByDate)
  })

export default connect(mapStateToProps, mapDispatchToProps)(Input);