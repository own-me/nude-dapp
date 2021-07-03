import React, { useMemo } from "react";
import styled from "styled-components";
import useWallet from "../hooks/useWallet";
import { shortenAddress, formatEth } from "../lib/helpers";

const WalletBalanceContainer = styled.div`
    color: purple;
`;

export default function WalletBalance() {
    const { balance, address } = useWallet();

    const formattedBalance = useMemo(() => formatEth(balance), [balance]);

    return (
        <WalletBalanceContainer>
            <p>{formatEth(balance)}</p>
            {shortenAddress(address)}
        </WalletBalanceContainer>
    );
};