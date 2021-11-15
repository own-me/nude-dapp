import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
    address: string,
    balance: number,
}

const initialState: WalletState = {
    address: "",
    balance: 0,
};

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setWalletAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setWalletBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
    }
});

export const { setWalletAddress, setWalletBalance } = walletSlice.actions;

export default walletSlice.reducer;