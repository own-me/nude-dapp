import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import useWallet from "../hooks/useWallet";
import { formatEth, shortenAddress } from "../lib/helpers";
import { useAppSelector } from "../redux/hooks";
import { useAppDispatch } from "../redux/hooks";
import { setUserLoggedIn } from "../redux/slices/user";
import { Link } from "react-router-dom";

const AccountButtonTemplate = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 22px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    margin-left: 50px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: pointer;

    :hover {
        background-color: #fb5de1;
    }
`;

const AccountName = styled.div`
    font-family: Poppins, Open Sans;
    color: #282828;
    font-size: 24px;
`;

const AccountInfo = styled.div`
    font-family: Poppins, Open Sans;
    color: #282828;
    font-size: 18px;
    margin: 10px 0;
`;

const Divider = styled.hr`
    border-color: #FFB0F7;
`;

const EditProfileButton = styled(AccountButtonTemplate)`
    width: 100%;
    margin-left: 0;
    padding: 6px 10px;
    font-size: 16px;
    margin: 10px 0;
`;

const LogoutText = styled.div`
    font-family: Poppins, Open Sans;
    color: purple;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;

    :hover {
        color: #FFB0F7;
    }
`;

export default function AccountButton() {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { balance, address, network } = useWallet();
    const email = useAppSelector(state => state.user.email);
    const name = useAppSelector(state => state.user.name);

    const formattedBalance = useMemo(() => formatEth(balance), [balance]);
    const formattedAddress = useMemo(() => shortenAddress(address, 16), [address]);

    const handleLogout = () => {
        dispatch(setUserLoggedIn(false));
    };

    return (
        <>
            <AccountButtonTemplate type="button" onClick={() => setIsOpen(!isOpen)}>
                {formattedBalance} NUDE
            </AccountButtonTemplate>
            {
                isOpen &&
                <Dropdown>
                    <div>
                        <AccountName>{name}</AccountName>
                        <Divider />
                        <AccountInfo>{formattedAddress}</AccountInfo>
                        <AccountInfo>{email}</AccountInfo>
                        <Link to={`/${name}`}><EditProfileButton>Edit Profile</EditProfileButton></Link>
                    </div>
                    <br />
                    <LogoutText onClick={handleLogout}>
                        Logout
                    </LogoutText>
                </Dropdown>
            }
        </>
    );
};