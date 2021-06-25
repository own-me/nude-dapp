import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { usePostLoginMutation } from "../../redux/api/login";

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

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [postLogin, { isLoading, isSuccess, isError, data }] = usePostLoginMutation();

    useEffect(() => {
        console.log(data, isSuccess, isError);
    }, [data, isSuccess, isError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit!");
        postLogin({ email, password });
    };

    return (
        <LoginFormContainer onSubmit={handleSubmit}>
            <EmailLabel htmlFor="email">Email</EmailLabel>
            <EmailInput type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            <PasswordLabel htmlFor="password">Password</PasswordLabel>
            <PasswordInput type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            <SubmitButton>Submit</SubmitButton>
        </LoginFormContainer>
    )
}