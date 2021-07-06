import React from "react";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";
import loginBackground from "../../media/login-background.svg";
import logo from "../../media/navbar.png";

const RegisterPageContainer = styled.div`
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

export default function RegisterPage() {
    return (
        <RegisterPageContainer>
            <LogoImg src={logo} />
            <RegisterForm />
        </RegisterPageContainer>
    )
}