import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { usePostRegisterMutation } from "../../redux/api/register";

const RegisterFormContainer = styled.form`
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EmailLabel = styled.label`

`;

const EmailInput = styled.input`

`;

const PasswordLabel = styled.label`

`;

const PasswordInput = styled.input`

`;

const ConfirmPasswordLabel = styled(PasswordLabel)`

`;

const ConfirmPasswordInput = styled(PasswordInput)`

`;

const SubmitButton = styled.button`
    margin: 10px;
`;

export default function RegisterForm() {
    const dispatch = useAppDispatch();
    const history = useHistory();


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState<boolean>(false);

    const [postRegister, { isLoading, isSuccess, isError, data }] = usePostRegisterMutation();

    useEffect(() => {
        if (isSuccess) {
            history.push("/login");
        }
    }, [data, isSuccess, isError]);

    useEffect(() => {
        setIsPasswordConfirmed((password && confirmPassword) && (password === confirmPassword));
    }, [password, confirmPassword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit!");
        postRegister({ email, password });
    };

    return (
        <RegisterFormContainer onSubmit={handleSubmit}>
            <EmailLabel htmlFor="email">Email</EmailLabel>
            <EmailInput type="email" id="email" onChange={(e) => setEmail(e.target.value)} required/>
            <PasswordLabel htmlFor="password">Password</PasswordLabel>
            <PasswordInput type="password" id="password" onChange={(e) => setPassword(e.target.value)} required/>
            <ConfirmPasswordLabel htmlFor="confirmPassword">Confirm Password</ConfirmPasswordLabel>
            <ConfirmPasswordInput type="password" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} required/>
            <SubmitButton disabled={!isPasswordConfirmed}>Submit</SubmitButton>
        </RegisterFormContainer>
    );
};