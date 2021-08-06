import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const MintPageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: black;
`;

export default function MintPage() {
    return (
        <>
            <Navbar />
            <MintPageContainer>
                <h1>Mint Page!</h1>
            </MintPageContainer>
        </>
    );
};