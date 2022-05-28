import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { usePostRegisterMutation } from "../../api/register";
import loadingSpinner from "../../media/own-me-spinner.svg";
import useWallet from "../../hooks/useWallet";
import FormCheckboxInput from "../../components/FormCheckboxInput";

const RegisterFormContainer = styled.form`
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 1px 10px 10px rgb(0 0 0 / 25%);
    border-radius: 25px;
    border: 1px solid #fc2aff;
    padding: 2rem 2rem;
    color: black;
    margin: 2rem;
    font-family: Poppins, Open Sans;
`;

const RegisterHeader = styled.h1`
    font-family: Rock Salt, Open Sans;
    color: #c931ff;
    margin-top: 0;
`;

const SubmitButton = styled.button<{ $disabled?: boolean }>`
    width: 100%;
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

const ConnectWalletMsg = styled.div`
    width: 100%;
    padding-bottom: 20px;
`;

const AddressMessage = styled.div`
    width: 100%;
    padding-bottom: 20px;
`;

const AddressTitle = styled.h3`
    color: #1f1f1f;
    font-weight: 500;
`;

const AddressText = styled.code`
    font-size: 20px;
`;

const ConnectWallet = styled.button<{ $disabled?: boolean }>`
    margin: 20px;
    background: #fdb140;
    border: 1px solid #707070;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    color: white;
    padding: 5px 15px;
    font-family: Poppins, Open Sans;
    font-size: 18px;
    cursor: pointer;
    opacity: ${props => props.$disabled ? 0.8 : 1};

    :hover{
        background: #ff9b04;  
    }

    ${props => props.$disabled && css`
        cursor: not-allowed;
        :hover{
            background: #f6b95d;  
        }
    `}
`;

const ErrorMessage = styled.p`
    color: red;
`;

export default function RegisterForm() {
    const navigate = useNavigate();
    const { address } = useWallet();

    const [isAgeConfirmed, setIsAgeConfirmed] = useState<boolean>(false);

    const isFormValid = isAgeConfirmed && address;

    const [postRegister, {
        isLoading: isRegisterLoading,
        isSuccess: isRegisterSuccess,
        isError: isRegisterError,
        error: registerError
    }] = usePostRegisterMutation();

    useEffect(() => {
        if (isRegisterSuccess) {
            navigate("/login");
        }
    }, [isRegisterSuccess, navigate]);

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid) {
            postRegister({ address, isAgeConfirmed });
        }
    };

    const connectWallet = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    };

    return (
        <RegisterFormContainer>
            <RegisterHeader>Register</RegisterHeader>
            {
                address ?
                    <AddressMessage>
                        <AddressTitle>Your Connected Address:</AddressTitle>
                        <AddressText>{address}</AddressText>
                    </AddressMessage>
                    :
                    <ConnectWalletMsg>
                        <h3>Address Not Connected!</h3>
                        <ConnectWallet onClick={connectWallet}>Connect Metamask</ConnectWallet>
                    </ConnectWalletMsg>
            }
            <FormCheckboxInput
                label="I confirm I am over 18 years of age and consent to interacting with pornographic / adult content."
                onChecked={(checked) => setIsAgeConfirmed(checked)}
            />
            <ErrorMessage>{isRegisterError && registerError?.data?.error}</ErrorMessage>
            {
                isRegisterLoading ? <img src={loadingSpinner} /> : <SubmitButton onClick={handleRegister} $disabled={!isFormValid}>Register</SubmitButton>
            }
            <Link to="/login">Login</Link>
        </RegisterFormContainer>
    );
}