import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
    key: number;
    title: string;
    message: string;
    type: "success" | "error" | "info";
}

interface AppState {
    isDarkMode: boolean;
    isReportModalOpen: boolean;
    notifications: Record<number, Notification>;
}

const initialState: AppState = {
    isDarkMode: window.localStorage.getItem("isDarkMode") === "true",
    isReportModalOpen: false,
    notifications: {},
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
        addNotification: (state: AppState, action: { payload: Omit<Notification, "key"> }) => {
            const key = Object.keys(state.notifications).length;
            state.notifications[key] = {
                key,
                ...action.payload
            };
        },
        removeNotification: (state: AppState, action: PayloadAction<{ key: number }>) => {
            delete state.notifications[action.payload.key];
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