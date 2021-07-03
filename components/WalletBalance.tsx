import React from "react";
import styled from "styled-components";
import useWallet from "../hooks/useWallet";
import { shortenAddress } from "../lib/helpers";

const WalletBalanceContainer = styled.div`
    color: purple;
`;

export default function WalletBalance() {
    const { balance, address } = useWallet();

    return (
        <WalletBalanceContainer>
            <p>{balance}</p>
            {shortenAddress(address)}
        </WalletBalanceContainer>
    );
};