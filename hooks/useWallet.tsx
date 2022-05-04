import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { setUserLoggedIn } from "../redux/slices/user";
import { setWalletAddress, setWalletBalance, setWalletNetwork } from "../redux/slices/wallet";
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
            console.log("Getting new wallet provider...");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
        }
    }, [provider]);

    useEffect(() => {
        async function getSigner() {
            setSigner(await provider.getSigner());
        }
        if (provider) {
            getSigner();
        }
    }, [provider]);

    useEffect(() => {
        async function getNetwork() {
            const network = await provider.getNetwork();
            if (network) {
                setNetwork(network);
                dispatch(setWalletNetwork(network.name));
            }
        }
        if (provider) {
            getNetwork();
        }
    }, [dispatch, provider]);

    useEffect(() => {
        async function getAddress() {
            const address = await signer.getAddress();
            setAddress(address);
            dispatch(setWalletAddress(address));
        }
        if (signer && !address) {
            getAddress();
        }
    }, [dispatch, signer, address]);

    useEffect(() => {
        async function getBalance() {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const nudeContract = Nude__factory.connect(Nude_ADDRESS, provider);
            const balance = await nudeContract.balanceOf(address);
            setBalance(balance);
            dispatch(setWalletBalance(balance.toString()));
        }
        if (network && provider && address) {
            getBalance();
        }
    }, [address, dispatch, network, provider]);

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