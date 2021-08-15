import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

export default function useWallet() {
    const [balance, setBalance] = useState<BigNumber>();
    const [address, setAddress] = useState<string>();
    const [network, setNetwork] = useState<any>();
    const [provider, setProvider] = useState<any>();
    const [signer, setSigner] = useState<any>();

    useEffect(() => {
        async function getBalance() {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            const signer = provider.getSigner();
            setSigner(signer);
            const signerAddress = await signer.getAddress();
            setAddress(signerAddress);
            setBalance(await provider.getBalance(signerAddress));
            setNetwork(await provider.getNetwork());
        }
        getBalance();
    }, [address]);

    useEffect(() => {
        window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
            setAddress(accounts[0]);
        });
    }, []);

    return { balance, address, network, provider, signer };
};