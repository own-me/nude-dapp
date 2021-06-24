import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    name: string,
    loggedIn: boolean
};

const initialState: UserState = {
    name: "",
    loggedIn: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.loggedIn = action.payload;
        }
    }
});

export const { setName, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;