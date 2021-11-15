import { ethers, BigNumber } from "ethers";

export function shortenAddress(address: string, length: number) {
    return address && `${address.slice(0, length / 2)}...${address.slice(address.length - length / 2, address.length)}`;
}

export function formatEth(value: BigNumber) {
    return value && ethers.FixedNumber.fromValue(value, 18).round(4).toString();
}

export async function fetchNudeABI() {
    const res = await fetch("https://raw.githubusercontent.com/own-me/contracts/master/build/Nude.json");
    return res.json();
}

export async function fetchNudeNftABI() {
    const res = await fetch("https://raw.githubusercontent.com/own-me/contracts/master/build/NudeNFT.json");
    return res.json();
}