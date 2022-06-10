import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Dropdown from "./../Dropdown";
import useWallet from "../../hooks/useWallet";
import { formatEth, shortenAddress } from "../../lib/helpers";
import { useAppSelector } from "../../redux/hooks";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/slices/user";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../../redux/slices/app";
import AvatarCircle from "./../AvatarCircle";
import defaultProfile from "../../media/defaults/missing-profile.png";
import { NETWORKS } from "../../lib/blockchain";

const BalanceButton = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 20px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: pointer;

    :hover {
        background-color: #fb5de1;
    }
`;

const AccountAddress = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 24px;
`;

const AccountInfo = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 18px;
    margin: 10px 0;
`;

const Divider = styled.hr`
    border-color: #FFB0F7;
`;

const EditProfileButton = styled(BalanceButton)`
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

export default function NavWallet() {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { balance, address, network } = useWallet();
    const email = useAppSelector(state => state.user.email);
    const name = useAppSelector(state => state.user.name);
    const profileImageUrl = useAppSelector(state => state.user.profileImageUrl);

    const formattedBalance = useMemo(() => formatEth(balance), [balance]);
    const formattedAddress = useMemo(() => shortenAddress(address, 16), [address]);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <>
            <BalanceButton type="button" onClick={() => setIsOpen(!isOpen)}>
                {network?.chainId === NETWORKS.polygonMumbai.chainId ? `${formattedBalance} NUDE` : "Wrong Network"}
            </BalanceButton>
            <AvatarCircle image={profileImageUrl || defaultProfile} onClick={() => setIsOpen(!isOpen)} />
            <Dropdown isOpen={isOpen}>
                <div>
                    <AccountAddress>{formattedAddress}</AccountAddress>
                    <Divider />
                    <AccountInfo>{name}</AccountInfo>
                    <AccountInfo>{email}</AccountInfo>
                    <Link to={`/${address}`}><EditProfileButton>Edit Profile</EditProfileButton></Link>
                    <Link to={"/buytokens"}><EditProfileButton>Buy Tokens</EditProfileButton></Link>
                    <Link to={"/mint"}><EditProfileButton>Mint NFTs</EditProfileButton></Link>
                    <EditProfileButton onClick={handleToggleDarkMode}>Toggle UI Mode</EditProfileButton>
                </div>
                <br />
                <LogoutText onClick={handleLogout}>
                    Logout
                </LogoutText>
            </Dropdown>
        </>
    );
}