import React from "react";
import styled from "styled-components";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRouter";
import HomePage from "./pages/home/HomePage";

const MainContainer = styled.div`
    height: 100%;
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
                <PrivateRoute path="/" children={<HomePage />} />
            </Switch>
        </MainContainer>
    );
};