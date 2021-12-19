import React, { memo, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { usePostLoginMutation } from "../../redux/api/login";
import { setUserLoggedIn } from "../../redux/slices/user";
import loadingSpinner from "../../media/own-me-spinner.svg";
import { Link } from "react-router-dom";
import useWallet from "../../hooks/useWallet";
import { usePostAuthMutation } from "../../redux/api/auth";

const LoginFormContainer = styled.form`
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

    @media (min-width: ${props => props.theme.breakpoints.tablet}px) {
        padding: 3rem 5rem;
    }
`;

const LoginHeader = styled.h1`
    font-family: Rock Salt, Open Sans;
    color: #c931ff;
    margin: 0;
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

export const LoginForm = memo(() => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const loggedIn = useAppSelector(state => state.user.loggedIn);
    const { address, signer } = useWallet();

    const [postLogin, {
        isLoading: isPostLoginLoading,
        isSuccess: isPostLoginSuccess,
        isError: isPostLoginError,
        data: postLoginData,
        error: postLoginError
    }] = usePostLoginMutation();

    const [postAuth, {
        isSuccess: isPostAuthSuccess,
        data: postAuthData,
    }] = usePostAuthMutation();

    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            postLogin({ address });
        }
    }, [address, postLogin]);

    const handleSubmit = useCallback((e?) => {
        e.preventDefault();
        postLogin({ address });
    }, [address, postLogin]);

    useEffect(() => {
        if (isPostLoginSuccess && postLoginData) {
            if (postLoginData.nonce) {
                window.localStorage.removeItem("token");
                signer.signMessage(postLoginData.nonce).then(signature => {
                    postAuth({ address, signature, nonce: postLoginData.nonce });
                });
            } else {
                dispatch(setUserLoggedIn(true));
            }
        }
    }, [postLoginData, isPostLoginSuccess, signer, postAuth, address, dispatch]);

    useEffect(() => {
        if (isPostLoginError) {
            window.localStorage.removeItem("token");
        }
    }, [isPostLoginError]);

    useEffect(() => {
        if (isPostAuthSuccess && postAuthData && postAuthData.token) {
            window.localStorage.setItem("token", postAuthData.token);
            dispatch(setUserLoggedIn(true));
        }
    }, [dispatch, isPostAuthSuccess, postAuthData]);

    useEffect(() => {
        if (loggedIn) {
            navigate(location?.state?.from || "/");
        }
    }, [location?.state?.from, loggedIn, navigate]);

    return (
        <LoginFormContainer onSubmit={handleSubmit}>
            <LoginHeader>Login</LoginHeader>
            <ErrorMessage>{isPostLoginError && postLoginError?.data?.error}</ErrorMessage>
            {
                isPostLoginLoading ? <img src={loadingSpinner} /> : <SubmitButton onClick={handleSubmit}>Metamask</SubmitButton>
            }
            <Link to="/register">Register</Link>
        </LoginFormContainer>
    );
});

export default LoginForm;