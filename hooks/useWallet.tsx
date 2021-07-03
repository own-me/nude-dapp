import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function useWallet() {
    const [balance, setBalance] = useState<string>();
    const [address, setAddress] = useState<string>();

    useEffect(() => {
        async function getBalance() {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            setBalance(ethers.utils.formatEther(balance));
        }
        getBalance();
    }, [window.ethereum, address]);

    useEffect(() => {
        window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
            setAddress(accounts[0]);
        });
    });

    return { balance, address };
};