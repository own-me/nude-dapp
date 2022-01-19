import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { setUserLoggedIn } from "../redux/slices/user";
import { useAppDispatch } from "../redux/hooks";
import { Nude_ADDRESS } from "../lib/helpers";
import { Nude__factory } from "../typechain/factories/Nude__factory";

export default function useWallet() {
    const dispatch = useAppDispatch();

    const [balance, setBalance] = useState<BigNumber>(null);
    const [address, setAddress] = useState<string>("");
    const [network, setNetwork] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        if (!provider) {
            console.log("lol");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
        }
    }, [provider]);

    useEffect(() => {
        async function getAddress() {
            setAddress(await signer.getAddress());
        }
        if (signer) {
            getAddress();
        }
    }, [signer]);

    useEffect(() => {
        async function getNetwork() {
            setNetwork(await provider.getNetwork());
        }
        if (provider) {
            getNetwork();
        }
    }, [provider]);


    useEffect(() => {
        async function getSigner() {
            setSigner(provider.getSigner());
        }
        if (provider) {
            getSigner();
        }
    }, [provider]);

    useEffect(() => {
        async function getBalance() {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const nudeContract = Nude__factory.connect(Nude_ADDRESS, provider);
            setBalance(await nudeContract.balanceOf(address));
        }
        if (network && provider && address) {
            getBalance();
        }
    }, [address, network, provider]);

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