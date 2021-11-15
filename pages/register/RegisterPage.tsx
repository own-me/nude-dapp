import React from "react";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";
import loginBackground from "../../media/login-background.svg";
import logo from "../../media/own-me-logo.svg";

const RegisterPageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    background-image: url(${loginBackground});
    background-size: cover;
    background-color: white;

    @media (min-width: ${props => props.theme.breakpoints.mobile}px) {
        justify-content: center;
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

export default function RegisterPage() {
    return (
        <RegisterPageContainer>
            <LogoImg src={logo} />
            <RegisterForm />
        </RegisterPageContainer>
    );
}