import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Web3Auth } from "@web3auth/web3auth";
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { INFURA_PROJECT_ID, WEB3AUTH_CLIENT_ID } from "../../lib/constants";
import web3authLogo from "../../media/web3auth-logo.svg";
import { socials } from "../../lib/socials";

const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
        network: "testnet",
        clientId: WEB3AUTH_CLIENT_ID,
        uxMode: "popup"
    },
    loginSettings: {
        relogin: true
    }
});

const metamaskAdapter = new MetamaskAdapter();

const loginOptions = [
    "discord",
    "github",
    "google",
    "twitch",
    "twitter"
];

const Web3AuthContainer = styled.div` 
    display: flex;
    flex-direction: column;
`;

const Web3AuthLogo = styled.img` 
    width: 40%;
    margin: 0 auto;
    margin-bottom: 20px;
`;

const ButtonsGrid = styled.div` 
    display: flex;
    justify-content: center;
`;

const LoginButton = styled.button` 
    margin: 10px;
    padding: 8px;
    border-radius: 5px;
    border: #686868 solid 1px;
    background-color: white;
    cursor: pointer;

    :hover {
        background-color: #ffedff;
    }
`;

const LoginButtonIcon = styled.img` 
    height: 40px;
    width: 40px;
`;

const Web3AuthLogin = memo(() => {
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

    const subscribeAuthEvents = useCallback((web3auth: Web3Auth) => {
        // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
        web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data: unknown) => {
            console.log("Yeah!, you are successfully logged in", data);
            console.log(await web3auth.getUserInfo());
            setProvider(web3auth.provider);
        });
        web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
            console.log("connecting");
        });
        web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
            console.log("disconnected");
        });
        web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
            console.error("some error or user has cancelled login request", error);
        });
    }, []);

    useEffect(() => {
        async function initWeb3Auth() {
            const web3auth = new Web3Auth({
                clientId: WEB3AUTH_CLIENT_ID,
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: "0x3",
                    rpcTarget: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
                    displayName: "ropsten",
                    blockExplorer: "https://ropsten.etherscan.io/",
                    ticker: "ETH",
                    tickerName: "Ethereum",
                }
            });
            web3auth.configureAdapter(openloginAdapter);
            web3auth.configureAdapter(metamaskAdapter);
            await web3auth.init();
            subscribeAuthEvents(web3auth);
            setWeb3auth(web3auth);
        }
        initWeb3Auth();
    }, [subscribeAuthEvents]);

    const handleLogin = useCallback(async (e, provider: string) => {
        e.preventDefault();
        await web3auth.connectTo(openloginAdapter.name, { loginProvider: provider });
    }, [web3auth]);

    return (
        <Web3AuthContainer>
            <Web3AuthLogo src={web3authLogo} />
            <ButtonsGrid>
                {
                    loginOptions.map((provider, index) => {
                        return <LoginButton onClick={(e) => handleLogin(e, provider)} key={index}>
                            <LoginButtonIcon src={socials?.find(social => social.key === provider)?.iconColor} />
                        </LoginButton>;
                    })
                }
            </ButtonsGrid>
        </Web3AuthContainer>
    );
});

export default Web3AuthLogin;
