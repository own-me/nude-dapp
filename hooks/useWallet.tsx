import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function useWallet() {
    const [balance, setBalance] = useState<string>();

    useEffect(() => {
        async function getBalance() {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            setBalance(balance.toString());
        }
        getBalance();
    }, []);

    return { balance };
};