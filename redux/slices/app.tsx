import { createSlice } from "@reduxjs/toolkit";

interface AppState {
    isDarkMode: boolean;
    isReportModalOpen: boolean;
}

const initialState: AppState = {
    isDarkMode: window.localStorage.getItem("isDarkMode") === "true",
    isReportModalOpen: false,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleDarkMode: (state: AppState) => {
            state.isDarkMode = !state.isDarkMode;
            window.localStorage.setItem("isDarkMode", (state.isDarkMode).toString());
        },
        toggleReportModal: (state: AppState) => {
            state.isReportModalOpen = !state.isReportModalOpen;
        }
    }
});

export const { toggleDarkMode, toggleReportModal } = appSlice.actions;

export default appSlice.reducer;