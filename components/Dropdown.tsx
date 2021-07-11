import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
    padding: 50px 30px;
    background: white;
    color: black;
    position: fixed;
    top: 90px;
    right: 0;
    align-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function Dropdown({ children }) {
    return (
        <DropdownContainer>
            {children}
        </DropdownContainer>
    );
};