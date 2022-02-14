import { ethers, BigNumber } from "ethers";

export function shortenAddress(address: string, length: number) {
    return address && `${address.slice(0, length / 2)}...${address.slice(address.length - length / 2, address.length)}`;
}

export function formatEth(value: BigNumber) {
    return value && ethers.FixedNumber.fromValue(value, 18).round(4).toString();
}

export const NudeNFT_ADDRESS = "0x7988Ac644935361DCae3DC7B213876F0e7F6dD64";
export const Nude_ADDRESS = "0x634f11ae7E174229B39a605772C1008D6d979cdB";
