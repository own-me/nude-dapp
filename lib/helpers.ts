import { ethers, BigNumber } from "ethers";

export function shortenAddress(address: string) {
    return address && `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`;
};

export function formatEth(value: BigNumber) {
    return value && ethers.FixedNumber.fromValue(value, 18).round(4).toString();
};