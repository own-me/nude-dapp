import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { setUserLoggedIn } from "../redux/slices/user";
import { setWalletAddress, setWalletBalance, setWalletNetwork } from "../redux/slices/wallet";
import { useAppDispatch } from "../redux/hooks";
import { Nude__factory } from "../typechain/factories/Nude__factory";

export default function useWallet() {
    const dispatch = useAppDispatch();

    const [nudeBalance, setNudeBalance] = useState<BigNumber>(null);
    const [maticBalance, setMaticBalance] = useState<BigNumber>(null);
    const [address, setAddress] = useState<string>("");
    const [network, setNetwork] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        console.log("Getting new wallet provider...");
        if (!provider && window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
        } else {
            console.log("No wallet provider found");
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
            const checkSumAddress = ethers.utils.getAddress(address);
            setAddress(checkSumAddress);
            dispatch(setWalletAddress(checkSumAddress));
        }
        if (signer) {
            getAddress();
        }
    }, [dispatch, signer]);

    useEffect(() => {
        async function getBalance() {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const nudeContract = Nude__factory.connect(process.env.NUDE_ADDRESS, provider);
            const nudeBalance = await nudeContract.balanceOf(address);
            const maticBalance = await signer.getBalance();
            setNudeBalance(nudeBalance);
            setMaticBalance(maticBalance);
            dispatch(setWalletBalance(nudeBalance.toString()));
        }
        if (network && provider && address) {
            getBalance();
        }
    }, [address, dispatch, network, provider, signer]);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
                if (!address) {
                    setAddress(ethers.utils.getAddress(accounts[0]));
                } else {
                    setNudeBalance(null);
                    setMaticBalance(null);
                    setAddress("");
                    setNetwork(null);
                    setProvider(null);
                    setSigner(null);
                    dispatch(setUserLoggedIn(false));
                }
            });
            window.ethereum.on("chainChanged", async (chainId) => {
                if (provider) {
                    setProvider(null);
                    setSigner(null);
                    setNudeBalance(null);
                    setMaticBalance(null);
                    setNetwork(null);
                }
            });
        }
    }, [address, dispatch, provider]);

    return { nudeBalance, maticBalance, address, network, provider, signer };
}