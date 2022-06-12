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
    background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#fef4fb")};
    border: 4px dotted #dc68f9;
    padding: 50px;
    height: 80%;
    width: 80%;
    border-radius: 50px;
    margin-bottom: 50px;

    @media(max-width: 768px) {
        padding: 20px;
    }
`;

const ToggleLabel = styled.h3`
    font-size: 26px;
    width: 100%;

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
    margin: 10px 0px 30px 0px;
    padding: 8px;
`;


const NudeSwapTab = styled(SubmitButton) <{ $isActive: boolean }>`
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
                    <NudeSwapTab onClick={() => setActiveTab(NudeSwapTabs.BUY)} $isActive={activeTab === NudeSwapTabs.BUY}>Buy Tokens</NudeSwapTab>
                    <NudeSwapTab onClick={() => setActiveTab(NudeSwapTabs.SELL)} $isActive={activeTab === NudeSwapTabs.SELL}>Sell Tokens</NudeSwapTab>
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