import React from 'react';
export const Footer = ({ data, baseCurrency }) => {
   
    return(
        <div>
            <h4>Figure out your request</h4>
            <div>Summ</div>
            <section>Currency from to {baseCurrency}</section>
            <section>Last update {data}</section>
        </div>
    )
} 