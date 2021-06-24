import React from "react";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/login/LoginPage";
import { useAppSelector, useAppDispatch } from "./redux/hooks";

const MainContainer = styled.div`
    height: 100%;
    width: 100%;
`;

export default function Main() {
    const name = useAppSelector(state => state.user.name);
    const dispatch = useAppDispatch();

    return (
        <MainContainer>
            <Navbar />
            <LoginPage />
        </MainContainer>
    );
};