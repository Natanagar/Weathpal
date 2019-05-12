import React from "react";
import format from 'date-fns/format';

export const Table = ({data, currency}) => {
    console.log(data)
    return(
        <table>
        <section id="title">
        Currency {format(data,'DD.MM.YYYY')}</section>
        <thead>
            <tr>
              <th>Currency</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
          {Object.entries(currency).map((item, index)=>
             <tr key={index}>
            
              <td style={{
                fontFamily: 'Noto Serif TC',
                textTransform : "uppercase",
                fontSize: '24px',
                fontWeight: '800',
                padding: '20px auto auto'
              }}> {item[0]}
              </td>
              <td>{Math.round(item[1]*100)/100}</td>
            </tr>
          )}
           </tbody>
        </table>
    )
}