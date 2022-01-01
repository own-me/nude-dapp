import { ethers, BigNumber } from "ethers";

export function shortenAddress(address: string, length: number) {
    return address && `${address.slice(0, length / 2)}...${address.slice(address.length - length / 2, address.length)}`;
}

export function formatEth(value: BigNumber) {
    return value && ethers.FixedNumber.fromValue(value, 18).round(4).toString();
}

export const NudeNFT_ADDRESS = "0x85E9dd3521B9c2Fd7AE9B6C4C9b394f040Bea136";
export const Nude_ADDRESS = "0x7B22b4F9d5cD7881cFB6107f5D389b6F5f74229C";
