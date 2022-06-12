import React from "react";
import styled from "styled-components";
import matic from "./../media/matic.svg";

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Logo = styled.img`
    width: 30px;
    height: 30px;
    margin: 0px 10px;
`;

const LogoText = styled.div`
    font-size: 24px;

@media(max-width: 768px) {
    font-size: 18px;
}
`;


export default function MaticLogoText() {
    return (
        <MainContainer>
            <Logo src={matic} />
            <LogoText>$MATIC</LogoText>
        </MainContainer>
    );
}
