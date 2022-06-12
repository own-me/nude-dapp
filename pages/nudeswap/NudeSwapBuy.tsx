import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { SubmitButton } from "../mint/MintPage";
import { useAppSelector } from "../../redux/hooks";
import { Nude__factory } from "../../typechain/factories/Nude__factory";
import { ethers } from "ethers";
import useWallet from "../../hooks/useWallet";

const NudeSwapBuyContainer = styled.div<{ $isDarkMode: boolean }>`
    padding: 5px;
    width: 100%;
    font-size: 20px;
`;

const Label = styled.h3`
    font-size: 26px;
    margin: 2px;

    @media(max-width: 768px) {
      font-size: 18px;
    }
`;

const BuyInput = styled.input<{ $isDarkMode: boolean }>`
    font-size: 24px;
    font-family: Poppins, Open Sans;

    @media(max-width: 768px) {
        font-size: 18px;
    }
`;

const MaxButton = styled.button`

    @media (max-width: 768px) {
        display: none;
    }
`;

const BuyOutput = styled.div<{ $isDarkMode: boolean }>`
    font-size: 24px;

    @media(max-width: 768px) {
        font-size: 18px;
    }
`;

const NudeSwapBuy = memo(() => {
    const { provider, signer } = useWallet();
    const isDarkMode = useAppSelector((state) => state.app.isDarkMode);

    const setBuyAmount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
        <NudeSwapBuyContainer $isDarkMode={isDarkMode}>
            <Label>Sell $MATIC</Label>
            <BuyInput $isDarkMode={isDarkMode} type="number" placeholder="0.01" onChange={setBuyAmount} />
            <MaxButton>Max</MaxButton>
            <BuyOutput $isDarkMode={isDarkMode}>123.11 NUDE</BuyOutput>
            <button onClick={handleSubmit}>BUY</button>
        </NudeSwapBuyContainer>
    );
});

export default NudeSwapBuy;