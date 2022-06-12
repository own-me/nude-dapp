import styled from "styled-components";
import { SubmitButton } from "../mint/MintPage";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import NudeSwapBuy from "./NudeSwapBuy";

const PageContainer = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = styled.h1`
    color: #dc68f9;
    font-family: Rock Salt, Open Sans;
    font-size: 40px;
`;

const NudeSwapContainer = styled.div<{ $isDarkMode: boolean }>`
    font-family: Poppins, Open Sans;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#fef4fb")};
    border: 5px dotted #dc68f9;
    padding: 35px;
    width: 30rem;
    height: 30rem;
    border-radius: 50px;

    @media(max-width: 768px) {
        padding: 20px;
        width: 85%;
    }
`;

const ToggleLabel = styled.h3`
    font-size: 26px;
    width: 100%;
    margin: 0px

    @media(max-width: 768px) {
        font-size: 18px;
    }
`;

const ToggleContainer = styled.div<{ $isDarkMode: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    border-radius: 5px;
    background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#ffffff")};
    color: ${(props) => (props.$isDarkMode ? "#ffffff" : "#000000")};
    font-size: 20px;
    font-family: Poppins, Open Sans;
    font-weight: bold;
    border: 1px solid #cc00ff;
    padding: 8px;
`;


const NudeBuyTab = styled(SubmitButton) <{ $isActive: boolean }>`
    width: 48%;
    padding: 20px;
    margin: 0;
    border-radius: 6px 0px 0px 6px;
    box-shadow: none;
    background-color: ${(props) => props.$isActive ? "#cc00ff" : "#EDC7E7"};

    @media(max-width: 768px) {
        font-size: 18px;
    }
`;


const NudeSellTab = styled(SubmitButton) <{ $isActive: boolean }>`
    width: 48%;
    padding: 20px;
    margin: 0;
    border-radius: 0px 6px 6px 0px;
    box-shadow: none;
    background-color: ${(props) => props.$isActive ? "#cc00ff" : "#EDC7E7"};

    @media(max-width: 768px) {
        font-size: 18px;
    }
`;

enum NudeSwapTabs {
    BUY = "BUY",
    SELL = "SELL"
}

export default function NudeSwapPage() {
    const isDarkMode = useAppSelector((state) => state.app.isDarkMode);

    const [activeTab, setActiveTab] = useState<NudeSwapTabs>(NudeSwapTabs.BUY);

    return (
        <PageContainer>
            <Header>$Nude Swap</Header>
            <NudeSwapContainer $isDarkMode={isDarkMode}>
                <ToggleLabel>Choose:</ToggleLabel>
                <ToggleContainer $isDarkMode={isDarkMode}>
                    <NudeBuyTab onClick={() => setActiveTab(NudeSwapTabs.BUY)} $isActive={activeTab === NudeSwapTabs.BUY}>Buy Tokens</NudeBuyTab>
                    <NudeSellTab onClick={() => setActiveTab(NudeSwapTabs.SELL)} $isActive={activeTab === NudeSwapTabs.SELL}>Sell Tokens</NudeSellTab>
                </ToggleContainer>
                {
                    activeTab === NudeSwapTabs.BUY && <NudeSwapBuy />
                }
                {
                    activeTab === NudeSwapTabs.SELL && <NudeSwapBuy />
                }
            </NudeSwapContainer>
        </PageContainer>
    );
}