import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    name: string,
    loggedIn: boolean,
    email: string
};

const initialState: UserState = {
    name: "",
    loggedIn: false,
    email: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    }
});

export const { setUserName, setUserLoggedIn, setUserEmail } = userSlice.actions;

export default userSlice.reducer;