import React from "react";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";
import loginBackground from "../../media/login-background.svg";
import logo from "../../media/own-me-logo.svg";
import LoginSocials from "../login/LoginSocials";

const RegisterPageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    background-image: url(${loginBackground});
    background-size: cover;
    background-color: white;
    justify-content: center;

    @media (min-width: ${props => props.theme.breakpoints.mobile}px) {
        justify-content: center;
    }
`;

const LogoImg = styled.img`
    margin: 0 auto;
    height: 5rem;
    position: absolute;
    top: 50px;
    left: 50px;

    @media (max-width: ${props => props.theme.breakpoints.tablet}px) {
        position: absolute;
        top: 30px;
        left: 30px;
        height: 4rem;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
        position: absolute;
        top: 20px;
        left: 20px;
        height: 3rem;
    }
`;

export default function RegisterPage() {
    return (
        <RegisterPageContainer>
            <LogoImg src={logo} />
            <RegisterForm />
            <LoginSocials />
        </RegisterPageContainer>
    );
}