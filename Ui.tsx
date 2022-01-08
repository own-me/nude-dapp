import React from 'react'
import styled from 'styled-components';

const UiContainer = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
`;

const WalletButton = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 22px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: pointer;
    float: right;

    :hover {
        background-color: #fb5de1;
    }
`;

const Ui = (props) => {
    return (
        <UiContainer>
            <WalletButton type="button">
                {999.89} NUDE
            </WalletButton>
        </UiContainer>
  )
}

export default Ui;