import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { setUserLoggedIn } from "../redux/slices/user";
import { useAppDispatch } from "../redux/hooks";

export default function useWallet() {
    const dispatch = useAppDispatch();

    const [balance, setBalance] = useState<BigNumber>(null);
    const [address, setAddress] = useState<string>("");
    const [network, setNetwork] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        async function getBalance() {
            await window.ethereum.request({ method: "eth_requestAccounts" });
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
        window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
            if (!address) {
                setAddress(accounts[0]);
            } else {
                setBalance(null);
                setAddress("");
                setNetwork(null);
                setProvider(null);
                setSigner(null);
                dispatch(setUserLoggedIn(false));
            }
        });
    }, [address, dispatch]);

    return { balance, address, network, provider, signer };
}