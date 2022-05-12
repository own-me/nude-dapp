import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Web3Auth } from "@web3auth/web3auth";
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { INFURA_PROJECT_ID, WEB3AUTH_CLIENT_ID } from "../../lib/constants";

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
    "metamask"
];

const Web3AuthContainer = styled.div` 

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
            <h1>Web3AuthLogin</h1>
            {
                loginOptions.map((provider, index) => {
                    return <button onClick={(e) => handleLogin(e, provider)} key={index}>{provider}</button>;
                })
            }
        </Web3AuthContainer>
    );
});

export default Web3AuthLogin;
