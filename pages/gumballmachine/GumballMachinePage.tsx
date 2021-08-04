import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const GumballMachinePageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function GumballMachinePage() {
    return (
        <>
            <Navbar />
            <GumballMachinePageContainer>
                <h1>Gumball Machine!</h1>
            </GumballMachinePageContainer>
        </>
    );
};