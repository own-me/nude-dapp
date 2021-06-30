import React from "react";
import styled from "styled-components";
import RegisterForm from "./RegisterForm";

const RegisterPageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function RegisterPage() {
    return (
        <RegisterPageContainer>
            <h1>Register</h1>
            <RegisterForm />
        </RegisterPageContainer>
    )
}