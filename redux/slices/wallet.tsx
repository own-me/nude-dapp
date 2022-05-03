import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
    address: string,
    balance: string,
    networkName: string 
}

const initialState: WalletState = {
    address: "",
    balance: "",
    networkName: ""
};

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setWalletAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setWalletBalance: (state, action: PayloadAction<string>) => {
            state.balance = action.payload;
        },
        setWalletNetwork: (state, action: PayloadAction<string>) => {
            state.networkName = action.payload;
        }
    }
});

export const {
    setWalletAddress,
    setWalletBalance,
    setWalletNetwork
} = walletSlice.actions;

export default walletSlice.reducer;