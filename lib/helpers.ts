import { ethers, BigNumber } from "ethers";

export function shortenAddress(address: string, length: number) {
    return address && `${address.slice(0, length / 2)}...${address.slice(address.length - length / 2, address.length)}`;
}

export function formatEth(value: BigNumber) {
    return value && ethers.FixedNumber.fromValue(value, 18).round(4).toString();
}

export const NudeNFT_ADDRESS = "0x57A529924360134e1dE3dBA9a794608CF8c706D6";
export const Nude_ADDRESS = "0xb989766Ee139d92E249ad72E2Cd59BAf68E322a0";
export const NudeDEX_Address = "0x6893eC04C17070C3be87C9609263BA8222490523";
