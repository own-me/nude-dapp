import React from "react";
import styled from "styled-components";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { useAppSelector } from "./redux/hooks";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import AuctionHousePage from "./pages/auctionhouse/AuctionhousePage";
import GumballMachinePage from "./pages/gumballmachine/GumballMachinePage";
import Navbar, { TOTAL_HEIGHT } from "./components/Navbar";
import MintPage from "./pages/mint/MintPage";
import NftPage from "./pages/nft/NftPage";

const MainContainer = styled.div<{ $isLoggedIn: boolean, $isDarkMode: boolean }>`
    height: calc(100% - ${props => props.$isLoggedIn ? TOTAL_HEIGHT : 0}px);
    margin-top: ${props => props.$isLoggedIn ? TOTAL_HEIGHT : 0}px;
    width: 100%;
    overflow-y: auto;
    position: relative;
    background-color: ${props => props.$isDarkMode ? props.theme.dark.backgroundColor : props.theme.light.backgroundColor};
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};
    transition: background 500ms ease-in, color 500ms ease-in;
`;

export default function Main() {
    const loggedIn = useAppSelector(state => state.user.loggedIn);
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const location = useLocation();

    return (
        <MainContainer $isLoggedIn={loggedIn} $isDarkMode={isDarkMode}>
            {loggedIn && <Navbar />}
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="/candyshop" element={
                    loggedIn ? <MintPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/auctionhouse" element={
                    loggedIn ? <AuctionHousePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/gumballmachine" element={
                    loggedIn ? <GumballMachinePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/mint" element={
                    loggedIn ? <MintPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/nft/:tokenId" element={
                    loggedIn ? <NftPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/:name" element={
                    loggedIn ? <ProfilePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path="/" element={
                    loggedIn ? <HomePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
            </Routes>
        </MainContainer>
    );
}