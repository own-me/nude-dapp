import { ethers, BigNumber } from "ethers";

export function shortenAddress(address: string, length: number) {
    return address && `${address.slice(0, length / 2)}...${address.slice(address.length - length / 2, address.length)}`;
}

export function formatEth(value: BigNumber) {
    return value && ethers.FixedNumber.fromValue(value, 18).round(4).toString();
}

export const NudeNFT_ADDRESS = "0x075ad9DBCE55dfF029B2399b5DA353EF6ddA52F2";
export const Nude_ADDRESS = "0x47157541ae981412E8B2585b4b58573B8D27C0A7";
