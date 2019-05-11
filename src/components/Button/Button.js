import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  ${props =>
    props.primary &&
    css`
      backround: blue;
    `}
`;
export const Button = () => {
    return(
        <>
            <StyledButton>Calculate</StyledButton>
        </>
    )
    
}
