export function shortenAddress(address: string) {
    return address && `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`;
};