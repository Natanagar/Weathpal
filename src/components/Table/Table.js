import React from "react";

export const Table = ({data, currency}) => {
    console.log(data)
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
    )
}