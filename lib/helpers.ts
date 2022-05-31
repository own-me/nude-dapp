import { ethers, BigNumber } from "ethers";

export function shortenAddress(address: string, length: number) {
    return address && `${address.slice(0, length / 2)}...${address.slice(address.length - length / 2, address.length)}`;
}

export function formatEth(value: BigNumber) {
    return value && ethers.FixedNumber.fromValue(value).round(4).toString();
}

export const NudeNFT_ADDRESS = "0xA03015921DafE5c676eBc9D1634Ba547709Fc353";
export const Nude_ADDRESS = "0x55613170ECB978D4108F67ae8b747f44d1342Ed1";
export const NudeDEX_Address = "0xf28476C0A92da39a70C37b1cDae6398F4Aa5b6FF";
