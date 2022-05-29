import styled from "styled-components";
import pinkCandy from "../../media/pink-candy.svg";
import { MintPageContainer, MintFormHeader, MintFormHeaderTitle, MintFormHeaderCandy, SubmitButton } from "../mint/MintPage";
import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import { Nude_ADDRESS } from "../../lib/helpers";
import { Nude__factory } from "../../typechain/factories/Nude__factory";
import useWallet from "../../hooks/useWallet";
import { ethers } from "ethers";

const BuyTokensPageContainer = styled(MintPageContainer)``;

export default function BuyTokensPage() {
    const [price, setPrice] = useState("0");

    const { address, provider, signer } = useWallet();

    const handleSubmit = async () => {
        const nudeContract = Nude__factory.connect(Nude_ADDRESS, provider);
        const nudeWithSigner = nudeContract.connect(signer);
        try {
            const tx = await nudeWithSigner.buyTokens(price, { value: ethers.utils.parseEther(price).mul(0.1)});
            console.log(tx);
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
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
                errorMessage="Price is required."
                min={0}
            />
            <SubmitButton onClick = {handleSubmit}>BUY</SubmitButton>
        </BuyTokensPageContainer>
    );
}
