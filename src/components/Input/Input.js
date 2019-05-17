import React, { useCallback } from "react";
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { InputAutocomplete } from '../Autocomplete/Autocomplete';
import  { store } from '../../index';
import { getCrossCourse, getRatingByDate } from '../../actions/index';
import { Button } from '../Button/Button';
import { Footer } from '../Table/Footer';
import { Amount } from '../Autocomplete/Amount';
import { crossCourse, crossCourseTo } from '../utils/utils'




 
const Input = ({ data, currency, baseCurrency, 
    dispatch, getExchange, from, 
    to, amount, getByDate, items, rates, }) => {

    //after click need to stop propagation
    const stopBrowser = e => {
        e.preventDefault();
    }
    const calculatingSum = ( amount, from, to ) => {
        const {base, date, rates} = store.getState().getDataByDate.currency;
        const arrayWithValues = Object.entries(rates).map(item => 
            [].concat(item)
        )
        console.log(Number(arrayWithValues[0][1]));
        console.log(Number(arrayWithValues[1][1]));
        const resultFrom = (crossCourse(arrayWithValues[0][1], arrayWithValues[1][1]) * amount);
        const resultTo = (crossCourse(arrayWithValues[0][1], arrayWithValues[1][1]) * amount);
        (console.log(resultFrom, resultTo))
        
    }

    //fetching data with react-hooks (with ui)
    const CalculatingRating = ({ dispatch }) => {
        const handleRating = useCallback(
          () => {
            console.log(from, to)
            store.dispatch(getExchange(from, to));
            calculatingSum(amount, from, to)
          },
          [from, to],
        )
            return(
                <Button 
                onClick={handleRating(from,to)} 
                data={"calculate"} 
            />)
        
    }

    //put amount to store
    const getAmountFromInput = (amount, event, dispatch) => {
        amount = Number(amount)
        store.dispatch({ type : 'AUTOCOMPLETE_SELECTED_AMOUNT', amount })
    }
    const handleInputChange = (event, value) => {
        const date = format(event.target.value, 'YYYY-MM-DD')
        //dispatching data from
        store.dispatch({type : 'INPUT_ADDED_DATE', date})
        console.log(date)
        store.dispatch(getByDate(date))

    }
   
    
    return(   
        <div className="form">         
            <form className="form-field">
                <section className="form-field-amount">
                <InputAutocomplete
                direction={'Base currency'}
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
                direction={'Convert to'}
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
    const {date, currencyByDate, startFetching} = getDataByDate; 
   
    //start fetching for spinner
    return{
        items : items,
        from : from,
        to : to,
        amount : amount
      }
}
const mapDispatchToProps = dispatch => ({
    getExchange : ()=>dispatch(getCrossCourse),
    getByDate : ()=>dispatch(getRatingByDate)
  })

export default connect(mapStateToProps, mapDispatchToProps)(Input);