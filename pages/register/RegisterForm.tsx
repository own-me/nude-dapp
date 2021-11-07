import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { usePostRegisterMutation } from "../../redux/api/register";
import loadingSpinner from "../../media/own-me-spinner.svg";
import FormInput from "../../components/FormInput";
import useWallet from "../../hooks/useWallet";

const RegisterFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFEAFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    border: 1px solid #FEB8FF;
    padding: 2rem 2rem;
    color: black;
    margin: 2rem;
    height: 62vh;
    overflow-y: auto;

    @media (min-width: ${props => props.theme.breakpoints.tablet}px) {
        padding: 3rem 5rem;
        height: fit-content;
    }
`;

const RegisterHeader = styled.h1`
    font-family: Rock Salt, Open Sans;
    color: #c931ff;
`;

const SubmitButton = styled.button<{ $disabled?: boolean }>`
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
    const navigate = useNavigate();

    const { address } = useWallet();

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    const [postRegister, {
        isLoading: isRegisterLoading,
        isSuccess: isRegisterSuccess,
        isError: isRegisterError,
        data: registerData,
        error: registerError
    }] = usePostRegisterMutation();

    useEffect(() => {
        if (isRegisterSuccess) {
            navigate("/login");
        }
    }, [registerData, isRegisterSuccess, isRegisterError]);

    const handleRegister = (e) => {
        e.preventDefault();
        postRegister({ address });
    };

    return (
        <RegisterFormContainer>
            <RegisterHeader>Register</RegisterHeader>
            <FormInput label="Email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" optional />
            <FormInput label="Name" type="text" onChange={(e) => setName(e.target.value)} optional />
            <SubmitButton onClick={handleRegister}>Register</SubmitButton>
            {
                isRegisterLoading && <img src={loadingSpinner} />
            }
            <Link to="/login">Login</Link>
        </RegisterFormContainer>
    );
};