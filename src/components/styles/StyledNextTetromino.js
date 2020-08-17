import styled from "styled-components";

export const StyledNextTetromino = styled.div`
  display: grid;
  grid-template-rows: repeat(
        ${props => props.height},
        calc(10vw / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    border-radius: 20px;
    width: 100%;
    max-width: 10vw;
    background: #111;
    padding: 20px;
    margin: 0 0 20px 0;

`;
