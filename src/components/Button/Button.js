import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid grey;
  border-radius: 3px;

  ${props =>
    props.primary &&
    css`
      backround: blue;
    `}
`;

export const Button = ({data}) => {
    return(
        <>
            <StyledButton>{data}</StyledButton>
        </>
    )
    
}
