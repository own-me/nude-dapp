import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string;
    name: string,
    loggedIn: boolean,
    email: string
};

const initialState: UserState = {
    id: "",
    name: "",
    loggedIn: false,
    email: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
            if (!action.payload) {
                window.localStorage.removeItem("token");
            }
            state.loggedIn = action.payload;
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
    }
});

export const { setUserId, setUserName, setUserLoggedIn, setUserEmail } = userSlice.actions;

export default userSlice.reducer;