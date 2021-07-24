import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import UserBadge from "./UserBadge";
import WalletBalance from "./WalletBalance";
import LogoutButton from "./LogoutButton";
import SendTxButton from "./SendTxButton";

const AccountButtonContainer = styled.button`
    height: 20px;
`;

export default function AccountButton() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <AccountButtonContainer type="button" onClick={() => setIsOpen(!isOpen)}>
                Account
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