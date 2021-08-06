import React from "react";
import styled from "styled-components";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import CandyShopPage from "./pages/candyshop/CandyshopPage";
import AuctionHousePage from "./pages/auctionhouse/AuctionhousePage";
import GumballMachinePage from "./pages/gumballmachine/GumballMachinePage";
import {TOTAL_HEIGHT} from "./components/Navbar";
import MintPage from "./pages/mint/MintPage";

const MainContainer = styled.div`
    height: calc(100% - ${TOTAL_HEIGHT}px);
    margin-top: ${TOTAL_HEIGHT}px;
    width: 100%;
    overflow-y: auto;
    position: relative;
`;

export default function Main() {
    const loggedIn = useAppSelector(state => state.user.loggedIn);
    const dispatch = useAppDispatch();

    return (
        <MainContainer>
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