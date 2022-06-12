import React from "react";
import styled from "styled-components";
import candylogo from "./../media/candylogo.svg";

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Logo = styled.img`
    width: 30px;
    height: 30px;
    margin: 0px 10px;
    @media(max-width: 768px) {
        width: 20px;
        height: 30px;
        margin: 0px 5px;
    }
`;

const LogoText = styled.div`
    font-size: 24px;

@media(max-width: 768px) {
    font-size: 16px;
}
`;


export default function NudeLogoText() {
    return (
        <MainContainer>
            <Logo src={candylogo} />
            <LogoText>$NUDE</LogoText>
        </MainContainer>
    );
}
