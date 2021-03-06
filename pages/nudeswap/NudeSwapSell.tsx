import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import { Nude__factory } from "../../typechain/factories/Nude__factory";
import { ethers } from "ethers";
import useWallet from "../../hooks/useWallet";
import NudeLogoText from "../../components/NudeLogoText";
import MaticLogoText from "../../components/MaticLogoText";

const NudeSwapSellContainer = styled.div<{ $isDarkMode: boolean }>`
    padding: 5px;
    width: 100%;
    font-size: 20px;
`;

const Label = styled.h3`
    font-size: 26px;
    padding: 5px 0px;
    width: 100%;

    @media(max-width: ${props => props.theme.breakpoints.mobile}px) {
      font-size: 18px;
    }
`;

const InputContainer = styled.div<{ $isDarkMode: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    border-radius: 5px;
    padding: 5px 20px 5px 5px;
    background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#ffffff")};
    color: ${(props) => (props.$isDarkMode ? "#ffffff" : "#000000")};
    font-size: 20px;
    font-family: Poppins, Open Sans;
    font-weight: bold;
    border: 1px solid #cc00ff;
`;

const InnerInputDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

const SellInput = styled.input<{ $isDarkMode: boolean }>`
    font-size: 24px;
    font-family: Poppins, Open Sans;
    border: none;
    text-align: right;
    background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#ffffff")};

    @media(max-width: ${props => props.theme.breakpoints.mobile}px) {
        font-size: 18px;
    }
`;

const MaxButton = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 20px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 6px;
    margin-right: 5px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    cursor: pointer;
`;

const SellOutput = styled.div<{ $isDarkMode: boolean }>`
    font-size: 24px;
    text-align: center;

    @media(max-width: ${props => props.theme.breakpoints.mobile}px) {
        font-size: 18px;
    }
`;

const SubmitButton = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 24px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 20px 130px;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    cursor: pointer;
    
    @media(max-width: ${props => props.theme.breakpoints.mobile}px) {
        padding: 20px 113px;
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;  
`;

const NudeSwapSell = memo(() => {
    const { provider, signer } = useWallet();
    const isDarkMode = useAppSelector((state) => state.app.isDarkMode);

    const setSellAmount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }, []);

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
        <NudeSwapSellContainer $isDarkMode={isDarkMode}>
            <Label>Sell $NUDE</Label>
            <InputContainer $isDarkMode={isDarkMode}>
                <NudeLogoText />
                <InnerInputDiv>
                    <SellInput $isDarkMode={isDarkMode} type="number" placeholder="0.01" onChange={setSellAmount} />
                    <MaxButton>Max</MaxButton>
                </InnerInputDiv>
            </InputContainer>
            <Label>Receive $MATIC</Label>
            <InputContainer $isDarkMode={isDarkMode}>
                <MaticLogoText />
                <SellOutput $isDarkMode={isDarkMode}>123.11 </SellOutput>
            </InputContainer>
            <Footer>
                <SubmitButton onClick={handleSubmit}>SELL NUDE</SubmitButton>
            </Footer>
        </NudeSwapSellContainer>
    );
});

export default NudeSwapSell;