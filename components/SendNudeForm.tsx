import React, {useState} from "react";
import styled from "styled-components";
import { fetchNudeABI, fetchNudeNftABI } from "../lib/helpers";
import { ethers } from "ethers";
import useWallet from "../hooks/useWallet";

const SendButton = styled.button`
    color: purple;
    padding: 10px 20px;
    background-color: pink;
`;

const Input = styled.input`
    padding: 5px;
    border: 1px solid #ccc;
    margin: 5px;
`;

const RecieverInput = styled(Input)`

`

const AmountInput = styled(Input)`

`

export default function SendNudeForm() {
    const [recieverAddress, setRecieverAddress] = useState("");
    const [amount, setAmount] = useState("");
    const { balance, address, provider, signer } = useWallet();

    const handleSubmit = async () => {
        const abi = await fetchNudeABI();
        const nudeContract = new ethers.Contract("0x8B98D802bE562b2D0B9B7f63526CCa8f428Bb7C8", abi.abi, provider);
        const nudeWithSigner = nudeContract.connect(signer);
        const nude = ethers.utils.parseUnits(amount, 0);
        const tx = nudeWithSigner.transfer(recieverAddress, nude);
    }

    return (
        <>
            <RecieverInput placeholder="Reciver address" onChange={(e) => setRecieverAddress(e.target.value)}/>
            <AmountInput placeholder="Amount" onChange={(e) => setAmount(e.target.value)}/>
            <SendButton onClick={handleSubmit}>Send</SendButton>
        </>
    );
};