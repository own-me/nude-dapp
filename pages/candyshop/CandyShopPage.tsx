import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const CandyShopPageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function CandyShopPage() {
    return (
        <>
            <Navbar />
            <CandyShopPageContainer>
                <h1>Candy Shop!</h1>
            </CandyShopPageContainer>
        </>
    );
}