import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

const LoginFormContainer = styled.form`
    height: 100%;
`;

const EmailLabel = styled.label`

`;

const EmailInput = styled.input`

`;

const PasswordLabel = styled.label`

`;

const PasswordInput = styled.input`

`;

const SubmitButton = styled.button`

`;

export default function LoginForm() {
    const name = useAppSelector(state => state.user.name);
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        console.log("Submit!");
    };

    return (
        <LoginFormContainer onSubmit={handleSubmit}>
            <EmailLabel htmlFor="email">Email</EmailLabel>
            <EmailInput type="email" id="email"/>
            <PasswordLabel htmlFor="password">Password</PasswordLabel>
            <PasswordInput type="password" id="password"/>
            <SubmitButton>Submit</SubmitButton>
        </LoginFormContainer>
    )
}