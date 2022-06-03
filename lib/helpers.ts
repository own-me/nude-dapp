import { ethers, BigNumber } from "ethers";

export function shortenAddress(address: string, length: number) {
    return address && `${address.slice(0, length / 2)}...${address.slice(address.length - length / 2, address.length)}`;
}

export function formatEth(value: BigNumber) {
    return value && ethers.FixedNumber.fromValue(value).round(4).toString();
}