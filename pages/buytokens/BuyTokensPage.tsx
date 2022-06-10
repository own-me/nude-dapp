import styled from "styled-components";
import pinkCandy from "../../media/pink-candy.svg";
import { MintPageContainer, MintFormHeader, MintFormHeaderTitle, MintFormHeaderCandy, SubmitButton } from "../mint/MintPage";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Nude__factory } from "../../typechain/factories/Nude__factory";
import useWallet from "../../hooks/useWallet";
import { ethers } from "ethers";
import arrow from "../../media/arrow.svg";
import candylogo from "../../media/candylogo.svg";

const MintTitle = styled(MintFormHeaderTitle)`
  color: #dc68f9;
`;

const BuyTokensPageContainer = styled(MintPageContainer) <{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.$isDarkMode ? "#1b0028" : "#fef4fb"};
  border: 6px dotted #dc68f9;
  padding: 50px;
  height: 80%;
  width: 80%;
  border-radius: 50px;
  margin-bottom: 50px;
`;

const PageContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div<{ $isDarkMode: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 80px;
    border-radius: 5px;
    background-color: ${props => props.$isDarkMode ? "#1b0028" : "#ffffff"};
    color: ${props => props.$isDarkMode ? "#ffffff" : "#000000"};
    font-size: 20px;
    font-family: Poppins, Open Sans;
    font-weight: bold;
    border: 1px solid #cc00ff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ToggleContainer = styled.div<{ $isDarkMode: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: 100%;
    height: 80px;
    border-radius: 5px;
    background-color: ${props => props.$isDarkMode ? "#1b0028" : "#ffffff"};
    color: ${props => props.$isDarkMode ? "#ffffff" : "#000000"};
    font-size: 20px;
    font-family: Poppins, Open Sans;
    font-weight: bold;
    border: 1px solid #cc00ff;
    margin: 30px 0px;
    padding: 8px;
`;

const Label = styled.h3`
    text-align: left;
    display: block;
    font-size: 26px;
`;

const InputDiv = styled.div`
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
    top: 40px;
`;

const BuyToken = styled(SubmitButton)`
    width: 48%;
    padding: 20px;
    margin: 0;
    border-radius: 6px 0px 0px 6px;
    box-shadow: none;
`;

const SellToken = styled(SubmitButton)`
    width: 48%;
    padding: 20px;
    margin: 0;
    border-radius: 0px 6px 6px 0px;
    box-shadow: none;
    background-color: #EDC7E7;
`;
const TokenDropdown = styled.select`
    font-size: 24px;
    font-family: Poppins, Open Sans;
    font-weight: bold;
`;

const TokenAmoutnInput = styled.input`
    font-size: 24px;
    font-family: Poppins, Open Sans;
    font-weight: bold;
    border: none;
    `;

const MaxButton = styled(SubmitButton)`
    width: 22%;
    margin: 0px;
`;

const CandyLogo = styled.img`
    width: 40px;
    height: 40px;
`;

export default function BuyTokensPage() {
    const [price, setPrice] = useState("0");

    const isDarkMode = useAppSelector(state => state.app.isDarkMode);


    const { provider, signer } = useWallet();

    const handleSubmit = async () => {
        const nudeContract = Nude__factory.connect(
            process.env.NUDE_ADDRESS,
            provider
        );
        const nudeWithSigner = nudeContract.connect(signer);
        try {
            // todo: implement getTokenRate in contract
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
            <MintTitle> $Nude Swap
                <MintFormHeaderCandy src={pinkCandy} />
            </MintTitle>
            <BuyTokensPageContainer $isDarkMode={isDarkMode}>
                <ToggleContainer $isDarkMode={isDarkMode}>
                    <BuyToken onClick={handleSubmit}>
                        Buy Tokens
                    </BuyToken>
                    <SellToken onClick={handleSubmit}>
                        Sell Tokens
                    </SellToken>
                </ToggleContainer>
                <InputDiv>
                    <div>
                        <Label>From:</Label>
                        <InputContainer $isDarkMode={isDarkMode}>
                            <TokenDropdown>
                                <option value="0">Select Token</option>
                                <option value="1">Token 1</option>
                            </TokenDropdown>
                            <TokenAmoutnInput type="number" value="0.01" max="100000000" />
                            <MaxButton>Max</MaxButton>
                        </InputContainer>
                    </div>
                    <Arrow src={arrow} />
                    <div>
                        <Label>To:</Label>
                        <InputContainer $isDarkMode={isDarkMode}>
                            <Label>   <CandyLogo src={candylogo} alt="logo" />$NUDE </Label>
                            <TokenAmoutnInput type="number" value="0.01" />
                            <div> </div>
                        </InputContainer>
                    </div>
                </InputDiv>
                <TransferButton onClick={handleSubmit}>Transfer</TransferButton>

            </BuyTokensPageContainer>
        </PageContainer >
    );
}