import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: number;
    name: string;
    loggedIn: boolean;
    email: string;
    nfts: any[];
};

const initialState: UserState = {
    id: null,
    name: "",
    loggedIn: false,
    email: "",
    nfts: []
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state: UserState, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
        setUserName: (state: UserState, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setUserLoggedIn: (state: UserState, action: PayloadAction<boolean>) => {
            if (!action.payload) {
                localStorage.removeItem("token");
            }
            state.loggedIn = action.payload;
        },
        setUserEmail: (state: UserState, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setUserNfts: (state: UserState, action: PayloadAction<any[]>) => {
            state.nfts = action.payload;
        }
    }
});

export const { setUserId, setUserName, setUserLoggedIn, setUserEmail, setUserNfts } = userSlice.actions;

export default userSlice.reducer;