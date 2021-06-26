import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import LoginForm from "./LoginForm";

const LoginPageContainer = styled.div`
    height: 100%;
`;

export default function LoginPage() {
    const name = useAppSelector(state => state.user.name);
    const dispatch = useAppDispatch();

    return (
        <LoginPageContainer>
            <h1>Login</h1>
            <LoginForm />
        </LoginPageContainer>
    )
}