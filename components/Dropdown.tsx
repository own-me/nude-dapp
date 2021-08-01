import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
    padding: 40px 40px 20px 40px;
    background: #FDE5FE;
    color: black;
    position: fixed;
    top: 95px;
    right: 5px;
    align-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid #FECDFF;
`;

export default function Dropdown({ children }) {
    return (
        <DropdownContainer>
            {children}
        </DropdownContainer>
    );
};