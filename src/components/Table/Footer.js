import React, { useState } from 'react';
export const Footer = ({ data, baseCurrency, handleInputChange }) => {
   const [date, searchByDate] = useState(null)
    
    return(
        <div>
            <h4>Figure out your request</h4>
            <div>Summ</div>
            <section>Currency from to {baseCurrency}</section>
            <section>Last update {data}</section>
            <form>
                <section>
                    <h4>Compare currency rating</h4>
                </section>
                <label htmlFor="date" text="date">Currency by date</label>
                <br />
                <input 
                type="date"
                id="date" 
                defaultValue={date}
                className="form-control"
                onChange={handleInputChange }
                />
            </form>
        </div>
    )
} 