import React from "react";
import styled from "styled-components";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { useAppSelector } from "./redux/hooks";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import AuctionHousePage from "./pages/auctionhouse/AuctionHousePage";
import GumballMachinePage from "./pages/gumballmachine/GumballMachinePage";
import Navbar, { TOTAL_HEIGHT } from "./components/nav/Navbar";
import MintPage from "./pages/mint/MintPage";
import NftPage from "./pages/nft/NftPage";
import PostPage from "./pages/posts/PostPage";
import SearchPage from "./pages/search/SearchPage";
import { Helmet } from "react-helmet";
import { routes } from "./lib/routes";
import NudeSwapPage from "./pages/nudeswap/NudeSwapPage";

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
        <MainContainer $isLoggedIn={loggedIn} $isDarkMode={isDarkMode} id="main-container">
            <Helmet>
                <title>Own Me | {routes[location.pathname]?.title || "App"}</title>
            </Helmet>
            {loggedIn && <Navbar />}
            <Routes>
                <Route path={routes.login.path} element={<LoginPage />} />
                <Route path={routes.register.path} element={<RegisterPage />} />
                <Route path={routes.candyshop.path} element={
                    loggedIn ? <MintPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.auctionhouse.path} element={
                    loggedIn ? <AuctionHousePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.gumballmachine.path} element={
                    loggedIn ? <GumballMachinePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.mint.path} element={
                    loggedIn ? <MintPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.nudeswap.path} element={
                    loggedIn ? <NudeSwapPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={`${routes.nft.path}:tokenId`} element={
                    loggedIn ? <NftPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={`${routes.home.path}:name`} element={
                    loggedIn ? <ProfilePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={`${routes.post.path}:postId`} element={
                    loggedIn ? <PostPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.home.path} element={
                    loggedIn ? <SearchPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
            </Routes>
        </MainContainer>
    );
}