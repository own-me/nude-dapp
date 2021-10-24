import React from "react";
import styled from "styled-components";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { useAppSelector } from "./redux/hooks";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import CandyShopPage from "./pages/candyshop/CandyshopPage";
import AuctionHousePage from "./pages/auctionhouse/AuctionhousePage";
import GumballMachinePage from "./pages/gumballmachine/GumballMachinePage";
import {TOTAL_HEIGHT} from "./components/Navbar";
import MintPage from "./pages/mint/MintPage";

const MainContainer = styled.div<{ $isLoggedIn: boolean }>`
    height: calc(100% - ${props => props.$isLoggedIn ? TOTAL_HEIGHT : 0}px);
    margin-top: ${props => props.$isLoggedIn ? TOTAL_HEIGHT : 0}px;
    width: 100%;
    overflow-y: auto;
    position: relative;
`;

export default function Main() {
    const loggedIn = useAppSelector(state => state.user.loggedIn);

    return (
        <MainContainer $isLoggedIn={loggedIn}>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <PrivateRoute exact path="/candyshop" children={<CandyShopPage />} />
                <PrivateRoute exact path="/auctionhouse" children={<AuctionHousePage />} />
                <PrivateRoute exact path="/gumballmachine" children={<GumballMachinePage />} />
                <PrivateRoute exact path="/mint" children={<MintPage />} />
                <PrivateRoute exact path="/:name" children={<ProfilePage />} />
                <PrivateRoute exact path="/" children={<HomePage />} />
            </Switch>
        </MainContainer>
    );
};