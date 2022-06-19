import { createSlice } from "@reduxjs/toolkit";

interface Notification {
    title: string;
    message: string;
    type: "success" | "error" | "info";
}

interface AppState {
    isDarkMode: boolean;
    isReportModalOpen: boolean;
    notifications: Notification[];
}

const initialState: AppState = {
    isDarkMode: window.localStorage.getItem("isDarkMode") === "true",
    isReportModalOpen: false,
    notifications: [],
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
        },
        addNotification: (state: AppState, action: { payload: Notification }) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state: AppState, action: { payload: number }) => {
            state.notifications.splice(action.payload, 1);
        }
    }
});

export const {
    toggleDarkMode,
    toggleReportModal,
    addNotification,
    removeNotification
} = appSlice.actions;

export default appSlice.reducer;