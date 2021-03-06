import React from "react";
import styled from "styled-components";
import Canvas from "./Canvas";

const GumballMachinePageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function GumballMachinePage() {
    return (
        <GumballMachinePageContainer>
            <Canvas />
        </GumballMachinePageContainer>
    );
}