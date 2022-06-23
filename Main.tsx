import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AuctionHousePage from "./pages/auctionhouse/AuctionHousePage";
import GumballMachinePage from "./pages/gumballmachine/GumballMachinePage";
import MintPage from "./pages/mint/MintPage";
import NftPage from "./pages/nft/NftPage";
import PostPage from "./pages/posts/PostPage";
import SearchPage from "./pages/search/SearchPage";
import NudeSwapPage from "./pages/nudeswap/NudeSwapPage";
import Navbar, { TOTAL_HEIGHT } from "./components/nav/Navbar";
import NotificationsManager from "./components/notifications/NotificationsManager";
import { routes } from "./lib/routes";
import { useGetInitialLoginInfoQuery } from "./api/user";
import { setInitialLoginInfo } from "./redux/slices/user";
import useWallet from "./hooks/useWallet";

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
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { address } = useWallet();
    const { isLoggedIn, token } = useAppSelector(state => state.user);
    const { isDarkMode } = useAppSelector(state => state.app);

    const {
        data: initialLoginInfoData,
        isSuccess: isGetInitialLoginInfoSuccess,
    } = useGetInitialLoginInfoQuery({ token }, {
        skip: !token || !address,
    });

    useEffect(() => {
        if (isGetInitialLoginInfoSuccess && initialLoginInfoData) {
            dispatch(setInitialLoginInfo(initialLoginInfoData));
        }
    }, [dispatch, initialLoginInfoData, isGetInitialLoginInfoSuccess]);

    return (
        <MainContainer $isLoggedIn={isLoggedIn} $isDarkMode={isDarkMode} id="main-container">
            <Helmet>
                <title>Own Me | {routes[location.pathname]?.title || "App"}</title>
            </Helmet>
            {isLoggedIn && <Navbar />}
            <NotificationsManager />
            <Routes>
                <Route path={routes.login.path} element={<LoginPage />} />
                <Route path={routes.register.path} element={<RegisterPage />} />
                <Route path={routes.candyshop.path} element={
                    isLoggedIn ? <MintPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.auctionhouse.path} element={
                    isLoggedIn ? <AuctionHousePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.gumballmachine.path} element={
                    isLoggedIn ? <GumballMachinePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.mint.path} element={
                    isLoggedIn ? <MintPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.nudeswap.path} element={
                    isLoggedIn ? <NudeSwapPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={`${routes.nft.path}/:tokenId`} element={
                    isLoggedIn ? <NftPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={`${routes.home.path}:name`} element={
                    isLoggedIn ? <ProfilePage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={`${routes.post.path}/:postId`} element={
                    isLoggedIn ? <PostPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
                <Route path={routes.home.path} element={
                    isLoggedIn ? <SearchPage /> : <Navigate to="/login" state={{ from: location }} replace={true} />
                } />
            </Routes>
        </MainContainer>
    );
}