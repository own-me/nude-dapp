import styled from "styled-components";
import pinkCandy from "../../media/pink-candy.svg";
import { MintPageContainer, MintFormHeader, MintFormHeaderTitle, MintFormHeaderCandy, SubmitButton } from "../mint/MintPage";
import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import { Nude__factory } from "../../typechain/factories/Nude__factory";
import useWallet from "../../hooks/useWallet";
import { ethers } from "ethers";

const BuyTokensPageContainer = styled(MintPageContainer)``;

export default function BuyTokensPage() {
    const [price, setPrice] = useState("0");

    const { provider, signer } = useWallet();

    const handleSubmit = async () => {
        const nudeContract = Nude__factory.connect(process.env.NUDE_ADDRESS, provider);
        const nudeWithSigner = nudeContract.connect(signer);
        try {
            // todo: implement getTokenRate in contract
            const tokenRate = 10;
            const tx = await nudeWithSigner.buyTokens(price, { value: ethers.utils.parseEther(price).div(tokenRate) });
            console.log(tx);
            // todo: implement user-friendly ux
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <BuyTokensPageContainer>
            <MintFormHeader>
                <MintFormHeaderTitle>Buy Nude</MintFormHeaderTitle>
                <MintFormHeaderCandy src={pinkCandy} />
            </MintFormHeader>
            <FormInput
                type="number"
                label="Amount of NUDES to buy"
                onChange={(e) => setPrice(e.target.value)}
                errorMessage="Price is required."
                min={0}
            />
            <SubmitButton onClick={handleSubmit}>BUY</SubmitButton>
        </BuyTokensPageContainer>
    );
}
