import React from "react";
import styled from "styled-components";
import { fetchNudeABI, fetchNudeNftABI } from "../lib/helpers";
import { ethers } from "ethers";
import useWallet from "../hooks/useWallet";

const SendTxButtonContainer = styled.button`
    color: purple;
`;

export default function SendTxButton() {
    const { balance, address, provider, signer } = useWallet();

    const handleClick = async () => {
        const abi = await fetchNudeABI();
        const nudeContract = new ethers.Contract("0x74676f69CEC3ba0D0e13011579781EF1481CAa34", abi.abi, provider);
        const nudeWithSigner = nudeContract.connect(signer);
        const nude = ethers.utils.parseUnits("10.0", 18);
        const tx = nudeWithSigner.transfer("0xaE19479192c4021502cC64211D3De2F71D1e6076", nude);
    }

    return (
        <SendTxButtonContainer onClick={handleClick}>
            Send Tx
        </SendTxButtonContainer>
    );
};