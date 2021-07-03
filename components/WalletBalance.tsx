import React from "react";
import styled from "styled-components";
import useWallet from "../hooks/useWallet";

const WalletBalanceContainer = styled.div`
    color: purple;
`;

export default function WalletBalance() {
    const { balance, address } = useWallet();

    return (
        <WalletBalanceContainer>
            {balance}
            {address}
        </WalletBalanceContainer>
    );
};