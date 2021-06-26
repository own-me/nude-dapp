import React from "react";
import styled from "styled-components";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { Switch, Route, Redirect } from "react-router-dom";

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
                <Route render={({ location }) =>
                    loggedIn ? (
                        <>Logged In</>
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                } />
            </Switch>
        </MainContainer>
    );
};