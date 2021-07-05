import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import loginBackground from "../../media/login-background.png";

const LoginPageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url(${loginBackground});
    background-size: cover;
    background-color: white;
`;

export default function LoginPage() {
    return (
        <LoginPageContainer>
            <LoginForm />
        </LoginPageContainer>
    )
}