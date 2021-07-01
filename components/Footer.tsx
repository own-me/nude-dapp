import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
    height: 50px;
    background: white;
    color: black;
    justify-content: center;
    display: flex;
`;

export default function Footer() {
    return (
        <FooterContainer>
            <p>Copyright 2021 Own Me</p>
        </FooterContainer>
    );
};