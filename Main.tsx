import React from "react";
import styled from "styled-components";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/Footer";
import ProfilePage from "./pages/profile/ProfilePage";
import CandyShopPage from "./pages/candyshop/CandyshopPage";
import AuctionHousePage from "./pages/auctionhouse/AuctionhousePage";

const MainContainer = styled.div`
    height: calc(100% - 50px);
    width: 100%;
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
                <PrivateRoute exact path="/:name" children={<ProfilePage />} />
                <PrivateRoute exact path="/" children={<HomePage />} />
            </Switch>
            <Footer />
        </MainContainer>
    );
};