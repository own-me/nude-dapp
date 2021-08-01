import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import UserBadge from "./UserBadge";
import WalletBalance from "./WalletBalance";
import LogoutButton from "./LogoutButton";
import SendTxButton from "./SendTxButton";
import useWallet from "../hooks/useWallet";
import { formatEth } from "../lib/helpers";

const AccountButtonContainer = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 22px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    margin-left: 50px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`;

export default function AccountButton() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { balance, address } = useWallet();

    const formattedBalance = useMemo(() => formatEth(balance), [balance]);

    return (
        <>
            <AccountButtonContainer type="button" onClick={() => setIsOpen(!isOpen)}>
                {formattedBalance} NUDE
            </AccountButtonContainer>
            {
                isOpen &&
                <Dropdown>
                    <UserBadge />
                    <WalletBalance />
                    <LogoutButton />
                    <SendTxButton />
                </Dropdown>
            }
        </>
    );
};