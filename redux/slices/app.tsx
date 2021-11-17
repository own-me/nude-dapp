import { createSlice } from "@reduxjs/toolkit";

interface AppState {
    isDarkMode: boolean;
}

const initialState: AppState = {
    isDarkMode: true
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDarkMode: (state: AppState) => {
            state.isDarkMode = !state.isDarkMode;
        }
    }
});

export const { toggleDarkMode } = appSlice.actions;

export default appSlice.reducer;