import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { usePostRegisterMutation } from "../../redux/api/register";
import loadingSpinner from "../../media/loading.svg";
import FormInput from "../../components/FormInput";

const RegisterFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFEAFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: 1px solid #FEB8FF;
    padding: 50px 100px;
    color: black;
`;

const RegisterHeader = styled.h1`
    font-family: Rock Salt, Open Sans;
    color: #c931ff;
`;

const SubmitButton = styled.button<{ $disabled: boolean }>`
    margin: 20px;
    background: #f455fa;
    border: 1px solid #707070;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    color: white;
    padding: 8px 25px;
    font-family: Poppins, Open Sans;
    font-size: 20px;
    cursor: pointer;
    opacity: ${props => props.$disabled ? 0.8 : 1};

    :hover{
        background: #ff44e6;  
    }

    ${props => props.$disabled && css`
        cursor: not-allowed;
        :hover{
            background: #f455fa;  
        }
    `}
`;

const ErrorMessage = styled.p`
    color: red;
    font-family: Poppins, Open Sans;
`;

export default function RegisterForm() {
    const history = useHistory();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState<boolean>(false);

    const [postRegister, { isLoading, isSuccess, isError, data, error }] = usePostRegisterMutation();

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
            <RegisterHeader>Register</RegisterHeader>
            <FormInput label="Email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            <FormInput label="Password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
            <FormInput label="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" required />
            <ErrorMessage>{isError && error.data.error}</ErrorMessage>
            {
                isLoading ? <img src={loadingSpinner} /> : <SubmitButton disabled={!isPasswordConfirmed} $disabled={!isPasswordConfirmed}>Submit</SubmitButton>
            }
        </RegisterFormContainer>
    );
};