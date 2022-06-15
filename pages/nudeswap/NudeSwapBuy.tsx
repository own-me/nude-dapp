import React, { memo, useCallback, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import { Nude__factory } from "../../typechain/factories/Nude__factory";
import { BigNumber, ethers } from "ethers";
import useWallet from "../../hooks/useWallet";
import NudeLogoText from "../../components/NudeLogoText";
import MaticLogoText from "../../components/MaticLogoText";

const NudeSwapBuyContainer = styled.div<{ $isDarkMode: boolean }>`
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

const BuyInput = styled.input<{ $isDarkMode: boolean }>`
    font-size: 24px;
    font-family: Poppins, Open Sans;
    border: none;
    text-align: right;
    background-color: ${(props) => (props.$isDarkMode ? "#1b0028" : "#ffffff")};
    margin-right: 15px;

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
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    cursor: pointer;  
`;

const BuyOutput = styled.div<{ $isDarkMode: boolean }>`
    font-size: 24px;
    text-align: center;

    @media(max-width: ${props => props.theme.breakpoints.mobile}px) {
        font-size: 18px;
    }
`;

const SubmitButton = styled.button<{ $disabled?: boolean }>`
    width: 100%;
    margin: 20px;
    background: #FF81EB;
    border: 1px solid #707070;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    color: white;
    padding: 8px 25px;
    font-family: Poppins, Open Sans;
    font-size: 20px;
    cursor: pointer;
    opacity: ${props => props.$disabled ? 0.8 : 1};

    :hover{
        background: #ff44e6;  
    }

    ${props => props.$disabled && css`
        cursor: not-allowed;
        :hover{
            background: #f455fa;  
        }
    `}
`;

const Footer = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;  
`;
const tokenRate = ethers.utils.parseUnits("0.1", 18);

const NudeSwapBuy = memo(() => {
    const { provider, signer, balance } = useWallet();
    const isDarkMode = useAppSelector((state) => state.app.isDarkMode);

    const [buyInput, setBuyInput] = React.useState<BigNumber>(ethers.BigNumber.from(0));
    const [buyOutput, setBuyOutput] = React.useState<BigNumber>(ethers.BigNumber.from(0));

    const isBuyValid = useMemo(() => balance && buyInput.lte(balance), [balance, buyInput]);

    const handleBuyInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setBuyInput(ethers.utils.parseUnits(e.target.value, 18));
    }, []);

    useEffect(() => {
        setBuyOutput(buyInput.div(tokenRate));
    }, [buyInput]);

    const handleSubmit = useCallback(async () => {
        if (isBuyValid) {
            try {
                const nudeContract = Nude__factory.connect(
                    process.env.NUDE_ADDRESS,
                    provider
                );
                const nudeWithSigner = nudeContract.connect(signer);
                // todo: implement getTokenRate in contract
                const tx = await nudeWithSigner.buyTokens(buyOutput, {
                    value: buyInput,
                });
                console.log(tx);
                // todo: implement user-friendly ux
            } catch (error) {
                console.error(error);
            }
        }
    }, [buyInput, buyOutput, isBuyValid, provider, signer]);

    return (
        <NudeSwapBuyContainer $isDarkMode={isDarkMode}>
            <Label>Sell $MATIC</Label>
            <InputContainer $isDarkMode={isDarkMode}>
                <MaticLogoText />
                <InnerInputDiv>
                    <BuyInput
                        $isDarkMode={isDarkMode}
                        type="number"
                        placeholder="0.01"
                        onChange={handleBuyInputChange}
                        min={0}
                    />
                    <MaxButton>Max</MaxButton>
                </InnerInputDiv>
            </InputContainer>
            <Label>Receive $NUDE</Label>
            <InputContainer $isDarkMode={isDarkMode}>
                <NudeLogoText />
                <BuyOutput $isDarkMode={isDarkMode}>{buyOutput.toString()}</BuyOutput>
            </InputContainer>
            <Footer>
                <SubmitButton onClick={handleSubmit} $disabled={isBuyValid}>BUY NUDE</SubmitButton>
            </Footer>
        </NudeSwapBuyContainer>
    );
});

export default NudeSwapBuy;