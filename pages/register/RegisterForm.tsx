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
    font-family: Poppins, Open Sans;

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

const AgeVerify = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0px;
`;

const CheckBox = styled.input`

`;

export default function RegisterForm() {
    const navigate = useNavigate();

    const { address } = useWallet();

    const [email, setEmail] = useState<string>(null);
    const [name, setName] = useState<string>(null);
    const [isAgeConfirmed, setIsAgeConfirmed] = useState<boolean>(false);

    const [postRegister, {
        isLoading: isRegisterLoading,
        isSuccess: isRegisterSuccess
    }] = usePostRegisterMutation();

    useEffect(() => {
        if (isRegisterSuccess) {
            navigate("/login");
        }
    }, [isRegisterSuccess, navigate]);

    const isSubmitDisabled = !isAgeConfirmed;

    const handleRegister = (e) => {
        e.preventDefault();
        if (!isSubmitDisabled) {
            postRegister({ address, isAgeConfirmed, name, email });
        }
    };

    return (
        <RegisterFormContainer>
            <RegisterHeader>Register</RegisterHeader>
            <FormInput label="Email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" optional />
            <FormInput label="Name" type="text" onChange={(e) => setName(e.target.value)} optional />
            <AgeVerify>
                <label htmlFor="ageVerify">I am over 18 years of age</label>
                <CheckBox type="checkbox" id="ageVerify" name="ageVerify" value={String(isAgeConfirmed)} onChange={() => setIsAgeConfirmed(!isAgeConfirmed)} />
            </AgeVerify>
            {
                isRegisterLoading ? <img src={loadingSpinner} /> : <SubmitButton onClick={handleRegister} $disabled={isSubmitDisabled}>Register</SubmitButton>
            }
            <Link to="/login">Login</Link>
        </RegisterFormContainer>
    );
}