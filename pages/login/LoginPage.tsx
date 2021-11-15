import React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import loginBackground from "../../media/login-background.svg";
import logo from "../../media/own-me-logo.svg";
import loginBackgroundIpad from "../../media/login-background-ipad.svg";
import loginBackgroundMobile from "../../media/login-background-mobile.svg";

const LoginPageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-size: cover;
    background-color: white;
    background-image: url(${loginBackground});

    @media(max-width: 1014px) {
        background-image: url(${loginBackgroundIpad});
    }
    @media(max-width: 640px) {
        background-image: url(${loginBackgroundMobile});
    }
`;

const LogoImg = styled.img`
    margin: 0 auto;
    height: 5rem;

    @media (min-width: ${props => props.theme.breakpoints.tablet}px) {
        position: absolute;
        top: 50px;
        left: 50px;
    }
`;

export default function LoginPage() {
    return (
        <LoginPageContainer>
            <LogoImg src={logo} />
            <LoginForm />
        </LoginPageContainer>
    );
}