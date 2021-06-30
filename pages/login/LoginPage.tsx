import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";

const LoginPageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function LoginPage() {
    return (
        <LoginPageContainer>
            <h1>Login</h1>
            <LoginForm />
        </LoginPageContainer>
    )
}