import styled from "styled-components";
import pinkCandy from "../../media/pink-candy.svg";
import { MintPageContainer, MintFormHeaderTitle, MintFormHeaderCandy, SubmitButton, } from "../mint/MintPage";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Nude__factory } from "../../typechain/factories/Nude__factory";
import useWallet from "../../hooks/useWallet";
import { ethers } from "ethers";
import arrow from "../../media/arrow.svg";
import candylogo from "../../media/candylogo.svg";

const NudeTitle = styled(MintFormHeaderTitle)`
  color: #dc68f9;
`;

const NudeSwapContainer = styled(MintPageContainer) <{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#fef4fb")};
  border: 6px dotted #dc68f9;
  padding: 50px;
  height: 80%;
  width: 80%;
  border-radius: 50px;
  margin-bottom: 50px;
  @media(max-width: 768px) {
    padding: 20px;
  }
`;

const PageContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputGrid = styled.div<{ $isDarkMode: boolean }>`
  display: grid;
  grid-template-columns: 0.8fr 1.5fr 0.5fr;
  align-items: center;
  justify-items: start;
  align-content: center
  padding: 5px;
  width: 100%;
  height: 80px;
  border-radius: 5px;
  padding-left: 10px;
  background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#ffffff")};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "#000000")};
  font-size: 20px;
  font-family: Poppins, Open Sans;
  font-weight: bold;
  border: 1px solid #cc00ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media(max-width: 768px) {
    grid-template-columns: 1fr 1fr;
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

const Label = styled.h3`
  font-size: 26px;
  margin: 2px;
  @media(max-width: 768px) {
    font-size: 18px;
  }
`;

const InputDiv = styled.div<{ $isSellActive: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.$isSellActive ? "column-reverse" : "column")};
`;

const ToggleDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;


const TransferButton = styled(SubmitButton)`
  width: 50%;
  padding: 20px;
  margin-top: 35px;
`;

const Arrow = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 10px;
  position: relative;
  left: 48%;
  top: 20px;
@media(max-width: 768px) {
    width: 32px;
    left: 50%;
    top: 15px;
}
`;

const BuyTokenButton = styled(SubmitButton) <{ $isBuyActive: boolean }>`
  width: 48%;
  padding: 20px;
  margin: 0;
  border-radius: 6px 0px 0px 6px;
  box-shadow: none;
  background-color: #cc00ff;
  background-color: ${(props) => props.$isBuyActive ? "#cc00ff" : "#EDC7E7"}; 
  @media(max-width: 768px) {
    font-size: 18px;
  }
`;

const SellTokenButton = styled(SubmitButton) <{ $isSellActive: boolean }>`
  width: 48%;
  padding: 20px;
  margin: 0;
  border-radius: 0px 6px 6px 0px;
  box-shadow: none;
  background-color: ${(props) => (props.$isSellActive ? "#cc00ff" : "#EDC7E7")};
  @media(max-width: 768px) {
    font-size: 18px;
  }
`;

const TokenDropInput = styled.input<{ $isDarkMode: boolean }>`
  font-size: 24px;
  font-family: Poppins, Open Sans;
  font-weight: bold;
  border: none;
  background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#ffffff")};
  @media(max-width: 768px) {
    font-size: 16px;
  }
`;

const TokenAmountInput = styled.input<{ $isDarkMode: boolean }>`
  font-size: 24px;
  font-family: Poppins, Open Sans;
  font-weight: bold;
  border: none;
  background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#ffffff")};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "#000000")};
  @media(max-width: 768px) {
    font-size: 18px;
  }
`;

const MaxButton = styled(SubmitButton)`
  width: 50%;
  margin: 0px;
  position: relative;
  left: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CandyLogo = styled.img`
  width: 30px;
  height: 30px;
  padding: 5px;
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const NudeLogo = styled.div`
  display: flex;
  align-items: center;
`;

export default function BuyTokensPage() {
    const [price, setPrice] = useState("0");
    const [isBuyActive, setBuyIsActive] = useState(false);
    const [isSellActive, setSellIsActive] = useState(false);

    const handleBuyClick = () => {
        setBuyIsActive(!isBuyActive);
        setSellIsActive(false);
    };

    const handleSellClick = () => {
        setSellIsActive(!isSellActive);
        setBuyIsActive(false);
    };

    const isDarkMode = useAppSelector((state) => state.app.isDarkMode);

    const { provider, signer } = useWallet();

    const handleSubmit = async () => {
        const nudeContract = Nude__factory.connect(
            process.env.NUDE_ADDRESS,
            provider
        );
        const nudeWithSigner = nudeContract.connect(signer);
        try {
            // todo: implement getTokenRate in co   ntract
            const tokenRate = 10;
            const tx = await nudeWithSigner.buyTokens(price, {
                value: ethers.utils.parseEther(price).div(tokenRate),
            });
            console.log(tx);
            // todo: implement user-friendly ux
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PageContainer>
            <NudeTitle>
                {" "}
        $Nude Swap
                <MintFormHeaderCandy src={pinkCandy} />
            </NudeTitle>
            <NudeSwapContainer $isDarkMode={isDarkMode}>
                <ToggleDiv>
                    <Label>Choose:</Label>
                    <ToggleContainer $isDarkMode={isDarkMode}>
                        <BuyTokenButton onClick={handleBuyClick} $isBuyActive={isBuyActive}>Buy Tokens</BuyTokenButton>
                        <SellTokenButton onClick={handleSellClick} $isSellActive={isSellActive}>Sell Tokens</SellTokenButton>
                    </ToggleContainer>
                </ToggleDiv>
                <InputDiv $isSellActive={isSellActive}>
                    <div>
                        <Label>From:</Label>
                        <InputGrid $isDarkMode={isDarkMode}>
                            <TokenDropInput $isDarkMode={isDarkMode} placeholder="&#128269; Search" type="text" />
                            <TokenAmountInput $isDarkMode={isDarkMode} type="number" value="1" min="1"  max="100000000"/>
                            <MaxButton>Max</MaxButton>
                        </InputGrid>
                    </div>
                    <Arrow src={arrow} />
                    <div>
                        <Label>To:</Label>
                        <InputGrid $isDarkMode={isDarkMode}>
                            <NudeLogo>
                                <Label>$NUDE </Label>
                                <CandyLogo src={candylogo} alt="logo" /> 
                            </NudeLogo>
                            <TokenAmountInput $isDarkMode={isDarkMode} type="number" value="0.01" step="0.01" max="100000000" min="0" />
                        </InputGrid>
                    </div>
                </InputDiv>
                <TransferButton onClick={handleSubmit}>Transfer</TransferButton>
            </NudeSwapContainer>
        </PageContainer>
    );
}