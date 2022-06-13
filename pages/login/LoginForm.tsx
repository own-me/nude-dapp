import React, { memo, useCallback, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { usePostLoginMutation } from "../../api/login";
import { setInitialLoginInfo, setUserLoggedIn, setUserToken } from "../../redux/slices/user";
import loadingSpinner from "../../media/own-me-spinner.svg";
import metamaskLogo from "../../media/metamask.svg";
import { Link } from "react-router-dom";
import useWallet from "../../hooks/useWallet";
import { usePostAuthMutation } from "../../api/auth";
import { useGetInitialLoginInfoQuery } from "../../api/user";
import { ethers, utils } from "ethers";
import { NETWORKS } from "../../lib/blockchain";

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
    background: #ffd390;
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
        background: #f6b95d;  
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
    font-family: Poppins, Open Sans;
`;

export const LoginForm = memo(() => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const loggedIn = useAppSelector(state => state.user.loggedIn);
    const userToken = useAppSelector(state => state.user.token);

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

    const {
        data: initialLoginInfoData,
        isSuccess: isGetInitialLoginInfoSuccess,
        refetch: getInitialLoginInfoRefetch
    } = useGetInitialLoginInfoQuery({ token: userToken }, {
        skip: !userToken || !address || loggedIn,
    });

    useEffect(() => {
        if (isGetInitialLoginInfoSuccess) {
            dispatch(setInitialLoginInfo(initialLoginInfoData));
        }
    }, [isGetInitialLoginInfoSuccess, initialLoginInfoData, dispatch]);

    useEffect(() => {
        if (window.localStorage.getItem("token") && address) {
            postLogin({ address });
        }
    }, [address, postLogin]);

    const handleSubmit = useCallback(async (e?) => {
        e.preventDefault();
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: ethers.utils.hexValue(NETWORKS.polygonMumbai.chainId) }],
            });
        } catch (switchError) {
            if (switchError.code === 4902) { // couldn't switch networks
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: ethers.utils.hexValue(NETWORKS.polygonMumbai.chainId),
                                chainName: "Mumbai",
                                rpcUrls: ["https://rpc-mumbai.matic.today"],
                                nativeCurrency: {
                                    name: "Matic",
                                    symbol: "MATIC",
                                    decimals: 18
                                },
                                blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                            },
                        ],
                    });
                } catch (addError) {
                    console.log("error switching chains");
                }
            }
        }
        let userAddress = address;
        if (!userAddress) {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAddress = utils.getAddress(accounts[0]);
        }
        postLogin({ address: userAddress });
    }, [address, postLogin]);

    useEffect(() => {
        if (isPostLoginSuccess && postLoginData && signer && address) {
            if (postLoginData?.nonce) {
                window.localStorage.removeItem("token");
                signer.signMessage(postLoginData.nonce).then(signature => {
                    postAuth({ address, signature, nonce: postLoginData.nonce });
                });
            } else {
                dispatch(setUserToken(window.localStorage.getItem("token")));
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
        if (userToken && loggedIn) {
            getInitialLoginInfoRefetch();
        }
    }, [getInitialLoginInfoRefetch, loggedIn, userToken]);

    useEffect(() => {
        if (isPostAuthSuccess && postAuthData && postAuthData.token) {
            window.localStorage.setItem("token", postAuthData.token);
            dispatch(setUserToken(postAuthData.token));
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
                isPostLoginLoading ? <img src={loadingSpinner} /> : <SubmitButton onClick={handleSubmit}><img src={metamaskLogo} /></SubmitButton>
            }
            <br />
            <Link to="/register">Register</Link>
        </LoginFormContainer>
    );
});

export default LoginForm;