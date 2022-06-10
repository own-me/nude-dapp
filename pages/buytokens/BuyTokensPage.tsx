import styled from "styled-components";
import pinkCandy from "../../media/pink-candy.svg";
import { MintPageContainer, MintFormHeader, MintFormHeaderTitle, MintFormHeaderCandy, SubmitButton } from "../mint/MintPage";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Nude__factory } from "../../typechain/factories/Nude__factory";
import useWallet from "../../hooks/useWallet";
import { ethers } from "ethers";
import pinkarrow from "../../media/pinkarrow.svg";

const MintTitle = styled(MintFormHeaderTitle)`
  color: #dc68f9;
`;

const BuyTokensPageContainer = styled(MintPageContainer) <{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${props => props.$isDarkMode ? "#1b0028" : "#fef4fb"};
  border: 6px dotted #dc68f9;
  padding: 50px;
  height: 80%;
  width: 80%;
  border-radius: 50px;
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
`;

const Label = styled.label`
    text-align: left;
    display: block;
    font-size: 26px;
    padding: 10px 0px;
`;

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 20px 0px;
`;

const TransferButton = styled(SubmitButton)`
    width: 50%;
    padding: 20px;
`;

const PinkArrow = styled.img`
    width: 20px;
    height: 20px;
    margin: 10px;
    transform: rotate(-90deg);
    position: relative;
    left: 48%;
    margin-top: 30px;
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
            <MintTitle> $Nude Swap</MintTitle>
            <BuyTokensPageContainer $isDarkMode={isDarkMode}>
                <MintFormHeader>
                    <MintFormHeaderCandy src={pinkCandy} />
                </MintFormHeader>
                <Label>From:</Label>
                <InputContainer $isDarkMode={isDarkMode}></InputContainer>
                <PinkArrow src={pinkarrow} />
                <Label>To:</Label>
                <InputContainer $isDarkMode={isDarkMode}></InputContainer>
                {/* <FormInput
            type="text"
            label="From"
            onChange={(e) => setPrice(e.target.value)}
            errorMessage="Price is required."
            min={0}
          ></FormInput>
        <FormInput
          type="text"
          label="To"
          onChange={(e) => setPrice(e.target.value)}
          errorMessage="Price is required."
          min={0}
        ></FormInput> */}
                <ButtonDiv>
                    <TransferButton onClick={handleSubmit}>Transfer</TransferButton>
                </ButtonDiv>
            </BuyTokensPageContainer>
        </PageContainer >
    );
}