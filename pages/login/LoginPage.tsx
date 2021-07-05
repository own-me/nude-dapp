import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import loginBackground from "../../media/login-background.svg";
import logo from "../../media/navbar.png";

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

const LogoImg = styled.img`
    position: absolute;
    top: 50px;
    left: 50px;
    height: 100px;
`;

export default function LoginPage() {
    return (
        <LoginPageContainer>
            <LogoImg src={logo} />
            <LoginForm />
        </LoginPageContainer>
    )
}