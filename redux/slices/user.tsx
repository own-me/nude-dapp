import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NftInterface } from "../api/nft";
import { InitialLoginInfoResponse } from "../api/user";

interface UserState {
    address: string;
    name: string;
    profileImageUrl: string;
    loggedIn: boolean;
    token: string;
    email: string;
    nfts: NftInterface[];
}

const initialState: UserState = {
    address: null,
    name: "",
    profileImageUrl: "",
    loggedIn: false,
    token: "",
    email: "",
    nfts: []
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserName: (state: UserState, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setUserLoggedIn: (state: UserState, action: PayloadAction<boolean>) => {
            if (!action.payload) {
                localStorage.removeItem("token");
            }
            state.loggedIn = action.payload;
        },
        logoutUser: () => {
            localStorage.removeItem("token");
            return {
                ...initialState
            };
        },
        setUserEmail: (state: UserState, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setUserNfts: (state: UserState, action: PayloadAction<NftInterface[]>) => {
            state.nfts = action.payload;
        },
        setUserToken: (state: UserState, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setInitialLoginInfo: (state: UserState, action: PayloadAction<InitialLoginInfoResponse>) => {
            return {
                ...state,
                address: action.payload.address,
                name: action.payload.name,
                profileImageUrl: action.payload.profileImageUrl,
                loggedIn: true
            };
        },
    }
});

export const {
    setUserName,
    setUserLoggedIn,
    setUserEmail,
    setUserNfts,
    setUserToken,
    setInitialLoginInfo,
    logoutUser
} = userSlice.actions;

export default userSlice.reducer;