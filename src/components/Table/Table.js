import React from "react";
import format from 'date-fns/format';

export const Table = ({ data, currency, dateByConvert, currencyByDate }) => {
  console.log(Object.values(currencyByDate))
  const AdditionalTh = () => {
    return(
      <>
      {Object.entries(currencyByDate).map((item,index)=> 
        <tr key={index}>
          <td>{item[0]}</td>
          <td>{Math.round(item[1]*100)/100}</td>
        </tr>
      )}
      </>
    )
  }
  console.log(AdditionalTh)
  if (!dateByConvert || !currencyByDate) {
    return(
        <table>
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
    ) } else {
    return(
      <table>
        
      <thead>
      <h4 style={{
          textAlign: 'center',
          color : 'tomato'
        }}>Convert by {format(dateByConvert, 'Do [of] MMMM YYYY')}</h4>
          <tr>
            <th>Currency</th>
            <th>Rating by today</th>
            <th>Rating by {format(dateByConvert, "ddd.MMM.YYYY")}</th> {/*inposible adding icons with arrows (more/less) */}

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
  )}
}